-- Sahayak Supabase Schema

-- User Profile
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY DEFAULT 'user_amma_01',
  name TEXT NOT NULL DEFAULT 'Amma (Kalyani Ammal)',
  salutation TEXT NOT NULL DEFAULT 'Amma',
  avatar TEXT NOT NULL DEFAULT '👵🏽',
  city TEXT NOT NULL DEFAULT 'Kochi, Kerala',
  language TEXT NOT NULL DEFAULT 'en',
  text_size TEXT NOT NULL DEFAULT 'large',
  voice_gender TEXT NOT NULL DEFAULT 'female',
  speech_speed TEXT NOT NULL DEFAULT 'slow',
  high_contrast BOOLEAN NOT NULL DEFAULT false,
  simplified_mode BOOLEAN NOT NULL DEFAULT false,
  sound_volume INTEGER NOT NULL DEFAULT 90
);

-- Reminders
CREATE TABLE IF NOT EXISTS reminders (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'medicine',
  time TEXT NOT NULL,
  date_label TEXT NOT NULL DEFAULT 'Today',
  datetime TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed BOOLEAN NOT NULL DEFAULT false,
  dosage_or_notes TEXT,
  doctor_name TEXT,
  amount TEXT,
  icon TEXT NOT NULL DEFAULT '💊',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Family Contacts
CREATE TABLE IF NOT EXISTS family_contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  relation_key TEXT NOT NULL,
  phone TEXT NOT NULL,
  avatar TEXT NOT NULL,
  avatar_bg TEXT NOT NULL,
  status TEXT NOT NULL,
  is_caregiver BOOLEAN DEFAULT false,
  is_emergency_contact BOOLEAN DEFAULT false
);

-- Emergency Events
CREATE TABLE IF NOT EXISTS emergency_events (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  details TEXT NOT NULL,
  dispatched_to TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'dispatched'
);

-- Caregiver Activities
CREATE TABLE IF NOT EXISTS caregiver_activities (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'medicine'
);

-- Seed default profile
INSERT INTO profiles (id, name, salutation, avatar, city, language, text_size, voice_gender, speech_speed, high_contrast, simplified_mode, sound_volume)
VALUES ('user_amma_01', 'Amma (Kalyani Ammal)', 'Amma', '👵🏽', 'Kochi, Kerala', 'en', 'large', 'female', 'slow', false, false, 90)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional for prototype)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_activities ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (prototype)
CREATE POLICY "Allow all" ON profiles FOR ALL USING (true);
CREATE POLICY "Allow all" ON reminders FOR ALL USING (true);
CREATE POLICY "Allow all" ON family_contacts FOR ALL USING (true);
CREATE POLICY "Allow all" ON emergency_events FOR ALL USING (true);
CREATE POLICY "Allow all" ON caregiver_activities FOR ALL USING (true);
