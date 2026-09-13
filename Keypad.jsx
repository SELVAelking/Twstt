import React from 'react';
import { Delete, Divide, X as Multiply, Minus, Plus, Equal, RotateCcw } from 'lucide-react';

export const Keypad = ({
  onInput,
  onClear,
  onDelete,
  onCalculate,
  onMemory,
  isScientific,
  angleUnit,
  toggleAngleUnit,
}) => {
  // Standard keypad configuration
  const standardKeys = [
    { label: 'C', action: onClear, className: 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-rose-500/30' },
    { label: <Delete size={18} />, action: onDelete, className: 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' },
    { label: '%', action: () => onInput('%'), className: 'bg-slate-800 text-indigo-400 hover:bg-slate-700 border-slate-700 font-bold' },
    { label: <Divide size={18} />, action: () => onInput('÷'), className: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40 border-indigo-500/40' },

    { label: '7', action: () => onInput('7'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '8', action: () => onInput('8'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '9', action: () => onInput('9'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: <Multiply size={18} />, action: () => onInput('×'), className: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40 border-indigo-500/40' },

    { label: '4', action: () => onInput('4'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '5', action: () => onInput('5'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '6', action: () => onInput('6'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: <Minus size={18} />, action: () => onInput('−'), className: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40 border-indigo-500/40' },

    { label: '1', action: () => onInput('1'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '2', action: () => onInput('2'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '3', action: () => onInput('3'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: <Plus size={18} />, action: () => onInput('+'), className: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40 border-indigo-500/40' },

    { label: '0', action: () => onInput('0'), className: 'col-span-2 bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-lg font-semibold' },
    { label: '.', action: () => onInput('.'), className: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border-slate-700/60 text-xl font-bold' },
    { label: <Equal size={20} />, action: onCalculate, className: 'bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-400 font-bold shadow-lg shadow-indigo-600/40' },
  ];

  // Scientific extra keys
  const scientificKeys = [
    { label: angleUnit.toUpperCase(), action: toggleAngleUnit, className: 'text-xs text-indigo-400 font-bold bg-slate-800/50 hover:bg-slate-700' },
    { label: 'sin', action: () => onInput('sin('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'cos', action: () => onInput('cos('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'tan', action: () => onInput('tan('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    
    { label: 'π', action: () => onInput('π'), className: 'text-sm font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'ln', action: () => onInput('ln('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'log', action: () => onInput('log('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'x²', action: () => onInput('^2'), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    
    { label: 'e', action: () => onInput('e'), className: 'text-sm font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: '√', action: () => onInput('sqrt('), className: 'text-sm font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'xʸ', action: () => onInput('^'), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: 'n!', action: () => onInput('!'), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    
    { label: '(', action: () => onInput('('), className: 'text-sm font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: ')', action: () => onInput(')'), className: 'text-sm font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: '|x|', action: () => onInput('abs('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
    { label: '1/x', action: () => onInput('1/('), className: 'text-xs font-mono bg-slate-800/50 hover:bg-slate-700 text-slate-300' },
  ];

  return (
    <div className="space-y-2 select-none">
      {/* Memory Row */}
      <div className="grid grid-cols-5 gap-1.5 py-1 text-xs font-mono text-slate-400">
        <button
          onClick={() => onMemory('MC')}
          className="py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 hover:text-white transition"
        >
          MC
        </button>
        <button
          onClick={() => onMemory('MR')}
          className="py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 hover:text-white transition"
        >
          MR
        </button>
        <button
          onClick={() => onMemory('M+')}
          className="py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 hover:text-white transition"
        >
          M+
        </button>
        <button
          onClick={() => onMemory('M-')}
          className="py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 hover:text-white transition"
        >
          M-
        </button>
        <button
          onClick={() => onMemory('MS')}
          className="py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 hover:text-white transition"
        >
          MS
        </button>
      </div>

      {/* Scientific Keys Grid */}
      {isScientific && (
        <div className="grid grid-cols-4 gap-1.5 pt-1 animate-fade-in">
          {scientificKeys.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`h-11 rounded-xl flex items-center justify-center border border-slate-700/40 btn-press transition-all ${
                item.className
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Standard Keys Grid */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {standardKeys.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className={`h-14 rounded-2xl flex items-center justify-center border font-sans btn-press transition-all ${
              item.className
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};