import React from 'react';
import { Home, Mic, Camera, Bell, Users, HeartHandshake } from 'lucide-react';
import { useApp, ScreenType } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, t } = useApp();

  const navItems = [
    {
      id: 'home' as ScreenType,
      label: t('navHome'),
      icon: Home,
      highlight: false,
    },
    {
      id: 'voice' as ScreenType,
      label: t('navTalk'),
      icon: Mic,
      highlight: true, // Key voice assistant action
    },
    {
      id: 'camera' as ScreenType,
      label: t('navShow'),
      icon: Camera,
      highlight: false,
    },
    {
      id: 'reminders' as ScreenType,
      label: t('navReminders'),
      icon: Bell,
      highlight: false,
    },
    {
      id: 'family' as ScreenType,
      label: t('navFamily'),
      icon: Users,
      highlight: false,
    },
  ];

  return (
    <nav 
      aria-label={t('mainNavigation')}
      className="fixed bottom-0 left-0 right-0 z-40 bg-sahayak-bg/95 backdrop-blur-md border-t border-sahayak-bgWarm pb-safe"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'camera' && (currentScreen === 'vision-medicine' || currentScreen === 'vision-document' || currentScreen === 'look-around')) ||
            (item.id === 'reminders' && currentScreen === 'add-reminder') ||
            (item.id === 'family' && currentScreen === 'calling');

          if (item.highlight) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className="flex flex-col items-center justify-center min-h-[60px] min-w-[64px] transition-transform active:scale-95 focus:outline-none relative group"
                aria-label={item.label}
              >
                {isActive && <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-sahayak-primary mb-1"></div>}
                <div className={`mt-2.5 flex items-center justify-center rounded-full p-2.5 transition-colors ${
                  isActive 
                    ? 'bg-sahayak-primary text-white' 
                    : 'bg-sahayak-bgWarm text-sahayak-text group-hover:bg-sahayak-bgWarm/80'
                }`}>
                  <Mic className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                </div>
                <span className={`text-[10px] sm:text-xs mt-1 font-medium ${isActive ? 'text-sahayak-primary' : 'text-sahayak-textMuted'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              className="flex flex-col items-center justify-center min-w-[64px] min-h-[60px] transition-transform active:scale-95 relative"
              aria-label={item.label}
            >
              {isActive && <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-sahayak-primary"></div>}
              <Icon className={`w-6 h-6 mt-2 mb-1 transition-colors ${isActive ? 'text-sahayak-primary stroke-[2.5]' : 'text-sahayak-textMuted stroke-[2]'}`} />
              <span className={`text-[10px] sm:text-xs font-medium transition-colors ${isActive ? 'text-sahayak-primary' : 'text-sahayak-textMuted'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
