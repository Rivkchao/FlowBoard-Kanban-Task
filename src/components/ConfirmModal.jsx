import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, RotateCcw } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Tindakan',
  message = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') onConfirm();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Icon */}
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              isDanger
                ? 'bg-rose-500/15 text-rose-500 ring-4 ring-rose-500/10'
                : 'bg-amber-500/15 text-amber-500 ring-4 ring-amber-500/10'
            }`}
          >
            {isDanger ? (
              <Trash2 className="h-6 w-6" />
            ) : (
              <RotateCcw className="h-6 w-6" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/25'
                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
