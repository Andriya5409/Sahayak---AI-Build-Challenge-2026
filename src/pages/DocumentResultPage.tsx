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
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-950 px-4 py-1.5 rounded-full font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{t('foundBill')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan another document</span>
        </button>
      </div>

      {/* Bill Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-lifted space-y-6">
        {/* Title */}
        <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-100 pb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-inner">
            📄
          </div>
          <div>
            <span className="bg-amber-100 text-amber-900 font-extrabold text-xs uppercase px-3 py-1 rounded-full">
              {doc.providerName || 'Electricity Board'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              {doc.title}
            </h1>
          </div>
        </div>

        {/* Big Amount and Due Date Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border-2 border-emerald-200">
            <span className="text-xs sm:text-sm font-black text-emerald-800 uppercase tracking-wider block mb-1">
              {t('totalAmount')}
            </span>
            <p className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              {doc.totalAmount || '₹1,240'}
            </p>
          </div>

          <div className="bg-rose-50/80 p-6 rounded-3xl border-2 border-rose-200">
            <span className="text-xs sm:text-sm font-black text-rose-800 uppercase tracking-wider block mb-1">
              {t('dueDate')}
            </span>
            <p className="text-3xl sm:text-4xl font-black text-rose-950 tracking-tight">
              {doc.dueDate || 'October 5'}
            </p>
          </div>
        </div>

        {/* Simple Plain-English Explanation */}
        <div className="bg-indigo-50/60 p-6 rounded-3xl border-2 border-indigo-100 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-xl">
            <Info className="w-6 h-6 text-indigo-700" />
            <span>{t('simpleExplanation')}</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-relaxed">
            "{doc.simpleExplanation}"
          </p>
        </div>

        {/* Key Points */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">
            Important details detected:
          </h4>
          <ul className="space-y-2">
            {doc.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-base sm:text-lg font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
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
          className="w-full"
        />

        <button
          type="button"
          onClick={handleRemindToPay}
          className="py-4 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-lg flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all border-2 border-amber-600 min-h-[64px]"
        >
          <Bell className="w-6 h-6 stroke-[2.5]" />
          <span>{t('remindToPay')}</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="py-4 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all min-h-[64px]"
        >
          <Check className="w-6 h-6 stroke-[3]" />
          <span>{t('gotIt')}</span>
        </button>
      </div>
    </div>
  );
};
