import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'sahayak_db.json');

export interface Reminder {
  id: string;
  title: string;
  category: 'medicine' | 'appointment' | 'bill' | 'custom';
  time: string;
  dateLabel: string;
  datetime: string;
  completed: boolean;
  dosageOrNotes?: string;
  doctorName?: string;
  amount?: string;
  icon: string;
}

export interface FamilyContact {
  id: string;
  name: string;
  relation: string;
  relationKey: string;
  phone: string;
  avatar: string;
  avatarBg: string;
  status: string;
  isCaregiver?: boolean;
  isEmergencyContact?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  salutation: string;
  avatar: string;
  city: string;
  language: 'en';
  textSize: 'small' | 'medium' | 'large';
  voiceGender: 'female' | 'male';
  speechSpeed: 'slow' | 'normal';
  highContrast: boolean;
  simplifiedMode: boolean;
  soundVolume: number;
}

export interface EmergencyEvent {
  id: string;
  timestamp: string;
  details: string;
  dispatchedTo: string[];
  status: 'dispatched' | 'acknowledged' | 'resolved';
}

export interface CaregiverActivity {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'medicine' | 'checkup' | 'call' | 'alert';
}

interface SahayakDatabase {
  profile: UserProfile;
  reminders: Reminder[];
  family: FamilyContact[];
  emergencyEvents: EmergencyEvent[];
  caregiverActivities: CaregiverActivity[];
}

