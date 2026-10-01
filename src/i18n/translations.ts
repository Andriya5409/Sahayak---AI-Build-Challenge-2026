import { Language } from '../types';

export const translations = {
  en: {
    appTitle: 'Sahayak',
    tagline: 'Your caring AI companion',
    greeting: 'Good morning, Amma ❤️',
    greetingSub: "I'm here to help you today.",
    readyStatus: 'Sahayak is ready & listening',
    
    // Navigation
    navHome: 'Home',
    navTalk: 'Talk',
    navShow: 'Show',
    navReminders: 'Reminders',
    navFamily: 'Family',
    navHelp: 'Help / SOS',
    navSettings: 'Settings',
    navCaregiver: 'Caregiver View',

    // Home screen
    overviewTitle: "Today's overview",
    nextMedicine: 'Next medicine',
    doctorAppt: 'Doctor appointment',
    weather: 'Weather',
    tomorrow: 'Tomorrow',
    today: 'Today',
    
    // Quick Actions
    talkToSahayak: 'TALK TO SAHAYAK',
    talkSub: 'Tap & speak naturally',
    showSomething: 'SHOW SOMETHING',
    showSub: 'Medicine, bills & items',
    myReminders: 'MY REMINDERS',
    remindersSub: 'Check schedule',
    familyContacts: 'FAMILY',
    familySub: 'Call children & doctor',
    needHelpBtn: 'I NEED HELP / SOS',

    // Voice Assistant
    voiceTitle: 'Talk to Sahayak',
    voicePromptReady: 'What would you like help with?',
    voiceTapToSpeak: 'Tap to speak',
    voiceListening: 'Listening to you...',
    voiceSpeakingHint: 'You can speak naturally in simple words.',
    voiceThinking: 'Let me check that for you...',
    voiceResponse: 'Sahayak says:',
    hearAgain: 'Hear again',
    done: 'Done',
    voiceTryAsking: 'Try asking:',
    voicePreset1: 'Remind me to take my medicine at 8 PM',
    voicePreset2: 'When is my next doctor appointment?',
    voicePreset3: 'Call my daughter Ananya',
    voicePreset4: 'How is the weather today?',

    // Camera / Show
    showTitle: 'Show Sahayak',
    showInstruction: 'Point your camera at a medicine, document, bill, or object.',
    modeMedicine: 'Medicine',
    modeDocument: 'Document / Bill',
    modeObject: 'Object',
    modeLookAround: 'Look Around',
    captureButton: 'Take Photo',
    processingVision: 'Looking at this...',
    processingSub: 'Analyzing clearly with care...',
    switchCamera: 'Flip camera',
    uploadSample: 'Try with sample image',

    // Medicine Result
    foundSomething: 'I found your medicine',
    genericName: 'Generic name',
    strength: 'Strength',
    commonUse: 'Common use',
    howToTake: 'How to take',
    disclaimerTitle: 'Doctor Advisory',
    disclaimerText: 'Please always confirm medicine and dosage with your doctor or pharmacist.',
    hearThis: 'Hear this',
    setReminder: 'Set reminder for this',
    back: 'Back',

    // Document / Bill Result
    foundBill: "Here's what I found",
    totalAmount: 'Total amount',
    dueDate: 'Due date',
    simpleExplanation: 'Simple explanation',
    gotIt: 'Got it',
    remindToPay: 'Remind me to pay',

    // Look Around
    lookAroundTitle: 'Look Around Mode',
    lookAroundInstruction: 'Sahayak will scan the room to locate your everyday items.',
    askWhereIs: 'Where are my glasses?',
    lookAroundFound: 'I can see something that looks like your glasses on the wooden table.',
    askSahayak: 'Ask Sahayak',
    scanAgain: 'Scan again',

    // Reminders
    remindersTitle: 'Your Reminders',
    tabToday: 'Today',
    tabUpcoming: 'Upcoming',
    tabAll: 'All Reminders',
    addReminder: 'Add Reminder',
    markTaken: 'Mark Taken',
    markDone: 'Done',
    completed: 'Completed',
    pending: 'Pending',
    noRemindersToday: 'No more reminders for today! You are all set.',

    // Add Reminder Flow
    newReminderTitle: 'Add a Reminder',
    reminderType: 'What kind of reminder?',
    typeMedicine: 'Medicine',
    typeDoctor: 'Doctor appointment',
    typeBill: 'Bill / Payment',
    typeCustom: 'Other reminder',
    reminderNameLabel: 'Reminder name or medicine',
    dateLabel: 'When?',
    timeLabel: 'What time?',
    saveReminder: 'SAVE REMINDER',
    setByVoice: 'Set it by Voice',

    // Family
    familyTitle: 'Your Family',
    familySubtitle: 'Tap to call your trusted loved ones and caregiver',
    daughter: 'Daughter',
    son: 'Son',
    caregiver: 'Caregiver',
    callButton: 'Call',
    lastTalked: 'Last talked',
    available247: 'Available 24/7',

    // Call Confirmation & Calling
    callConfirmTitle: 'Do you want me to call',
    yesCall: 'YES, CALL',
    noCancel: 'NO, CANCEL',
    callingTitle: 'Calling',
    callConnecting: 'Your call is being connected.',
    endCall: 'End Call',
    mute: 'Mute',
    speaker: 'Speaker',

    // Emergency / SOS
    emergencyTitle: 'Emergency Assistance',
    emergencySubtitle: 'Help is always one touch away. Choose an option below:',
    callFamilyEmergency: 'Call Family',
    callCaregiverEmergency: 'Call Caregiver',
    callEmergencyServices: 'Emergency 112',
    emergencyConfirmTitle: 'Confirm Emergency Call',
    emergencyConfirmPrompt: 'Are you sure you want to call Emergency Services (112)?',
    confirmEmergencyBtn: 'YES, CALL EMERGENCY NOW',

    // Settings / Accessibility
    settingsTitle: 'Accessibility & Settings',
    textSizeLabel: 'Text Size',
    sizeSmall: 'Standard',
    sizeMedium: 'Large',
    sizeLarge: 'Extra Large (Elder)',
    languageLabel: 'Language',
    voiceSpeedLabel: 'Speech Speed',
    speedSlow: 'Slow & Clear',
    speedNormal: 'Normal',
    voiceGenderLabel: 'Assistant Voice',
    voiceFemale: 'Female (Lata)',
    voiceMale: 'Male (Arun)',
    highContrastLabel: 'High Contrast Mode',
    simplifiedModeLabel: 'Elder Simplified View',
    soundVolumeLabel: 'Voice Volume',
    testVoiceBtn: 'Test Assistant Voice',

    // Caregiver Circle Portal
    caregiverPortalTitle: 'Family Care Circle',
    caregiverPortalSub: 'Permitted overview for Ananya (Daughter)',
    caregiverSyncStatus: 'Last synced 2 mins ago · Sahayak Hub active',
    medicineCompliance: 'Medicine Taken Today',
    upcomingAppointments: 'Upcoming Doctor Appointments',
    recentAlerts: 'Safety & Help Status',
    privacyNote: 'Camera feeds and private chats remain strictly confidential.'
  }};

export function getTranslation(lang: Language, key: any, params?: Record<string, string | number>): string {
  const dictionary = translations[lang] || translations.en;
  let text = (dictionary as any)[key] || (translations.en as any)[key] || key;
  if (params && typeof text === 'string') {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp('\\\{\\\{' + k + '\\\}\\\}', 'g'), String(v));
    });
  }
  return text;
}
