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
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('reminders')}
          className="flex items-center gap-2 text-slate-700 font-bold text-lg hover:text-indigo-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {t('newReminderTitle')}
        </h1>
      </div>

      {/* Voice Assistant Shortcut Button */}
      <button
        type="button"
        onClick={handleSetByVoice}
        className="w-full bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 rounded-3xl p-5 flex items-center justify-between gap-4 transition-all active:scale-98 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            <Mic className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">Fastest Way</span>
            <p className="text-2xl font-black text-indigo-950">
              {t('setByVoice')}
            </p>
            <p className="text-sm text-indigo-800 font-medium">
              Just speak "Remind me at 8 PM to take tablet"
            </p>
          </div>
        </div>
        <span className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hidden sm:inline">
          Speak
        </span>
      </button>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-lifted space-y-6">
        {/* 1. Category Selector */}
        <div className="space-y-3">
          <label className="text-xl font-black text-slate-900 block">
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
                className={`p-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all border-2 text-left ${
                  category === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Reminder Name / Title */}
        <div className="space-y-2">
          <label htmlFor="rem-name" className="text-xl font-black text-slate-900 block">
            {t('reminderNameLabel')}
          </label>
          <input
            id="rem-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={category === 'medicine' ? 'e.g. Paracetamol 500mg' : 'e.g. Dr. Menon clinic'}
            className="w-full text-xl font-bold p-4 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 bg-slate-50"
            required
          />
        </div>

        {/* 3. When / Date */}
        <div className="space-y-2">
          <label className="text-xl font-black text-slate-900 block">
            {t('dateLabel')}
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {['Today', 'Tomorrow', 'Oct 5'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDateLabel(d)}
                className={`py-3.5 px-3 rounded-2xl font-bold text-lg transition-all border-2 ${
                  dateLabel === d
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 4. What Time */}
        <div className="space-y-3">
          <label className="text-xl font-black text-slate-900 block">
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
                  className={`py-3 px-3 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-2 transition-all ${
                    time === tp.time
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-black'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 text-slate-800" />
                  <span>{tp.time}</span>
                </button>
              );
            })}
          </div>

          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Or type custom time (e.g. 8:30 PM)"
            className="w-full text-lg font-bold p-3.5 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 outline-none text-slate-900 bg-slate-50"
          />
        </div>

        {/* 5. Additional Notes */}
        <div className="space-y-2">
          <label htmlFor="rem-notes" className="text-lg font-bold text-slate-700 block">
            Extra notes (optional)
          </label>
          <input
            id="rem-notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Take after dinner with warm water"
            className="w-full text-base font-semibold p-3.5 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 outline-none text-slate-900 bg-slate-50"
          />
        </div>

        {/* Large Submit Button */}
        <button
          type="submit"
          className="w-full py-5 px-6 rounded-3xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-2xl sm:text-3xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all border-4 border-indigo-400 min-h-[68px]"
        >
          <Check className="w-8 h-8 stroke-[3]" />
          <span>{t('saveReminder')}</span>
        </button>
      </form>
    </div>
  );
};
