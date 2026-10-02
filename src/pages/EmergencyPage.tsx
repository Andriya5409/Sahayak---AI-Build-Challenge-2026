import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  Heart, 
  ShieldAlert, 
  UserCheck, 
  Ambulance, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyPage: React.FC = () => {
  const { 
    contacts, 
    startCallFlow, 
    showConfirmation, 
    closeConfirmation,
    navigateTo, 
    speakText, 
    t 
  } = useApp();

  const handleCallEmergency112 = () => {
    showConfirmation({
      title: t('emergencyConfirmTitle'),
      description: 'You are about to call emergency services. This will open your phone dialer.',
      confirmText: t('confirmEmergencyBtn'),
      cancelText: t('noCancel'),
      isDestructive: true,
      onConfirm: () => {
        closeConfirmation();
        window.location.href = 'tel:112';
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-sahayak-text">
          {t('needHelpTitle')}
        </h1>
        <p className="text-lg text-sahayak-textMuted">
          {t('needHelpSubtitle')}
        </p>
      </div>

      {/* 3 Clear Assistance Options */}
      <div className="space-y-4 pt-4">
        {/* Option 1: Call Family */}
        <button
          type="button"
          onClick={() => startCallFlow(contacts[0])}
          className="w-full bg-white border border-sahayak-rose/30 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-soft transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-sahayak-roseLight text-sahayak-rose flex items-center justify-center text-2xl shrink-0">
              👩🏽
            </div>
            <div>
              <span className="text-sahayak-rose font-medium text-xs uppercase tracking-wider">
                {t('callFamilyEmergency')}
              </span>
              <h3 className="text-xl font-semibold text-sahayak-text mt-0.5">
                {t('callAnanyaDaughter')}
              </h3>
              <p className="text-sm text-sahayak-textMuted mt-0.5">
                +91 98450 12345
              </p>
            </div>
          </div>
          <div className="text-sahayak-rose">
            <Phone className="w-6 h-6" />
          </div>
        </button>

        {/* Option 2: Call Caregiver */}
        <button
          type="button"
          onClick={() => startCallFlow(contacts[2])}
          className="w-full bg-white border border-sahayak-sage/30 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-soft transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-sahayak-sageLight text-sahayak-sage flex items-center justify-center text-2xl shrink-0">
              👨🏻‍⚕️
            </div>
            <div>
              <span className="text-sahayak-sage font-medium text-xs uppercase tracking-wider">
                {t('callCaregiverEmergency')}
              </span>
              <h3 className="text-xl font-semibold text-sahayak-text mt-0.5">
                {t('callSureshCaregiver')}
              </h3>
              <p className="text-sm text-sahayak-textMuted mt-0.5">
                {t('available247')}
              </p>
            </div>
          </div>
          <div className="text-sahayak-sage">
            <Phone className="w-6 h-6" />
          </div>
        </button>

        {/* Option 3: Call Emergency 112 (Restrained Red) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleCallEmergency112}
            className="w-full bg-sahayak-red text-white rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm hover:opacity-90 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center text-2xl shrink-0">
                🚨
              </div>
              <div>
                <span className="text-white/80 font-medium text-xs uppercase tracking-wider">
                  {t('urgent')}
                </span>
                <h3 className="text-2xl font-semibold text-white mt-0.5">
                  {t('callEmergencyServices')}
                </h3>
                <p className="text-sm text-white/90 mt-0.5">
                  {t('policeAmbulanceDispatch')}
                </p>
              </div>
            </div>
            <div className="text-white">
              <AlertTriangle className="w-8 h-8" />
            </div>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-sahayak-textLight pt-4">
        {t('emergencyPromptInfo')}
      </div>
    </div>
  );
};
