const en = {
  app: {
    name: 'Ittizan',
    nameAr: 'اتزان',
    tagline: 'Pulse of safety',
  },
  tabs: {
    today: 'Today',
    inr: 'INR',
    symptoms: 'Symptoms',
    guide: 'Guide',
    more: 'More',
  },
  sync: {
    synced: 'Synced {{minutes}} min ago',
    syncing: 'Syncing…',
    notSynced: 'Not synced',
    offline: "You're offline. Changes will sync when you reconnect.",
  },
  common: {
    tryAgain: 'Try again',
    errorGeneric: 'Something went wrong.',
    back: 'Back',
    notifications: 'Notifications',
    yourClinic: 'your clinic',
  },
  status: {
    inRange: 'In range',
    high: '↑ High',
    low: '↓ Low',
  },
  today: {
    title: 'Today',
    emptyTitle: "Let's set up your diary",
    emptyBody: 'Three quick steps and Today will show your dose and INR at a glance.',
    stepTablets: 'Add your tablets',
    stepPlan: 'Add your dose plan',
    stepInr: 'Add your first INR result',
    start: 'Start',
  },
  inr: {
    title: 'INR results',
    add: 'Add result',
    emptyTitle: 'No INR results yet',
    emptyBody: 'Add your first result to see your chart.',
  },
  symptoms: {
    title: 'Symptoms',
    urgent:
      "Get urgent care now if you have black or bloody stools, vomiting blood, a severe headache, chest pain, or bleeding that won't stop.",
    urgentStrong: 'Get urgent care now',
    callEmergency: 'Call emergency services',
    emptyTitle: 'Nothing reported yet',
    emptyBody: 'Reports show on your INR chart and in your clinic report.',
    report: 'Report a symptom',
  },
  guide: {
    title: 'Guide',
    food: 'Food & drink',
    medicines: 'Medicines',
    foodKey:
      "You don't need to avoid vitamin K foods. Keep the amount you eat each week about the same, and tell your clinic before big diet changes.",
    medKey:
      'Many medicines change how warfarin works. Tell your clinic or pharmacist before you start or stop any medicine, including herbal products.',
    comingSoon: 'The reviewed food and medicine list arrives in a later update.',
  },
  more: {
    title: 'More',
    patientId: 'Patient ID',
    show: 'Show',
    hide: 'Hide',
    language: 'Language',
    languageValue: 'English',
    appLock: 'App lock',
    gallery: 'Design gallery',
    about: 'About and disclaimer',
    disclaimer:
      'Ittizan helps you record your doses and INR results. It does not give medical advice or change your dose. Always follow your clinic.',
  },
  lock: {
    title: 'Ittizan is locked',
    body: 'Unlock to see your health diary.',
    useBiometric: 'Unlock with Face ID / fingerprint',
    enterPin: 'Enter your PIN',
    wrongPin: "That PIN isn't right. Try again.",
    delete: 'Delete digit',
  },
  gallery: {
    title: 'Design gallery',
    buttons: 'Buttons',
    primary: 'Mark as taken',
    secondary: 'One-off change',
    chips: 'Status chips',
    cards: 'Cards',
    heroLabel: "Today's dose",
    tablets: 'Tablet pictures',
    states: 'States',
  },
};

export default en;
export type Translation = typeof en;
