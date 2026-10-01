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
  },
  ml: {
    appTitle: 'സഹായക്',
    tagline: 'നിങ്ങളുടെ സ്നേഹമുള്ള AI സഹായി',
    greeting: 'സുപ്രഭാതം, അമ്മ ❤️',
    greetingSub: 'ഇന്ന് നിങ്ങളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.',
    readyStatus: 'സഹായക് തയ്യാറാണ്, കേൾക്കുന്നു',
    
    // Navigation
    navHome: 'ഹോം',
    navTalk: 'സംസാരിക്കൂ',
    navShow: 'കാണിക്കൂ',
    navReminders: 'ഓർമ്മപ്പെടുത്തലുകൾ',
    navFamily: 'കുടുംബം',
    navHelp: 'സഹായം / SOS',
    navSettings: 'ക്രമീകരണങ്ങൾ',
    navCaregiver: 'കെയർഗിവർ കാഴ്ച്ച',

    // Home screen
    overviewTitle: 'ഇന്നത്തെ പ്രധാന വിവരങ്ങൾ',
    nextMedicine: 'അടുത്ത മരുന്ന്',
    doctorAppt: 'ഡോക്ടർ അപ്പോയിന്റ്മെന്റ്',
    weather: 'കാലാവസ്ഥ',
    tomorrow: 'നാളെ',
    today: 'ഇന്ന്',
    
    // Quick Actions
    talkToSahayak: 'സഹായകთან സംസാരിക്കൂ',
    talkSub: 'തൊട്ട് സംസാരിക്കുക',
    showSomething: 'എന്തെങ്കിലും കാണിക്കൂ',
    showSub: 'മരുന്ന്, ബില്ലുകൾ, വസ്തുക്കൾ',
    myReminders: 'എന്റെ ഓർമ്മപ്പെടുത്തലുകൾ',
    remindersSub: 'സമയക്രമം പരിശോധിക്കുക',
    familyContacts: 'കുടുംബം',
    familySub: 'മക്കളെയും ഡോക്ടറെയും വിളിക്കൂ',
    needHelpBtn: 'എനിക്ക് സഹായം വേണം / SOS',

    // Voice Assistant
    voiceTitle: 'സഹായകთან സംസാരിക്കൂ',
    voicePromptReady: 'എന്തിനാണ് ഇന്ന് സഹായം വേണ്ടത്?',
    voiceTapToSpeak: 'സംസാരിക്കാൻ തൊടുക',
    voiceListening: 'ശ്രദ്ധയോടെ കേൾക്കുന്നു...',
    voiceSpeakingHint: 'സ്വാഭാവികമായി സംസാരിക്കാം.',
    voiceThinking: 'പരിശോധിക്കുന്നു, ഒരു നിമിഷം...',
    voiceResponse: 'സഹായക് പറയുന്നു:',
    hearAgain: 'വീണ്ടും കേൾക്കുക',
    done: 'ശരി',
    voiceTryAsking: 'ചോദിച്ചു നോക്കൂ:',
    voicePreset1: 'രാത്രി 8 മണിക്ക് മരുന്ന് കഴിക്കാൻ ഓർമ്മിപ്പിക്കുക',
    voicePreset2: 'അടുത്ത ഡോക്ടർ സന്ദർശനം എപ്പോഴാണ്?',
    voicePreset3: 'മകൾ അനന്യയെ വിളിക്കുക',
    voicePreset4: 'ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയുണ്ട്?',

    // Camera / Show
    showTitle: 'സഹായകിന് കാണിച്ചു കൊടുക്കൂ',
    showInstruction: 'മരുന്ന്, രേഖ, ബിൽ അല്ലെങ്കിൽ വസ്തുവിലേക്ക് ക്യാമറ തിരിക്കുക.',
    modeMedicine: 'മരുന്ന്',
    modeDocument: 'രേഖ / ബിൽ',
    modeObject: 'വസ്തു',
    modeLookAround: 'ചുറ്റും നോക്കുക',
    captureButton: 'ഫോട്ടോ എടുക്കുക',
    processingVision: 'ഇത് പരിശോധിക്കുന്നു...',
    processingSub: 'വ്യക്തമായി വായിക്കുന്നു...',
    switchCamera: 'ക്യാമറ മാറ്റുക',
    uploadSample: 'മാതൃകാ ചിത്രം ഉപയോഗിക്കുക',

    // Medicine Result
    foundSomething: 'മരുന്ന് കണ്ടെത്തി',
    genericName: 'സാധാരണ പേര്',
    strength: 'അളവ് (Strength)',
    commonUse: 'ഉപയോഗം',
    howToTake: 'കഴിക്കേണ്ട വിധം',
    disclaimerTitle: 'ഡോക്ടറുടെ ഉപദേശം',
    disclaimerText: 'മരുന്നിന്റെ അളവ് ഡോക്ടറുമായോ ഫാർമസിസ്റ്റുമായോ ഉറപ്പുവരുത്തുക.',
    hearThis: 'ഇത് കേൾക്കുക',
    setReminder: 'ഓർമ്മപ്പെടുത്തൽ വെക്കുക',
    back: 'തിരികെ',

    // Document / Bill Result
    foundBill: 'കണ്ടെത്തിയ വിവരങ്ങൾ',
    totalAmount: 'ആകെ തുക',
    dueDate: 'അടക്കേണ്ട അവസാന തീയതി',
    simpleExplanation: 'ലളിതമായ വിവരണം',
    gotIt: 'മനസ്സിലായി',
    remindToPay: 'ബിൽ അടക്കാൻ ഓർമ്മിപ്പിക്കുക',

    // Look Around
    lookAroundTitle: 'ചുറ്റും തിരയുക',
    lookAroundInstruction: 'മുറിയിലുള്ള നിങ്ങളുടെ വസ്തുക്കൾ കണ്ടെത്താൻ സഹായക് സഹായിക്കും.',
    askWhereIs: 'എന്റെ കണ്ണട എവിടെയാണ്?',
    lookAroundFound: 'മേശപ്പുറത്ത് നിങ്ങളുടെ കണ്ണട ഇരിക്കുന്നത് ഞാൻ കാണുന്നുണ്ട്.',
    askSahayak: 'സഹായകിനോട് ചോദിക്കൂ',
    scanAgain: 'വീണ്ടും തിരയുക',

    // Reminders
    remindersTitle: 'ഓർമ്മപ്പെടുത്തലുകൾ',
    tabToday: 'ഇന്ന്',
    tabUpcoming: 'വരുന്നവ',
    tabAll: 'എല്ലാം',
    addReminder: 'പുതിയത് ചേർക്കുക',
    markTaken: 'കഴിച്ചു',
    markDone: 'പൂർത്തിയായി',
    completed: 'കഴിഞ്ഞു',
    pending: 'ബാക്കിയുണ്ട്',
    noRemindersToday: 'ഇന്നത്തെ ഓർമ്മപ്പെടുത്തലുകൾ എല്ലാം കഴിഞ്ഞു!',

    // Add Reminder Flow
    newReminderTitle: 'പുതിയ ഓർമ്മപ്പെടുത്തൽ',
    reminderType: 'ഏതുതരം ഓർമ്മപ്പെടുത്തൽ?',
    typeMedicine: 'മരുന്ന്',
    typeDoctor: 'ഡോക്ടർ അപ്പോയിന്റ്മെന്റ്',
    typeBill: 'ബിൽ അടക്കൽ',
    typeCustom: 'മറ്റുള്ളവ',
    reminderNameLabel: 'മരുന്നിന്റെയോ കാര്യത്തിന്റെയോ പേര്',
    dateLabel: 'എപ്പോൾ?',
    timeLabel: 'ഏത് സമയം?',
    saveReminder: 'സൂക്ഷിക്കുക (SAVE)',
    setByVoice: 'ശബ്ദം വഴി ചേർക്കുക',

    // Family
    familyTitle: 'നിങ്ങളുടെ കുടുംബം',
    familySubtitle: 'സ്നേഹമുള്ളവരെയും ഡോക്ടറെയും എളുപ്പത്തിൽ വിളിക്കാം',
    daughter: 'മകൾ',
    son: 'മകൻ',
    caregiver: 'കെയർഗിവർ',
    callButton: 'വിളിക്കുക',
    lastTalked: 'അവസാനം സംസാരിച്ചത്',
    available247: 'എപ്പോഴും ലഭ്യമാണ്',

    // Call Confirmation & Calling
    callConfirmTitle: 'നിങ്ങൾക്ക് വിളിക്കണോ',
    yesCall: 'അതെ, വിളിക്കുക',
    noCancel: 'വേണ്ട, റദ്ദാക്കുക',
    callingTitle: 'വിളിക്കുന്നു',
    callConnecting: 'കോൾ കണക്റ്റ് ആകുന്നു...',
    endCall: 'കോൾ നിർത്തുക',
    mute: 'ശബ്ദം നിർത്തുക',
    speaker: 'ലൗഡ് സ്പീക്കർ',

    // Emergency / SOS
    emergencyTitle: 'അടിയന്തര സഹായം',
    emergencySubtitle: 'സഹായം തൊട്ടടുത്തുണ്ട്. താഴെയുള്ളതിൽ ഒന്ന് തിരഞ്ഞെടുക്കുക:',
    callFamilyEmergency: 'കുടുംബത്തെ വിളിക്കുക',
    callCaregiverEmergency: 'കെയർഗിവറെ വിളിക്കുക',
    callEmergencyServices: 'പോലീസ് / ആംബുലൻസ് (112)',
    emergencyConfirmTitle: 'അടിയന്തര കോൾ സ്ഥിരീകരിക്കുക',
    emergencyConfirmPrompt: 'അടിയന്തര വിഭാഗത്തിലേക്ക് (112) ഇപ്പോൾ വിളിക്കണോ?',
    confirmEmergencyBtn: 'അതെ, ഇപ്പോൾ തന്നെ വിളിക്കുക',

    // Settings / Accessibility
    settingsTitle: 'ക്രമീകരണങ്ങൾ',
    textSizeLabel: 'അക്ഷരങ്ങളുടെ വലിപ്പം',
    sizeSmall: 'സാധാരണ',
    sizeMedium: 'വലുത്',
    sizeLarge: 'ഏറ്റവും വലുത് (മുതിർന്നവർക്ക്)',
    languageLabel: 'ഭാഷ',
    voiceSpeedLabel: 'സംസാര വേഗത',
    speedSlow: 'പതുക്കെ & വ്യക്തമായി',
    speedNormal: 'സാധാരണ വേഗത',
    voiceGenderLabel: 'സഹായകന്റെ ശബ്ദം',
    voiceFemale: 'സ്ത്രീ ശബ്ദം (ലത)',
    voiceMale: 'പുരുഷ ശബ്ദം (അരുൺ)',
    highContrastLabel: 'ഹൈ കോൺട്രാസ്റ്റ് മോഡ്',
    simplifiedModeLabel: 'ലളിത മോഡ്',
    soundVolumeLabel: 'ശബ്ദ അളവ്',
    testVoiceBtn: 'സഹായകന്റെ ശബ്ദം കേൾക്കുക',

    // Caregiver Circle Portal
    caregiverPortalTitle: 'കുടുംബ സുരക്ഷാ കേന്ദ്രം',
    caregiverPortalSub: 'അനന്യ (മകൾ) യ്ക്കുള്ള വിവരങ്ങൾ',
    caregiverSyncStatus: '2 മിനിറ്റ് മുൻപ് സിങ്ക് ചെയ്തു · സഹായക് സജീവം',
    medicineCompliance: 'ഇന്ന് കഴിച്ച മരുന്നുകൾ',
    upcomingAppointments: 'വരാനിരിക്കുന്ന ഡോക്ടർ സന്ദർശനങ്ങൾ',
    recentAlerts: 'സുരക്ഷാ നിലവാരം',
    privacyNote: 'ക്യാമറ വിവരങ്ങളും സംഭാഷണങ്ങളും രഹസ്യമായി സൂക്ഷിക്കപ്പെടുന്നു.'
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations['en']): string {
  const dictionary = translations[lang] || translations.en;
  return (dictionary as any)[key] || translations.en[key] || key;
}
