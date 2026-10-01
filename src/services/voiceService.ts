import { VoiceExchange, VoiceState } from '../types';
import { mockVoicePresetExchanges } from '../mock/data';

/**
 * Voice Service Placeholder
 * 
 * BACKEND INTEGRATION NOTE:
 * Replace mock processVoiceInput with real streaming speech-to-text (Whisper/Gemini Live API)
 * and LLM dialogue service endpoint (e.g. POST /api/voice/process).
 */
export interface IVoiceService {
  processVoiceInput(spokenText: string): Promise<VoiceExchange>;
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

  public async processVoiceInput(spokenText: string): Promise<VoiceExchange> {
    // Simulated network delay for realistic feel
    await new Promise((r) => setTimeout(r, 900));

    const lower = spokenText.toLowerCase();

    if (lower.includes('medicine') || lower.includes('pill') || lower.includes('remind') || lower.includes('8 pm') || lower.includes('രാത്രി 8')) {
      return mockVoicePresetExchanges.medicine_reminder;
    }

    if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('clinic') || lower.includes('ഡോക്ടർ')) {
      return mockVoicePresetExchanges.doctor_appt;
    }

    if (lower.includes('call') || lower.includes('ananya') || lower.includes('daughter') || lower.includes('മകൾ') || lower.includes('വിളിക്കൂ')) {
      return mockVoicePresetExchanges.call_daughter;
    }

    if (lower.includes('weather') || lower.includes('rain') || lower.includes('hot') || lower.includes('മഴ') || lower.includes('കാലാവസ്ഥ')) {
      return mockVoicePresetExchanges.weather_check;
    }

    // Default friendly conversational response
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
