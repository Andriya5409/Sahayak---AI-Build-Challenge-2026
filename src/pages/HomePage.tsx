import React from 'react';
import { 
  Mic, 
  Camera, 
  Bell, 
  Heart, 
  Calendar, 
  Pill, 
  Sun, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockWeather } from '../mock/data';
import { VoiceSpeakButton } from '../components/common/VoiceSpeakButton';

export const HomePage: React.FC = () => {
  const { navigateTo, user, reminders, t, speakText } = useApp();

  // Find next pending medicine and appointment
  const nextMedicine = reminders.find((r) => r.category === 'medicine' && !r.completed);
  const nextAppointment = reminders.find((r) => r.category === 'appointment' && !r.completed);

  const proactiveGreetingSummary = `${user.salutation}, you have medicine scheduled for ${nextMedicine ? nextMedicine.time : '8:00 PM'}, and the weather in Kochi is pleasant at 28 degrees. I am ready to help you.`;

  // Safely remove emoji from greeting (except heart)
  const formatGreeting = (text: string) => {
    return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}❤❤️]/gu, '');
  };

  return (
    <div className="space-y-10 pb-24 max-w-4xl mx-auto px-4 sm:px-6 bg-sahayak-bg min-h-screen">
      {/* 1. Greeting section */}
      <section className="pt-8 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-sahayak-text leading-tight">
              {formatGreeting(t('greeting'))}
            </h1>
            <p className="text-xl text-sahayak-textMuted font-normal mt-2">
              {t('hereWheneverYouNeedMe')}
            </p>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {user.avatar}
          </div>
        </div>
        <button
          type="button"
          onClick={() => speakText(proactiveGreetingSummary)}
          className="self-start bg-sahayak-primaryLight text-sahayak-primary font-medium px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-colors hover:bg-opacity-80"
          title={t('hearDailyOverviewTitle')}
        >
          <Mic className="w-5 h-5" />
          <span>{t('hearDailyOverview')}</span>
        </button>
      </section>

      {/* 2. Today section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-sahayak-text">{t('today')}</h2>
          <span className="text-sm font-medium text-sahayak-textMuted bg-sahayak-bgWarm px-3 py-1 rounded-full border border-gray-100">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Medicine */}
          <div 
            onClick={() => navigateTo('reminders')}
            className="bg-white rounded-2xl p-4 border border-gray-100 border-l-4 border-l-sahayak-primary shadow-soft cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-sahayak-primary shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-sahayak-text">
                  {nextMedicine ? nextMedicine.time : '8:00 PM'}
                </p>
                <p className="text-sm text-sahayak-textMuted">
                  {nextMedicine ? nextMedicine.title : t('takeEveningMedicine')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </div>

          {/* Doctor */}
          <div 
            onClick={() => navigateTo('reminders')}
            className="bg-white rounded-2xl p-4 border border-gray-100 border-l-4 border-l-sahayak-primary shadow-soft cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-sahayak-primary shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-sahayak-text">
                  {t('tomorrow1030AM')}
                </p>
                <p className="text-sm text-sahayak-textMuted">
                  {t('drRadhikaMenon')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </div>
        </div>
      </section>

      {/* 3. Voice button */}
      <section className="py-8 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-sahayak-primary opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <button
            type="button"
            onClick={() => navigateTo('voice')}
            className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-sahayak-primary text-white flex items-center justify-center shadow-warm hover:scale-105 transition-transform"
            aria-label={t('talkToSahayak')}
          >
            <Mic className="w-12 h-12 sm:w-16 sm:h-16" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-sahayak-text text-center">
          {t('talkToSahayakText')}
        </h2>
        <p className="text-base text-sahayak-textMuted text-center mt-1">
          {t('tapToSpeak')}
        </p>
      </section>

      {/* 4. Quick actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sahayak-text">
          {t('whatWouldYouLikeToDo')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => navigateTo('camera')}
            className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-sahayak-primary/50 shadow-soft text-left transition-colors flex items-center sm:flex-col sm:items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-sahayak-primary shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sahayak-text">
                {t('showSomething')}
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('reminders')}
            className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-sahayak-primary/50 shadow-soft text-left transition-colors flex items-center sm:flex-col sm:items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-sahayak-primary shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sahayak-text">
                {t('myReminders')}
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('family')}
            className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-sahayak-primary/50 shadow-soft text-left transition-colors flex items-center sm:flex-col sm:items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-sahayak-primary shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sahayak-text">
                {t('familyContacts')}
              </h3>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Status footer */}
      <footer className="pt-6">
        <div className="bg-sahayak-sageLight border border-gray-100 rounded-2xl p-4 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sahayak-sage" />
          <span className="text-sahayak-textMuted text-sm font-medium">{t('sahayakIsReady')}</span>
        </div>
      </footer>
    </div>
  );
};
