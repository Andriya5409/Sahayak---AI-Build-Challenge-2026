import { 
  UserProfile, 
  Reminder, 
  FamilyContact, 
  MedicineVisionResult, 
  DocumentVisionResult, 
  ObjectVisionResult, 
  WeatherInfo,
  VoiceExchange 
} from '../types';

export const mockUserProfile: UserProfile = {
  id: 'user_amma_01',
  name: 'Amma (Kalyani Ammal)',
  salutation: 'Amma',
  avatar: '👵🏽',
  city: 'Kochi, Kerala',
  language: 'en',
  textSize: 'large',
  voiceGender: 'female',
  speechSpeed: 'slow',
  highContrast: false,
  simplifiedMode: false,
  soundVolume: 90,
};

export const mockWeather: WeatherInfo = {
  temperature: '28°C',
  condition: 'Partly cloudy',
  icon: '☀️',
  summary: 'Pleasant gentle breeze today. Good for an evening stroll.',
};

export const initialReminders: Reminder[] = [
  {
    id: 'rem_1',
    title: 'Take evening medicine',
    category: 'medicine',
    time: '8:00 PM',
    dateLabel: 'Today',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
    completed: false,
    dosageOrNotes: 'Paracetamol 500mg & BP tablet after dinner with warm water',
    icon: '💊',
  },
  {
    id: 'rem_2',
    title: 'Doctor appointment',
    category: 'appointment',
    time: '10:30 AM',
    dateLabel: 'Tomorrow',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    completed: false,
    doctorName: 'Dr. Radhika Menon (Cardiologist at City Care Clinic)',
    dosageOrNotes: 'Carry previous blood sugar and ECG report files',
    icon: '🏥',
  },
  {
    id: 'rem_3',
    title: 'Pay electricity bill',
    category: 'bill',
    time: '4:00 PM',
    dateLabel: 'Tomorrow',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString(),
    completed: false,
    amount: '₹1,240',
    dosageOrNotes: 'Due date Oct 5 · Consumer #44921',
    icon: '💳',
  },
  {
    id: 'rem_4',
    title: 'Morning Calcium tablet',
    category: 'medicine',
    time: '9:00 AM',
    dateLabel: 'Today',
    datetime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    completed: true,
    dosageOrNotes: 'Taken with breakfast',
    icon: '💊',
  }
];

export const mockFamilyContacts: FamilyContact[] = [
  {
    id: 'fam_1',
    name: 'Ananya',
    relation: 'Daughter',
    relationKey: 'daughter',
    phone: '+91 98450 12345',
    avatar: '👩🏽',
    avatarBg: 'bg-rose-100 text-rose-700',
    status: 'Last talked yesterday · Online',
    isEmergencyContact: true,
  },
  {
    id: 'fam_2',
    name: 'Rohan',
    relation: 'Son',
    relationKey: 'son',
    phone: '+91 98450 67890',
    avatar: '👨🏽',
    avatarBg: 'bg-blue-100 text-blue-700',
    status: 'Last talked 2 days ago · Bengaluru',
    isEmergencyContact: true,
  },
  {
    id: 'fam_3',
    name: 'Suresh',
    relation: 'Caregiver & Nurse',
    relationKey: 'caregiver',
    phone: '+91 98450 11223',
    avatar: '👨🏻‍⚕️',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    status: 'Available 24/7 · Nearby',
    isCaregiver: true,
    isEmergencyContact: true,
  }
];

export const mockMedicineResult: MedicineVisionResult = {
  id: 'med_paracetamol_500',
  name: 'Paracetamol 500 mg',
  genericName: 'Paracetamol (Acetaminophen)',
  strength: '500 mg Tablet',
  category: 'Pain relief & fever reducer',
  commonUse: 'Relief of mild to moderate fever, headache, body aches, and joint stiffness.',
  dosageAdvice: 'Take 1 tablet after meals with a full glass of water. Do not take more than 4 tablets in 24 hours.',
  instructions: [
    'Take 1 tablet after food',
    'Drink a full glass of water',
    'Keep at least 6 hours gap between doses'
  ],
  disclaimer: 'Please always confirm medicine and dosage with your doctor or pharmacist.',
  imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  expiryDate: 'Exp: 11/2027',
  prescribedBy: 'Dr. Radhika Menon',
  suggestedReminderTime: '8:00 PM'
};

