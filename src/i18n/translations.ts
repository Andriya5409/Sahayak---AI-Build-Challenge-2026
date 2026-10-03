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
    youCouldSay: 'You could say something like:',
    listeningPlaceholder: 'Listening to your voice...',
    tapWhenFinished: 'Tap when finished',
    understandingRequest: 'Understanding your request...',
    youAsked: 'You asked',
    reminderSaved: 'Reminder Saved',
    reminderSavedDesc: 'Your reminder has been securely added to your schedule.',
    letMeTakeALook: 'Let me take a look...',
    holdSteady: 'Please hold steady...',
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
    tagline: 'നിങ്ങളുടെ സ്നേഹമുള്ള AI കൂട്ടുകാരൻ',
    greeting: 'സുപ്രഭാതം, അമ്മാ ❤️',
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
    navCaregiver: 'പരിചാരക കാഴ്ച',

    // Home screen
    overviewTitle: 'ഇന്നത്തെ അവലോകനം',
    nextMedicine: 'അടുത്ത മരുന്ന്',
    doctorAppt: 'ഡോക്ടർ അപ്പോയിന്റ്മെന്റ്',
    weather: 'കാലാവസ്ഥ',
    tomorrow: 'നാളെ',
    today: 'ഇന്ന്',
    
    // Quick Actions
    talkToSahayak: 'സഹായകുമായി സംസാരിക്കൂ',
    talkSub: 'ടാപ്പ് ചെയ്ത് സ്വാഭാവികമായി സംസാരിക്കൂ',
    showSomething: 'എന്തെങ്കിലും കാണിക്കൂ',
    showSub: 'മരുന്ന്, ബിൽ, വസ്തുക്കൾ',
    myReminders: 'എന്റെ ഓർമ്മപ്പെടുത്തലുകൾ',
    remindersSub: 'ഷെഡ്യൂൾ പരിശോധിക്കൂ',
    familyContacts: 'കുടുംബം',
    familySub: 'മക്കളെയും ഡോക്ടറെയും വിളിക്കൂ',
    needHelpBtn: 'എനിക്ക് സഹായം വേണം / SOS',

    // Voice Assistant
    voiceTitle: 'സഹായകുമായി സംസാരിക്കൂ',
    voicePromptReady: 'എന്തിൽ സഹായം വേണം?',
    voiceTapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യൂ',
    voiceListening: 'നിങ്ങളെ കേൾക്കുന്നു...',
    voiceSpeakingHint: 'ലളിതമായ വാക്കുകളിൽ സ്വാഭാവികമായി സംസാരിക്കൂ.',
    voiceThinking: 'ഒന്ന് പരിശോധിക്കട്ടെ...',
    voiceResponse: 'സഹായക് പറയുന്നു:',
    hearAgain: 'വീണ്ടും കേൾക്കൂ',
    done: 'ശരി',
    youCouldSay: 'ഇങ്ങനെ പറഞ്ഞു നോക്കൂ:',
    listeningPlaceholder: 'നിങ്ങളുടെ ശബ്ദം കേൾക്കുന്നു...',
    tapWhenFinished: 'കഴിഞ്ഞാൽ ടാപ്പ് ചെയ്യൂ',
    understandingRequest: 'നിങ്ങളുടെ അഭ്യർത്ഥന മനസ്സിലാക്കുന്നു...',
    youAsked: 'നിങ്ങൾ ചോദിച്ചു',
    reminderSaved: 'ഓർമ്മപ്പെടുത്തൽ സേവ് ചെയ്തു',
    reminderSavedDesc: 'നിങ്ങളുടെ ഓർമ്മപ്പെടുത്തൽ ഷെഡ്യൂളിൽ ചേർത്തു.',
    letMeTakeALook: 'ഒന്ന് നോക്കട്ടെ...',
    holdSteady: 'ദയവായി ഉറച്ചു പിടിക്കൂ...',
    voiceTryAsking: 'ഇങ്ങനെ ചോദിച്ചു നോക്കൂ:',
    voicePreset1: 'രാത്രി 8 മണിക്ക് മരുന്ന് കഴിക്കാൻ ഓർമ്മിപ്പിക്കൂ',
    voicePreset2: 'എന്റെ അടുത്ത ഡോക്ടർ അപ്പോയിന്റ്മെന്റ് എപ്പോഴാണ്?',
    voicePreset3: 'എന്റെ മകൾ അനന്യയെ വിളിക്കൂ',
    voicePreset4: 'ഇന്ന് കാലാവസ്ഥ എങ്ങനെയുണ്ട്?',

    // Camera / Show
    showTitle: 'സഹായകിനു കാണിക്കൂ',
    showInstruction: 'മരുന്ന്, രേഖ, ബിൽ, അല്ലെങ്കിൽ വസ്തുവിലേക്ക് ക്യാമറ ചൂണ്ടൂ.',
    modeMedicine: 'മരുന്ന്',
    modeDocument: 'രേഖ / ബിൽ',
    modeObject: 'വസ്തു',
    modeLookAround: 'ചുറ്റും നോക്കൂ',
    captureButton: 'ഫോട്ടോ എടുക്കൂ',
    processingVision: 'ഇത് നോക്കുന്നു...',
    processingSub: 'ശ്രദ്ധയോടെ വിശകലനം ചെയ്യുന്നു...',
    switchCamera: 'ക്യാമറ മാറ്റൂ',
    uploadSample: 'സാമ്പിൾ ചിത്രം ഉപയോഗിക്കൂ',

    // Medicine Result
    foundSomething: 'നിങ്ങളുടെ മരുന്ന് കണ്ടെത്തി',
    genericName: 'പൊതു പേര്',
    strength: 'ശക്തി',
    commonUse: 'സാധാരണ ഉപയോഗം',
    howToTake: 'എങ്ങനെ കഴിക്കണം',
    disclaimerTitle: 'ഡോക്ടറുടെ ഉപദേശം',
    disclaimerText: 'ദയവായി മരുന്നും ഡോസേജും എപ്പോഴും ഡോക്ടറോ ഫാർമസിസ്റ്റോ ഉറപ്പിക്കുക.',
    hearThis: 'ഇത് കേൾക്കൂ',
    setReminder: 'ഇതിന് ഓർമ്മപ്പെടുത്തൽ സെറ്റ് ചെയ്യൂ',
    back: 'തിരികെ',

    // Document / Bill Result
    foundBill: 'ഞാൻ കണ്ടെത്തിയത്',
    totalAmount: 'ആകെ തുക',
    dueDate: 'അവസാന തീയതി',
    simpleExplanation: 'ലളിതമായ വിശദീകരണം',
    gotIt: 'മനസ്സിലായി',
    remindToPay: 'പണം അടയ്ക്കാൻ ഓർമ്മിപ്പിക്കൂ',

    // Look Around
    lookAroundTitle: 'ചുറ്റും നോക്കൽ മോഡ്',
    lookAroundInstruction: 'നിങ്ങളുടെ ദൈനംദിന വസ്തുക്കൾ കണ്ടെത്താൻ സഹായക് മുറി സ്കാൻ ചെയ്യും.',
    askWhereIs: 'എന്റെ കണ്ണട എവിടെ?',
    lookAroundFound: 'മരക്കസേരയുടെ അടുത്ത് നിങ്ങളുടെ കണ്ണട ഉള്ളതായി എനിക്ക് കാണാം.',
    askSahayak: 'സഹായകിനോട് ചോദിക്കൂ',
    scanAgain: 'വീണ്ടും സ്കാൻ ചെയ്യൂ',

    // Reminders
    remindersTitle: 'നിങ്ങളുടെ ഓർമ്മപ്പെടുത്തലുകൾ',
    tabToday: 'ഇന്ന്',
    tabUpcoming: 'വരാനിരിക്കുന്നത്',
    tabAll: 'എല്ലാ ഓർമ്മപ്പെടുത്തലുകളും',
    addReminder: 'ഓർമ്മപ്പെടുത്തൽ ചേർക്കൂ',
    markTaken: 'കഴിച്ചതായി അടയാളപ്പെടുത്തൂ',
    markDone: 'ചെയ്തു',
    completed: 'പൂർത്തിയായി',
    pending: 'ബാക്കി',
    noRemindersToday: 'ഇന്നത്തേക്ക് ഓർമ്മപ്പെടുത്തലുകൾ ഇല്ല! എല്ലാം ക്രമത്തിലാണ്.',

    // Add Reminder Flow
    newReminderTitle: 'ഓർമ്മപ്പെടുത്തൽ ചേർക്കൂ',
    reminderType: 'ഏതു തരം ഓർമ്മപ്പെടുത്തൽ?',
    typeMedicine: 'മരുന്ന്',
    typeDoctor: 'ഡോക്ടർ അപ്പോയിന്റ്മെന്റ്',
    typeBill: 'ബിൽ / പേയ്മെന്റ്',
    typeCustom: 'മറ്റ് ഓർമ്മപ്പെടുത്തൽ',
    reminderNameLabel: 'ഓർമ്മപ്പെടുത്തൽ പേര് അല്ലെങ്കിൽ മരുന്ന്',
    dateLabel: 'എപ്പോൾ?',
    timeLabel: 'ഏത് സമയം?',
    saveReminder: 'ഓർമ്മപ്പെടുത്തൽ സേവ് ചെയ്യൂ',
    setByVoice: 'ശബ്ദം ഉപയോഗിച്ച് സെറ്റ് ചെയ്യൂ',

    // Family
    familyTitle: 'നിങ്ങളുടെ കുടുംബം',
    familySubtitle: 'നിങ്ങളുടെ പ്രിയപ്പെട്ടവരെ വിളിക്കാൻ ടാപ്പ് ചെയ്യൂ',
    daughter: 'മകൾ',
    son: 'മകൻ',
    caregiver: 'പരിചാരകൻ',
    callButton: 'വിളിക്കൂ',
    lastTalked: 'അവസാനം സംസാരിച്ചത്',
    available247: '24/7 ലഭ്യമാണ്',

    // Call Confirmation & Calling
    callConfirmTitle: 'വിളിക്കണമോ',
    yesCall: 'അതെ, വിളിക്കൂ',
    noCancel: 'വേണ്ട, റദ്ദാക്കൂ',
    callingTitle: 'വിളിക്കുന്നു',
    callConnecting: 'നിങ്ങളുടെ കോൾ ബന്ധിപ്പിക്കുന്നു.',
    endCall: 'കോൾ അവസാനിപ്പിക്കൂ',
    mute: 'മ്യൂട്ട്',
    speaker: 'സ്പീക്കർ',

    // Emergency / SOS
    emergencyTitle: 'അടിയന്തര സഹായം',
    emergencySubtitle: 'സഹായം എപ്പോഴും ഒരു ടച്ചിൽ. താഴെ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കൂ:',
    callFamilyEmergency: 'കുടുംബത്തെ വിളിക്കൂ',
    callCaregiverEmergency: 'പരിചാരകനെ വിളിക്കൂ',
    callEmergencyServices: 'എമർജൻസി 112',
    emergencyConfirmTitle: 'അടിയന്തര കോൾ ഉറപ്പിക്കൂ',
    emergencyConfirmPrompt: 'എമർജൻസി സർവീസുകളെ (112) വിളിക്കണമെന്ന് ഉറപ്പാണോ?',
    confirmEmergencyBtn: 'അതെ, ഇപ്പോൾ എമർജൻസി വിളിക്കൂ',

    // Settings / Accessibility
    settingsTitle: 'ആക്സസിബിലിറ്റി & ക്രമീകരണങ്ങൾ',
    textSizeLabel: 'ടെക്സ്റ്റ് വലിപ്പം',
    sizeSmall: 'സാധാരണം',
    sizeMedium: 'വലുത്',
    sizeLarge: 'വളരെ വലുത് (മുതിർന്നവർ)',
    languageLabel: 'ഭാഷ',
    voiceSpeedLabel: 'സംസാര വേഗത',
    speedSlow: 'പതുക്കെ & വ്യക്തമായി',
    speedNormal: 'സാധാരണം',
    voiceGenderLabel: 'അസിസ്റ്റന്റ് ശബ്ദം',
    voiceFemale: 'സ്ത്രീ (ലത)',
    voiceMale: 'പുരുഷൻ (അരുൺ)',
    highContrastLabel: 'ഹൈ കോൺട്രാസ്റ്റ് മോഡ്',
    simplifiedModeLabel: 'ലളിതമായ കാഴ്ച',
    soundVolumeLabel: 'ശബ്ദ വോളിയം',
    testVoiceBtn: 'അസിസ്റ്റന്റ് ശബ്ദം പരീക്ഷിക്കൂ',

    // Caregiver Circle Portal
    caregiverPortalTitle: 'കുടുംബ പരിചരണ വലയം',
    caregiverPortalSub: 'അനന്യയ്ക്കുള്ള (മകൾ) അനുവദനീയ അവലോകനം',
    caregiverSyncStatus: '2 മിനിറ്റ് മുമ്പ് സിൻക് ചെയ്തു · സഹായക് ഹബ് സജീവം',
    medicineCompliance: 'ഇന്ന് കഴിച്ച മരുന്നുകൾ',
    upcomingAppointments: 'വരാനിരിക്കുന്ന ഡോക്ടർ അപ്പോയിന്റ്മെന്റുകൾ',
    recentAlerts: 'സുരക്ഷ & സഹായ നില',
    privacyNote: 'ക്യാമറ ഫീഡുകളും സ്വകാര്യ ചാറ്റുകളും കർശനമായി രഹസ്യമായി സൂക്ഷിക്കും.'
  }
};

export function getTranslation(lang: Language, key: any, params?: Record<string, string | number>): string {
  const dictionary = translations[lang] || translations.en;
  let text = (dictionary as any)[key] || (translations.en as any)[key]; if (!text) text = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase());
  if (params && typeof text === 'string') {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp('\\\{\\\{' + k + '\\\}\\\}', 'g'), String(v));
    });
  }
  return text;
}
