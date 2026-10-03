import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'sahayak_db.json');

// ─── Interfaces (unchanged) ───
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
  language: 'en' | 'ml';
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

// ─── Helpers: snake_case <-> camelCase ───
function toCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toCamel);
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc: any, [key, val]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      acc[camelKey] = toCamel(val);
      return acc;
    }, {});
  }
  return obj;
}

function toSnake(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toSnake);
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc: any, [key, val]) => {
      const snakeKey = key.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());
      acc[snakeKey] = toSnake(val);
      return acc;
    }, {});
  }
  return obj;
}

// ─── Default data (used for local JSON fallback) ───
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
    id: 'rem_1', title: 'Take evening medicine', category: 'medicine', time: '8:00 PM',
    dateLabel: 'Today', datetime: new Date(Date.now() + 1000*60*60*3).toISOString(),
    completed: false, dosageOrNotes: 'Paracetamol 500mg & BP tablet after dinner with warm water', icon: '💊',
  },
  {
    id: 'rem_2', title: 'Doctor appointment', category: 'appointment', time: '10:30 AM',
    dateLabel: 'Tomorrow', datetime: new Date(Date.now() + 1000*60*60*24).toISOString(),
    completed: false, doctorName: 'Dr. Radhika Menon (Cardiologist at City Care Clinic)',
    dosageOrNotes: 'Carry previous blood sugar and ECG report files', icon: '🏥',
  },
  {
    id: 'rem_3', title: 'Pay electricity bill', category: 'bill', time: '4:00 PM',
    dateLabel: 'Tomorrow', datetime: new Date(Date.now() + 1000*60*60*28).toISOString(),
    completed: false, amount: '₹1,240', dosageOrNotes: 'Due date Oct 5 · Consumer #44921', icon: '💳',
  },
  {
    id: 'rem_4', title: 'Morning Calcium tablet', category: 'medicine', time: '9:00 AM',
    dateLabel: 'Today', datetime: new Date(Date.now() - 1000*60*60*2).toISOString(),
    completed: true, dosageOrNotes: 'Taken with breakfast', icon: '💊',
  }
];

const defaultFamily: FamilyContact[] = [
  { id: 'fam_1', name: 'Ananya', relation: 'Daughter', relationKey: 'daughter', phone: '+91 98450 12345', avatar: '👩🏽', avatarBg: 'bg-rose-100 text-rose-700', status: 'Last talked yesterday · Online', isEmergencyContact: true },
  { id: 'fam_2', name: 'Rohan', relation: 'Son', relationKey: 'son', phone: '+91 98450 67890', avatar: '👨🏽', avatarBg: 'bg-blue-100 text-blue-700', status: 'Last talked 2 days ago · Bengaluru', isEmergencyContact: true },
  { id: 'fam_3', name: 'Suresh', relation: 'Caregiver & Nurse', relationKey: 'caregiver', phone: '+91 98450 11223', avatar: '👨🏻‍⚕️', avatarBg: 'bg-emerald-100 text-emerald-700', status: 'Available 24/7 · Nearby', isCaregiver: true, isEmergencyContact: true },
];

const defaultCaregiverActivities: CaregiverActivity[] = [
  { id: 'act_1', timestamp: new Date(Date.now() - 1000*60*120).toISOString(), title: 'Morning Medication Taken', description: 'Amma confirmed morning calcium supplement taken on time.', type: 'medicine' },
  { id: 'act_2', timestamp: new Date(Date.now() - 1000*60*360).toISOString(), title: 'Daily Vitals Checkup Logged', description: 'Blood pressure 125/82 mmHg, Pulse 72 bpm. Stable.', type: 'checkup' },
  { id: 'act_3', timestamp: new Date(Date.now() - 1000*60*1440).toISOString(), title: 'Family Call with Ananya', description: 'Connected audio call with daughter Ananya for 14 minutes.', type: 'call' }
];

