import React from 'react';
import { 
  Heart, 
  Globe, 
  AlertCircle, 
  Settings, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Users,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    goBack, 
    user, 
    setLanguage, 
    isSpeaking, 
    stopSpeaking,
    t 
  } = useApp();

  const isHomeScreen = currentScreen === 'home';

  const toggleLanguage = () => {
    const nextLang = user.language === 'en' ? 'ml' : 'en';
    setLanguage(nextLang);
  };

  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-3">
          {!isHomeScreen ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-lg transition-all active:scale-95 border border-slate-300"
              aria-label="Go back to previous screen"
            >
              <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
              <span className="hidden xs:inline">{t('back')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Heart className="w-7 h-7 fill-amber-300 text-amber-300 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block leading-none">
                  {t('appTitle')}
                </span>
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  AI Companion
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Right Action Icons: Language switch, Audio indicator, Caregiver Portal, Emergency SOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Speaking Indicator */}
          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-indigo-300 animate-pulse"
              title="Stop voice playback"
            >
              <VolumeX className="w-5 h-5 text-indigo-700" />
              <span className="hidden md:inline">Mute Voice</span>
            </button>
          )}

          {/* Single-tap Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-900 border-2 border-slate-300 px-3 py-2 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 shadow-xs"
            title="Change language to English or Malayalam"
          >
            <Globe className="w-5 h-5 text-indigo-600" />
            <span>{user.language === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>

          {/* Caregiver Portal Switch */}
          <button
            type="button"
            onClick={() => navigateTo('caregiver')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm border-2 transition-all ${
              currentScreen === 'caregiver'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
            title="Switch to Family Caregiver Portal View"
          >
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Caregiver</span>
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={() => navigateTo('settings')}
            className={`p-2.5 rounded-xl border-2 transition-all ${
              currentScreen === 'settings'
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            aria-label="Settings and Accessibility"
            title="Accessibility settings"
          >
            <Settings className="w-6 h-6" />
          </button>

          {/* Big Emergency SOS Button */}
          <button
            type="button"
            onClick={() => navigateTo('emergency')}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-base sm:text-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 border-2 border-red-700"
            title="Immediate Help & Emergency SOS"
          >
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] animate-bounce" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
