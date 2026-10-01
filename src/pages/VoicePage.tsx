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
  Sun
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
            <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-900 font-extrabold text-sm px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span>Voice AI Companion</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t('appTitle')}
            </h1>
            <p className="text-2xl sm:text-3xl text-slate-600 font-semibold max-w-xl mx-auto">
              {t('voicePromptReady')}
            </p>
          </div>

          {/* Large Central Microphone Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              type="button"
              onClick={() => handleStartListening()}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600 text-white flex flex-col items-center justify-center shadow-2xl hover:shadow-indigo-300/50 transform hover:scale-105 active:scale-95 transition-all border-8 border-indigo-200"
              aria-label={t('voiceTapToSpeak')}
            >
              <Mic className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5]" />
            </button>
            <p className="mt-4 text-xl sm:text-2xl font-bold text-indigo-900">
              {t('voiceTapToSpeak')}
            </p>
          </div>

          {/* Preset Quick Starters for effortless 1-tap testing */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft text-left space-y-3">
            <p className="text-lg font-bold text-slate-500 uppercase tracking-wider">
              {t('voiceTryAsking')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handleStartListening(preset.prompt)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border-2 border-slate-200 text-slate-800 font-bold text-lg text-left transition-all active:scale-98 flex items-center justify-between group"
                >
                  <span>{preset.label}</span>
                  <ArrowRight className="w-5 h-5 text-indigo-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
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
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 font-extrabold text-base px-5 py-2 rounded-full animate-pulse">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span>Microphone Active</span>
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
              {t('voiceListening')}
            </h2>
            <p className="text-2xl text-slate-600 font-medium">
              {t('voiceSpeakingHint')}
            </p>
          </div>

          {/* Animated sound wave bars */}
          <div className="flex items-center justify-center gap-3 h-28 my-4">
            <div className="w-4 bg-indigo-600 rounded-full wave-bar" />
            <div className="w-4 bg-indigo-500 rounded-full wave-bar" />
            <div className="w-4 bg-purple-600 rounded-full wave-bar" />
            <div className="w-4 bg-indigo-700 rounded-full wave-bar" />
            <div className="w-4 bg-indigo-500 rounded-full wave-bar" />
            <div className="w-4 bg-purple-500 rounded-full wave-bar" />
          </div>

          {/* Active Spoken words transcript placeholder */}
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 max-w-lg mx-auto">
            <p className="text-xl font-bold text-indigo-900 italic">
              "{activePromptText || 'I am listening to your voice now, Amma...'}"
            </p>
          </div>

          <button
            type="button"
            onClick={handleStopListening}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl text-xl inline-flex items-center gap-3 shadow-lg active:scale-95"
          >
            <Square className="w-6 h-6 fill-current" />
            <span>Tap when finished speaking</span>
          </button>
        </div>
      )}

      {/* State 3: THINKING */}
      {voiceState === 'thinking' && (
        <div className="space-y-8 animate-fade-in py-12">
          <div className="w-32 h-32 mx-auto rounded-full bg-indigo-100 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
            <Sparkles className="w-14 h-14 text-indigo-700 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {t('voiceThinking')}
            </h2>
            <p className="text-xl text-slate-500 font-medium">
              Understanding and setting up your request...
            </p>
          </div>
        </div>
      )}

      {/* State 4: SPEAKING */}
      {voiceState === 'speaking' && currentVoiceExchange && (
        <div className="space-y-6 animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 font-bold text-base px-4 py-1.5 rounded-full">
            <Volume2 className="w-5 h-5 text-indigo-700 animate-bounce" />
            <span>{t('voiceResponse')}</span>
          </div>

          {/* User spoken bubble */}
          <div className="bg-slate-100 rounded-2xl p-4 max-w-md mx-auto text-left border border-slate-300">
            <p className="text-sm font-bold text-slate-500">You asked:</p>
            <p className="text-lg font-bold text-slate-800 italic">
              "{currentVoiceExchange.userPrompt}"
            </p>
          </div>

          {/* Large AI Readable Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-lifted text-left space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                ❤️
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                "{currentVoiceExchange.aiResponse}"
              </p>
            </div>

            {/* Action Confirmation Pill if reminder or call was triggered */}
            {currentVoiceExchange.actionTaken?.type === 'create_reminder' && (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-3 text-emerald-950">
                <div className="flex items-center gap-3">
                  <Check className="w-7 h-7 text-emerald-600 stroke-[3]" />
                  <div>
                    <p className="font-bold text-lg">Reminder Saved to Schedule</p>
                    <p className="text-sm text-emerald-800">8:00 PM Tonight · Notification enabled</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('reminders')}
                  className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-700"
                >
                  View Reminders
                </button>
              </div>
            )}

            {currentVoiceExchange.actionTaken?.type === 'call_contact' && (
              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-7 h-7 text-indigo-600" />
                  <div>
                    <p className="font-bold text-lg text-indigo-950">Connecting to Ananya</p>
                    <p className="text-sm text-indigo-700">Daughter · +91 98450 12345</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => startCallFlow(contacts[0])}
                  className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700"
                >
                  Open Phone
                </button>
              </div>
            )}
          </div>

          {/* Action buttons: Hear Again & Done */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
            <button
              type="button"
              onClick={handleHearAgain}
              className="py-4 px-6 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 text-indigo-900 font-bold text-xl flex items-center justify-center gap-3 active:scale-95 shadow-sm"
            >
              <Volume2 className="w-7 h-7 text-indigo-700" />
              <span>{t('hearAgain')}</span>
            </button>

            <button
              type="button"
              onClick={handleDone}
              className="py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl flex items-center justify-center gap-3 active:scale-95 shadow-lg"
            >
              <Check className="w-7 h-7 stroke-[3]" />
              <span>{t('done')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
