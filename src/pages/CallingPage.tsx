import React from 'react';
import { 
  PhoneOff, 
  PhoneCall, 
  MicOff, 
  Mic, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CallingPage: React.FC = () => {
  const { 
    activeCall, 
    endActiveCall, 
    toggleMute, 
    toggleSpeaker, 
    t 
  } = useApp();

  if (!activeCall) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-2xl font-semibold text-sahayak-text">{t('noActiveCall')}</p>
      </div>
    );
  }

  const { contact, state, durationSeconds, isMuted, isSpeakerOn, isEmergencyCall } = activeCall;

  // Format seconds into MM:SS
  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-lg mx-auto py-6 pb-24 text-center space-y-8 animate-fade-in">
      {/* Top Banner Status */}
      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-base shadow-soft ${
        isEmergencyCall 
          ? 'bg-sahayak-redLight text-sahayak-red' 
          : state === 'connected' 
          ? 'bg-sahayak-sage text-white' 
          : 'bg-sahayak-primaryLight text-sahayak-primary'
      }`}>
        <span className={`w-3 h-3 rounded-full animate-ping ${
          isEmergencyCall ? 'bg-sahayak-red' : state === 'connected' ? 'bg-white' : 'bg-sahayak-primary'
        }`} />
        <span>
          {isEmergencyCall
            ? t('priorityEmergencyLine')
            : state === 'connected'
            ? `${t('connected')} · ${formatDuration(durationSeconds)}`
            : t('callConnecting')}
        </span>
      </div>

      {/* Main Calling Avatar with Pulsing Rings */}
      <div className="relative flex items-center justify-center py-6">
        {/* Animated Ripple Waves */}
        <div className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-opacity-30 animate-ripple ${
          isEmergencyCall ? 'border-sahayak-red' : 'border-sahayak-primary'
        }`} />
        <div className={`absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border border-opacity-30 animate-ripple ${
          isEmergencyCall ? 'border-sahayak-red' : 'border-sahayak-primary'
        }`} style={{ animationDelay: '0.4s' }} />

        {/* Center Avatar Circle */}
        <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-warm relative z-10 ${
          isEmergencyCall ? 'bg-sahayak-red' : 'bg-sahayak-primary'
        }`}>
          <PhoneCall className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5] animate-breathe" />
        </div>
      </div>

      {/* Caller Name & Relation */}
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-5xl font-semibold text-sahayak-text tracking-tight">
          {contact.name}
        </h1>
        <p className="text-2xl text-sahayak-textMuted font-semibold">
          {contact.relation} · {contact.phone}
        </p>
      </div>

      {/* Audio Controls (Mute & Speakerphone) */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <button
          type="button"
          onClick={toggleMute}
          className={`py-4 px-4 rounded-2xl font-semibold text-lg flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${
            isMuted
              ? 'bg-sahayak-roseLight text-sahayak-rose border-sahayak-rose'
              : 'bg-sahayak-bgWarm text-sahayak-textMuted border-transparent hover:bg-sahayak-primaryLight'
          }`}
        >
          {isMuted ? <MicOff className="w-7 h-7 text-sahayak-rose" /> : <Mic className="w-7 h-7" />}
          <span>{isMuted ? t('muted') : t('mute')}</span>
        </button>

        <button
          type="button"
          onClick={toggleSpeaker}
          className={`py-4 px-4 rounded-2xl font-semibold text-lg flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${
            isSpeakerOn
              ? 'bg-sahayak-primaryLight text-sahayak-primary border-sahayak-primary'
              : 'bg-sahayak-bgWarm text-sahayak-textMuted border-transparent hover:bg-sahayak-primaryLight'
          }`}
        >
          {isSpeakerOn ? <Volume2 className="w-7 h-7 text-sahayak-primary" /> : <VolumeX className="w-7 h-7" />}
          <span>{isSpeakerOn ? t('speakerOn') : t('speaker')}</span>
        </button>
      </div>

      {/* Big END CALL Red Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={endActiveCall}
          className="w-full max-w-sm mx-auto py-5 px-8 rounded-3xl bg-sahayak-red hover:opacity-90 active:opacity-80 text-white font-semibold text-2xl sm:text-3xl flex items-center justify-center gap-4 shadow-soft active:scale-95 transition-all"
          aria-label={t('endCall')}
        >
          <PhoneOff className="w-9 h-9 stroke-[3]" />
          <span>{t('endCall')}</span>
        </button>
        <p className="text-sahayak-textLight text-sm font-semibold mt-3">
          {t('sayEndCall')}
        </p>
      </div>
    </div>
  );
};
