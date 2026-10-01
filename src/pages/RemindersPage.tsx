import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  Pill, 
  FileText, 
  Trash2, 
  Volume2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reminder } from '../types';
import { VoiceSpeakButton } from '../components/common/VoiceSpeakButton';

export const RemindersPage: React.FC = () => {
  const { reminders, toggleReminder, deleteReminder, navigateTo, speakText, t } = useApp();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'all'>('today');

  const filteredReminders = reminders.filter((item) => {
    if (activeTab === 'today') {
      return item.dateLabel.toLowerCase().includes('today');
    }
    if (activeTab === 'upcoming') {
      return !item.dateLabel.toLowerCase().includes('today');
    }
    return true;
  });

  const handleToggle = async (item: Reminder) => {
    await toggleReminder(item.id);
    if (!item.completed) {
      speakText(`Marked ${item.title} as completed! Well done Amma.`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('remindersTitle')}
          </h1>
          <p className="text-lg text-slate-600 font-semibold mt-0.5">
            Keep track of medicines, doctors and bills
          </p>
        </div>

        {/* Big Add Reminder Button */}
        <button
          type="button"
          onClick={() => navigateTo('add-reminder')}
          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xl flex items-center justify-center gap-3 shadow-lifted active:scale-95 transition-all border-2 border-indigo-500 min-h-[56px]"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
          <span>{t('addReminder')}</span>
        </button>
      </div>

      {/* Tabs: Today, Upcoming, All */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-lg transition-all ${
            activeTab === 'today'
              ? 'bg-white text-indigo-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('tabToday')} ({reminders.filter(r => r.dateLabel.toLowerCase().includes('today')).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-lg transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-indigo-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('tabUpcoming')} ({reminders.filter(r => !r.dateLabel.toLowerCase().includes('today')).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-lg transition-all ${
            activeTab === 'all'
              ? 'bg-white text-indigo-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('tabAll')} ({reminders.length})
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-2 border-slate-200 shadow-soft space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl mx-auto">
              ✨
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {t('noRemindersToday')}
            </h3>
            <p className="text-slate-500 font-medium">
              You can tap "Add Reminder" or speak to Sahayak anytime to add one.
            </p>
          </div>
        ) : (
          filteredReminders.map((item) => {
            const isCompleted = item.completed;
            const categoryBg = {
              medicine: 'bg-amber-100 text-amber-800',
              appointment: 'bg-indigo-100 text-indigo-800',
              bill: 'bg-emerald-100 text-emerald-800',
              custom: 'bg-slate-100 text-slate-800',
            }[item.category];

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border-3 transition-all shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'border-emerald-200 bg-emerald-50/30 opacity-85' 
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* Left info & Icon */}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${categoryBg}`}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${categoryBg}`}>
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.dateLabel}
                      </span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-black text-slate-900 leading-tight ${isCompleted ? 'line-through text-slate-500' : ''}`}>
                      {item.title}
                    </h3>

                    <p className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <span>{item.time}</span>
                    </p>

                    {item.dosageOrNotes && (
                      <p className="text-base text-slate-600 font-medium">
                        {item.dosageOrNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions: Mark Taken / Done, Voice playback, Delete */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <VoiceSpeakButton
                    textToSpeak={`${item.title} at ${item.time}, ${item.dateLabel}. ${item.dosageOrNotes || ''}`}
                    label=""
                    size="sm"
                    variant="outline"
                  />

                  <button
                    type="button"
                    onClick={() => handleToggle(item)}
                    className={`py-3 px-5 rounded-2xl font-black text-lg flex items-center gap-2.5 transition-all active:scale-95 shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-2 border-indigo-300'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                        <span>{t('completed')}</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-6 h-6 text-indigo-600" />
                        <span>{item.category === 'medicine' ? t('markTaken') : t('markDone')}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteReminder(item.id)}
                    className="p-3 rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete reminder"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
