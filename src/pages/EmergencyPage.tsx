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
      description: 'You are about to place an urgent call to Emergency Services (112) and alert all registered family members.',
      confirmText: t('confirmEmergencyBtn'),
      cancelText: t('noCancel'),
      isDestructive: true,
      onConfirm: () => {
        closeConfirmation();
        startCallFlow({
          id: 'sos_112',
          name: 'Emergency Services 112',
          relation: 'Police & Ambulance Dispatch',
          relationKey: 'emergency',
          phone: '112',
          avatar: '🚨',
          avatarBg: 'bg-red-100 text-red-700',
          status: 'Priority Direct Line',
          isEmergencyContact: true,
        }, true);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-slate-700 font-bold text-lg hover:text-indigo-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <span className="bg-red-100 text-red-900 font-black text-xs uppercase px-3 py-1 rounded-full border border-red-300">
          Emergency Mode
        </span>
      </div>

      <div className="text-center space-y-2">
        <div className="w-20 h-20 rounded-3xl bg-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg animate-bounce">
          🆘
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {t('emergencyTitle')}
        </h1>
        <p className="text-xl text-slate-600 font-semibold">
          {t('emergencySubtitle')}
        </p>
      </div>

      {/* 3 Clear Assistance Options */}
      <div className="space-y-4 pt-2">
        {/* Option 1: Call Family */}
        <button
          type="button"
          onClick={() => startCallFlow(contacts[0])}
          className="w-full bg-white hover:bg-rose-50 border-3 border-rose-300 rounded-3xl p-6 flex items-center justify-between gap-4 shadow-soft hover:shadow-lifted transition-all active:scale-98 text-left group"
        >
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform">
              👩🏽
            </div>
            <div>
              <span className="bg-rose-100 text-rose-900 font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                {t('callFamilyEmergency')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Call Ananya (Daughter)
              </h3>
              <p className="text-base text-slate-600 font-semibold">
                +91 98450 12345
              </p>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Phone className="w-8 h-8 stroke-[2.5]" />
          </div>
        </button>

        {/* Option 2: Call Caregiver */}
        <button
          type="button"
          onClick={() => startCallFlow(contacts[2])}
          className="w-full bg-white hover:bg-emerald-50 border-3 border-emerald-300 rounded-3xl p-6 flex items-center justify-between gap-4 shadow-soft hover:shadow-lifted transition-all active:scale-98 text-left group"
        >
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform">
              👨🏻‍⚕️
            </div>
            <div>
              <span className="bg-emerald-100 text-emerald-900 font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                {t('callCaregiverEmergency')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Call Suresh (Caregiver)
              </h3>
              <p className="text-base text-slate-600 font-semibold">
                Available 24/7 Nearby
              </p>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Phone className="w-8 h-8 stroke-[2.5]" />
          </div>
        </button>

        {/* Option 3: Call Emergency 112 (Distinct Red with Safeguard) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleCallEmergency112}
            className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white border-4 border-red-400 rounded-3xl p-6 sm:p-7 flex items-center justify-between gap-4 shadow-emergency-glow transition-all active:scale-98 text-left group"
          >
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white text-red-600 flex items-center justify-center text-4xl shrink-0 shadow-md">
                🚨
              </div>
              <div>
                <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full">
                  Urgent
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                  {t('callEmergencyServices')}
                </h3>
                <p className="text-lg text-red-100 font-bold">
                  Police & Ambulance Dispatch
                </p>
              </div>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-slate-100 rounded-2xl p-4 text-center text-sm font-semibold text-slate-600 border border-slate-200">
        🛡️ Emergency buttons will always show a confirmation prompt to prevent accidental calls.
      </div>
    </div>
  );
};
