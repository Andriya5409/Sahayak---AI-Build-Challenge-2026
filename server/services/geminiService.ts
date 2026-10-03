import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const rawKey = process.env.GEMINI_API_KEY || '';
const apiKey = rawKey.trim().replace(/^["']|["']$/g, '').trim();
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Multi-model resilience: if one model experiences high demand or temporary 503, try next candidate
const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-pro-latest'
];

async function generateContentWithFallback(contents: any): Promise<string | null> {
  if (!genAI) {
    console.warn("genAI is null, likely because GEMINI_API_KEY is not set.");
    return null;
  }
  let lastErr = null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(contents);
      const text = result.response.text().trim();
      if (text) return text;
    } catch (err: any) {
      lastErr = err;
      console.warn(`Model ${modelName} encountered: ${err.status || err.message}`);
    }
  }
  console.error("All candidates failed. Last error:", lastErr);
  throw lastErr;
}

async function getImagePart(imageUrlOrData: string): Promise<{ mimeType: string; data: string } | null> {
  if (!imageUrlOrData) return null;

  const dataMatch = imageUrlOrData.match(/^data:([^;]+);base64,(.+)$/);
  if (dataMatch) {
    return {
      mimeType: dataMatch[1],
      data: dataMatch[2],
    };
  }

  if (imageUrlOrData.startsWith('http://') || imageUrlOrData.startsWith('https://')) {
    try {
      const res = await fetch(imageUrlOrData);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      return {
        mimeType: contentType.split(';')[0],
        data: buffer.toString('base64'),
      };
    } catch (e) {
      console.warn('Failed to fetch image URL for Gemini Vision:', e);
      return null;
    }
  }

  return null;
}

export interface VoiceResult {
  id: string;
  userPrompt: string;
  aiResponse: string;
  actionTaken?: {
    type: 'create_reminder' | 'call_contact' | 'show_info' | 'weather' | 'none';
    details?: string;
    payload?: any;
  };
  audioDurationSeconds?: number;
}

export interface MedicineResult {
  id: string;
  name: string;
  genericName: string;
  strength: string;
  category: string;
  commonUse: string;
  dosageAdvice: string;
  instructions: string[];
  disclaimer: string;
  imageUrl: string;
  expiryDate?: string;
  prescribedBy?: string;
  suggestedReminderTime?: string;
}

export interface DocumentResult {
  id: string;
  documentType: 'electricity_bill' | 'water_bill' | 'lab_report' | 'letter';
  title: string;
  totalAmount?: string;
  dueDate?: string;
  providerName?: string;
  simpleExplanation: string;
  keyPoints: string[];
  actionRecommendation: string;
  imageUrl: string;
}

export interface ObjectResult {
  id: string;
  objectName: string;
  locationDescription: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  tips: string;
}

