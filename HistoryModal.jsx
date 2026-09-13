import React from 'react';
import { Trash2, X, Clock, ArrowLeftRight } from 'lucide-react';

export const HistoryModal = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col max-h-[85vh] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Clock size={22} />
            <h2>سجل العمليات الحسابية</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1 pl-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Clock size={44} className="mx-auto mb-3 opacity-40 stroke-1" />
              <p>لا توجد عمليات سابقة حتى الآن</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className="group p-3 bg-slate-800/70 hover:bg-indigo-900/30 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl cursor-pointer transition-all duration-150 text-right"
              >
                <div className="text-xs text-slate-400 font-mono mb-1" dir="ltr">
                  {item.expression} =
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    <ArrowLeftRight size={12} /> استخدام
                  </span>
                  <span className="text-lg font-bold text-white font-mono" dir="ltr">
                    {item.result}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {item.timestamp}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition flex items-center gap-1.5"
            >
              <Trash2 size={15} />
              مسح السجل بالكامل
            </button>
            <span className="text-xs text-slate-500">
              {history.length} عملية مسجلة
            </span>
          </div>
        )}
      </div>
    </div>
  );
};