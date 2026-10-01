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
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TextSize, Language, SpeechSpeed, VoiceGender } from '../types';

export const SettingsPage: React.FC = () => {
  const { 
    user, 
    updateUser, 
    setLanguage, 
    setTextSize, 
    setHighContrast, 
    setSimplifiedMode, 
    speakText, 
    navigateTo, 
    t 
  } = useApp();

  const handleTestVoice = () => {
    const greeting = user.language === 'ml' 
      ? 'നമസ്കാരം അമ്മ, സഹായകിന്റെ ശബ്ദം ഇപ്പോൾ വ്യക്തമായി കേൾക്കുന്നുണ്ടോ?' 
      : 'Hello Amma, this is your Sahayak assistant speaking clearly and gently.';
    speakText(greeting);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-slate-700 font-bold text-lg hover:text-indigo-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {t('settingsTitle')}
        </h1>
      </div>

      <div className="space-y-5">
        {/* 1. Language Option */}
        <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('languageLabel')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">Choose your primary language</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'en' as Language, label: 'English', sub: 'Default' },
              { id: 'ml' as Language, label: 'മലയാളം', sub: 'Malayalam' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLanguage(item.id)}
                className={`p-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center border-2 transition-all ${
                  user.language === item.id
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 font-black'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${user.language === item.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Text Size (Elder accessibility) */}
        <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('textSizeLabel')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">Makes text larger and easier to read</p>
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
                className={`py-3.5 px-2 rounded-2xl font-bold text-base flex flex-col items-center justify-center border-2 transition-all ${
                  user.textSize === item.id
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-102 font-black'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl mb-0.5">{item.preview}</span>
                <span className="text-xs text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Speech Speed */}
        <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('voiceSpeedLabel')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">Controls how fast Sahayak speaks to you</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'slow' as SpeechSpeed, label: t('speedSlow'), sub: 'Recommended for Amma' },
              { id: 'normal' as SpeechSpeed, label: t('speedNormal'), sub: 'Standard cadence' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => updateUser({ speechSpeed: item.id })}
                className={`p-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center border-2 transition-all ${
                  user.speechSpeed === item.id
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102 font-black'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${user.speechSpeed === item.id ? 'text-purple-200' : 'text-slate-500'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Test Voice Button */}
          <button
            type="button"
            onClick={handleTestVoice}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border-2 border-purple-200 font-bold text-base flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <Volume2 className="w-5 h-5 text-purple-700" />
            <span>{t('testVoiceBtn')}</span>
          </button>
        </div>

        {/* 4. Assistant Voice Gender */}
        <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('voiceGenderLabel')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">Assistant tone and voice personality</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'female' as VoiceGender, label: t('voiceFemale'), sub: 'Calm & Warm' },
              { id: 'male' as VoiceGender, label: t('voiceMale'), sub: 'Gentle & Clear' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => updateUser({ voiceGender: item.id })}
                className={`p-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center border-2 transition-all ${
                  user.voiceGender === item.id
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102 font-black'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${user.voiceGender === item.id ? 'text-rose-200' : 'text-slate-500'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Accessibility Toggles: High Contrast & Simplified View */}
        <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-soft space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Vision & Display Aids
          </h2>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-xl font-black text-slate-900">
                {t('highContrastLabel')}
              </p>
              <p className="text-sm text-slate-500 font-medium">
                Deep black & vivid yellow for low vision
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!user.highContrast)}
              className={`w-16 h-10 rounded-full transition-colors relative flex items-center px-1 ${
                user.highContrast ? 'bg-amber-500' : 'bg-slate-300'
              }`}
              aria-label="Toggle High Contrast"
            >
              <div className={`w-8 h-8 rounded-full bg-white shadow-md transform transition-transform ${
                user.highContrast ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Simplified Elder Mode Toggle */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-xl font-black text-slate-900">
                {t('simplifiedModeLabel')}
              </p>
              <p className="text-sm text-slate-500 font-medium">
                Hides secondary controls for maximum simplicity
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSimplifiedMode(!user.simplifiedMode)}
              className={`w-16 h-10 rounded-full transition-colors relative flex items-center px-1 ${
                user.simplifiedMode ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
              aria-label="Toggle Simplified View"
            >
              <div className={`w-8 h-8 rounded-full bg-white shadow-md transform transition-transform ${
                user.simplifiedMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* 6. Family Circle Portal Navigation */}
        <div className="bg-emerald-50 border-3 border-emerald-300 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
              👨‍👩‍👧
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-950">
                Caregiver Circle Portal
              </h3>
              <p className="text-sm text-emerald-800 font-medium">
                View what daughter Ananya & nurse Suresh can see
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('caregiver')}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl text-lg shadow-md active:scale-95"
          >
            Open Portal
          </button>
        </div>
      </div>
    </div>
  );
};
