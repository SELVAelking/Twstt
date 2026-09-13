import React from 'react';
import { Copy, Check } from 'lucide-react';

export const Display = ({
  expression,
  result,
  preview,
  isScientific,
  angleUnit,
  memoryValue,
  copied,
  onCopy,
}) => {
  return (
    <div className="relative w-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-inner border border-slate-700/50 flex flex-col justify-between min-h-[145px] transition-all">
      {/* Top Bar Indicators (DEG/RAD, Memory, Copy) */}
      <div className="flex items-center justify-between text-xs text-slate-400 select-none pb-2 border-b border-slate-800/60">
        <div className="flex items-center space-x-2 space-x-reverse">
          {isScientific && (
            <span className="px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[11px]">
              {angleUnit.toUpperCase()}
            </span>
          )}
          {memoryValue !== null && memoryValue !== 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px]">
              M: {memoryValue}
            </span>
          )}
        </div>

        <button
          onClick={onCopy}
          title="نسخ النتيجة"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 text-xs"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">تم النسخ</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>نسخ</span>
            </>
          )}
        </button>
      </div>

      {/* Expression Area (Math string) */}
      <div
        dir="ltr"
        className="overflow-x-auto overflow-y-hidden text-right whitespace-nowrap text-slate-400 font-mono text-base tracking-wide py-2 select-text scrollbar-thin"
      >
        {expression || <span className="opacity-30">0</span>}
      </div>

      {/* Main Result Area */}
      <div className="flex items-baseline justify-between mt-1" dir="ltr">
        {preview && preview !== result && preview !== 'Error' ? (
          <span className="text-sm text-slate-500 font-mono pl-1">
            ≈ {preview}
          </span>
        ) : (
          <span />
        )}

        <div className="text-right text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight select-all truncate max-w-full">
          {result || '0'}
        </div>
      </div>
    </div>
  );
};