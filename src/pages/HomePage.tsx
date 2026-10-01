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

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* 1. Header with personalized greeting and avatar */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lifted relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 -mb-6 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              {user.avatar}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-indigo-100 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Sahayak Companion Active</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {t('greeting')}
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100 font-medium mt-1">
                {t('greetingSub')}
              </p>
            </div>
          </div>

          {/* Voice Greeting Action */}
          <button
            type="button"
            onClick={() => speakText(proactiveGreetingSummary)}
            className="w-full sm:w-auto bg-white hover:bg-amber-50 text-indigo-950 font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all text-base sm:text-lg border-2 border-amber-200"
            title="Listen to your morning overview out loud"
          >
            <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500" />
            <span>Hear Daily Overview</span>
          </button>
        </div>
      </section>

      {/* 2. Today's Overview Cards */}
      <section aria-labelledby="overview-heading" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 id="overview-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('overviewTitle')}
          </h2>
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card A: Next Medicine */}
          <div 
            onClick={() => navigateTo('reminders')}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-indigo-300 shadow-soft hover:shadow-lifted cursor-pointer transition-all active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl">
                💊
              </div>
              <span className="bg-amber-100 text-amber-900 font-bold text-xs uppercase px-2.5 py-1 rounded-full">
                {t('nextMedicine')}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {nextMedicine ? nextMedicine.time : '8:00 PM'}
              </p>
              <p className="text-base text-slate-600 font-medium truncate mt-0.5">
                {nextMedicine ? nextMedicine.title : 'Take evening medicine'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-indigo-700 font-bold text-sm">
              <span>View details</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card B: Doctor Appointment */}
          <div 
            onClick={() => navigateTo('reminders')}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-indigo-300 shadow-soft hover:shadow-lifted cursor-pointer transition-all active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl">
                🏥
              </div>
              <span className="bg-indigo-100 text-indigo-900 font-bold text-xs uppercase px-2.5 py-1 rounded-full">
                {t('doctorAppt')}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                Tomorrow · 10:30 AM
              </p>
              <p className="text-base text-slate-600 font-medium truncate mt-0.5">
                Dr. Radhika Menon
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-indigo-700 font-bold text-sm">
              <span>City Care Clinic</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card C: Weather */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-soft flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl">
                {mockWeather.icon}
              </div>
              <span className="bg-sky-100 text-sky-900 font-bold text-xs uppercase px-2.5 py-1 rounded-full">
                {t('weather')}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {mockWeather.temperature}
              </p>
              <p className="text-base text-slate-600 font-medium mt-0.5">
                {mockWeather.condition}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              Kochi, Kerala
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIMARY ACTION: Large Prominent TALK TO SAHAYAK Button */}
      <section className="pt-2">
        <button
          type="button"
          onClick={() => navigateTo('voice')}
          className="w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white p-6 sm:p-8 rounded-3xl shadow-lifted hover:shadow-2xl flex items-center justify-between gap-4 transition-all duration-200 active:scale-98 group border-4 border-indigo-400/40 relative overflow-hidden"
          aria-label={t('talkToSahayak')}
        >
          {/* Animated background glow */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />

          <div className="flex items-center gap-5 sm:gap-6 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white text-indigo-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
              <Mic className="w-11 h-11 sm:w-14 sm:h-14 stroke-[2.5] animate-pulse" />
            </div>
            <div className="text-left">
              <span className="inline-block bg-amber-400 text-indigo-950 font-black text-xs sm:text-sm px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                Primary Action
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
                {t('talkToSahayak')}
              </h2>
              <p className="text-lg sm:text-2xl text-indigo-100 font-semibold mt-1">
                {t('talkSub')}
              </p>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-2 transition-transform hidden sm:flex">
            <ArrowRight className="w-8 h-8 stroke-[3]" />
          </div>
        </button>
      </section>

      {/* 4. SECONDARY ACTIONS: Show Something, My Reminders, Family */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 px-1">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Action 1: Show Something */}
          <button
            type="button"
            onClick={() => navigateTo('camera')}
            className="bg-white hover:bg-indigo-50/50 rounded-3xl p-6 border-3 border-slate-200 hover:border-indigo-400 shadow-soft hover:shadow-md text-left transition-all active:scale-98 flex flex-col justify-between min-h-[160px] group"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-9 h-9 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {t('showSomething')}
              </h3>
              <p className="text-base text-slate-600 font-medium mt-0.5">
                {t('showSub')}
              </p>
            </div>
          </button>

          {/* Action 2: My Reminders */}
          <button
            type="button"
            onClick={() => navigateTo('reminders')}
            className="bg-white hover:bg-indigo-50/50 rounded-3xl p-6 border-3 border-slate-200 hover:border-indigo-400 shadow-soft hover:shadow-md text-left transition-all active:scale-98 flex flex-col justify-between min-h-[160px] group"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-9 h-9 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {t('myReminders')}
              </h3>
              <p className="text-base text-slate-600 font-medium mt-0.5">
                {t('remindersSub')}
              </p>
            </div>
          </button>

          {/* Action 3: Family */}
          <button
            type="button"
            onClick={() => navigateTo('family')}
            className="bg-white hover:bg-indigo-50/50 rounded-3xl p-6 border-3 border-slate-200 hover:border-indigo-400 shadow-soft hover:shadow-md text-left transition-all active:scale-98 flex flex-col justify-between min-h-[160px] group"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-9 h-9 stroke-[2.5] fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {t('familyContacts')}
              </h3>
              <p className="text-base text-slate-600 font-medium mt-0.5">
                {t('familySub')}
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Bottom Status: Sahayak is ready */}
      <footer className="pt-2">
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center justify-center gap-3 text-emerald-900 font-bold text-lg sm:text-xl shadow-xs">
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-200" />
          <span>{t('readyStatus')}</span>
        </div>
      </footer>
    </div>
  );
};
