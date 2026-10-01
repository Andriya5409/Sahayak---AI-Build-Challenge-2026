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
        <p className="text-2xl font-bold text-slate-700">No active call in progress.</p>
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
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-base shadow-sm border-2" style={{
        backgroundColor: isEmergencyCall ? '#FEE2E2' : state === 'connected' ? '#DCFCE7' : '#EEF2FF',
        color: isEmergencyCall ? '#991B1B' : state === 'connected' ? '#166534' : '#3730A3',
        borderColor: isEmergencyCall ? '#FCA5A5' : state === 'connected' ? '#86EFAC' : '#C7D2FE',
      }}>
        <span className="w-3 h-3 rounded-full animate-ping" style={{
          backgroundColor: isEmergencyCall ? '#DC2626' : state === 'connected' ? '#16A34A' : '#4F46E5',
        }} />
        <span>
          {isEmergencyCall
            ? 'PRIORITY EMERGENCY LINE'
            : state === 'connected'
            ? `CONNECTED · ${formatDuration(durationSeconds)}`
            : t('callConnecting')}
        </span>
      </div>

      {/* Main Calling Avatar with Pulsing Rings */}
      <div className="relative flex items-center justify-center py-6">
        {/* Animated Ripple Waves */}
        <div className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 animate-ripple ${
          isEmergencyCall ? 'border-red-400' : 'border-indigo-400'
        }`} />
        <div className={`absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border-4 animate-ripple ${
          isEmergencyCall ? 'border-red-300' : 'border-indigo-300'
        }`} style={{ animationDelay: '0.4s' }} />

        {/* Center Avatar Circle */}
        <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative z-10 border-8 border-white ${
          isEmergencyCall ? 'bg-red-600' : 'bg-indigo-600'
        }`}>
          <PhoneCall className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5] animate-bounce" />
        </div>
      </div>

      {/* Caller Name & Relation */}
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {contact.name}
        </h1>
        <p className="text-2xl text-slate-600 font-bold">
          {contact.relation} · {contact.phone}
        </p>
      </div>

      {/* Audio Controls (Mute & Speakerphone) */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <button
          type="button"
          onClick={toggleMute}
          className={`py-4 px-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center gap-2 border-2 transition-all active:scale-95 ${
            isMuted
              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          {isMuted ? <MicOff className="w-7 h-7 text-amber-700" /> : <Mic className="w-7 h-7" />}
          <span>{isMuted ? 'Muted' : t('mute')}</span>
        </button>

        <button
          type="button"
          onClick={toggleSpeaker}
          className={`py-4 px-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center gap-2 border-2 transition-all active:scale-95 ${
            isSpeakerOn
              ? 'bg-indigo-100 text-indigo-900 border-indigo-300 ring-2 ring-indigo-400'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          {isSpeakerOn ? <Volume2 className="w-7 h-7 text-indigo-700" /> : <VolumeX className="w-7 h-7" />}
          <span>{isSpeakerOn ? 'Speaker ON' : t('speaker')}</span>
        </button>
      </div>

      {/* Big END CALL Red Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={endActiveCall}
          className="w-full max-w-sm mx-auto py-5 px-8 rounded-3xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-2xl sm:text-3xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all border-4 border-red-400"
          aria-label={t('endCall')}
        >
          <PhoneOff className="w-9 h-9 stroke-[3]" />
          <span>{t('endCall')}</span>
        </button>
        <p className="text-slate-500 text-sm font-semibold mt-3">
          Or say "Sahayak, end call"
        </p>
      </div>
    </div>
  );
};
