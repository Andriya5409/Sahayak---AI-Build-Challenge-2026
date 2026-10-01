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
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1.5 px-2 sm:px-4"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around">
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
                className={`relative -top-3 flex flex-col items-center justify-center transition-transform active:scale-95 group focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-2xl`}
                aria-label={item.label}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lifted transition-all ${
                  isActive 
                    ? 'bg-indigo-700 ring-4 ring-indigo-300 scale-105' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}>
                  <Mic className="w-9 h-9 stroke-[2.5] animate-pulse" />
                </div>
                <span className={`text-sm font-extrabold mt-1 ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
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
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[64px] min-h-[58px] transition-all active:scale-95 ${
                isActive
                  ? 'text-indigo-800 font-black bg-indigo-50 border-2 border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold border-2 border-transparent'
              }`}
              aria-label={item.label}
            >
              <Icon className={`w-7 h-7 mb-1 transition-transform ${isActive ? 'stroke-[2.8] scale-110 text-indigo-700' : 'stroke-[2]'}`} />
              <span className="text-xs sm:text-sm tracking-tight leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
