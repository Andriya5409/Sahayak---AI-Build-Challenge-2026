import React, { useState } from 'react';
import { 
  Pill, 
  Hospital, 
  FileText, 
  Edit3, 
  Mic, 
  Calendar, 
  Clock, 
  Check, 
  ArrowLeft,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ReminderCategory } from '../types';

export const AddReminderPage: React.FC = () => {
  const { addReminder, navigateTo, setVoiceState, speakText, t } = useApp();

  const [category, setCategory] = useState<ReminderCategory>('medicine');
  const [title, setTitle] = useState('');
  const [dateLabel, setDateLabel] = useState('Today');
  const [time, setTime] = useState('8:00 PM');
  const [notes, setNotes] = useState('');

  const timePresets = [
    { label: 'Morning (8:00 AM)', time: '8:00 AM', icon: Sun },
    { label: 'Afternoon (1:30 PM)', time: '1:30 PM', icon: Sunset },
    { label: 'Night (8:00 PM)', time: '8:00 PM', icon: Moon },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || (
      category === 'medicine' ? 'Take evening medicine' :
      category === 'appointment' ? 'Doctor appointment' :
      category === 'bill' ? 'Pay utility bill' : 'Personal reminder'
    );

    const icons: Record<ReminderCategory, string> = {
      medicine: '💊',
      appointment: '🏥',
      bill: '💳',
      custom: '📝',
    };

    await addReminder({
      title: finalTitle,
      category,
      time,
      dateLabel,
      datetime: new Date().toISOString(),
      dosageOrNotes: notes || (category === 'medicine' ? 'Take with water after meals' : undefined),
      icon: icons[category],
    });

    speakText(`I have saved your reminder for ${finalTitle} at ${time}.`);
    navigateTo('reminders');
  };

  const handleSetByVoice = () => {
    setVoiceState('ready');
    navigateTo('voice');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigateTo('reminders')}
          className="p-2 text-sahayak-text hover:bg-sahayak-bgWarm rounded-full transition-all"
          aria-label={t('back')}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-semibold text-sahayak-text">
          {t('newReminderTitle')}
        </h1>
      </div>

      {/* Voice Assistant Shortcut Button */}
      <button
        type="button"
        onClick={handleSetByVoice}
        className="w-full bg-sahayak-primaryLight hover:bg-sahayak-primaryLight/80 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sahayak-primary text-white flex items-center justify-center shrink-0">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-medium text-sahayak-primary">
              {t('setByVoice')}
            </p>
            <p className="text-sm text-sahayak-primary/80">
              {t('setByVoiceHint')}
            </p>
          </div>
        </div>
      </button>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-sahayak-bgWarm shadow-sm space-y-8">
        {/* 1. Category Selector */}
        <div className="space-y-4">
          <label className="text-lg font-medium text-sahayak-text block">
            {t('reminderType')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'medicine' as ReminderCategory, label: t('typeMedicine'), icon: '💊' },
              { id: 'appointment' as ReminderCategory, label: t('typeDoctor'), icon: '🏥' },
              { id: 'bill' as ReminderCategory, label: t('typeBill'), icon: '📄' },
              { id: 'custom' as ReminderCategory, label: t('typeCustom'), icon: '📝' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  if (!title) {
                    if (cat.id === 'medicine') setTitle('Take Paracetamol 500mg');
                    if (cat.id === 'appointment') setTitle('Doctor appointment');
                    if (cat.id === 'bill') setTitle('Pay electricity bill');
                  }
                }}
                className={`p-3 rounded-xl font-medium flex items-center gap-3 transition-all border text-left ${
                  category === cat.id
                    ? 'bg-sahayak-primary text-white border-sahayak-primary'
                    : 'bg-sahayak-bgWarm text-sahayak-text border-transparent hover:border-sahayak-primary/30'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Reminder Name / Title */}
        <div className="space-y-2">
          <label htmlFor="rem-name" className="text-lg font-medium text-sahayak-text block">
            {t('reminderNameLabel')}
          </label>
          <input
            id="rem-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={category === 'medicine' ? t('medPlaceholder') : t('docPlaceholder')}
            className="w-full text-base p-3.5 rounded-xl border border-sahayak-bgWarm focus:border-sahayak-primary focus:ring-2 focus:ring-sahayak-primary/20 outline-none text-sahayak-text bg-white"
            required
          />
        </div>

        {/* 3. When / Date */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-sahayak-text block">
            {t('dateLabel')}
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {['Today', 'Tomorrow', 'Oct 5'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDateLabel(d)}
                className={`py-3 px-3 rounded-xl font-medium transition-all border ${
                  dateLabel === d
                    ? 'bg-sahayak-primary text-white border-sahayak-primary'
                    : 'bg-sahayak-bgWarm text-sahayak-text border-transparent'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 4. What Time */}
        <div className="space-y-3">
          <label className="text-lg font-medium text-sahayak-text block">
            {t('timeLabel')}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {timePresets.map((tp) => {
              const Icon = tp.icon;
              return (
                <button
                  key={tp.time}
                  type="button"
                  onClick={() => setTime(tp.time)}
                  className={`py-3 px-3 rounded-xl font-medium flex items-center justify-center gap-2 border transition-all ${
                    time === tp.time
                      ? 'bg-sahayak-primary text-white border-sahayak-primary'
                      : 'bg-sahayak-bgWarm text-sahayak-text border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tp.time}</span>
                </button>
              );
            })}
          </div>

          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={t('customTimePlaceholder')}
            className="w-full text-base p-3.5 rounded-xl border border-sahayak-bgWarm focus:border-sahayak-primary focus:ring-2 focus:ring-sahayak-primary/20 outline-none text-sahayak-text bg-white mt-2"
          />
        </div>

        {/* 5. Additional Notes */}
        <div className="space-y-2">
          <label htmlFor="rem-notes" className="text-lg font-medium text-sahayak-text block">
            {t('extraNotesLabel')}
          </label>
          <input
            id="rem-notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('extraNotesPlaceholder')}
            className="w-full text-base p-3.5 rounded-xl border border-sahayak-bgWarm focus:border-sahayak-primary focus:ring-2 focus:ring-sahayak-primary/20 outline-none text-sahayak-text bg-white"
          />
        </div>

        {/* Large Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-xl bg-sahayak-primary hover:opacity-90 active:opacity-100 text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Check className="w-6 h-6" />
          <span>{t('saveReminder')}</span>
        </button>
      </form>
    </div>
  );
};
