import { Router } from 'express';
import { geminiService } from '../services/geminiService.js';
import { store } from '../data/store.js';

export const voiceRouter = Router();

// GET /api/voice/presets
voiceRouter.get('/presets', (req, res) => {
  res.json([
    {
      label: '💊 Remind medicine at 8 PM',
      prompt: 'Remind me to take my medicine at 8 PM',
      key: 'medicine_reminder',
    },
    {
      label: '🏥 Doctor appointment time?',
      prompt: 'When is my next doctor appointment?',
      key: 'doctor_appt',
    },
    {
      label: '❤️ Call my daughter Ananya',
      prompt: 'Call my daughter Ananya',
      key: 'call_daughter',
    },
    {
      label: '☀️ How is the weather today?',
      prompt: 'How is the weather today?',
      key: 'weather_check',
    },
  ]);
});

// POST /api/voice
voiceRouter.post('/', async (req, res) => {
  try {
    const { prompt, audioData, history } = req.body;
    const spokenText = prompt || (audioData ? 'Processing audio...' : 'Remind me to take my medicine at 8 PM');
    const profile = store.getProfile();

    const exchange = await geminiService.processVoice(spokenText, history, profile, audioData);

    // If an action was extracted to create a reminder, link it to the store if requested
    if (exchange.actionTaken?.type === 'create_reminder' && exchange.actionTaken.payload) {
      const payload = exchange.actionTaken.payload;
      const createdReminder = store.addReminder({
        title: payload.title || 'Medicine Reminder',
        category: payload.category || 'medicine',
        time: payload.time || '8:00 PM',
        dateLabel: 'Today',
        datetime: new Date().toISOString(),
        completed: false,
        dosageOrNotes: 'Scheduled via Sahayak Voice Assistant',
        icon: '💊',
      });
      exchange.actionTaken.payload.reminderId = createdReminder.id;
    }

    res.json(exchange);
  } catch (error: any) {
    console.error('Error handling voice request:', error);
    res.status(500).json({
      error: 'Failed to process voice command',
      details: error.message,
    });
  }
});
