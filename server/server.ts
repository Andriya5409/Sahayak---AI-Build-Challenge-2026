import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { voiceRouter } from './routes/voiceRoutes.js';
import { visionRouter } from './routes/visionRoutes.js';
import { reminderRouter } from './routes/reminderRoutes.js';
import { familyRouter } from './routes/familyRoutes.js';
import { caregiverRouter } from './routes/caregiverRoutes.js';
import { emergencyRouter } from './routes/emergencyRoutes.js';
import { profileRouter } from './routes/profileRoutes.js';
import { callRouter } from './routes/callRoutes.js';
import { geminiService } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Body parser for JSON and URL-encoded bodies (allowing large base64 image and audio payloads up to 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/voice', voiceRouter);
app.use('/api/vision', visionRouter);

// Direct Document OCR analyze endpoint matching POST /api/document/analyze
app.post('/api/document/analyze', async (req, res) => {
  try {
    const { image, imageBlobOrDataUrl } = req.body;
    const imageData = image || imageBlobOrDataUrl || '';
    const result = await geminiService.analyzeDocument(imageData);
    res.json(result);
  } catch (error: any) {
    console.error('Document OCR error:', error);
    res.status(500).json({ error: 'Failed to analyze document', details: error.message });
  }
});

// Reminders API: GET/POST /api/reminders, PUT/DELETE /api/reminders/:id
app.use('/api/reminders', reminderRouter);

// Family API: GET/POST /api/family, PUT/DELETE /api/family/:id
app.use('/api/family', familyRouter);

// Caregiver API: GET /api/caregiver, GET /api/caregiver/activity
app.use('/api/caregiver', caregiverRouter);

// Emergency API: GET /api/emergency-contacts, POST /api/emergency, GET /api/emergency/logs
app.use('/api', emergencyRouter);

// Profile API: GET/PUT /api/profile
app.use('/api/profile', profileRouter);

// Calling API: POST /api/calls/initiate, POST /api/calls/terminate, GET /api/calls/status/:id
app.use('/api/calls', callRouter);

// Root HTML Dashboard for easy browser viewing & testing
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sahayak AI - Backend Control Center</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #faf8f5; color: #1f2937; margin: 0; padding: 24px; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-bottom: 12px; }
    h1 { margin: 0 0 8px 0; color: #111827; font-size: 26px; }
    p { margin: 0 0 16px 0; color: #4b5563; }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #2563eb; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 20px; }
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
    .card h3 { margin: 0 0 8px 0; font-size: 17px; display: flex; align-items: center; gap: 8px; }
    .method { font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
    .get { background: #dbeafe; color: #1e40af; }
    .post { background: #dcfce7; color: #166534; }
    .btn-test { background: #f3f4f6; border: 1px solid #d1d5db; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; margin-top: 8px; }
    .btn-test:hover { background: #e5e7eb; }
    pre { background: #1e293b; color: #e2e8f0; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto; max-height: 150px; display: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">● Server Active on Port 5000</span>
      <h1>🌸 Sahayak AI Backend is Running!</h1>
      <p>The backend APIs for Voice, Vision, Document OCR, Reminders, Family, Caregiver, and Emergency are all active and ready.</p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="http://localhost:5173" target="_blank" class="btn-primary">👉 Open Sahayak Frontend UI (Port 5173)</a>
        <a href="/api/health" target="_blank" class="btn-test" style="text-decoration:none; padding: 10px 16px; font-size:14px;">View Health Status (JSON)</a>
      </div>
    </div>

    <h2>⚡ Live API Tester</h2>
    <p>Click "Run Test" below to see live JSON responses returned by the backend:</p>

    <div class="grid">
      <div class="card">
        <h3><span class="method get">GET</span> /api/reminders</h3>
        <p style="font-size: 13px;">Get all reminders (meds, doctor visits, bills).</p>
        <button class="btn-test" onclick="testApi('/api/reminders', 'res-rem')">Run Test</button>
        <pre id="res-rem"></pre>
      </div>

      <div class="card">
        <h3><span class="method post">POST</span> /api/voice</h3>
        <p style="font-size: 13px;">AI voice processing & reminder extraction.</p>
        <button class="btn-test" onclick="testVoice('res-voice')">Run Test</button>
        <pre id="res-voice"></pre>
      </div>

      <div class="card">
        <h3><span class="method get">GET</span> /api/family</h3>
        <p style="font-size: 13px;">Get family members & emergency contacts.</p>
        <button class="btn-test" onclick="testApi('/api/family', 'res-fam')">Run Test</button>
        <pre id="res-fam"></pre>
      </div>

      <div class="card">
        <h3><span class="method get">GET</span> /api/caregiver</h3>
        <p style="font-size: 13px;">Caregiver adherence & health status.</p>
        <button class="btn-test" onclick="testApi('/api/caregiver', 'res-care')">Run Test</button>
        <pre id="res-care"></pre>
      </div>

      <div class="card">
        <h3><span class="method get">GET</span> /api/emergency-contacts</h3>
        <p style="font-size: 13px;">Priority emergency contact list.</p>
        <button class="btn-test" onclick="testApi('/api/emergency-contacts', 'res-emg')">Run Test</button>
        <pre id="res-emg"></pre>
      </div>

      <div class="card">
        <h3><span class="method post">POST</span> /api/document/analyze</h3>
        <p style="font-size: 13px;">Analyze bill/document with OCR & summary.</p>
        <button class="btn-test" onclick="testDoc('res-doc')">Run Test</button>
        <pre id="res-doc"></pre>
      </div>
    </div>
  </div>

  <script>
    async function testApi(url, preId) {
      const el = document.getElementById(preId);
      el.style.display = 'block';
      el.textContent = 'Loading...';
      try {
        const res = await fetch(url);
        const data = await res.json();
        el.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        el.textContent = 'Error: ' + err.message;
      }
    }

    async function testVoice(preId) {
      const el = document.getElementById(preId);
      el.style.display = 'block';
      el.textContent = 'Processing AI voice query...';
      try {
        const res = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: 'Remind me to take my medicine at 8 PM' })
        });
        const data = await res.json();
        el.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        el.textContent = 'Error: ' + err.message;
      }
    }

    async function testDoc(preId) {
      const el = document.getElementById(preId);
      el.style.display = 'block';
      el.textContent = 'Running Document OCR analysis...';
      try {
        const res = await fetch('/api/document/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: 'data:image/jpeg;base64,sample' })
        });
        const data = await res.json();
        el.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        el.textContent = 'Error: ' + err.message;
      }
    }
  </script>
</body>
</html>`);
});

// Root Health & API Explorer
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.GEMINI_API_KEY ? 'Google Gemini 1.5 Flash (Active)' : 'Sahayak Smart AI Fallback Engine (Offline Mode)',
    version: '1.0.0',
  });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Sahayak Backend API',
    description: 'AI Companion & Caregiver Backend for Elderly Citizens',
    endpoints: {
      voice: ['POST /api/voice', 'GET /api/voice/presets'],
      vision: ['POST /api/vision', 'POST /api/document/analyze', 'POST /api/vision/look-around'],
      reminders: [
        'GET /api/reminders',
        'GET /api/reminders/today',
        'GET /api/reminders/upcoming',
        'POST /api/reminders',
        'PUT /api/reminders/:id',
        'PATCH /api/reminders/:id/complete',
        'DELETE /api/reminders/:id',
      ],
      family: [
        'GET /api/family',
        'POST /api/family',
        'PUT /api/family/:id',
        'DELETE /api/family/:id',
      ],
      caregiver: [
        'GET /api/caregiver',
        'GET /api/caregiver/activity',
        'POST /api/caregiver/activity',
      ],
      emergency: [
        'GET /api/emergency-contacts',
        'POST /api/emergency',
        'GET /api/emergency/logs',
      ],
      profile: [
        'GET /api/profile',
        'PUT /api/profile',
      ],
      calls: [
        'POST /api/calls/initiate',
        'POST /api/calls/terminate',
        'GET /api/calls/status/:id',
      ],
    },
  });
});

// Start Express server
if (!process.env.VERCEL) { app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Sahayak Backend Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Gemini AI: ${process.env.GEMINI_API_KEY ? 'Enabled (API Key detected)' : 'Smart Domain Rules Fallback'}`);
  console.log(`===============================================`);
});

}
export default app;
