import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserProfile, 
  Reminder, 
  FamilyContact, 
  ActiveCall, 
  VoiceState, 
  VoiceExchange, 
  MedicineVisionResult, 
  DocumentVisionResult, 
  ObjectVisionResult,
  Language, 
  TextSize,
  CameraCaptureMode
} from '../types';
import { 
  mockUserProfile, 
  initialReminders, 
  mockFamilyContacts, 
  mockMedicineResult, 
  mockDocumentResult 
} from '../mock/data';
import { translations, getTranslation } from '../i18n/translations';
import { ttsService } from '../services/ttsService';
import { supabase } from '../lib/supabase';

import { reminderService } from '../services/reminderService';
import { familyService } from '../services/familyService';
import { callService } from '../services/callService';



export type ScreenType = 
  | 'home' 
  | 'voice' 
  | 'camera' 
  | 'vision-medicine' 
  | 'vision-document' 
  | 'look-around' 
  | 'reminders' 
  | 'add-reminder' 
  | 'family' 
  | 'calling' 
  | 'emergency' 
  | 'settings' 
  | 'caregiver' | 'login' | 'profile';

interface AppContextType {
  // Navigation
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType, options?: { replace?: boolean; payload?: any }) => void;
  goBack: () => void;
  screenHistory: ScreenType[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // User & Accessibility
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  t: (key: any, params?: Record<string, string | number>) => string;
  setTextSize: (size: TextSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setSimplifiedMode: (enabled: boolean) => void;

  // Reminders
  reminders: Reminder[];
  addReminder: (rem: Omit<Reminder, 'id' | 'completed'>) => Promise<Reminder>;
  toggleReminder: (id: string) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;

  // Family & Calling
  contacts: FamilyContact[];
  selectedContact: FamilyContact | null;
  setSelectedContact: (c: FamilyContact | null) => void;
  activeCall: ActiveCall | null;
  startCallFlow: (contact: FamilyContact, isEmergency?: boolean) => void;
  confirmCall: () => void;
  endActiveCall: () => void;
  toggleMute: () => void;
  toggleSpeaker: () => void;

  // Voice Assistant
  voiceState: VoiceState;
  setVoiceState: (state: VoiceState) => void;
  currentVoiceExchange: VoiceExchange | null;
  setCurrentVoiceExchange: (exchange: VoiceExchange | null) => void;
  
  // Vision / Camera
  cameraMode: CameraCaptureMode;
  setCameraMode: (mode: CameraCaptureMode) => void;
  capturedImage: string | null;
  setCapturedImage: (img: string | null) => void;
  activeMedicineResult: MedicineVisionResult;
  activeDocumentResult: DocumentVisionResult;
  activeLookAroundResult: ObjectVisionResult | null;
  setLookAroundResult: (res: ObjectVisionResult | null) => void;
  setMedicineResult: (res: MedicineVisionResult) => void;
  setDocumentResult: (res: DocumentVisionResult) => void;

  // TTS Voice Everywhere
  isSpeaking: boolean;
  speakText: (text: string, onEnd?: () => void) => Promise<void>;
  stopSpeaking: () => void;

  // Guided Demo Tour
  demoStep: number;
  setDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;
  resetDemo: () => void;

  // Contextual Confirmation modal
  confirmModal: {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    isDestructive?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  } | null;
  showConfirmation: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => void;
  closeConfirmation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sahayak_user');
    return saved ? JSON.parse(saved) : mockUserProfile;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('sahayak_logged_in'));
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => localStorage.getItem('sahayak_logged_in') ? 'home' : 'login');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);

  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [contacts, setContacts] = useState<FamilyContact[]>(mockFamilyContacts);

  // Calling state
  const [selectedContact, setSelectedContact] = useState<FamilyContact | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);

  // Voice state
  const [voiceState, setVoiceState] = useState<VoiceState>('ready');
  const [currentVoiceExchange, setCurrentVoiceExchange] = useState<VoiceExchange | null>(null);

  // Vision state
  const [cameraMode, setCameraMode] = useState<CameraCaptureMode>('medicine');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activeMedicineResult, setActiveMedicineResult] = useState<MedicineVisionResult>(mockMedicineResult);
  const [activeDocumentResult, setActiveDocumentResult] = useState<DocumentVisionResult>(mockDocumentResult);
  const [activeLookAroundResult, setLookAroundResult] = useState<ObjectVisionResult | null>(null);

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Guided demo state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  // Contextual modal state
  const [confirmModal, setConfirmModal] = useState<AppContextType['confirmModal']>(null);

  // Sync user changes to localStorage and body classes
  useEffect(() => {
    localStorage.setItem('sahayak_user', JSON.stringify(user));
    document.documentElement.lang = user.language;
    
    // Apply High Contrast class to root
    if (user.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply Text Size class
    document.documentElement.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    document.documentElement.classList.add(`text-size-${user.textSize}`);
  }, [user]);

  // TTS subscription
  useEffect(() => {
    const unsub = ttsService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  // Hydrate reminders and contacts from backend
  useEffect(() => {
    reminderService.getReminders().then((data) => {
      if (data && data.length > 0) setReminders(data);
    }).catch(console.error);

    familyService.getContacts().then((data) => {
      if (data && data.length > 0) setContacts(data);
    }).catch(console.error);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
        setCurrentScreen('home');
      } else {
        setIsLoggedIn(false);
        setCurrentScreen('login');
      }
    }).catch(e => console.error(e));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setCurrentScreen('home');
      } else {
        setIsLoggedIn(false);
        setCurrentScreen('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Call timer simulation
  useEffect(() => {
    let interval: any;
    if (activeCall && activeCall.state === 'connected') {
      interval = setInterval(() => {
        setActiveCall((prev) => prev ? { ...prev, durationSeconds: prev.durationSeconds + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall?.state]);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('sahayak_logged_in', 'true');
    navigateTo('home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sahayak_logged_in');
    navigateTo('login');
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };
  const setTextSize = (textSize: TextSize) => updateUser({ textSize });
  const setHighContrast = (highContrast: boolean) => updateUser({ highContrast });
  const setSimplifiedMode = (simplifiedMode: boolean) => updateUser({ simplifiedMode });

  const t = (key: any, params?: Record<string, string | number>): string => {
    return getTranslation(user.language, key, params);
  };

  const navigateTo = (screen: ScreenType, options?: { replace?: boolean; payload?: any }) => {
    // If TTS is speaking, stop it on screen transition unless requested
    ttsService.stop();

    if (options?.replace) {
      setScreenHistory((prev) => [...prev.slice(0, -1), screen]);
    } else {
      setScreenHistory((prev) => [...prev, screen]);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    ttsService.stop();
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const speakText = async (text: string, onEnd?: () => void) => {
    const rate = user.speechSpeed === 'slow' ? 0.82 : 1.0;
    const gender = user.voiceGender;
    const volume = user.soundVolume / 100;
    await ttsService.speak(text, {
      rate,
      volume,
      gender: user.voiceGender,
      lang: user.language,
      onEnd,
    });
  };

  const stopSpeaking = () => {
    ttsService.stop();
  };

  // Reminder handlers
  const addReminder = async (rem: Omit<Reminder, 'id' | 'completed'>) => {
    const created = await reminderService.addReminder(rem);
    setReminders((prev) => [created, ...prev]);
    return created;
  };

  const toggleReminder = async (id: string) => {
    const updated = await reminderService.toggleCompleted(id);
    setReminders((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const deleteReminder = async (id: string) => {
    await reminderService.deleteReminder(id);
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // Call Handlers
  const startCallFlow = (contact: FamilyContact, isEmergency = false) => {
    setSelectedContact(contact);
    showConfirmation({
      title: `${t('callConfirmTitle')} ${contact.name}?`,
      description: isEmergency 
        ? 'This will connect an immediate priority audio line.' 
        : `${contact.relation} · ${contact.phone}`,
      confirmText: t('yesCall'),
      cancelText: t('noCancel'),
      isDestructive: isEmergency,
      onConfirm: () => {
        closeConfirmation();
        executeCall(contact, isEmergency);
      },
    });
  };

  const confirmCall = () => {
    if (selectedContact) {
      executeCall(selectedContact, false);
    }
  };

  const executeCall = async (contact: FamilyContact, isEmergency = false) => {
    const newCall = await callService.initiateCall({
      name: contact.name,
      relation: contact.relation,
      phone: contact.phone,
      isEmergency,
    });
    setActiveCall(newCall);
    navigateTo('calling');

    // Simulate connection after 2 seconds
    setTimeout(() => {
      setActiveCall((prev) => prev ? { ...prev, state: 'connected' } : null);
    }, 2200);
  };

  const endActiveCall = async () => {
    if (activeCall) {
      setActiveCall((prev) => prev ? { ...prev, state: 'ended' } : null);
      await callService.endCall();
      setTimeout(() => {
        setActiveCall(null);
        setSelectedContact(null);
        navigateTo('family');
      }, 1000);
    }
  };

  const toggleMute = () => {
    if (activeCall) {
      setActiveCall((prev) => prev ? { ...prev, isMuted: !prev.isMuted } : null);
    }
  };

  const toggleSpeaker = () => {
    if (activeCall) {
      setActiveCall((prev) => prev ? { ...prev, isSpeakerOn: !prev.isSpeakerOn } : null);
    }
  };

  // Confirmation Modal
  const showConfirmation = (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    setConfirmModal({
      isOpen: true,
      title: config.title,
      description: config.description,
      confirmText: config.confirmText || t('yesCall'),
      cancelText: config.cancelText || t('noCancel'),
      isDestructive: config.isDestructive,
      onConfirm: config.onConfirm,
      onCancel: () => {
        config.onCancel?.();
        closeConfirmation();
      },
    });
  };

  const closeConfirmation = () => {
    setConfirmModal(null);
  };

  // Guided demo stepper
  const nextDemoStep = () => {
    setDemoStep((prev) => prev + 1);
  };

  const resetDemo = () => {
    setDemoStep(0);
    setIsDemoActive(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,
        isLoggedIn,
        login,
        logout,
        user,
        updateUser,
        t,
        setTextSize,
        setHighContrast,
        setSimplifiedMode,
        reminders,
        addReminder,
        toggleReminder,
        deleteReminder,
        contacts,
        selectedContact,
        setSelectedContact,
        activeCall,
        startCallFlow,
        confirmCall,
        endActiveCall,
        toggleMute,
        toggleSpeaker,
        voiceState,
        setVoiceState,
        currentVoiceExchange,
        setCurrentVoiceExchange,
        cameraMode,
        setCameraMode,
      capturedImage,
      setCapturedImage,
        activeMedicineResult,
        activeDocumentResult,
        setMedicineResult: setActiveMedicineResult,
        setDocumentResult: setActiveDocumentResult,
        activeLookAroundResult,
        setLookAroundResult,
        isSpeaking,
        speakText,
        stopSpeaking,
        demoStep,
        setDemoStep,
        nextDemoStep,
        isDemoActive,
        setIsDemoActive,
        resetDemo,
        confirmModal,
        showConfirmation,
        closeConfirmation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
