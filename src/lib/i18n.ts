export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    map: 'Map',
    tour: 'Tour',
    tickets: 'Tickets',
    settings: 'Settings',
    
    // Splash
    the: 'The',
    egyptian: 'Egyptian',
    museums: 'Museums',
    splashTagline: 'Explore Egypt with your Horus-Bot and its app.',
    
    // Onboarding
    meetAnkhu: 'Meet Horus-Bot',
    meetAnkhuDesc: 'Horus-Bot is your Robo-Guide, working with the app before, during, and after the tour.',
    automaticTour: 'Automatic Tour Mode',
    automaticTourDesc: 'When the tour starts, Horus-Bot mode turns on automatically with extra tour features.',
    exploreLearn: 'Explore & Learn',
    exploreLearnDesc: 'Listen to explanations, ask Horus-Bot questions, and take quizzes in the app.',
    startWithAnkhu: 'Start with Horus-Bot',
    
    // Home
    talkToAnkhu: 'Talk to Horus-Bot',
    explore: 'Explore',
    exhibits: 'Exhibits',
    quiz: 'Quiz',
    liveTour: 'Live Tour',
    feedback: 'Feedback',
    language: 'Language',
    
    // Privacy
    privacyTitle: 'Privacy & Permissions',
    privacyText: 'This app uses Bluetooth and location to enhance your museum experience. We collect anonymous data for heatmaps and analytics to improve services.',
    deny: 'Deny',
    allow: 'Allow',
    
    // Tour Alert
    tourAlert: 'Tour in Hall A in 5 minutes',
    viewMap: 'View Map',
    
    // Map
    museumMap: 'Museum Map',
    entrance: 'Entrance',
    robotLocation: 'Horus-Bot Location',
    yourLocation: 'Your Location',
    visitedExhibit: 'Visited Exhibit',
    notVisited: 'Not Visited',
    explaining: 'Explaining',
    
    // Exhibits
    exhibitsList: 'Exhibits',
    mainGallery: 'Main exhibition gallery',
    description: 'Description',
    addToRoute: 'Add to my route',
    viewOnMap: 'View on map',
    addedToList: 'Exhibit added to your list.',
    removedFromList: 'Exhibit removed from your list.',
    addedToRoute: 'Added to your route.',
    openingMap: 'Opening the map...',
    playingAudio: 'Playing the audio guide...',
    origin: 'Origin',
    period: 'Period',
    gallery: 'Gallery',
    
    // Chat
    chatTitle: 'Chat with Horus-Bot',
    chatGreeting: "Hi, I'm Horus-Bot ðŸ‘‹ I can help you with tickets, directions, exhibits, or your tour. What would you like to know?",
    chatSubtitle: 'Museum guide',
    chatErrorOnce: 'Something went wrong. Please try again.',
    chatErrorRepeat: "Sorry, I'm having trouble. You can try again, or tap one of the options below.",
    typeMessage: 'Type a message...',
    ankhuTyping: 'Horus-Bot is typing...',
    ticketCheckoutNote: "You'll receive your ticket instantly after checkout.",
    successTitle: "ðŸŽ‰ You're all set!",
    successSubtitle: 'Your tickets are ready.',
    noTicketsTitle: 'No tickets yet',
    noTicketsBody: 'You do not have any tickets yet. Book your visit to get started.',
    bookAVisit: 'Book a visit',
    statusActive: 'Active',
    viewTicket: 'View Ticket',
    addToWallet: 'Add to Wallet',
    walletSoon: 'Wallet is not available in this version',
    egyptianMuseum: 'Egyptian Museum',
    
    // Quiz
    quizTitle: 'Knowledge Quiz',
    question: 'Question',
    next: 'Next',
    finish: 'Finish',
    greatJob: 'ðŸŽ‰ Great Job!',
    keepLearning: 'ðŸ“š Keep Learning',
    retry: 'Try again',
    
    // Progress
    tourProgress: 'Tour Progress',
    visited: 'Visited',
    duration: 'Duration',
    completed: 'Completed',
    
    // Live Tour
    liveTourTitle: 'Live Tour',
    live: 'LIVE',
    liveTranscript: 'Live Transcript',
    
    // Tickets
    buyTickets: 'Buy Tickets',
    adult: 'Adult',
    student: 'Student',
    child: 'Child',
    selectDate: 'Select Date',
    totalTickets: 'Total Tickets',
    totalPrice: 'Total Price',
    checkout: 'Checkout',
    myTickets: 'My Tickets',
    noTicketsYet: 'No tickets yet',
    purchaseSuccess: 'Purchase Successful!',
    goToMyTickets: 'Go to My Tickets',
    selectTickets: 'Please select at least one ticket',
    
    // QR Scanner
    qrScanner: 'QR Scanner',
    scanQRCode: 'Scan QR Code',
    pointCamera: 'Point your camera at a QR code',
    
    // Settings
    settingsTitle: 'Settings & Accessibility',
    highContrast: 'High Contrast Mode',
    themeMode: 'Theme Mode',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    fontSize: 'Font Size',
    languageSetting: 'Language',
    settingsNote: 'These settings are saved on this device only.',
    english: 'English',
    arabic: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©',
    
    // AR View
    arView: 'AR View',
    arModeActive: 'AR Mode Active',
    cameraPermission: 'Camera Permission Required',
    grantPermission: 'Grant Permission',
    pointCameraExhibits: 'Point your camera at exhibits to reveal info',
    scanned: 'Scanned',
    
    // Feedback
    feedbackTitle: 'Feedback',
    feedbackPlaceholder: 'Tell us about your experience...',
    submitFeedback: 'Submit Feedback',
    feedbackThanks: 'Thank you for your feedback!',
    
    // Favorites & Achievements
    favorites: 'Favorites',
    achievements: 'Achievements',
    events: 'Events',
    tourPlanner: 'Tour Planner',
    profile: 'Profile',
    visitHistory: 'Visit History',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Map
    searchExhibits: 'Search exhibits...',
    noResults: 'No results found',
    floor: 'Floor',
    ground: 'Ground',
    hallA: 'Hall A',
    hallB: 'Hall B',
    hallC: 'Hall C',
    hallD: 'Hall D',
    lobby: 'Lobby',
    all: 'All',
  },
  ar: {
    // Navigation
    home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
    map: 'Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
    tour: 'Ø§Ù„Ø¬ÙˆÙ„Ø©',
    tickets: 'Ø§Ù„ØªØ°Ø§ÙƒØ±',
    settings: 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª',
    
    // Splash
    the: '',
    egyptian: 'Ø§Ù„Ù…ØªØ§Ø­Ù',
    museums: 'Ø§Ù„Ù…ØµØ±ÙŠØ©',
    splashTagline: 'Ø§Ø³ØªÙƒØ´Ù Ù…ØµØ± Ù…Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª ÙˆØªØ·Ø¨ÙŠÙ‚Ù‡.',
    
    // Onboarding
    meetAnkhu: 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª',
    meetAnkhuDesc: 'Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ù‡Ùˆ Ù…Ø±Ø´Ø¯Ùƒ Ø§Ù„Ø¢Ù„ÙŠØŒ ÙŠØ¹Ù…Ù„ Ù…Ø¹ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù‚Ø¨Ù„ ÙˆØ£Ø«Ù†Ø§Ø¡ ÙˆØ¨Ø¹Ø¯ Ø§Ù„Ø¬ÙˆÙ„Ø©.',
    automaticTour: 'ÙˆØ¶Ø¹ Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„ØªÙ„Ù‚Ø§Ø¦ÙŠ',
    automaticTourDesc: 'Ø¹Ù†Ø¯Ù…Ø§ ØªØ¨Ø¯Ø£ Ø§Ù„Ø¬ÙˆÙ„Ø©ØŒ ÙŠØªÙ… ØªØ´ØºÙŠÙ„ ÙˆØ¶Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ù…Ø¹ Ù…ÙŠØ²Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ©.',
    exploreLearn: 'Ø§Ø³ØªÙƒØ´Ù ÙˆØªØ¹Ù„Ù…',
    exploreLearnDesc: 'Ø§Ø³ØªÙ…Ø¹ Ù„Ù„Ø´Ø±ÙˆØ­Ø§ØªØŒ Ø§Ø·Ø±Ø­ Ø£Ø³Ø¦Ù„Ø© Ø¹Ù„Ù‰ Ø­ÙˆØ±Ø³-Ø¨ÙˆØªØŒ ÙˆØ®Ø¶ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ÙÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚.',
    startWithAnkhu: 'Ø§Ø¨Ø¯Ø£ Ù…Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª',
    
    // Home
    talkToAnkhu: 'ØªØ­Ø¯Ø« Ù…Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª',
    explore: 'Ø§Ø³ØªÙƒØ´Ù',
    exhibits: 'Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª',
    quiz: 'Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±',
    liveTour: 'Ø¬ÙˆÙ„Ø© Ø­ÙŠØ©',
    feedback: 'Ù…Ù„Ø§Ø­Ø¸Ø§Øª',
    language: 'Ø§Ù„Ù„ØºØ©',
    
    // Privacy
    privacyTitle: 'Ø§Ù„Ø®ØµÙˆØµÙŠØ© ÙˆØ§Ù„Ø£Ø°ÙˆÙ†Ø§Øª',
    privacyText: 'ÙŠØ³ØªØ®Ø¯Ù… Ù‡Ø°Ø§ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø¨Ù„ÙˆØªÙˆØ« ÙˆØ§Ù„Ù…ÙˆÙ‚Ø¹ Ù„ØªØ­Ø³ÙŠÙ† ØªØ¬Ø±Ø¨ØªÙƒ ÙÙŠ Ø§Ù„Ù…ØªØ­Ù. Ù†Ø¬Ù…Ø¹ Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø¬Ù‡ÙˆÙ„Ø© Ù„Ø®Ø±Ø§Ø¦Ø· Ø§Ù„Ø­Ø±Ø§Ø±Ø© ÙˆØ§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø®Ø¯Ù…Ø§Øª.',
    deny: 'Ø±ÙØ¶',
    allow: 'Ø§Ù„Ø³Ù…Ø§Ø­',
    
    // Tour Alert
    tourAlert: 'Ø¬ÙˆÙ„Ø© ÙÙŠ Ø§Ù„Ù‚Ø§Ø¹Ø© Ø£ Ø®Ù„Ø§Ù„ 5 Ø¯Ù‚Ø§Ø¦Ù‚',
    viewMap: 'Ø¹Ø±Ø¶ Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
    
    // Map
    museumMap: 'Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ù…ØªØ­Ù',
    entrance: 'Ø§Ù„Ù…Ø¯Ø®Ù„',
    robotLocation: 'Ù…ÙˆÙ‚Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª',
    yourLocation: 'Ù…ÙˆÙ‚Ø¹Ùƒ',
    visitedExhibit: 'Ù…Ø¹Ø±ÙˆØ¶ ØªÙ…Øª Ø²ÙŠØ§Ø±ØªÙ‡',
    notVisited: 'Ù„Ù… ØªØªÙ… Ø²ÙŠØ§Ø±ØªÙ‡',
    explaining: 'ÙŠØ´Ø±Ø­',
    
    // Exhibits
    exhibitsList: 'Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª',
    mainGallery: 'Ø§Ù„Ù…Ø¹Ø±Ø¶ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ',
    description: 'Ø§Ù„ÙˆØµÙ',
    addToRoute: 'Ø£Ø¶Ù Ø¥Ù„Ù‰ Ù…Ø³Ø§Ø±ÙŠ',
    viewOnMap: 'Ø¹Ø±Ø¶ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
    addedToList: 'ØªÙ…Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶ Ø¥Ù„Ù‰ Ù‚Ø§Ø¦Ù…ØªÙƒ.',
    removedFromList: 'ØªÙ…Øª Ø¥Ø²Ø§Ù„Ø© Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶ Ù…Ù† Ù‚Ø§Ø¦Ù…ØªÙƒ.',
    addedToRoute: 'ØªÙ…Øª Ø§Ù„Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ù…Ø³Ø§Ø±Ùƒ.',
    openingMap: 'Ø¬Ø§Ø±ÙŠ ÙØªØ­ Ø§Ù„Ø®Ø±ÙŠØ·Ø©...',
    playingAudio: 'ÙŠØªÙ… ØªØ´ØºÙŠÙ„ Ø§Ù„Ø´Ø±Ø­ Ø§Ù„ØµÙˆØªÙŠ...',
    origin: 'Ø§Ù„Ø£ØµÙ„',
    period: 'Ø§Ù„ÙØªØ±Ø©',
    gallery: 'Ø§Ù„Ù‚Ø§Ø¹Ø©',
    
    // Chat
    chatTitle: 'ØªØ­Ø¯Ø« Ù…Ø¹ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª',
    chatGreeting: 'Ø£Ù‡Ù„Ø§Ù‹ØŒ Ø£Ù†Ø§ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª ðŸ‘‹ Ø£Ù‚Ø¯Ø± Ø£Ø³Ø§Ø¹Ø¯Ùƒ ÙÙŠ Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ Ø§Ù„Ø§ØªØ¬Ø§Ù‡Ø§ØªØŒ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§ØªØŒ Ø£Ùˆ Ø¬ÙˆÙ„ØªÙƒ. ØªØ­Ø¨ ØªØ¹Ø±Ù Ø¥ÙŠÙ‡ØŸ',
    chatSubtitle: 'Ù…Ø±Ø´Ø¯ Ø§Ù„Ù…ØªØ­Ù',
    chatErrorOnce: 'Ø­ØµÙ„ Ø®Ø·Ø£. Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰ Ù…Ù† ÙØ¶Ù„Ùƒ.',
    chatErrorRepeat: 'Ø¹Ø°Ø±Ø§Ù‹ØŒ Ø£ÙˆØ§Ø¬Ù‡ Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ø¢Ù†. ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰ Ø£Ùˆ Ø§Ø®ØªÙŠØ§Ø± Ø£Ø­Ø¯ Ø§Ù„Ø®ÙŠØ§Ø±Ø§Øª Ø¨Ø§Ù„Ø£Ø³ÙÙ„.',
    typeMessage: 'Ø§ÙƒØªØ¨ Ø±Ø³Ø§Ù„Ø©...',
    ankhuTyping: 'Ø­ÙˆØ±Ø³-Ø¨ÙˆØª ÙŠÙƒØªØ¨...',
    ticketCheckoutNote: 'Ø³ØªØµÙ„Ùƒ ØªØ°ÙƒØ±ØªÙƒ ÙÙˆØ±Ø§Ù‹ Ø¨Ø¹Ø¯ Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø¯ÙØ¹.',
    successTitle: 'ðŸŽ‰ ÙƒÙ„ Ø´ÙŠØ¡ Ø¬Ø§Ù‡Ø²!',
    successSubtitle: 'ØªØ°Ø§ÙƒØ±Ùƒ Ø¬Ø§Ù‡Ø²Ø©.',
    noTicketsTitle: 'Ù„Ø§ ØªÙˆØ¬Ø¯ ØªØ°Ø§ÙƒØ± Ø¨Ø¹Ø¯',
    noTicketsBody: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù„Ø¯ÙŠÙƒ Ø£ÙŠ ØªØ°Ø§ÙƒØ± Ø¨Ø¹Ø¯. Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ Ù„ØªØ¨Ø¯Ø£.',
    bookAVisit: 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±Ø©',
    statusActive: 'ÙØ¹Ù‘Ø§Ù„Ø©',
    viewTicket: 'Ø¹Ø±Ø¶ Ø§Ù„ØªØ°ÙƒØ±Ø©',
    addToWallet: 'Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø­ÙØ¸Ø©',
    walletSoon: 'Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„Ù…Ø­ÙØ¸Ø© ØºÙŠØ± Ù…ØªØ§Ø­Ø© ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ø¥ØµØ¯Ø§Ø±',
    egyptianMuseum: 'Ø§Ù„Ù…ØªØ­Ù Ø§Ù„Ù…ØµØ±ÙŠ',
    
    // Quiz
    quizTitle: 'Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª',
    question: 'Ø§Ù„Ø³Ø¤Ø§Ù„',
    next: 'Ø§Ù„ØªØ§Ù„ÙŠ',
    finish: 'Ø¥Ù†Ù‡Ø§Ø¡',
    greatJob: 'ðŸŽ‰ Ø£Ø­Ø³Ù†Øª!',
    keepLearning: 'ðŸ“š ÙˆØ§ØµÙ„ Ø§Ù„ØªØ¹Ù„Ù…',
    retry: 'إعادة المحاولة',
    
    // Progress
    tourProgress: 'ØªÙ‚Ø¯Ù… Ø§Ù„Ø¬ÙˆÙ„Ø©',
    visited: 'ØªÙ…Øª Ø²ÙŠØ§Ø±ØªÙ‡Ø§',
    duration: 'Ø§Ù„Ù…Ø¯Ø©',
    completed: 'Ù…ÙƒØªÙ…Ù„',
    
    // Live Tour
    liveTourTitle: 'Ø¬ÙˆÙ„Ø© Ø­ÙŠØ©',
    live: 'Ù…Ø¨Ø§Ø´Ø±',
    liveTranscript: 'Ø§Ù„Ù†Øµ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±',
    
    // Tickets
    buyTickets: 'Ø´Ø±Ø§Ø¡ Ø§Ù„ØªØ°Ø§ÙƒØ±',
    adult: 'Ø¨Ø§Ù„Øº',
    student: 'Ø·Ø§Ù„Ø¨',
    child: 'Ø·ÙÙ„',
    selectDate: 'Ø§Ø®ØªØ± Ø§Ù„ØªØ§Ø±ÙŠØ®',
    totalTickets: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„ØªØ°Ø§ÙƒØ±',
    totalPrice: 'Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ',
    checkout: 'Ø§Ù„Ø¯ÙØ¹',
    myTickets: 'ØªØ°Ø§ÙƒØ±ÙŠ',
    noTicketsYet: 'Ù„Ø§ ØªÙˆØ¬Ø¯ ØªØ°Ø§ÙƒØ± Ø¨Ø¹Ø¯',
    purchaseSuccess: 'ØªÙ… Ø§Ù„Ø´Ø±Ø§Ø¡ Ø¨Ù†Ø¬Ø§Ø­!',
    goToMyTickets: 'Ø§Ù„Ø°Ù‡Ø§Ø¨ Ø¥Ù„Ù‰ ØªØ°Ø§ÙƒØ±ÙŠ',
    selectTickets: 'ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± ØªØ°ÙƒØ±Ø© ÙˆØ§Ø­Ø¯Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„',
    
    // QR Scanner
    qrScanner: 'Ù…Ø§Ø³Ø­ QR',
    scanQRCode: 'Ù…Ø³Ø­ Ø±Ù…Ø² QR',
    pointCamera: 'ÙˆØ¬Ù‡ Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§ Ù†Ø­Ùˆ Ø±Ù…Ø² QR',
    
    // Settings
    settingsTitle: 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª ÙˆØ¥Ù…ÙƒØ§Ù†ÙŠØ© Ø§Ù„ÙˆØµÙˆÙ„',
    highContrast: 'ÙˆØ¶Ø¹ Ø§Ù„ØªØ¨Ø§ÙŠÙ† Ø§Ù„Ø¹Ø§Ù„ÙŠ',
    themeMode: 'ÙˆØ¶Ø¹ Ø§Ù„Ø³Ù…Ø©',
    system: 'Ø§Ù„Ù†Ø¸Ø§Ù…',
    light: 'ÙØ§ØªØ­',
    dark: 'Ø¯Ø§ÙƒÙ†',
    fontSize: 'Ø­Ø¬Ù… Ø§Ù„Ø®Ø·',
    languageSetting: 'Ø§Ù„Ù„ØºØ©',
    settingsNote: 'ÙŠØªÙ… Ø­ÙØ¸ Ù‡Ø°Ù‡ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø¹Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ù‡Ø§Ø² ÙÙ‚Ø·.',
    english: 'English',
    arabic: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©',
    
    // AR View
    arView: 'Ø¹Ø±Ø¶ Ø§Ù„ÙˆØ§Ù‚Ø¹ Ø§Ù„Ù…Ø¹Ø²Ø²',
    arModeActive: 'ÙˆØ¶Ø¹ AR Ù†Ø´Ø·',
    cameraPermission: 'Ø¥Ø°Ù† Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§ Ù…Ø·Ù„ÙˆØ¨',
    grantPermission: 'Ù…Ù†Ø­ Ø§Ù„Ø¥Ø°Ù†',
    pointCameraExhibits: 'ÙˆØ¬Ù‡ Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§ Ù†Ø­Ùˆ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª',
    scanned: 'ØªÙ… Ø§Ù„Ù…Ø³Ø­',
    
    // Feedback
    feedbackTitle: 'Ù…Ù„Ø§Ø­Ø¸Ø§Øª',
    feedbackPlaceholder: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø¹Ù† ØªØ¬Ø±Ø¨ØªÙƒ...',
    submitFeedback: 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª',
    feedbackThanks: 'Ø´ÙƒØ±Ø§Ù‹ Ù„Ù…Ù„Ø§Ø­Ø¸Ø§ØªÙƒ!',
    
    // Favorites & Achievements
    favorites: 'Ø§Ù„Ù…ÙØ¶Ù„Ø©',
    achievements: 'Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª',
    events: 'Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª',
    tourPlanner: 'Ø®Ø·Ø· Ø¬ÙˆÙ„ØªÙƒ',
    profile: 'Ø§Ù„Ù…Ù„Ù Ø§Ù„Ø´Ø®ØµÙŠ',
    visitHistory: 'Ø³Ø¬Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø§Øª',
    signIn: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„',
    signOut: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬',
    
    // Map
    searchExhibits: 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø¹Ø±ÙˆØ¶...',
    noResults: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù†ØªØ§Ø¦Ø¬',
    floor: 'Ø§Ù„Ø·Ø§Ø¨Ù‚',
    ground: 'Ø§Ù„Ø£Ø±Ø¶ÙŠ',
    hallA: 'Ø§Ù„Ù‚Ø§Ø¹Ø© Ø£',
    hallB: 'Ø§Ù„Ù‚Ø§Ø¹Ø© Ø¨',
    hallC: 'Ø§Ù„Ù‚Ø§Ø¹Ø© Ø¬',
    hallD: 'Ø§Ù„Ù‚Ø§Ø¹Ø© Ø¯',
    lobby: 'Ø§Ù„Ø±Ø¯Ù‡Ø©',
    all: 'Ø§Ù„ÙƒÙ„',
  },
} as const;

export function t(key: keyof typeof translations.en, lang: Language): string {
  return translations[lang][key] || translations.en[key] || key;
}