const defaultProfile: UserProfile = {
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

const defaultReminders: Reminder[] = [
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

const defaultFamily: FamilyContact[] = [
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

const defaultCaregiverActivities: CaregiverActivity[] = [
  {
    id: 'act_1',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    title: 'Morning Medication Taken',
    description: 'Amma confirmed morning calcium supplement taken on time.',
    type: 'medicine',
  },
  {
    id: 'act_2',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    title: 'Daily Vitals Checkup Logged',
    description: 'Blood pressure 125/82 mmHg, Pulse 72 bpm. Stable.',
    type: 'checkup',
  },
  {
    id: 'act_3',
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    title: 'Family Call with Ananya',
    description: 'Connected audio call with daughter Ananya for 14 minutes.',
    type: 'call',
  }
];

class Store {
  private data: SahayakDatabase;

  constructor() {
    this.data = this.load();
  }

  private load(): SahayakDatabase {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to load database from file, using initial data:', e);
    }

    const initial: SahayakDatabase = {
      profile: defaultProfile,
      reminders: defaultReminders,
      family: defaultFamily,
      emergencyEvents: [],
      caregiverActivities: defaultCaregiverActivities,
    };
    this.save(initial);
    return initial;
  }

  private save(dataToSave?: SahayakDatabase) {
    try {
      const data = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save database to file:', e);
    }
  }

  // Profile
  getProfile(): UserProfile {
    return { ...this.data.profile };
  }

  updateProfile(updates: Partial<UserProfile>): UserProfile {
    this.data.profile = { ...this.data.profile, ...updates };
    this.save();
    return { ...this.data.profile };
  }

  // Reminders
  getReminders(): Reminder[] {
    return [...this.data.reminders];
  }

  getTodayReminders(): Reminder[] {
    return this.data.reminders.filter((r) => r.dateLabel.toLowerCase() === 'today');
  }

  getUpcomingReminders(): Reminder[] {
    return this.data.reminders.filter((r) => !r.completed);
  }

  addReminder(reminderData: Omit<Reminder, 'id'>): Reminder {
    const newReminder: Reminder = {
      ...reminderData,
      id: 'rem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      completed: reminderData.completed ?? false,
    };
    this.data.reminders.unshift(newReminder);
    this.save();
    return newReminder;
  }

  updateReminder(id: string, updates: Partial<Reminder>): Reminder | null {
    const idx = this.data.reminders.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.data.reminders[idx] = { ...this.data.reminders[idx], ...updates };
    this.save();
    return { ...this.data.reminders[idx] };
  }

  toggleReminderCompleted(id: string): Reminder | null {
    const item = this.data.reminders.find((r) => r.id === id);
    if (!item) return null;
    item.completed = !item.completed;
    if (item.completed && item.category === 'medicine') {
      this.addCaregiverActivity({
        title: `Medicine Taken: ${item.title}`,
        description: `Marked completed at ${new Date().toLocaleTimeString()}`,
        type: 'medicine',
      });
    }
    this.save();
    return { ...item };
  }

  deleteReminder(id: string): boolean {
    const prevLen = this.data.reminders.length;
    this.data.reminders = this.data.reminders.filter((r) => r.id !== id);
    if (this.data.reminders.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Family Contacts
  getFamily(): FamilyContact[] {
    return [...this.data.family];
  }

  getEmergencyContacts(): FamilyContact[] {
    return this.data.family.filter((c) => c.isEmergencyContact || c.isCaregiver);
  }

  addFamilyContact(contact: Omit<FamilyContact, 'id'>): FamilyContact {
    const newContact: FamilyContact = {
      ...contact,
      id: 'fam_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    };
    this.data.family.push(newContact);
    this.save();
    return newContact;
  }

  updateFamilyContact(id: string, updates: Partial<FamilyContact>): FamilyContact | null {
    const idx = this.data.family.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    this.data.family[idx] = { ...this.data.family[idx], ...updates };
    this.save();
    return { ...this.data.family[idx] };
  }

  deleteFamilyContact(id: string): boolean {
    const prevLen = this.data.family.length;
    this.data.family = this.data.family.filter((f) => f.id !== id);
    if (this.data.family.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Caregiver
  getCaregiver() {
    const caregiverContact = this.data.family.find((f) => f.isCaregiver);
    const totalMeds = this.data.reminders.filter((r) => r.category === 'medicine').length;
    const completedMeds = this.data.reminders.filter((r) => r.category === 'medicine' && r.completed).length;

    return {
      caregiver: caregiverContact || {
        name: 'Suresh Kumar',
        relation: 'Primary Caregiver & Nurse',
        phone: '+91 98450 11223',
        status: 'Active on duty',
      },
      patient: this.data.profile,
      medicineAdherence: {
        completed: completedMeds,
        total: totalMeds,
        adherencePercentage: totalMeds > 0 ? Math.round((completedMeds / totalMeds) * 100) : 100,
      },
      doctorAppointment: {
        doctor: 'Dr. Radhika Menon',
        speciality: 'Cardiologist',
        datetime: 'Tomorrow at 10:30 AM',
        clinic: 'City Care Clinic',
      },
      safetyStatus: 'Safe & Active',
      lastSync: new Date().toISOString(),
    };
  }

  getCaregiverActivities(): CaregiverActivity[] {
    return [...this.data.caregiverActivities];
  }

  addCaregiverActivity(activity: Omit<CaregiverActivity, 'id' | 'timestamp'>): CaregiverActivity {
    const newAct: CaregiverActivity = {
      ...activity,
      id: 'act_' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    this.data.caregiverActivities.unshift(newAct);
    this.save();
    return newAct;
  }

  // Emergency Events
  recordEmergency(details: string, dispatchedTo: string[]): EmergencyEvent {
    const event: EmergencyEvent = {
      id: 'emg_' + Date.now(),
      timestamp: new Date().toISOString(),
      details,
      dispatchedTo,
      status: 'dispatched',
    };
    this.data.emergencyEvents.unshift(event);
    this.addCaregiverActivity({
      title: '🚨 Emergency Alert Triggered',
      description: details,
      type: 'alert',
    });
    this.save();
    return event;
  }

  getEmergencyEvents(): EmergencyEvent[] {
    return [...this.data.emergencyEvents];
  }
}

export const store = new Store();
