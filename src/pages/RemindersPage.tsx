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
  Volume2
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
          <h1 className="text-3xl font-semibold text-sahayak-text tracking-tight">
            {t('yourReminders')}
          </h1>
          <p className="text-lg text-sahayak-textMuted mt-0.5">
            {t('remindersSubtitle')}
          </p>
        </div>

        {/* Add Reminder Button */}
        <button
          type="button"
          onClick={() => navigateTo('add-reminder')}
          className="w-full sm:w-auto py-3 px-6 rounded-xl bg-sahayak-primary hover:opacity-90 active:opacity-100 text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>{t('addReminder')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-sahayak-bgWarm p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-base transition-all ${
            activeTab === 'today'
              ? 'bg-white text-sahayak-text shadow-soft'
              : 'text-sahayak-textLight hover:text-sahayak-textMuted'
          }`}
        >
          {t('tabToday')} ({reminders.filter(r => r.dateLabel.toLowerCase().includes('today')).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-base transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-sahayak-text shadow-soft'
              : 'text-sahayak-textLight hover:text-sahayak-textMuted'
          }`}
        >
          {t('tabUpcoming')} ({reminders.filter(r => !r.dateLabel.toLowerCase().includes('today')).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-base transition-all ${
            activeTab === 'all'
              ? 'bg-white text-sahayak-text shadow-soft'
              : 'text-sahayak-textLight hover:text-sahayak-textMuted'
          }`}
        >
          {t('tabAll')} ({reminders.length})
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4 relative">
        {filteredReminders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-sahayak-bgWarm shadow-soft space-y-3">
            <h3 className="text-xl font-medium text-sahayak-text">
              {t('noRemindersToday')}
            </h3>
            <p className="text-sahayak-textMuted">
              {t('addReminderHint')}
            </p>
          </div>
        ) : (
          <div className="pl-2">
            {filteredReminders.map((item) => {
              const isCompleted = item.completed;

              return (
                <div
                  key={item.id}
                  className={`relative bg-white rounded-2xl p-5 mb-4 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-sahayak-bgWarm transition-all ${
                    isCompleted ? 'opacity-75' : ''
                  }`}
                >
                  {/* Left accent bar */}
                  <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-md ${isCompleted ? 'bg-sahayak-sage' : 'bg-sahayak-primary'}`}></div>

                  {/* Info */}
                  <div className="pl-3 flex-1">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold text-sahayak-text flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-sahayak-textLight" />
                          {item.time}
                        </span>
                        <span className="text-sm text-sahayak-textLight px-2 py-0.5 rounded bg-sahayak-bgWarm">
                          {item.dateLabel}
                        </span>
                        <span className="text-sm text-sahayak-textLight bg-sahayak-bgWarm px-2 py-0.5 rounded capitalize flex items-center gap-1">
                          {item.icon} {item.category}
                        </span>
                      </div>

                      <h3 className={`text-xl font-medium text-sahayak-text ${isCompleted ? 'line-through text-sahayak-textLight' : ''}`}>
                        {item.title}
                      </h3>

                      {item.dosageOrNotes && (
                        <p className="text-sm text-sahayak-textMuted mt-1">
                          {item.dosageOrNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-sahayak-bgWarm">
                    <VoiceSpeakButton
                      textToSpeak={`${item.title} at ${item.time}, ${item.dateLabel}. ${item.dosageOrNotes || ''}`}
                      label=""
                      size="sm"
                      variant="outline"
                    />

                    <button
                      type="button"
                      onClick={() => handleToggle(item)}
                      className={`py-2 px-4 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                        isCompleted
                          ? 'bg-sahayak-sage text-white'
                          : 'bg-white text-sahayak-text border border-sahayak-primary text-sahayak-primary hover:bg-sahayak-primaryLight'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>{t('completed')}</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-5 h-5" />
                          <span>{item.category === 'medicine' ? t('markTaken') : t('markDone')}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteReminder(item.id)}
                      className="p-2 rounded-lg text-sahayak-textLight hover:text-sahayak-red hover:bg-sahayak-redLight transition-colors"
                      title={t('deleteReminder')}
                      aria-label={t('delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