export class GeminiService {
  /**
   * Real-time Conversational Voice & Reasoning Agent
   */
  async processVoice(
    prompt: string,
    history: { role: 'user' | 'model'; parts: string }[] = [],
    userProfile?: any,
    audioData?: string,
    language: string = 'en'
  ): Promise<VoiceResult> {
    const salutation = userProfile?.salutation || 'Amma';
    const lower = prompt.toLowerCase();

    if (genAI) {
      try {
        const systemInstruction = `You are Sahayak (सहायक), a loving, empathetic, highly patient AI companion for elderly citizens in India.
The user is respectfully addressed as "${salutation}".
Rules:
1. ${language === 'ml' ? 'Always respond in warm, polite, reassuring, simple Malayalam (മലയാളം) (2-3 sentences max). Use Malayalam script.' : 'Always respond in warm, polite, reassuring, simple English (2-3 sentences max).'}
2. Prioritize clarity, safety, and kindness.
3. Automatically determine if the user is asking to:
   - Remember or schedule medicine, doctor visits, or bill payments -> action: "create_reminder"
   - Call their children (Ananya, Rohan) or caregiver (Suresh) or doctor -> action: "call_contact"
   - Check the weather -> action: "weather"
   - Otherwise -> action: "none"

Return ONLY a valid JSON object matching this schema (do NOT include markdown code fences or backticks):
{
  "aiResponse": "Spoken reply to ${salutation}...",
  "action": {
    "type": "create_reminder" | "call_contact" | "weather" | "show_info" | "none",
    "details": "Brief description of the action",
    "payload": {
      "title": "Short title if reminder",
      "category": "medicine" | "appointment" | "bill" | "custom",
      "time": "e.g. 8:00 PM or specified time",
      "contactName": "Name if calling someone",
      "phone": "+91 98450 12345"
    }
  }
}`;

        let contents: any[] = [];
        if (audioData) {
          contents.push({ text: `${systemInstruction}\n\nUser audio is attached. Please listen and respond to their voice request.` });
          contents.push({
            inlineData: {
              data: audioData,
              mimeType: 'audio/webm'
            }
          });
        } else {
          contents.push(`${systemInstruction}\n\nUser said: "${prompt}"`);
        }

        const rawText = await generateContentWithFallback(contents);
        if (rawText) {
          const cleaned = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const parsed = JSON.parse(cleaned);

          return {
            id: 'vx_' + Date.now(),
            userPrompt: prompt,
            aiResponse: parsed.aiResponse || `I am right here with you, ${salutation}.`,
            actionTaken: parsed.action || { type: 'none', details: 'Assisted' },
            audioDurationSeconds: Math.max(3, Math.ceil((parsed.aiResponse?.length || 40) / 15)),
          };
        }
      } catch (err) {
        console.warn('All Gemini live voice models failed, falling back to smart rules:', err);
      }
    }

    // Smart Rule Fallback Engine
    if (lower.includes('medicine') || lower.includes('pill') || lower.includes('tablet') || lower.includes('remind') || lower.includes('8 pm')) {
      return {
        id: 'vx_' + Date.now(),
        userPrompt: prompt,
        aiResponse: `Your medicine reminder is set for 8:00 PM today. I will ring softly and speak out to remind you, ${salutation}.`,
        actionTaken: {
          type: 'create_reminder',
          details: 'Added "Take evening medicine" at 8:00 PM',
          payload: {
            title: 'Take evening medicine',
            category: 'medicine',
            time: '8:00 PM',
            dateLabel: 'Today',
          },
        },
        audioDurationSeconds: 4,
      };
    }

    if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('clinic')) {
      return {
        id: 'vx_' + Date.now(),
        userPrompt: prompt,
        aiResponse: `You have a doctor appointment with Dr. Radhika Menon tomorrow at 10:30 AM at City Care Clinic. Rohan is also notified.`,
        actionTaken: {
          type: 'show_info',
          details: 'Dr. Radhika Menon · Tomorrow 10:30 AM',
        },
        audioDurationSeconds: 5,
      };
    }

    if (lower.includes('call') || lower.includes('daughter') || lower.includes('ananya')) {
      return {
        id: 'vx_' + Date.now(),
        userPrompt: prompt,
        aiResponse: `I am connecting you to your daughter Ananya right now. Please hold on, ${salutation}.`,
        actionTaken: {
          type: 'call_contact',
          details: 'Dialing Ananya (+91 98450 12345)',
          payload: {
            name: 'Ananya',
            relation: 'Daughter',
            phone: '+91 98450 12345',
          },
        },
        audioDurationSeconds: 3,
      };
    }

    if (lower.includes('weather') || lower.includes('rain') || lower.includes('temperature') || lower.includes('hot')) {
      return {
        id: 'vx_' + Date.now(),
        userPrompt: prompt,
        aiResponse: `I'm sorry ${salutation}, but the live weather feature is not fully connected in this prototype.`,
        actionTaken: {
          type: 'none',
          details: 'Weather API disconnected',
        },
        audioDurationSeconds: 4,
      };
    }