export const mockDocumentResult: DocumentVisionResult = {
  id: 'doc_bill_kseb_1240',
  documentType: 'electricity_bill',
  title: 'Electricity Utility Bill',
  totalAmount: '₹1,240',
  dueDate: 'October 5',
  providerName: 'State Electricity Board (KSEB)',
  simpleExplanation: 'Your electricity bill is ₹1,240 and needs to be paid by October 5.',
  keyPoints: [
    'Consumer Name: Kalyani Ammal',
    'Bill Period: September 2026',
    'Amount Payable: ₹1,240',
    'Last Date without fine: October 5'
  ],
  actionRecommendation: 'Would you like Sahayak to set a reminder or notify Ananya to pay online?',
  imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
};

export const mockLookAroundObjects: ObjectVisionResult[] = [
  {
    id: 'obj_glasses',
    objectName: 'Reading Glasses',
    locationDescription: 'I can see something that looks like your glasses on the wooden table next to the flower vase.',
    confidence: 0.96,
    boundingBox: { x: 35, y: 42, width: 30, height: 20 },
    tips: 'Near the lamp on your right side'
  },
  {
    id: 'obj_medicine_box',
    objectName: 'Daily Medicine Box',
    locationDescription: 'Your weekly medicine organizer box is resting on the side shelf.',
    confidence: 0.94,
    boundingBox: { x: 60, y: 55, width: 25, height: 25 },
    tips: 'Beside the water bottle'
  },
  {
    id: 'obj_walking_stick',
    objectName: 'Walking Stick',
    locationDescription: 'Your walking stick is standing securely by the arm of your favorite chair.',
    confidence: 0.98,
    boundingBox: { x: 15, y: 30, width: 18, height: 50 },
    tips: 'Left side of the sofa'
  }
];

export const mockVoicePresetExchanges: Record<string, VoiceExchange> = {
  medicine_reminder: {
    id: 'vx_1',
    userPrompt: 'Remind me to take my medicine at 8 PM',
    aiResponse: 'Your medicine reminder is set for 8:00 PM today. I will ring softly and speak out to remind you, Amma.',
    actionTaken: {
      type: 'create_reminder',
      details: 'Added "Take evening medicine" at 8:00 PM',
      payload: {
        title: 'Take evening medicine',
        category: 'medicine',
        time: '8:00 PM',
        dateLabel: 'Today',
      }
    },
    audioDurationSeconds: 4
  },
  doctor_appt: {
    id: 'vx_2',
    userPrompt: 'When is my next doctor appointment?',
    aiResponse: 'You have a doctor appointment with Dr. Radhika Menon tomorrow at 10:30 AM at City Care Clinic. Rohan is also informed.',
    actionTaken: {
      type: 'show_info',
      details: 'Dr. Radhika Menon · Tomorrow 10:30 AM'
    },
    audioDurationSeconds: 5
  },
  call_daughter: {
    id: 'vx_3',
    userPrompt: 'Call my daughter Ananya',
    aiResponse: 'I am connecting you to Ananya right now. Please hold on Amma.',
    actionTaken: {
      type: 'call_contact',
      details: 'Dialing Ananya (+91 98450 12345)',
      payload: mockFamilyContacts[0]
    },
    audioDurationSeconds: 3
  },
  weather_check: {
    id: 'vx_4',
    userPrompt: 'How is the weather today?',
    aiResponse: 'The weather in Kochi is pleasant today at 28°C with partly cloudy skies and a gentle cooling breeze.',
    actionTaken: {
      type: 'weather',
      details: '28°C · Partly cloudy'
    },
    audioDurationSeconds: 4
  }
};
