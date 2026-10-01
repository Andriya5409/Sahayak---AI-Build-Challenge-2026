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
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in bg-sahayak-bg min-h-screen px-4 py-6">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-sahayak-sageLight text-sahayak-sage px-4 py-1.5 rounded-full font-medium text-sm">
          <CheckCircle className="w-5 h-5" />
          <span>{t('medicineIdentified')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-sahayak-textLight hover:text-sahayak-text font-medium text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('retakePhoto')}</span>
        </button>
      </div>

      {/* Main Medicine Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-warm space-y-8">
        {/* Title and Category */}
        <div className="flex items-start gap-4 sm:gap-6 border-b border-slate-50 pb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sahayak-primaryLight text-sahayak-primary flex items-center justify-center shrink-0 shadow-sm">
            <Pill className="w-8 h-8" />
          </div>
          <div>
            <span className="text-sahayak-textMuted font-medium text-xs sm:text-sm px-2 py-1 bg-slate-50 rounded-md">
              {med.category}
            </span>
            <h1 className="text-3xl font-bold text-sahayak-text mt-2">
              {med.name}
            </h1>
            <p className="text-lg text-sahayak-textLight font-normal mt-1">
              {med.genericName}
            </p>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-sahayak-bgWarm">
            <span className="text-sm text-sahayak-textLight block mb-1">
              {t('strength')}
            </span>
            <p className="text-xl font-medium text-sahayak-text">
              {med.strength}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 bg-sahayak-bgWarm">
            <span className="text-sm text-sahayak-textLight block mb-1">
              {t('commonUse')}
            </span>
            <p className="text-xl font-medium text-sahayak-text">
              {med.commonUse}
            </p>
          </div>
        </div>

        {/* How to take instructions */}
        <div className="bg-sahayak-primaryLight p-5 sm:p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-sahayak-primary font-semibold text-lg">
            <Clock className="w-5 h-5" />
            <span>{t('howToTake')}</span>
          </div>
          <p className="text-lg text-sahayak-text leading-relaxed">
            {med.dosageAdvice}
          </p>
          <ul className="space-y-2 pt-3 border-t border-sahayak-primary/10">
            {med.instructions.map((inst, i) => (
              <li key={i} className="flex items-start gap-2.5 text-base text-sahayak-textMuted">
                <div className="w-1.5 h-1.5 rounded-full bg-sahayak-primary mt-2 shrink-0" />
                <span>{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Doctor Disclaimer */}
        <div className="bg-sahayak-roseLight p-5 rounded-2xl flex items-start gap-4 text-sahayak-rose">
          <Info className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-lg">
              {t('disclaimerTitle')}
            </h4>
            <p className="text-base font-normal mt-1">
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
          className="w-full bg-transparent text-sahayak-primary border border-sahayak-primary hover:bg-sahayak-primaryLight rounded-xl py-4 font-semibold text-lg"
        />

        <button
          type="button"
          onClick={handleSetReminder}
          className="py-4 px-6 rounded-xl bg-sahayak-primary hover:opacity-90 active:opacity-80 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-warm transition-all"
        >
          <Bell className="w-5 h-5" />
          <span>{t('setReminder')}</span>
        </button>
      </div>
    </div>
  );
};
