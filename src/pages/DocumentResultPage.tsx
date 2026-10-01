import React from 'react';
import { 
  FileText, 
  Volume2, 
  Check, 
  Calendar, 
  CreditCard, 
  ArrowLeft, 
  Bell,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceSpeakButton } from '../components/common/VoiceSpeakButton';

export const DocumentResultPage: React.FC = () => {
  const { 
    activeDocumentResult, 
    navigateTo, 
    addReminder, 
    speakText, 
    t 
  } = useApp();

  const doc = activeDocumentResult;

  const audioSummary = `Here is what I found on your bill. The total amount is ${doc.totalAmount || '₹1,240'}, and the due date is ${doc.dueDate || 'October 5'}. ${doc.simpleExplanation}`;

  const handleRemindToPay = async () => {
    await addReminder({
      title: 'Pay electricity bill',
      category: 'bill',
      time: '4:00 PM',
      dateLabel: 'Tomorrow',
      datetime: new Date().toISOString(),
      amount: doc.totalAmount || '₹1,240',
      dosageOrNotes: `Due date ${doc.dueDate || 'Oct 5'} · KSEB Electricity`,
      icon: '💳',
    });
    speakText('Reminder set to pay electricity bill tomorrow at 4 PM.');
    navigateTo('reminders');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in bg-sahayak-bg min-h-screen px-4 py-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-sahayak-sageLight text-sahayak-sage px-4 py-1.5 rounded-full font-medium text-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>{t('documentIdentified')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-sahayak-textLight hover:text-sahayak-text font-medium text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('scanAnotherDoc')}</span>
        </button>
      </div>

      {/* Bill Overview Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-warm space-y-8">
        {/* Title */}
        <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-50 pb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 text-sahayak-textMuted flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="text-sahayak-textMuted font-medium text-xs px-2 py-1 bg-slate-50 rounded-md">
              {doc.providerName || 'Electricity Board'}
            </span>
            <h1 className="text-3xl font-bold text-sahayak-text mt-2">
              {doc.title}
            </h1>
          </div>
        </div>

        {/* Big Amount and Due Date Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-sahayak-sageLight p-6 rounded-2xl">
            <span className="text-sm text-sahayak-sage block mb-1">
              {t('totalAmount')}
            </span>
            <p className="text-4xl font-semibold text-sahayak-text">
              {doc.totalAmount || '₹1,240'}
            </p>
          </div>

          <div className="bg-sahayak-roseLight p-6 rounded-2xl">
            <span className="text-sm text-sahayak-rose block mb-1">
              {t('dueDate')}
            </span>
            <p className="text-3xl font-semibold text-sahayak-text">
              {doc.dueDate || 'October 5'}
            </p>
          </div>
        </div>

        {/* Simple Plain-English Explanation */}
        <div className="bg-sahayak-primaryLight p-6 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-sahayak-primary font-semibold text-lg">
            <Info className="w-5 h-5" />
            <span>{t('simpleExplanation')}</span>
          </div>
          <p className="text-xl text-sahayak-text leading-relaxed">
            {doc.simpleExplanation}
          </p>
        </div>

        {/* Key Points */}
        <div className="p-5 rounded-xl border border-slate-100 bg-sahayak-bgWarm">
          <h4 className="font-medium text-sm text-sahayak-textLight mb-3">
            {t('importantDetails')}
          </h4>
          <ul className="space-y-2">
            {doc.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-base text-sahayak-textMuted">
                <span className="w-1.5 h-1.5 rounded-full bg-sahayak-textLight mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <VoiceSpeakButton
          textToSpeak={audioSummary}
          label={t('hearThis')}
          size="lg"
          variant="secondary"
          className="w-full bg-transparent text-sahayak-primary border border-sahayak-primary hover:bg-sahayak-primaryLight rounded-xl py-4 font-semibold text-lg"
        />

        <button
          type="button"
          onClick={handleRemindToPay}
          className="py-4 px-5 rounded-xl bg-sahayak-primary hover:opacity-90 active:opacity-80 text-white font-semibold text-lg flex items-center justify-center gap-2.5 shadow-warm transition-all"
        >
          <Bell className="w-5 h-5" />
          <span>{t('remindToPay')}</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="py-4 px-5 rounded-xl bg-transparent text-sahayak-text border border-slate-300 hover:bg-slate-50 font-semibold text-lg flex items-center justify-center gap-2.5 transition-all"
        >
          <Check className="w-5 h-5" />
          <span>{t('gotIt')}</span>
        </button>
      </div>
    </div>
  );
};
