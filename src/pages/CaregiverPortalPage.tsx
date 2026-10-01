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
          className="flex items-center gap-2 text-slate-700 font-bold text-lg hover:text-indigo-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Sahayak</span>
        </button>

        <span className="bg-emerald-100 text-emerald-950 font-black text-xs uppercase px-3.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Caregiver Portal</span>
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-lifted space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
            👨‍👩‍👧
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {t('caregiverPortalTitle')}
            </h1>
            <p className="text-emerald-100 text-base font-semibold">
              {t('caregiverPortalSub')}
            </p>
          </div>
        </div>
        <p className="text-xs text-emerald-200 font-medium flex items-center gap-1.5 pt-2 border-t border-white/20">
          <Activity className="w-3.5 h-3.5 text-emerald-300" />
          <span>{t('caregiverSyncStatus')}</span>
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Medicine Adherence */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-black uppercase text-slate-500">Medicine Adherence</span>
            <Pill className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">
            {takenCount} / {totalMedCount || 1} Done
          </p>
          <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Morning dose taken on time</span>
          </p>
        </div>

        {/* Metric 2: Upcoming Doctor Visit */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-black uppercase text-slate-500">Doctor Visit</span>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            Tomorrow 10:30 AM
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Dr. Radhika Menon (Cardiology)
          </p>
        </div>

        {/* Metric 3: Safety & Emergency Status */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-soft">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-black uppercase text-slate-500">SOS Safety Status</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-900">
            All Safe & Calm
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">
            No emergency alerts triggered
          </p>
        </div>
      </div>

      {/* Activity Log (Permitted Info Only) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">
          Recent Care Activity Log
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <p className="font-bold text-slate-900">Morning Calcium tablet marked taken</p>
                <p className="text-xs text-slate-500">Today · 9:15 AM</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
              Completed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎙️</span>
              <div>
                <p className="font-bold text-slate-900">Voice reminder set for evening medicine (8 PM)</p>
                <p className="text-xs text-slate-500">Today · 8:40 AM</p>
              </div>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">
              Scheduled
            </span>
          </div>
        </div>
      </div>

      {/* Strict Privacy Shield Guarantee */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-lg text-indigo-950">
            Privacy First Architecture
          </h4>
          <p className="text-base font-semibold text-indigo-900">
            {t('privacyNote')}
          </p>
          <p className="text-sm text-indigo-800 font-normal">
            Only health adherence, schedule reminders, and emergency pings are shared with trusted family members.
          </p>
        </div>
      </div>
    </div>
  );
};
