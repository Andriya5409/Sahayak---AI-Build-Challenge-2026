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
      isSpeaking, 
    stopSpeaking,
    t 
  } = useApp();

  const isHomeScreen = currentScreen === 'home';

  
  return (
    <header className="bg-sahayak-bg border-b border-sahayak-bgWarm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-3">
          {!isHomeScreen ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 bg-transparent hover:bg-sahayak-bgWarm text-sahayak-text font-medium px-3 py-2 rounded-xl text-lg transition-all active:scale-95"
              aria-label={t('goBackAriaLabel')}
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
              <span className="hidden xs:inline">{t('back')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-sahayak-primary flex items-center justify-center text-white group-hover:bg-sahayak-primary/90 transition-colors">
                <span className="font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-sahayak-text tracking-tight block leading-none">
                  {t('sahayakName')}
                </span>
                <span className="text-xs text-sahayak-textMuted tracking-wide mt-1 block">
                  {t('yourCompanion')}
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
              className="bg-sahayak-lavenderLight hover:bg-sahayak-lavender text-sahayak-primary px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
              title={t('stopVoicePlayback')}
            >
              <VolumeX className="w-5 h-5 text-sahayak-primary" />
              <span className="hidden md:inline">{t('mute')}</span>
            </button>
          )}

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => navigateTo('profile')}
            className="w-10 h-10 rounded-full bg-sahayak-primaryLight flex items-center justify-center text-xl hover:ring-2 hover:ring-sahayak-primary transition-all"
            title="My Profile"
          >
            {user.avatar || '👤'}
          </button>

          {/* Caregiver Portal Switch */}
          <button
            type="button"
            onClick={() => navigateTo('caregiver')}
            className={`hidden sm:flex items-center justify-center p-2 rounded-xl transition-colors ${
              currentScreen === 'caregiver'
                ? 'bg-sahayak-sage text-white'
                : 'bg-transparent text-sahayak-text hover:bg-sahayak-bgWarm'
            }`}
            title={t('switchCaregiverPortalTitle')}
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={() => navigateTo('settings')}
            className={`p-2 rounded-xl transition-colors ${
              currentScreen === 'settings'
                ? 'bg-sahayak-lavender text-sahayak-primary'
                : 'bg-transparent text-sahayak-text hover:bg-sahayak-bgWarm'
            }`}
            aria-label={t('settingsAriaLabel')}
            title={t('accessibilitySettingsTitle')}
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Emergency SOS Button */}
          <button
            type="button"
            onClick={() => navigateTo('emergency')}
            className="bg-sahayak-red hover:bg-sahayak-red/90 text-white font-semibold px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95"
            title={t('emergencySOSTitle')}
          >
            <AlertCircle className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
            <span>{t('sos')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
