// Text-to-Speech (TTS) Service using Web Speech API with fallback
// Allows the elderly user to hear any text read out loud clearly.

class TTSService {
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: ((speaking: boolean) => void)[] = [];

  public subscribe(listener: (speaking: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach(l => l(speaking));
  }

  public speak(
    text: string, 
    options?: { 
      rate?: number; 
      pitch?: number; 
      volume?: number; 
      lang?: string;
      onEnd?: () => void;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Web Speech API not supported in this browser environment');
        this.notify(true);
        setTimeout(() => {
          this.notify(false);
          options?.onEnd?.();
          resolve();
        }, 1500);
        return;
      }

      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Slower, clearer rate for elderly users
      utterance.rate = options?.rate ?? 0.88;
      utterance.pitch = options?.pitch ?? 1.0;
      utterance.volume = options?.volume ?? 1.0;
      utterance.lang = 'en-IN';

      // Pick a warm natural voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v => 
          v.lang.includes('en-IN') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('India')
        ) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.notify(true);
      };

      utterance.onend = () => {
        this.notify(false);
        this.currentUtterance = null;
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        console.error('TTS speech error:', e);
        this.notify(false);
        this.currentUtterance = null;
        options?.onEnd?.();
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify(false);
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const ttsService = new TTSService();
