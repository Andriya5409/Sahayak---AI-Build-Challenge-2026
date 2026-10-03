import React from 'react';
import { Sparkles, Play, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GuidedDemoBanner: React.FC = () => {
  const { currentScreen, navigateTo, isDemoActive, setIsDemoActive, t } = useApp();

  const demoSteps = [
    { id: 'home', label: t('navHome'), screen: 'home' },
    { id: 'voice', label: t('navTalk'), screen: 'voice' },
    { id: 'reminders', label: t('navReminders'), screen: 'reminders' },
    { id: 'camera', label: t('navShow'), screen: 'camera' },
    { id: 'medicine', label: t('modeMedicine'), screen: 'vision-medicine' },
    { id: 'document', label: t('modeDocument'), screen: 'vision-document' },
    { id: 'lookaround', label: t('modeLookAround'), screen: 'look-around' },
    { id: 'family', label: t('navFamily'), screen: 'family' },
    { id: 'caregiver', label: t('navCaregiver'), screen: 'caregiver' },
    { id: 'emergency', label: t('emergencyTitle'), screen: 'emergency' },
  ];

  if (!isDemoActive) {
    return (
      <aside aria-label="Guided tour banner" className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white px-4 py-2 text-sm shadow-md flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold">{t('appTourMode')}</span>
          <span className="text-indigo-200 hidden sm:inline">{t('exploreFeatures')}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsDemoActive(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-transform active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-slate-900" />
          <span>{t('startTour')}</span>
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Interactive Tour Navigator" className="bg-slate-900 text-white border-b-2 border-indigo-500 shadow-xl px-4 py-2.5 z-40 sticky top-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            {t('guidedTour')}
          </span>
        </div>

        {/* Quick Stepper Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full text-xs">
          {demoSteps.map((step) => {
            const isCurrent = currentScreen === step.screen;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => navigateTo(step.screen as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                {step.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsDemoActive(false)}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 ml-auto"
        >
          ✕ {t('close')}
        </button>
      </div>
    </aside>
  );
};
