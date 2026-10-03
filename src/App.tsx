import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { GuidedDemoBanner } from './components/common/GuidedDemoBanner';
import { ConfirmModal } from './components/common/ConfirmModal';

// Pages
import { HomePage } from './pages/HomePage';
import { VoicePage } from './pages/VoicePage';
import { CameraPage } from './pages/CameraPage';
import { VisionResultPage } from './pages/VisionResultPage';
import { DocumentResultPage } from './pages/DocumentResultPage';
import { LookAroundPage } from './pages/LookAroundPage';
import { RemindersPage } from './pages/RemindersPage';
import { AddReminderPage } from './pages/AddReminderPage';
import { FamilyPage } from './pages/FamilyPage';
import { CallingPage } from './pages/CallingPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { SettingsPage } from './pages/SettingsPage';
import { CaregiverPortalPage } from './pages/CaregiverPortalPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'home':
      return <HomePage />;
    case 'voice':
      return <VoicePage />;
    case 'camera':
      return <CameraPage />;
    case 'vision-medicine':
      return <VisionResultPage />;
    case 'vision-document':
      return <DocumentResultPage />;
    case 'look-around':
      return <LookAroundPage />;
    case 'reminders':
      return <RemindersPage />;
    case 'add-reminder':
      return <AddReminderPage />;
    case 'family':
      return <FamilyPage />;
    case 'calling':
      return <CallingPage />;
    case 'emergency':
      return <EmergencyPage />;
    case 'settings':
      return <SettingsPage />;
    case 'caregiver':
      return <CaregiverPortalPage />;
    case 'login':
      return <LoginPage />;
    case 'profile':
      return <ProfilePage />;
    default:
      return <HomePage />;
  }
};

const MainLayout: React.FC = () => {
  const { currentScreen, isLoggedIn } = useApp();

  // Show login page without any chrome
  if (!isLoggedIn || currentScreen === 'login') {
    return <LoginPage />;
  }

  const showBottomNav = currentScreen !== 'calling';

  return (
    <div className="min-h-screen flex flex-col bg-sahayak-bg text-sahayak-text selection:bg-sahayak-primaryLight">
      <GuidedDemoBanner />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        <ScreenRouter />
      </main>
      {showBottomNav && <BottomNav />}
      <ConfirmModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
