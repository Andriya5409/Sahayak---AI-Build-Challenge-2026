import React from 'react';
import { 
  Settings, 
  Type, 
  Globe, 
  Gauge, 
  Volume2, 
  Sun, 
  Moon, 
  Eye, 
  ShieldCheck, 
  Users, 
  Check, 
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TextSize, SpeechSpeed, VoiceGender } from '../types';

export const SettingsPage: React.FC = () => {
  const { 
    user, 
    updateUser,
      setTextSize, 
    setHighContrast, 
    setSimplifiedMode, 
    speakText, 
    navigateTo, 
    t 
  } = useApp();

  const handleTestVoice = () => {
    const greeting = 'Hello Amma, this is your Sahayak assistant speaking clearly and gently.';
    speakText(greeting);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-sahayak-textMuted font-semibold text-lg hover:text-sahayak-text bg-sahayak-bgWarm hover:bg-sahayak-primaryLight px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-semibold text-sahayak-text">
          {t('settingsTitle')}
        </h1>
      </div>

      <div className="space-y-5">
        {/* 2. Text Size (Elder accessibility) */}
        <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sahayak-primaryLight text-sahayak-primary flex items-center justify-center">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-sahayak-text">
                {t('textSizeLabel')}
              </h2>
              <p className="text-sm text-sahayak-textMuted font-medium">{t('textSizeDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
            {[
              { id: 'small' as TextSize, label: t('sizeSmall'), preview: 'Aa' },
              { id: 'medium' as TextSize, label: t('sizeMedium'), preview: 'Aa' },
              { id: 'large' as TextSize, label: t('sizeLarge'), preview: 'Aa' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTextSize(item.id)}
                className={`py-3.5 px-2 rounded-2xl font-semibold text-base flex flex-col items-center justify-center border transition-all ${
                  user.textSize === item.id
                    ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft scale-102'
                    : 'bg-sahayak-bgWarm text-sahayak-text border-transparent hover:bg-sahayak-primaryLight'
                }`}
              >
                <span className="text-xl mb-0.5">{item.preview}</span>
                <span className="text-xs text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Speech Speed */}
        <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sahayak-primaryLight text-sahayak-primary flex items-center justify-center">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-sahayak-text">
                {t('voiceSpeedLabel')}
              </h2>
              <p className="text-sm text-sahayak-textMuted font-medium">{t('voiceSpeedDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'slow' as SpeechSpeed, label: t('speedSlow'), sub: t('recommendedForAmma') },
              { id: 'normal' as SpeechSpeed, label: t('speedNormal'), sub: t('standardCadence') },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => updateUser({ speechSpeed: item.id })}
                className={`p-4 rounded-2xl font-semibold text-lg flex flex-col items-center justify-center border transition-all ${
                  user.speechSpeed === item.id
                    ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft scale-102'
                    : 'bg-sahayak-bgWarm text-sahayak-text border-transparent hover:bg-sahayak-primaryLight'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${user.speechSpeed === item.id ? 'text-white/80' : 'text-sahayak-textLight'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Test Voice Button */}
          <button
            type="button"
            onClick={handleTestVoice}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-sahayak-primaryLight hover:bg-sahayak-primary hover:text-white text-sahayak-primary font-semibold text-base flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span>{t('testVoiceBtn')}</span>
          </button>
        </div>

        {/* 4. Assistant Voice Gender */}
        <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sahayak-primaryLight text-sahayak-primary flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-sahayak-text">
                {t('voiceGenderLabel')}
              </h2>
              <p className="text-sm text-sahayak-textMuted font-medium">{t('voiceGenderDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'female' as VoiceGender, label: t('voiceFemale'), sub: t('calmWarm') },
              { id: 'male' as VoiceGender, label: t('voiceMale'), sub: t('gentleClear') },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => updateUser({ voiceGender: item.id })}
                className={`p-4 rounded-2xl font-semibold text-lg flex flex-col items-center justify-center border transition-all ${
                  user.voiceGender === item.id
                    ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft scale-102'
                    : 'bg-sahayak-bgWarm text-sahayak-text border-transparent hover:bg-sahayak-primaryLight'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${user.voiceGender === item.id ? 'text-white/80' : 'text-sahayak-textLight'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Accessibility Toggles: High Contrast & Simplified View */}
        <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-sahayak-text">
            {t('visionDisplayAids')}
          </h2>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-sahayak-bgWarm border border-sahayak-primaryLight">
            <div>
              <p className="text-lg font-semibold text-sahayak-text">
                {t('highContrastLabel')}
              </p>
              <p className="text-sm text-sahayak-textMuted font-medium">
                {t('highContrastDesc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!user.highContrast)}
              className={`w-16 h-10 rounded-full transition-colors relative flex items-center px-1 ${
                user.highContrast ? 'bg-sahayak-primary' : 'bg-sahayak-textLight'
              }`}
              aria-label="Toggle High Contrast"
            >
              <div className={`w-8 h-8 rounded-full bg-white shadow-soft transform transition-transform ${
                user.highContrast ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Simplified Elder Mode Toggle */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-sahayak-bgWarm border border-sahayak-primaryLight">
            <div>
              <p className="text-lg font-semibold text-sahayak-text">
                {t('simplifiedModeLabel')}
              </p>
              <p className="text-sm text-sahayak-textMuted font-medium">
                {t('simplifiedModeDesc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSimplifiedMode(!user.simplifiedMode)}
              className={`w-16 h-10 rounded-full transition-colors relative flex items-center px-1 ${
                user.simplifiedMode ? 'bg-sahayak-primary' : 'bg-sahayak-textLight'
              }`}
              aria-label="Toggle Simplified View"
            >
              <div className={`w-8 h-8 rounded-full bg-white shadow-soft transform transition-transform ${
                user.simplifiedMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* 6. Family Circle Portal Navigation */}
        <div className="bg-sahayak-sageLight rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sahayak-sage text-white flex items-center justify-center text-2xl shrink-0 shadow-soft">
              👨‍👩‍👧
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sahayak-text">
                {t('caregiverPortalTitle')}
              </h3>
              <p className="text-sm text-sahayak-textMuted font-medium">
                {t('caregiverPortalDesc')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('caregiver')}
            className="w-full sm:w-auto bg-sahayak-sage hover:bg-opacity-90 text-white font-semibold py-3.5 px-6 rounded-2xl text-lg shadow-soft active:scale-95 transition-all"
          >
            {t('openPortal')}
          </button>
        </div>
      </div>
    </div>
  );
};
