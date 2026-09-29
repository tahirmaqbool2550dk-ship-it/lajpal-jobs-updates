import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none no-print"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-500/40 bg-white dark:bg-slate-900',
          error: 'border-rose-500/40 bg-white dark:bg-slate-900',
          warning: 'border-amber-500/40 bg-white dark:bg-slate-900',
          info: 'border-sky-500/40 bg-white dark:bg-slate-900',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-xl border ${borders[toast.type]} transition-all animate-in slide-in-from-right-4 duration-200`}
            role="alert"
          >
            {icons[toast.type]}
            <div className="flex-1 text-sm">
              {toast.title && (
                <h4 className="font-semibold text-slate-900 dark:text-white leading-tight">
                  {toast.title}
                </h4>
              )}
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
