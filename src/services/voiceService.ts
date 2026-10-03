import { VoiceExchange, VoiceState } from '../types';
import { mockVoicePresetExchanges } from '../mock/data';

export interface IVoiceService {
  processVoiceInput(spokenText: string, audioBase64?: string, language?: string): Promise<VoiceExchange>;
  getPresets(): { label: string; prompt: string; key: string }[];
}

class VoiceService implements IVoiceService {
  public getPresets() {
    return [
      {
        label: '💊 Remind medicine at 8 PM',
        prompt: 'Remind me to take my medicine at 8 PM',
        key: 'medicine_reminder'
      },
      {
        label: '🏥 Doctor appointment time?',
        prompt: 'When is my next doctor appointment?',
        key: 'doctor_appt'
      },
      {
        label: '❤️ Call my daughter Ananya',
        prompt: 'Call my daughter Ananya',
        key: 'call_daughter'
      },
      {
        label: '☀️ How is the weather today?',
        prompt: 'How is the weather today?',
        key: 'weather_check'
      }
    ];
  }

  public async processVoiceInput(spokenText: string, audioBase64?: string, language: string = 'en'): Promise<VoiceExchange> {
    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: spokenText, audioData: audioBase64, language }),
      });

      if (response.ok) {
        const exchange: VoiceExchange = await response.json();
        return exchange;
      }
    } catch (err) {
      console.warn('Voice API request failed, using intelligent offline fallback:', err);
    }

    // Fallback logic for offline mode
    await new Promise((r) => setTimeout(r, 600));
    const lower = spokenText.toLowerCase();

    if (lower.includes('medicine') || lower.includes('pill') || lower.includes('remind') || lower.includes('8 pm')) {
      return mockVoicePresetExchanges.medicine_reminder;
    }

    if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('clinic')) {
      return mockVoicePresetExchanges.doctor_appt;
    }

    if (lower.includes('call') || lower.includes('ananya') || lower.includes('daughter')) {
      return mockVoicePresetExchanges.call_daughter;
    }

    if (lower.includes('weather') || lower.includes('rain') || lower.includes('hot')) {
      return mockVoicePresetExchanges.weather_check;
    }

    return {
      id: 'vx_gen_' + Date.now(),
      userPrompt: spokenText,
      aiResponse: `I heard you say: "${spokenText}". Don't worry Amma, I have noted this down and I am always here to assist you.`,
      actionTaken: {
        type: 'none',
        details: 'Noted with care'
      },
      audioDurationSeconds: 4
    };
  }
}

export const voiceService = new VoiceService();
