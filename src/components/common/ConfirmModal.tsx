import React from 'react';
import { Phone, AlertTriangle, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConfirmModal: React.FC = () => {
  const { confirmModal } = useApp();

  if (!confirmModal || !confirmModal.isOpen) return null;

  const { title, description, confirmText, cancelText, isDestructive, onConfirm, onCancel } = confirmModal;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sahayak-text/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-warm border border-sahayak-bgWarm transform transition-all animate-scale-up">
        {/* Header / Icon */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
            isDestructive ? 'bg-sahayak-redLight text-sahayak-red' : 'bg-sahayak-primaryLight text-sahayak-primary'
          }`}>
            {isDestructive ? (
              <AlertTriangle className="w-10 h-10" />
            ) : (
              <Phone className="w-9 h-9" />
            )}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-sahayak-text leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Description text */}
        <p className="text-lg text-sahayak-textMuted mb-8 bg-sahayak-bgWarm p-4 rounded-xl border border-sahayak-bgWarm">
          {description}
        </p>

        {/* Large Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-5 px-6 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3 shadow-soft active:scale-98 transition-all ${
              isDestructive
                ? 'bg-sahayak-red hover:opacity-90 text-white'
                : 'bg-sahayak-primary hover:opacity-90 text-white'
            }`}
            autoFocus
          >
            <Check className="w-7 h-7 stroke-[2.5]" />
            {confirmText}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-4 px-6 rounded-2xl text-lg font-semibold text-sahayak-textMuted bg-sahayak-bgWarm hover:bg-sahayak-primaryLight border-2 border-transparent flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <X className="w-6 h-6" />
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
