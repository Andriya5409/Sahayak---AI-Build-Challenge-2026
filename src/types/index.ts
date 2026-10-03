export type Language = 'en' | 'ml'; // English or Malayalam

export type TextSize = 'small' | 'medium' | 'large';

export type VoiceGender = 'female' | 'male';

export type SpeechSpeed = 'slow' | 'normal';

export interface UserProfile {
  id: string;
  name: string;
  salutation: string;
  avatar: string;
  city: string;
  language: Language;
  textSize: TextSize;
  voiceGender: VoiceGender;
  speechSpeed: SpeechSpeed;
  highContrast: boolean;
  simplifiedMode: boolean;
  soundVolume: number;
}

export type ReminderCategory = 'medicine' | 'appointment' | 'bill' | 'custom';

export interface Reminder {
  id: string;
  title: string;
  category: ReminderCategory;
  time: string; // e.g., '8:00 PM'
  dateLabel: string; // e.g., 'Today', 'Tomorrow', 'Oct 5'
  datetime: string; // ISO string
  completed: boolean;
  dosageOrNotes?: string;
  doctorName?: string;
  amount?: string;
  icon: string;
}

export interface FamilyContact {
  id: string;
  name: string;
  relation: string; // e.g., 'Daughter', 'Son', 'Caregiver'
  relationKey: string;
  phone: string;
  avatar: string;
  avatarBg: string;
  status: string; // e.g., 'Last talked yesterday', 'Available 24/7'
  isCaregiver?: boolean;
  isEmergencyContact?: boolean;
}

export type VoiceState = 'ready' | 'listening' | 'thinking' | 'speaking';

export interface VoiceExchange {
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

export type CameraCaptureMode = 'medicine' | 'document' | 'object' | 'look_around';

export interface MedicineVisionResult {
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

export interface DocumentVisionResult {
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

export interface ObjectVisionResult {
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

export type ActiveCallState = 'idle' | 'confirming' | 'dialing' | 'connected' | 'ended';

export interface ActiveCall {
  contact: FamilyContact | { name: string; relation: string; phone: string; isEmergency?: boolean };
  state: ActiveCallState;
  durationSeconds: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  isEmergencyCall?: boolean;
}

export interface WeatherInfo {
  temperature: string;
  condition: string;
  icon: string;
  summary: string;
}
