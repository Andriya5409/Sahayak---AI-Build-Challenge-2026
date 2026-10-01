import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Volume2, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Phone, 
  Calendar, 
  Pill,
  ArrowRight,
  Sun,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';
import { VoiceExchange } from '../types';

export const VoicePage: React.FC = () => {
  const { 
    voiceState, 
    setVoiceState, 
    currentVoiceExchange, 
    setCurrentVoiceExchange, 
    addReminder, 
    startCallFlow,
    contacts,
    navigateTo, 
    speakText, 
    t 
  } = useApp();

  const [activePromptText, setActivePromptText] = useState('');
  const presets = voiceService.getPresets();

  const handleStartListening = (presetQuery?: string) => {
    setVoiceState('listening');
    setActivePromptText(presetQuery || '');

    // Simulate listening duration then transition to thinking
    setTimeout(async () => {
      setVoiceState('thinking');
      const spokenText = presetQuery || 'Remind me to take my medicine at 8 PM';
      setActivePromptText(spokenText);

      // Process via voiceService placeholder
      const exchange = await voiceService.processVoiceInput(spokenText);
      setCurrentVoiceExchange(exchange);
      setVoiceState('speaking');

      // If action is to create reminder, automatically save it in background
      if (exchange.actionTaken?.type === 'create_reminder' && exchange.actionTaken.payload) {
        addReminder({
          title: exchange.actionTaken.payload.title || 'Take evening medicine',
          category: 'medicine',
          time: exchange.actionTaken.payload.time || '8:00 PM',
          dateLabel: 'Today',
          datetime: new Date().toISOString(),
          dosageOrNotes: 'Scheduled via Voice Assistant',
          icon: '💊',
        });
      }

      // Automatically speak out the response in elderly-friendly voice
      speakText(exchange.aiResponse);
    }, 2200);
  };

  const handleStopListening = () => {
    if (voiceState === 'listening') {
      handleStartListening(activePromptText || 'Remind me to take my medicine at 8 PM');
    }
  };

  const handleHearAgain = () => {
    if (currentVoiceExchange) {
      speakText(currentVoiceExchange.aiResponse);
    }
  };

  const handleDone = () => {
    setVoiceState('ready');
    setCurrentVoiceExchange(null);
    setActivePromptText('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 text-center">
      {/* State 1: READY */}
      {voiceState === 'ready' && (
        <div className="space-y-8 animate-fade-in pt-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-sahayak-text">
              {t('appTitle')}
            </h1>
            <p className="text-xl text-sahayak-textMuted max-w-xl mx-auto">
              {t('voicePromptReady')}
            </p>
          </div>

          {/* Large Central Microphone Button */}
          <div className="flex flex-col items-center justify-center py-8 relative">
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-sahayak-primaryLight animate-breathe z-0" />
            <button
              type="button"
              onClick={() => handleStartListening()}
              className="z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-sahayak-primary text-white flex flex-col items-center justify-center shadow-warm transform hover:scale-105 active:scale-95 transition-all"
              aria-label={t('voiceTapToSpeak')}
            >
              <Mic className="w-14 h-14" />
            </button>
            <p className="mt-8 text-lg text-sahayak-textMuted z-10">
              {t('voiceTapToSpeak')}
            </p>
          </div>

          {/* Preset Quick Starters */}
          <div className="bg-white rounded-3xl p-6 border border-sahayak-primaryLight shadow-soft text-left space-y-4">
            <p className="text-base font-medium text-sahayak-textMuted">
              {t('youCouldSay')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handleStartListening(preset.prompt)}
                  className="p-4 rounded-2xl bg-sahayak-bg hover:bg-sahayak-primaryLight border border-transparent hover:border-sahayak-primaryLight text-sahayak-text font-medium text-lg text-left transition-all active:scale-98 flex items-center justify-between group"
                >
                  <span>{preset.label}</span>
                  <ChevronRight className="w-5 h-5 text-sahayak-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* State 2: LISTENING */}
      {voiceState === 'listening' && (
        <div className="space-y-8 animate-fade-in py-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-sahayak-text">
              {t('voiceListening')}
            </h2>
            <p className="text-lg text-sahayak-textMuted">
              {t('voiceSpeakingHint')}
            </p>
          </div>

          {/* Animated sound wave bars */}
          <div className="flex items-center justify-center gap-3 h-28 my-4">
            <div className="w-4 bg-sahayak-primary rounded-full wave-bar" />
            <div className="w-4 bg-sahayak-primary/70 rounded-full wave-bar" />
            <div className="w-4 bg-sahayak-primary/50 rounded-full wave-bar" />
            <div className="w-4 bg-sahayak-primary rounded-full wave-bar" />
            <div className="w-4 bg-sahayak-primary/70 rounded-full wave-bar" />
            <div className="w-4 bg-sahayak-primary/50 rounded-full wave-bar" />
          </div>

          {/* Active Spoken words transcript placeholder */}
          <div className="bg-sahayak-primaryLight border border-sahayak-primary rounded-3xl p-6 max-w-lg mx-auto">
            <p className="text-xl text-sahayak-text italic">
              "{activePromptText || t('listeningPlaceholder')}"
            </p>
          </div>

          <button
            type="button"
            onClick={handleStopListening}
            className="bg-sahayak-primary hover:bg-opacity-90 text-white font-medium py-4 px-8 rounded-2xl text-xl inline-flex items-center gap-3 shadow-warm active:scale-95"
          >
            <Square className="w-6 h-6 fill-current" />
            <span>{t('tapWhenFinished')}</span>
          </button>
        </div>
      )}

      {/* State 3: THINKING */}
      {voiceState === 'thinking' && (
        <div className="space-y-8 animate-fade-in py-16">
          <div className="w-24 h-24 mx-auto rounded-full bg-sahayak-primaryLight animate-breathe" />
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-sahayak-text">
              {t('voiceThinking')}
            </h2>
            <p className="text-lg text-sahayak-textMuted">
              {t('understandingRequest')}
            </p>
          </div>
        </div>
      )}

      {/* State 4: SPEAKING */}
      {voiceState === 'speaking' && currentVoiceExchange && (
        <div className="space-y-8 animate-fade-in py-8">
          {/* User spoken bubble */}
          <div className="text-center mb-2">
            <p className="text-sm text-sahayak-textMuted mb-2">{t('youAsked')}</p>
            <p className="text-lg text-sahayak-text italic">
              "{currentVoiceExchange.userPrompt}"
            </p>
          </div>

          {/* Large AI Readable Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sahayak-primaryLight shadow-soft text-left space-y-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-2 h-14 rounded-full bg-sahayak-primary shrink-0" />
              <p className="text-2xl sm:text-3xl font-medium text-sahayak-text leading-snug">
                "{currentVoiceExchange.aiResponse}"
              </p>
            </div>

            {/* Action Confirmation Pill if reminder or call was triggered */}
            {currentVoiceExchange.actionTaken?.type === 'create_reminder' && (
              <div className="bg-sahayak-sageLight border border-sahayak-sage rounded-2xl p-4 flex items-center justify-between gap-3 text-sahayak-text">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-sahayak-sage" />
                  <div>
                    <p className="font-medium text-lg">{t('reminderSaved')}</p>
                    <p className="text-sm opacity-80">{t('reminderSavedDesc')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('reminders')}
                  className="bg-sahayak-sage text-white font-medium px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  {t('view')}
                </button>
              </div>
            )}

            {currentVoiceExchange.actionTaken?.type === 'call_contact' && (
              <div className="bg-sahayak-primaryLight border border-sahayak-primary rounded-2xl p-4 flex items-center justify-between gap-3 text-sahayak-text">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-sahayak-primary" />
                  <div>
                    <p className="font-medium text-lg">{t('connectingToAnanya')}</p>
                    <p className="text-sm opacity-80">{t('ananyaPhone')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => startCallFlow(contacts[0])}
                  className="bg-sahayak-primary text-white font-medium px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  {t('openPhone')}
                </button>
              </div>
            )}
          </div>

          {/* Action buttons: Hear Again & Done */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
            <button
              type="button"
              onClick={handleHearAgain}
              className="py-4 px-6 rounded-2xl bg-transparent hover:bg-sahayak-primaryLight border-2 border-sahayak-primary text-sahayak-primary font-medium text-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <Volume2 className="w-6 h-6" />
              <span>{t('hearAgain')}</span>
            </button>

            <button
              type="button"
              onClick={handleDone}
              className="py-4 px-6 rounded-2xl bg-sahayak-primary hover:bg-opacity-90 text-white font-medium text-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-warm"
            >
              <Check className="w-6 h-6" />
              <span>{t('done')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
