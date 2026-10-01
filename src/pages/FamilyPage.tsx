import React from 'react';
import { 
  Users, 
  Phone, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FamilyContact } from '../types';

export const FamilyPage: React.FC = () => {
  const { contacts, startCallFlow, speakText, t } = useApp();

  const handleCall = (contact: FamilyContact) => {
    speakText(`Calling ${contact.name}`);
    startCallFlow(contact);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-900 font-extrabold text-sm px-4 py-1 rounded-full">
          <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
          <span>Trusted Circle</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('familyTitle')}
        </h1>
        <p className="text-xl text-slate-600 font-semibold">
          {t('familySubtitle')}
        </p>
      </div>

      {/* Family Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-slate-200 hover:border-indigo-300 shadow-soft hover:shadow-lifted transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            {/* Contact Avatar & Information */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shrink-0 shadow-inner ${contact.avatarBg}`}>
                {contact.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                    {contact.relation}
                  </span>
                  {contact.isCaregiver && (
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Nurse Support</span>
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-black text-slate-900 mt-0.5">
                  {contact.name}
                </h3>

                <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{contact.status}</span>
                </p>
              </div>
            </div>

            {/* Big Call Button */}
            <button
              type="button"
              onClick={() => handleCall(contact)}
              className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-2xl flex items-center justify-center gap-3 shadow-lifted active:scale-95 transition-all border-2 border-emerald-500 min-h-[64px]"
              aria-label={`Call ${contact.name}`}
            >
              <Phone className="w-7 h-7 stroke-[2.5]" />
              <span>{t('callButton')}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="bg-slate-100 rounded-2xl p-4 text-center text-sm font-semibold text-slate-600 border border-slate-200">
        🛡️ Calls are connected directly. You will always be asked to confirm before dialing starts.
      </div>
    </div>
  );
};
