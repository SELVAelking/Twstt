import React, { useState, useEffect, useCallback } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { HistoryModal } from './HistoryModal';
import { Converter } from './Converter';
import { evaluateExpression, formatNumberWithCommas } from './calculatorEngine';
import { soundManager } from './sound';
import {
  History,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Binary,
  Calculator as CalcIcon,
  ArrowRightLeft,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  // State
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [preview, setPreview] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem('calc_memory');
    return saved ? parseFloat(saved) : null;
  });

  const [isScientific, setIsScientific] = useState(false);
  const [angleUnit, setAngleUnit] = useState('deg'); // 'deg' or 'rad'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' or 'converter'
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('calc_history', JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  // Save memory to localStorage
  useEffect(() => {
    try {
      if (memory !== null) {
        localStorage.setItem('calc_memory', memory.toString());
      } else {
        localStorage.removeItem('calc_memory');
      }
    } catch (e) {}
  }, [memory]);

  // Live calculation preview as user types
  useEffect(() => {
    if (!expression) {
      setPreview('');
      return;
    }
    const res = evaluateExpression(expression, angleUnit === 'rad');
    if (res !== 'Error' && res !== expression) {
      setPreview(formatNumberWithCommas(res));
    } else {
      setPreview('');
    }
  }, [expression, angleUnit]);

  const playSound = (type = 'click') => {
    if (soundEnabled) {
      soundManager.play(type);
    }
  };

  // Actions
  const handleInput = useCallback((char) => {
    playSound('click');
    setExpression((prev) => {
      // Prevent multiple trailing operators
      const operators = ['+', '−', '×', '÷', '^'];
      if (operators.includes(char) && operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + char;
      }
      return prev + char;
    });
  }, [soundEnabled]);

  const handleClear = useCallback(() => {
    playSound('clear');
    setExpression('');
    setResult('0');
    setPreview('');
  }, [soundEnabled]);

  const handleDelete = useCallback(() => {
    playSound('click');
    setExpression((prev) => prev.slice(0, -1));
  }, [soundEnabled]);

  const handleCalculate = useCallback(() => {
    if (!expression) return;
    playSound('equals');
    const evaluated = evaluateExpression(expression, angleUnit === 'rad');
    const formatted = formatNumberWithCommas(evaluated);
    
    setResult(formatted);
    setPreview('');

    if (evaluated !== 'Error') {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      setHistory((prev) => [
        {
          expression,
          result: formatted,
          timestamp: timeStr,
        },
        ...prev.slice(0, 49), // Store up to 50 items
      ]);
    }
  }, [expression, angleUnit, soundEnabled]);

  const handleMemory = useCallback((action) => {
    playSound('click');
    const currentVal = parseFloat(result.replace(/,/g, '')) || 0;
    if (action === 'MC') {
      setMemory(null);
    } else if (action === 'MR') {
      if (memory !== null) {
        setExpression((prev) => prev + memory.toString());
      }
    } else if (action === 'M+') {
      setMemory((prev) => (prev === null ? currentVal : prev + currentVal));
    } else if (action === 'M-') {
      setMemory((prev) => (prev === null ? -currentVal : prev - currentVal));
    } else if (action === 'MS') {
      setMemory(currentVal);
    }
  }, [result, memory, soundEnabled]);

  const handleCopy = () => {
    const textToCopy = result !== '0' ? result : expression;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy.replace(/,/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'calculator') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      const key = e.key;
      if (/^[0-9]$/.test(key)) {
        handleInput(key);
      } else if (key === '+') {
        handleInput('+');
      } else if (key === '-') {
        handleInput('−');
      } else if (key === '*') {
        handleInput('×');
      } else if (key === '/') {
        e.preventDefault();
        handleInput('÷');
      } else if (key === '.') {
        handleInput('.');
      } else if (key === '(' || key === ')') {
        handleInput(key);
      } else if (key === '^') {
        handleInput('^');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleInput, handleCalculate, handleDelete, handleClear]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Calculator Container */}
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-5 shadow-2xl relative z-10 flex flex-col gap-4">
        {/* App Bar / Header */}
        <header className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <CalcIcon className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">حاسبة ذكية</h1>
              <p className="text-[10px] text-slate-400">علمية • وحدات • متطورة</p>
            </div>
          </div>

          {/* Top Control Icons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsScientific((prev) => !prev)}
              title={isScientific ? 'الوضع القياسي' : 'الوضع العلمي'}
              className={`p-2 rounded-xl transition border ${
                isScientific
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white'
              }`}
            >
              <Binary size={17} />
            </button>

            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل الصوت'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60"
            >
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>

            <button
              onClick={() => setShowHistory(true)}
              title="سجل العمليات الحسابية"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60 relative"
            >
              <History size={17} />
              {history.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
              )}
            </button>
          </div>
        </header>

        {/* Mode Selector Tabs (Calculator vs Converter) */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalcIcon size={14} />
            <span>الآلة الحاسبة</span>
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'converter'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft size={14} />
            <span>تحويل الوحدات</span>
          </button>
        </div>

        {/* Main Content Area */}
        {activeTab === 'calculator' ? (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Result Display */}
            <Display
              expression={expression}
              result={result}
              preview={preview}
              isScientific={isScientific}
              angleUnit={angleUnit}
              memoryValue={memory}
              copied={copied}
              onCopy={handleCopy}
            />

            {/* Keypad */}
            <Keypad
              onInput={handleInput}
              onClear={handleClear}
              onDelete={handleDelete}
              onCalculate={handleCalculate}
              onMemory={handleMemory}
              isScientific={isScientific}
              angleUnit={angleUnit}
              toggleAngleUnit={() =>
                setAngleUnit((prev) => (prev === 'deg' ? 'rad' : 'deg'))
              }
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <Converter />
          </div>
        )}

        {/* Footer info */}
        <footer className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1.5">
          <span>تدعم لوحة المفاتيح والعمليات المتقدمة</span>
        </footer>
      </div>

      {/* History Drawer Modal */}
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelectHistory={(item) => {
          setExpression(item.expression);
          setResult(item.result);
        }}
        onClearHistory={() => setHistory([])}
      />
    </div>
  );
}