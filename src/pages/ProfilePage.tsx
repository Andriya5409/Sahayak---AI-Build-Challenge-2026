import React, { useState } from 'react';
import { User, MapPin, Save, LogOut, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, navigateTo, logout, t } = useApp();
  const [name, setName] = useState(user.name);
  const [salutation, setSalutation] = useState(user.salutation);
  const [city, setCity] = useState(user.city);
  const [avatar, setAvatar] = useState(user.avatar);
  const [saved, setSaved] = useState(false);

  const avatarOptions = ['👵🏽', '👴🏽', '👩🏽', '👨🏽', '🧓🏽', '👵', '👴', '🧑🏽'];

  const handleSave = () => {
    updateUser({
      name: name.trim() || user.name,
      salutation: salutation.trim() || user.salutation,
      city: city.trim() || user.city,
      avatar,
    });
    // Also update localStorage for persistence
    localStorage.setItem('sahayak_user_name', name.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-sahayak-textMuted font-semibold text-lg hover:text-sahayak-text px-3 py-2 rounded-xl hover:bg-sahayak-bgWarm transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Avatar Selection */}
      <div className="bg-white rounded-3xl p-8 border border-sahayak-bgWarm shadow-soft text-center space-y-4">
        <div className="text-6xl">{avatar}</div>
        <h1 className="text-2xl font-bold text-sahayak-text">Your Profile</h1>
        <p className="text-sahayak-textMuted">Manage your personal details</p>
        <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
          {avatarOptions.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className={`text-4xl p-2 rounded-2xl transition-all ${
                avatar === a
                  ? 'bg-sahayak-primaryLight ring-2 ring-sahayak-primary scale-110'
                  : 'hover:bg-sahayak-bgWarm'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Fields */}
      <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-sahayak-textMuted flex items-center gap-2">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-sahayak-bgWarm bg-sahayak-bg text-lg text-sahayak-text focus:border-sahayak-primary focus:outline-none transition-colors"
          />
        </div>

        {/* How should Sahayak call you */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-sahayak-textMuted">How should Sahayak call you?</label>
          <input
            type="text"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
            placeholder="e.g. Amma, Appa, Grandma"
            className="w-full px-4 py-3 rounded-2xl border-2 border-sahayak-bgWarm bg-sahayak-bg text-lg text-sahayak-text focus:border-sahayak-primary focus:outline-none transition-colors"
          />
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-sahayak-textMuted flex items-center gap-2">
            <MapPin className="w-4 h-4" /> City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-sahayak-bgWarm bg-sahayak-bg text-lg text-sahayak-text focus:border-sahayak-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSave}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
            saved
              ? 'bg-sahayak-sage text-white'
              : 'bg-sahayak-primary text-white hover:opacity-90 shadow-warm'
          }`}
        >
          {saved ? (
            <><CheckCircle2 className="w-6 h-6" /><span>Saved!</span></>
          ) : (
            <><Save className="w-6 h-6" /><span>Save Changes</span></>
          )}
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-sahayak-bgWarm shadow-soft">
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            logout();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-red-50 hover:bg-red-100 text-sahayak-red font-semibold text-lg flex items-center justify-center gap-3 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
