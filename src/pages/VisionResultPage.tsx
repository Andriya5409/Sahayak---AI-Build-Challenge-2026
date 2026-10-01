import React from 'react';
import { 
  Pill, 
  Volume2, 
  Bell, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Info,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceSpeakButton } from '../components/common/VoiceSpeakButton';

export const VisionResultPage: React.FC = () => {
  const { 
    activeMedicineResult, 
    navigateTo, 
    addReminder, 
    speakText, 
    t 
  } = useApp();

  const med = activeMedicineResult;

  const audioSummary = `I found your medicine: ${med.name}. It is commonly used for ${med.commonUse}. The strength is ${med.strength}. Suggested dosage is: take 1 tablet after meals with water. Please always confirm with your doctor or pharmacist.`;

  const handleSetReminder = async () => {
    await addReminder({
      title: `Take ${med.name}`,
      category: 'medicine',
      time: med.suggestedReminderTime || '8:00 PM',
      dateLabel: 'Today',
      datetime: new Date().toISOString(),
      dosageOrNotes: `${med.strength} · After food with water`,
      icon: '💊',
    });
    speakText(`Reminder added for ${med.name} at 8:00 PM.`);
    navigateTo('reminders');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-950 px-4 py-1.5 rounded-full font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{t('foundSomething')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retake photo</span>
        </button>
      </div>

      {/* Main Medicine Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-lifted space-y-6">
        {/* Title and Category */}
        <div className="flex items-start gap-4 sm:gap-6 border-b border-slate-100 pb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-inner">
            💊
          </div>
          <div>
            <span className="bg-indigo-50 text-indigo-800 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-full uppercase tracking-wider">
              {med.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-1">
              {med.name}
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 font-semibold mt-0.5">
              {med.genericName}
            </p>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">
              {t('strength')}
            </span>
            <p className="text-2xl font-black text-slate-900">
              {med.strength}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">
              {t('commonUse')}
            </span>
            <p className="text-lg font-bold text-slate-800 leading-snug">
              {med.commonUse}
            </p>
          </div>
        </div>

        {/* How to take instructions */}
        <div className="bg-indigo-50/60 p-5 sm:p-6 rounded-2xl border-2 border-indigo-100 space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-xl">
            <Clock className="w-6 h-6 text-indigo-700" />
            <span>{t('howToTake')}</span>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-relaxed">
            {med.dosageAdvice}
          </p>
          <ul className="space-y-2 pt-2 border-t border-indigo-200/60">
            {med.instructions.map((inst, i) => (
              <li key={i} className="flex items-center gap-2.5 text-base sm:text-lg font-semibold text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Doctor Disclaimer */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex items-start gap-4 text-amber-950">
          <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-lg sm:text-xl text-amber-900">
              {t('disclaimerTitle')}
            </h4>
            <p className="text-base sm:text-lg font-semibold text-amber-900 mt-1">
              {t('disclaimerText')}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Hear this & Set reminder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <VoiceSpeakButton
          textToSpeak={audioSummary}
          label={t('hearThis')}
          size="lg"
          variant="secondary"
          className="w-full"
        />

        <button
          type="button"
          onClick={handleSetReminder}
          className="py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all border-2 border-amber-600 min-h-[64px]"
        >
          <Bell className="w-7 h-7 stroke-[2.5]" />
          <span>{t('setReminder')}</span>
        </button>
      </div>
    </div>
  );
};
