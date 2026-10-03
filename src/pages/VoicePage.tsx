import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Volume2, 
  Check, 
  Sparkles, 
  Send,
  Phone, 
  Calendar, 
  Pill,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';

export const VoicePage: React.FC = () => {
  const { 
    user,
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
  const [typedPrompt, setTypedPrompt] = useState('');
  const recognitionRef = useRef<any>(null);
  const presets = voiceService.getPresets();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const executeVoiceQuery = async (spokenText: string, audioBase64?: string) => {
    if (!spokenText.trim() && !audioBase64) {
      setVoiceState('ready');
      return;
    }

    setVoiceState('thinking');
    setActivePromptText(spokenText || 'Processing audio...');

    // Call live backend AI
    const exchange = await voiceService.processVoiceInput(spokenText, audioBase64, user.language);
    setCurrentVoiceExchange(exchange);
    setVoiceState('speaking');

    speakText(exchange.aiResponse);
  };

  const handleStartListening = async (presetQuery?: string) => {
    if (presetQuery) {
      executeVoiceQuery(presetQuery);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          executeVoiceQuery('', base64data);
        };
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setVoiceState('listening');
      setActivePromptText('Recording your voice...');
    } catch (err) {
      console.warn('Microphone access failed:', err);
      alert('Microphone access denied or not available. Please use the text input below.');
      setVoiceState('ready');
    }
  };

  const handleStopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      setVoiceState('ready');
    }
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedPrompt.trim()) {
      executeVoiceQuery(typedPrompt.trim());
      setTypedPrompt('');
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
    <div className="max-w-3xl mx-auto space-y-6 pb-24 text-center px-4">
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
          <div className="flex flex-col items-center justify-center py-6 relative">
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-sahayak-primaryLight animate-breathe z-0" />
            <button
              type="button"
              onClick={() => handleStartListening()}
              className="z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-sahayak-primary text-white flex flex-col items-center justify-center shadow-warm transform hover:scale-105 active:scale-95 transition-all"
              aria-label={t('voiceTapToSpeak')}
            >
              <Mic className="w-14 h-14" />
            </button>
            <p className="mt-6 text-lg font-semibold text-sahayak-text z-10">
              {t('voiceTapToSpeak')}
            </p>
            <p className="text-xs text-sahayak-textMuted z-10 mt-1">
              Tap mic to speak with your real voice in real-time
            </p>
          </div>

          {/* Typed Question Input Bar */}
          <form onSubmit={handleTypedSubmit} className="max-w-xl mx-auto">
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 border border-slate-200 shadow-sm">
              <input
                type="text"
                value={typedPrompt}
                onChange={(e) => setTypedPrompt(e.target.value)}
                placeholder="Or type any question to Sahayak (e.g. Can I take aspirin with food?)..."
                className="flex-1 px-4 py-2.5 text-base text-sahayak-text outline-none bg-transparent"
              />
              <button
                type="submit"
                disabled={!typedPrompt.trim()}
                className="bg-sahayak-primary disabled:opacity-40 text-white p-3 rounded-xl font-medium flex items-center justify-center transition-all"
                title="Send query"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Preset Quick Starters */}
          <div className="bg-white rounded-3xl p-6 border border-sahayak-primaryLight shadow-soft text-left space-y-4">
            <p className="text-base font-semibold text-sahayak-text">
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

          {/* Active Spoken words transcript */}
          <div className="bg-sahayak-primaryLight border border-sahayak-primary rounded-3xl p-6 max-w-lg mx-auto min-h-[90px] flex items-center justify-center">
            <p className="text-xl font-medium text-sahayak-text italic">
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
          <div className="w-24 h-24 mx-auto rounded-full bg-sahayak-primaryLight animate-breathe flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-sahayak-primary animate-spin" />
          </div>
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
            <p className="text-xl text-sahayak-text italic font-medium">
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
                    <p className="font-semibold text-lg">{t('reminderSaved')}</p>
                    <p className="text-sm opacity-80">{currentVoiceExchange.actionTaken.details || t('reminderSavedDesc')}</p>
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
                    <p className="font-semibold text-lg">Calling Family Member</p>
                    <p className="text-sm opacity-80">{currentVoiceExchange.actionTaken.details || 'Dialing contact'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const phone = currentVoiceExchange.actionTaken?.payload?.phone || contacts[0]?.phone;
                    if (phone) window.location.href = `tel:${phone}`;
                  }}
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