// ─── Store implementation ───
class Store {
  private supabase: SupabaseClient | null = null;
  private useSupabase = false;
  private data: SahayakDatabase;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (url && key) {
      this.supabase = createClient(url, key);
      this.useSupabase = true;
      console.log('✅ Supabase connected:', url);
    } else {
      console.log('ℹ️  Supabase not configured. Using local JSON fallback.');
    }
    this.data = this.loadLocal();
  }

  // ── Local JSON fallback ──
  private loadLocal(): SahayakDatabase {
    try {
      if (fs.existsSync(DB_FILE)) {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      }
    } catch (e) { console.warn('JSON load failed:', e); }
    const initial: SahayakDatabase = {
      profile: defaultProfile, reminders: defaultReminders,
      family: defaultFamily, emergencyEvents: [], caregiverActivities: defaultCaregiverActivities,
    };
    this.saveLocal(initial);
    return initial;
  }

  private saveLocal(d?: SahayakDatabase) {
    try { fs.writeFileSync(DB_FILE, JSON.stringify(d || this.data, null, 2), 'utf-8'); } catch (e) { console.error('JSON save error:', e); }
  }

  // ═══ Profile ═══
  async getProfile(): Promise<UserProfile> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('profiles').select('*').eq('id', 'user_amma_01').single();
      if (data) return toCamel(data) as UserProfile;
    }
    return { ...this.data.profile };
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('profiles').update(toSnake(updates)).eq('id', 'user_amma_01').select().single();
      if (data) return toCamel(data) as UserProfile;
    }
    this.data.profile = { ...this.data.profile, ...updates };
    this.saveLocal();
    return { ...this.data.profile };
  }

  // ═══ Reminders ═══
  async getReminders(): Promise<Reminder[]> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('reminders').select('*').order('datetime', { ascending: false });
      if (data) return toCamel(data) as Reminder[];
    }
    return [...this.data.reminders];
  }

  async getTodayReminders(): Promise<Reminder[]> {
    const all = await this.getReminders();
    return all.filter(r => r.dateLabel?.toLowerCase() === 'today');
  }

  async getUpcomingReminders(): Promise<Reminder[]> {
    const all = await this.getReminders();
    return all.filter(r => !r.completed);
  }

  async addReminder(reminderData: Omit<Reminder, 'id'>): Promise<Reminder> {
    const newReminder: Reminder = {
      ...reminderData,
      id: 'rem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      completed: reminderData.completed ?? false,
    };
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('reminders').insert(toSnake(newReminder)).select().single();
      if (data) return toCamel(data) as Reminder;
    }
    this.data.reminders.unshift(newReminder);
    this.saveLocal();
    return newReminder;
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | null> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('reminders').update(toSnake(updates)).eq('id', id).select().single();
      if (data) return toCamel(data) as Reminder;
    }
    const idx = this.data.reminders.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.reminders[idx] = { ...this.data.reminders[idx], ...updates };
    this.saveLocal();
    return { ...this.data.reminders[idx] };
  }

  async toggleReminderCompleted(id: string): Promise<Reminder | null> {
    if (this.useSupabase) {
      const { data: existing } = await this.supabase!.from('reminders').select('*').eq('id', id).single();
      if (!existing) return null;
      const item = toCamel(existing) as Reminder;
      const completed = !item.completed;
      const { data } = await this.supabase!.from('reminders').update({ completed }).eq('id', id).select().single();
      if (completed && item.category === 'medicine') {
        await this.addCaregiverActivity({ title: `Medicine Taken: ${item.title}`, description: `Marked completed at ${new Date().toLocaleTimeString()}`, type: 'medicine' });
      }
      if (data) return toCamel(data) as Reminder;
    }
    const item = this.data.reminders.find(r => r.id === id);
    if (!item) return null;
    item.completed = !item.completed;
    if (item.completed && item.category === 'medicine') {
      await this.addCaregiverActivity({ title: `Medicine Taken: ${item.title}`, description: `Marked completed at ${new Date().toLocaleTimeString()}`, type: 'medicine' });
    }
    this.saveLocal();
    return { ...item };
  }

  async deleteReminder(id: string): Promise<boolean> {
    if (this.useSupabase) {
      const { error } = await this.supabase!.from('reminders').delete().eq('id', id);
      return !error;
    }
    const prev = this.data.reminders.length;
    this.data.reminders = this.data.reminders.filter(r => r.id !== id);
    if (this.data.reminders.length !== prev) { this.saveLocal(); return true; }
    return false;
  }

  // ═══ Family ═══
  async getFamily(): Promise<FamilyContact[]> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('family_contacts').select('*');
      if (data) return toCamel(data) as FamilyContact[];
    }
    return [...this.data.family];
  }

  async getEmergencyContacts(): Promise<FamilyContact[]> {
    const all = await this.getFamily();
    return all.filter(c => c.isEmergencyContact || c.isCaregiver);
  }

  async addFamilyContact(contact: Omit<FamilyContact, 'id'>): Promise<FamilyContact> {
    const newContact: FamilyContact = {
      ...contact,
      id: 'fam_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    };
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('family_contacts').insert(toSnake(newContact)).select().single();
      if (data) return toCamel(data) as FamilyContact;
    }
    this.data.family.push(newContact);
    this.saveLocal();
    return newContact;
  }

  async updateFamilyContact(id: string, updates: Partial<FamilyContact>): Promise<FamilyContact | null> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('family_contacts').update(toSnake(updates)).eq('id', id).select().single();
      if (data) return toCamel(data) as FamilyContact;
    }
    const idx = this.data.family.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.data.family[idx] = { ...this.data.family[idx], ...updates };
    this.saveLocal();
    return { ...this.data.family[idx] };
  }

  async deleteFamilyContact(id: string): Promise<boolean> {
    if (this.useSupabase) {
      const { error } = await this.supabase!.from('family_contacts').delete().eq('id', id);
      return !error;
    }
    const prev = this.data.family.length;
    this.data.family = this.data.family.filter(f => f.id !== id);
    if (this.data.family.length !== prev) { this.saveLocal(); return true; }
    return false;
  }

  // ═══ Caregiver ═══
  async getCaregiver() {
    const family = await this.getFamily();
    const reminders = await this.getReminders();
    const caregiverContact = family.find(f => f.isCaregiver);
    const totalMeds = reminders.filter(r => r.category === 'medicine').length;
    const completedMeds = reminders.filter(r => r.category === 'medicine' && r.completed).length;
    const profile = await this.getProfile();
    return {
      caregiver: caregiverContact || { name: 'Suresh Kumar', relation: 'Primary Caregiver & Nurse', phone: '+91 98450 11223', status: 'Active on duty' },
      patient: profile,
      medicineAdherence: { completed: completedMeds, total: totalMeds, adherencePercentage: totalMeds > 0 ? Math.round((completedMeds / totalMeds) * 100) : 100 },
      doctorAppointment: reminders.find(r => r.category === 'appointment') || { doctor: 'No upcoming appointment', speciality: '', datetime: '', clinic: '' },
      safetyStatus: 'Safe & Active',
      lastSync: new Date().toISOString(),
    };
  }

  async getCaregiverActivities(): Promise<CaregiverActivity[]> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('caregiver_activities').select('*').order('timestamp', { ascending: false });
      if (data) return toCamel(data) as CaregiverActivity[];
    }
    return [...this.data.caregiverActivities];
  }

  async addCaregiverActivity(activity: Omit<CaregiverActivity, 'id' | 'timestamp'>): Promise<CaregiverActivity> {
    const newAct: CaregiverActivity = {
      ...activity,
      id: 'act_' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('caregiver_activities').insert(toSnake(newAct)).select().single();
      if (data) return toCamel(data) as CaregiverActivity;
    }
    this.data.caregiverActivities.unshift(newAct);
    this.saveLocal();
    return newAct;
  }

  // ═══ Emergency ═══
  async recordEmergency(details: string, dispatchedTo: string[]): Promise<EmergencyEvent> {
    const event: EmergencyEvent = {
      id: 'emg_' + Date.now(),
      timestamp: new Date().toISOString(),
      details,
      dispatchedTo,
      status: 'dispatched',
    };
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('emergency_events').insert(toSnake(event)).select().single();
      await this.addCaregiverActivity({ title: '🚨 Emergency Alert Triggered', description: details, type: 'alert' });
      if (data) return toCamel(data) as EmergencyEvent;
    }
    this.data.emergencyEvents.unshift(event);
    await this.addCaregiverActivity({ title: '🚨 Emergency Alert Triggered', description: details, type: 'alert' });
    this.saveLocal();
    return event;
  }

  async getEmergencyEvents(): Promise<EmergencyEvent[]> {
    if (this.useSupabase) {
      const { data } = await this.supabase!.from('emergency_events').select('*').order('timestamp', { ascending: false });
      if (data) return toCamel(data) as EmergencyEvent[];
    }
    return [...this.data.emergencyEvents];
  }
}

export const store = new Store();
