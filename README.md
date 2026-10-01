# Sahayak (സഹായക്) — Elderly-Friendly Voice & Camera AI Companion

> **"Just speak. Just show. Sahayak will help."**
> 
> *ChatGPT answers when you ask. Sahayak is designed around the elderly person's daily life and helps them through simple voice, vision, and actions.*

---

## 🌟 Overview & Key Differentiators

**Sahayak** is a production-grade, accessible frontend built for elderly users living independently. Designed with empathy and high-contrast ergonomics, Sahayak eliminates confusing menus, tiny text, and complex app structures.

### Core Pillars

1. **Voice-First Interaction & Voice Everywhere (🔊 Hear this):**
   - 4-state conversational voice flow (**Ready**, **Listening**, **Thinking**, **Speaking**)
   - Real Web Speech API audio synthesis with warm, measured cadence tuned for seniors.
   - Built-in one-tap starter queries for immediate testing.
   - Every result card, reminder, and bill has an instant *"Hear this"* voice button.

2. **Multimodal Visual Understanding (📷 Show Sahayak):**
   - **Medicine Recognition:** Analyzes tablets/capsules, generic name, strength (e.g. Paracetamol 500mg), usage instructions, and safety advisory.
   - **Document & Bill Breakdown:** Explains utility bills (e.g. ₹1,240 due October 5) in clear, plain language with direct reminder scheduling.
   - **Look Around Mode (👓 Continuous AR Tracking):** Realtime room scanning that locates lost items (glasses, medicine boxes, walking stick) with bounding box overlays.

3. **Proactive Daily Home:**
   - Instead of an empty chat screen, Amma is greeted proactively with today's weather, next scheduled medicine, and upcoming doctor appointments.

4. **Family Circle & Caregiver Transparency:**
   - Instant touch-to-call for Daughter (Ananya), Son (Rohan), and Caregiver (Suresh).
   - Dedicated Caregiver Portal view allowing family members to monitor medicine adherence and safety while protecting private conversations.
   - Safeguarded Emergency SOS (112 / Caregiver) with confirmation dialogues to prevent accidental triggers.

5. **Accessibility & Multilingual Support (English & Malayalam):**
   - Instant 1-tap language switch between **English** and **മലയാളം (Malayalam)**.
   - 3-step text scaling (**Standard**, **Large**, **Extra Large Elder Mode**).
   - High Contrast Mode (deep charcoal & high-visibility yellow with 21:1 contrast).
   - Speech speed adjustment (Slow & Clear 0.8x vs. Normal 1.0x).

---

## 🧭 Complete Demo Flow (AI Hackathon Walkthrough)

An interactive **Demo Tour Bar** is pinned to the top of the app:

1. **Home Screen (`/home`):** View proactive greeting, next medicine (8:00 PM), doctor appointment, weather, and large action buttons.
2. **Talk to Sahayak (`/voice`):** Tap the big mic or select *"Remind me to take my medicine at 8 PM"*. Watch animated sound waves, thinking state, and voice response.
3. **Reminders Dashboard (`/reminders`):** Notice the newly created 8 PM medicine reminder in the schedule. Tap *"Mark Taken"* or listen with TTS.
4. **Show Sahayak (`/camera`):** Point camera at medicine or documents.
5. **Medicine Vision Result (`/vision-medicine`):** View Paracetamol 500mg dosage, doctor advisory, hear voice explanation, or tap *"Set reminder"*.
6. **Bill Explanation (`/vision-document`):** Scanned ₹1,240 bill with 1-tap payment reminder.
7. **Look Around Mode (`/look-around`):** Ask *"Where are my glasses?"* and view the highlighted bounding box on the table.
8. **Family & Calling (`/family` -> `/calling`):** Tap *Call Daughter Ananya*, confirm modal, and experience the live calling screen with timers and mute controls.
9. **Emergency SOS (`/emergency`):** Priority dispatch to family, caregiver, or 112 with safeguards.
10. **Caregiver Portal (`/caregiver`):** View family circle medicine adherence and activity logs.

---

## 🛠️ Architecture & Backend Integration Points

All backend logic is cleanly decoupled into service placeholders located in `src/services/`. A backend developer can easily connect live APIs:

| Service File | Purpose | Production Backend Endpoint |
|---|---|---|
| [`src/services/voiceService.ts`](file:///c:/Sahayak-ui/src/services/voiceService.ts) | Speech recognition & conversational AI dialogue | `POST /api/voice/process` (Gemini Live / Whisper) |
| [`src/services/visionService.ts`](file:///c:/Sahayak-ui/src/services/visionService.ts) | Medicine OCR, bill parsing, and object detection | `POST /api/vision/analyze` (Gemini 1.5 Flash Vision) |
| [`src/services/ttsService.ts`](file:///c:/Sahayak-ui/src/services/ttsService.ts) | Text-to-Speech audio streaming & synthesis | Web Speech API / ElevenLabs / Google Cloud TTS |
| [`src/services/reminderService.ts`](file:///c:/Sahayak-ui/src/services/reminderService.ts) | CRUD reminders & notification scheduling | `GET/POST/PATCH /api/reminders` |
| [`src/services/familyService.ts`](file:///c:/Sahayak-ui/src/services/familyService.ts) | Trusted circle contacts & caregiver sync | `GET /api/family/contacts` |
| [`src/services/callService.ts`](file:///c:/Sahayak-ui/src/services/callService.ts) | WebRTC / telephony calling & SOS alerts | `POST /api/calls/initiate`, `POST /api/emergency/sos` |

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```
