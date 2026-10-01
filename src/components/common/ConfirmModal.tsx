import React from 'react';
import { Phone, AlertTriangle, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConfirmModal: React.FC = () => {
  const { confirmModal } = useApp();

  if (!confirmModal || !confirmModal.isOpen) return null;

  const { title, description, confirmText, cancelText, isDestructive, onConfirm, onCancel } = confirmModal;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-indigo-100 transform transition-all animate-scale-up">
        {/* Header / Icon */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
            isDestructive ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-700'
          }`}>
            {isDestructive ? (
              <AlertTriangle className="w-10 h-10 animate-bounce" />
            ) : (
              <Phone className="w-9 h-9" />
            )}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Description text */}
        <p className="text-xl text-slate-600 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          {description}
        </p>

        {/* Large Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-5 px-6 rounded-2xl text-2xl font-black flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
            autoFocus
          >
            <Check className="w-8 h-8 stroke-[3]" />
            {confirmText}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-4 px-6 rounded-2xl text-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <X className="w-6 h-6" />
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
