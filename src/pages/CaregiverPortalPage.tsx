import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Lock, 
  Activity, 
  ArrowLeft,
  BellRing,
  Pill,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CaregiverPortalPage: React.FC = () => {
  const { reminders, navigateTo, user, t } = useApp();

  const takenCount = reminders.filter((r) => r.category === 'medicine' && r.completed).length;
  const totalMedCount = reminders.filter((r) => r.category === 'medicine').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-sahayak-textMuted font-semibold text-lg hover:text-sahayak-text bg-sahayak-bgWarm hover:bg-sahayak-primaryLight px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('backToSahayak')}</span>
        </button>

        <span className="bg-sahayak-sageLight text-sahayak-sage font-semibold text-xs uppercase px-3.5 py-1 rounded-full flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sahayak-sage" />
          <span>{t('caregiverPortalTitle')}</span>
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sahayak-bgWarm shadow-soft space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-sahayak-primaryLight flex items-center justify-center text-3xl">
            👨‍👩‍👧
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-sahayak-text">
              {t('familyCareCircle')}
            </h1>
            <p className="text-sahayak-textMuted text-base font-medium">
              {t('caregiverPortalSub')}
            </p>
          </div>
        </div>
        <p className="text-xs text-sahayak-textLight font-medium flex items-center gap-1.5 pt-2 border-t border-sahayak-bgWarm">
          <Activity className="w-3.5 h-3.5 text-sahayak-primary" />
          <span>{t('caregiverSyncStatus')}</span>
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Medicine Adherence */}
        <div className="bg-white rounded-3xl p-5 border border-sahayak-bgWarm shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase text-sahayak-textLight">{t('medicineAdherence')}</span>
            <Pill className="w-5 h-5 text-sahayak-primary" />
          </div>
          <p className="text-2xl font-semibold text-sahayak-text">
            {takenCount} / {totalMedCount || 1} {t('done')}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 bg-sahayak-primaryLight text-sahayak-primary text-xs font-semibold px-2 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('morningDoseTakenOnTime')}</span>
          </div>
        </div>

        {/* Metric 2: Upcoming Doctor Visit */}
        <div className="bg-white rounded-3xl p-5 border border-sahayak-bgWarm shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase text-sahayak-textLight">{t('doctorVisit')}</span>
            <Calendar className="w-5 h-5 text-sahayak-lavender" />
          </div>
          <p className="text-xl font-semibold text-sahayak-text">
            {t('doctorVisitTimeDummy')}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 bg-sahayak-lavenderLight text-sahayak-lavender text-xs font-semibold px-2 py-1 rounded-lg">
            <span>{t('doctorRadhikaMenon')}</span>
          </div>
        </div>

        {/* Metric 3: Safety & Emergency Status */}
        <div className="bg-white rounded-3xl p-5 border border-sahayak-bgWarm shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase text-sahayak-textLight">{t('sosSafetyStatus')}</span>
            <ShieldCheck className="w-5 h-5 text-sahayak-sage" />
          </div>
          <p className="text-xl font-semibold text-sahayak-sage">
            {t('allSafeAndCalm')}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 bg-sahayak-sageLight text-sahayak-sage text-xs font-semibold px-2 py-1 rounded-lg">
            <span>{t('noEmergencyAlerts')}</span>
          </div>
        </div>
      </div>

      {/* Activity Log (Permitted Info Only) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sahayak-bgWarm shadow-soft space-y-4">
        <h2 className="text-xl font-semibold text-sahayak-text">
          {t('recentCareActivityLog')}
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-sahayak-bgWarm flex items-center justify-between gap-3 border border-transparent hover:border-sahayak-primaryLight transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <p className="font-semibold text-sahayak-text">{t('morningCalciumTaken')}</p>
                <p className="text-xs text-sahayak-textMuted">{t('today915AM')}</p>
              </div>
            </div>
            <span className="bg-sahayak-sageLight text-sahayak-sage text-xs font-semibold px-2.5 py-1 rounded-full">
              {t('completedStatus')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sahayak-bgWarm flex items-center justify-between gap-3 border border-transparent hover:border-sahayak-primaryLight transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎙️</span>
              <div>
                <p className="font-semibold text-sahayak-text">{t('voiceReminderSetEveningMedicine')}</p>
                <p className="text-xs text-sahayak-textMuted">{t('today840AM')}</p>
              </div>
            </div>
            <span className="bg-sahayak-primaryLight text-sahayak-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              {t('scheduledStatus')}
            </span>
          </div>
        </div>
      </div>

      {/* Strict Privacy Shield Guarantee */}
      <div className="bg-sahayak-primaryLight rounded-3xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-sahayak-primary text-white flex items-center justify-center text-2xl shrink-0 shadow-soft">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-lg text-sahayak-primary">
            {t('privacyFirstArchitecture')}
          </h4>
          <p className="text-base font-medium text-sahayak-text">
            {t('privacyNote')}
          </p>
          <p className="text-sm text-sahayak-textMuted font-normal">
            {t('privacyDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};