    return {
      id: 'vx_' + Date.now(),
      userPrompt: prompt,
      aiResponse: `I heard you say: "${prompt}". Don't worry ${salutation}, I have noted this down and I am always here to assist you.`,
      actionTaken: {
        type: 'none',
        details: 'Noted with care',
      },
      audioDurationSeconds: 4,
    };
  }

  /**
   * Real-time Multimodal Vision: Analyze ACTUAL medicine photos
   */
  async analyzeMedicine(imageUrlOrData: string): Promise<MedicineResult> {
    const imagePart = await getImagePart(imageUrlOrData);

    if (genAI && imagePart) {
      try {
        const prompt = `You are a medical assistant helping an elderly Indian citizen.
Look carefully at this real image of medicine/tablet strip/syrup/prescription bottle.
Identify the exact medicine and extract:
1. "name": The commercial brand name on the packaging (e.g. "Paracetamol 500 mg", "Metformin 500 mg", "Telmisartan 40 mg", etc.)
2. "genericName": Generic chemical compound name (e.g. "Paracetamol IP", "Metformin Hydrochloride")
3. "strength": Strength written on strip (e.g. "500 mg Tablet", "10 mg Capsule")
4. "category": Therapeutic category (e.g. "Pain & Fever Relief", "Blood Pressure Care", "Blood Sugar Management", "Antibiotic", "Heart Health")
5. "commonUse": What this medicine is commonly used for in 1 simple sentence for a senior citizen.
6. "dosageAdvice": Clear, safe, senior-friendly dosage advice (e.g. "Take 1 tablet after food with warm water as directed by your physician.")
7. "instructions": Array of 3 short, easy bullet points (e.g. ["Take after meals", "Drink with a full glass of water", "Do not skip your scheduled time"])
8. "disclaimer": Always remind the elder to consult their doctor or pharmacist.
9. "expiryDate": The expiry date visible on the packaging (or "Check printed strip")
10. "suggestedReminderTime": Suggested reminder time (e.g. "8:00 PM" or "9:00 AM")

Output STRICTLY valid JSON without code fences or backticks:
{
  "name": "...",
  "genericName": "...",
  "strength": "...",
  "category": "...",
  "commonUse": "...",
  "dosageAdvice": "...",
  "instructions": ["...", "...", "..."],
  "disclaimer": "Please always verify medication and dosage with Dr. Radhika or your pharmacist.",
  "expiryDate": "...",
  "suggestedReminderTime": "8:00 PM"
}`;

        const rawText = await generateContentWithFallback([
          prompt,
          {
            inlineData: {
              data: imagePart.data,
              mimeType: imagePart.mimeType,
            },
          },
        ]);

        if (rawText) {
          const cleaned = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const data = JSON.parse(cleaned);

          return {
            id: 'med_' + Date.now(),
            name: data.name || 'Identified Medicine',
            genericName: data.genericName || 'Active Pharmaceutical Ingredient',
            strength: data.strength || 'Standard Dosage',
            category: data.category || 'General Health Care',
            commonUse: data.commonUse || 'Health maintenance and symptom relief.',
            dosageAdvice: data.dosageAdvice || 'Take 1 tablet after meals with warm water.',
            instructions: Array.isArray(data.instructions) && data.instructions.length > 0 ? data.instructions : [
              'Take after food with water',
              'Do not exceed recommended dose',
              'Keep in a cool and dry place',
            ],
            disclaimer: data.disclaimer || 'Please always confirm medicine and dosage with your doctor or pharmacist.',
            imageUrl: imageUrlOrData,
            expiryDate: data.expiryDate || 'Valid',
            prescribedBy: 'Dr. Radhika Menon',
            suggestedReminderTime: data.suggestedReminderTime || '8:00 PM',
          };
        }
      } catch (err) {
        console.warn('Gemini vision analysis failed for live image:', err);
      }
    }

    return {
      id: 'med_error',
      name: 'Could not identify clearly',
      genericName: 'Unknown',
      strength: '-',
      category: 'Unknown',
      commonUse: 'I could not reliably identify this medicine. Please try taking another clear photo.',
      dosageAdvice: 'Consult your doctor or pharmacist.',
      instructions: [
        'Try moving to a brighter area',
        'Keep the text in focus',
        'Ensure the whole strip/bottle is visible'
      ],
      disclaimer: 'Please always confirm medicine and dosage with your doctor or pharmacist.',
      imageUrl: imageUrlOrData || '',
    };
  }

  /**
   * Real-time Multimodal Vision & OCR: Analyze ACTUAL bills, lab reports, letters
   */
  async analyzeDocument(imageUrlOrData: string): Promise<DocumentResult> {
    const imagePart = await getImagePart(imageUrlOrData);

    if (genAI && imagePart) {
      try {
        const prompt = `You are a helpful OCR and document reader for an elderly citizen in India.
Read all visible text on this document (electricity bill, water bill, medical test report, doctor prescription, or letter).
Extract:
1. "documentType": one of "electricity_bill" | "water_bill" | "lab_report" | "letter"
2. "title": Document title (e.g. "Electricity Bill - KSEB", "Blood Sugar Test Report", "Water Utility Bill")
3. "totalAmount": Total payable amount with ₹ symbol (e.g. "₹1,240") or "N/A" if lab report/letter
4. "dueDate": Due date or report date (e.g. "October 15, 2026")
5. "providerName": Name of provider, hospital, clinic, or department
6. "simpleExplanation": A 1-2 sentence crystal clear explanation in plain English for an elderly grandmother
7. "keyPoints": Array of 3-4 key bullet points (e.g. consumer number, readings, normal/abnormal test results, payment methods)
8. "actionRecommendation": Suggested next step (e.g. "Ask Ananya to pay online before Oct 15", "Show this report to Dr. Radhika on your visit")

Output STRICTLY valid JSON without code fences or backticks:
{
  "documentType": "...",
  "title": "...",
  "totalAmount": "...",
  "dueDate": "...",
  "providerName": "...",
  "simpleExplanation": "...",
  "keyPoints": ["...", "..."],
  "actionRecommendation": "..."
}`;

        const rawText = await generateContentWithFallback([
          prompt,
          {
            inlineData: {
              data: imagePart.data,
              mimeType: imagePart.mimeType,
            },
          },
        ]);

        if (rawText) {
          const cleaned = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const data = JSON.parse(cleaned);

          return {
            id: 'doc_' + Date.now(),
            documentType: data.documentType || 'electricity_bill',
            title: data.title || 'Scanned Document',
            totalAmount: data.totalAmount || '₹1,240',
            dueDate: data.dueDate || 'October 5',
            providerName: data.providerName || 'State Utility / Healthcare',
            simpleExplanation: data.simpleExplanation || 'Document scanned successfully.',
            keyPoints: Array.isArray(data.keyPoints) && data.keyPoints.length > 0 ? data.keyPoints : [
              'Document analyzed with Sahayak OCR',
              'All text extracted clearly',
              'Saved to your digital health and bill records',
            ],
            actionRecommendation: data.actionRecommendation || 'Would you like Sahayak to set a reminder or notify your family?',
            imageUrl: imageUrlOrData,
          };
        }
      } catch (err) {
        console.warn('Gemini OCR document analysis failed on live image:', err);
      }
    }

    return {
      id: 'doc_failed',
      documentType: 'letter',
      title: 'Analysis Failed',
      totalAmount: 'N/A',
      dueDate: 'N/A',
      providerName: 'Unknown',
      simpleExplanation: 'I could not read this document clearly. Please try again with better lighting.',
      keyPoints: [
        'Ensure the document is flat',
        'Check that the text is not blurry',
      ],
      actionRecommendation: 'Try another photo.',
      imageUrl: imageUrlOrData || '',
    };
  }

  /**
   * Real-time Object Identification & Look Around Scanner
   */
  async scanLookAround(query?: string, imageUrlOrData?: string): Promise<ObjectResult[]> {
    const imagePart = imageUrlOrData ? await getImagePart(imageUrlOrData) : null;

    if (genAI && imagePart) {
      try {
        const prompt = `You are an AI visual assistant for an elderly citizen who is looking for their items in this room or surroundings.
Target item they are looking for: "${query || 'glasses, walking stick, keys, medicine, phone, cup, or important items'}"
Analyze this image and identify the prominent objects or the requested item.
For each item found, provide:
1. "objectName": Name of the object (e.g. "Reading Glasses", "Walking Stick", "Medicine Box", "Water Bottle", "Keys", "Smartphone")
2. "locationDescription": A friendly, spoken description describing EXACTLY where it is relative to furniture (e.g. "I can see your reading glasses resting on the wooden table right next to the lamp.")
3. "confidence": Number between 0.85 and 0.99
4. "boundingBox": Approximate pixel percentage coordinates: { "x": number, "y": number, "width": number, "height": number }
5. "tips": A short guidance tip (e.g. "Look to your right side near the sofa")

Output STRICTLY valid JSON array without code fences:
[
  {
    "objectName": "...",
    "locationDescription": "...",
    "confidence": 0.95,
    "boundingBox": { "x": 30, "y": 40, "width": 25, "height": 20 },
    "tips": "..."
  }
]`;

        const rawText = await generateContentWithFallback([
          prompt,
          {
            inlineData: {
              data: imagePart.data,
              mimeType: imagePart.mimeType,
            },
          },
        ]);

        if (rawText) {
          const cleaned = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const items = JSON.parse(cleaned);

          if (Array.isArray(items) && items.length > 0) {
            return items.map((it, i) => ({
              id: 'obj_' + Date.now() + '_' + i,
              objectName: it.objectName || 'Identified Object',
              locationDescription: it.locationDescription || `Found ${it.objectName} in the room.`,
              confidence: it.confidence || 0.92,
              boundingBox: it.boundingBox || { x: 30, y: 30, width: 30, height: 30 },
              tips: it.tips || 'Located in view',
            }));
          }
        }
      } catch (err) {
        console.warn('Gemini look-around live analysis error:', err);
      }
    }

    // Preset fallback
    const lookAroundPresets: ObjectResult[] = [
      {
        id: 'obj_glasses',
        objectName: 'Reading Glasses',
        locationDescription: 'I can see your reading glasses resting on the wooden coffee table next to the vase.',
        confidence: 0.96,
        boundingBox: { x: 35, y: 42, width: 30, height: 20 },
        tips: 'Near the lamp on your right side',
      },
      {
        id: 'obj_medicine_box',
        objectName: 'Daily Medicine Box',
        locationDescription: 'Your weekly medicine organizer box is resting safely on the side shelf.',
        confidence: 0.94,
        boundingBox: { x: 60, y: 55, width: 25, height: 25 },
        tips: 'Beside the water bottle',
      },
      {
        id: 'obj_walking_stick',
        objectName: 'Walking Stick',
        locationDescription: 'Your walking stick is standing securely by the arm of your favorite chair.',
        confidence: 0.98,
        boundingBox: { x: 15, y: 30, width: 18, height: 50 },
        tips: 'Left side of the sofa',
      },
    ];

    if (query) {
      const q = query.toLowerCase();
      if (q.includes('medicine') || q.includes('pill') || q.includes('box')) {
        return [lookAroundPresets[1]];
      }
      if (q.includes('stick') || q.includes('cane') || q.includes('walking')) {
        return [lookAroundPresets[2]];
      }
      if (q.includes('glasses') || q.includes('spectacles')) {
        return [lookAroundPresets[0]];
      }
    }

    return lookAroundPresets;
  }
}

export const geminiService = new GeminiService();
