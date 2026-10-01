import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VoiceSpeakButtonProps {
  textToSpeak: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'amber' | 'outline';
}

export const VoiceSpeakButton: React.FC<VoiceSpeakButtonProps> = ({
  textToSpeak,
  label,
  className = '',
  size = 'md',
  variant = 'secondary',
}) => {
  const { speakText, stopSpeaking, isSpeaking } = useApp();
  const [localActive, setLocalActive] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localActive && isSpeaking) {
      stopSpeaking();
      setLocalActive(false);
    } else {
      setLocalActive(true);
      speakText(textToSpeak, () => {
        setLocalActive(false);
      });
    }
  };

  const isCurrentlyPlaying = localActive && isSpeaking;

  const sizeClasses = {
    sm: 'py-2 px-3 text-base min-h-[44px]',
    md: 'py-3 px-5 text-lg min-h-[54px]',
    lg: 'py-4 px-6 text-xl min-h-[64px] font-bold',
  }[size];

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md',
    secondary: isCurrentlyPlaying 
      ? 'bg-indigo-600 text-white shadow-lifted ring-2 ring-indigo-400' 
      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-2 border-indigo-200',
    amber: isCurrentlyPlaying
      ? 'bg-amber-600 text-white shadow-lifted'
      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300',
    outline: 'border-2 border-slate-300 hover:bg-slate-100 text-slate-800 bg-white',
  }[variant];

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center justify-center gap-3 rounded-2xl transition-all duration-200 active:scale-95 font-semibold ${sizeClasses} ${variantClasses} ${className}`}
      aria-label={label || 'Hear text out loud'}
      title="Hear this read out loud in a warm, clear voice"
    >
      {isCurrentlyPlaying ? (
        <>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-6 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span>{label || 'Speaking...'}</span>
          <VolumeX className="w-5 h-5 ml-1 opacity-75" />
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
          <span>{label || 'Hear this'}</span>
        </>
      )}
    </button>
  );
};
