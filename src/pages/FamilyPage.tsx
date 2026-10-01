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
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-sahayak-text">
          {t('familyTitle')}
        </h1>
        <p className="text-lg text-sahayak-textMuted">
          {t('familySubtitle')}
        </p>
      </div>

      {/* Family Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-sahayak-bgWarm shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            {/* Contact Avatar & Information */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 ${contact.avatarBg}`}>
                {contact.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sahayak-textMuted font-medium text-sm">
                    {contact.relation}
                  </span>
                  {contact.isCaregiver && (
                    <span className="bg-sahayak-sageLight text-sahayak-sage font-medium text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{t('nurseSupport')}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold text-sahayak-text mt-0.5">
                  {contact.name}
                </h3>

                <p className="text-sm text-sahayak-textLight mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sahayak-sage" />
                  <span>{contact.status}</span>
                </p>
              </div>
            </div>

            {/* Call Button */}
            <button
              type="button"
              onClick={() => handleCall(contact)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-sahayak-sage hover:opacity-90 active:opacity-100 text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all"
              aria-label={`Call ${contact.name}`}
            >
              <Phone className="w-5 h-5" />
              <span>{t('callButton')}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="bg-sahayak-bgWarm rounded-xl p-4 text-sm text-sahayak-textMuted flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-sahayak-textLight" />
        <span>{t('callSafetyNotice')}</span>
      </div>
    </div>
  );
};
