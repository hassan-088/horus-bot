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
    chatGreeting: "Hi, I'm Horus-Bot, your personal museum guide! How can I help you today?",
    typeMessage: 'Type a message...',
    ankhuTyping: 'Horus-Bot is typing...',
    
    // Quiz
    quizTitle: 'Knowledge Quiz',
    question: 'Question',
    next: 'Next',
    finish: 'Finish',
    greatJob: '🎉 Great Job!',
    keepLearning: '📚 Keep Learning',
    retry: 'Retry',
    
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
    arabic: 'العربية',
    
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
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    map: 'الخريطة',
    tour: 'الجولة',
    tickets: 'التذاكر',
    settings: 'الإعدادات',
    
    // Splash
    the: '',
    egyptian: 'المتاحف',
    museums: 'المصرية',
    splashTagline: 'استكشف مصر مع حورس-بوت وتطبيقه.',
    
    // Onboarding
    meetAnkhu: 'تعرف على حورس-بوت',
    meetAnkhuDesc: 'حورس-بوت هو مرشدك الآلي، يعمل مع التطبيق قبل وأثناء وبعد الجولة.',
    automaticTour: 'وضع الجولة التلقائي',
    automaticTourDesc: 'عندما تبدأ الجولة، يتم تشغيل وضع حورس-بوت تلقائياً مع ميزات إضافية.',
    exploreLearn: 'استكشف وتعلم',
    exploreLearnDesc: 'استمع للشروحات، اطرح أسئلة على حورس-بوت، وخض الاختبارات في التطبيق.',
    startWithAnkhu: 'ابدأ مع حورس-بوت',
    
    // Home
    talkToAnkhu: 'تحدث مع حورس-بوت',
    explore: 'استكشف',
    exhibits: 'المعروضات',
    quiz: 'الاختبار',
    liveTour: 'جولة حية',
    feedback: 'ملاحظات',
    language: 'اللغة',
    
    // Privacy
    privacyTitle: 'الخصوصية والأذونات',
    privacyText: 'يستخدم هذا التطبيق البلوتوث والموقع لتحسين تجربتك في المتحف. نجمع بيانات مجهولة لخرائط الحرارة والتحليلات لتحسين الخدمات.',
    deny: 'رفض',
    allow: 'السماح',
    
    // Tour Alert
    tourAlert: 'جولة في القاعة أ خلال 5 دقائق',
    viewMap: 'عرض الخريطة',
    
    // Map
    museumMap: 'خريطة المتحف',
    entrance: 'المدخل',
    robotLocation: 'موقع حورس-بوت',
    yourLocation: 'موقعك',
    visitedExhibit: 'معروض تمت زيارته',
    notVisited: 'لم تتم زيارته',
    explaining: 'يشرح',
    
    // Exhibits
    exhibitsList: 'المعروضات',
    mainGallery: 'المعرض الرئيسي',
    description: 'الوصف',
    addToRoute: 'أضف إلى مساري',
    viewOnMap: 'عرض على الخريطة',
    addedToList: 'تمت إضافة المعروض إلى قائمتك.',
    removedFromList: 'تمت إزالة المعروض من قائمتك.',
    addedToRoute: 'تمت الإضافة إلى مسارك.',
    openingMap: 'جاري فتح الخريطة...',
    playingAudio: 'يتم تشغيل الشرح الصوتي...',
    origin: 'الأصل',
    period: 'الفترة',
    gallery: 'القاعة',
    
    // Chat
    chatTitle: 'تحدث مع حورس-بوت',
    chatGreeting: 'مرحباً، أنا حورس-بوت، مرشدك الشخصي في المتحف! كيف يمكنني مساعدتك اليوم؟',
    typeMessage: 'اكتب رسالة...',
    ankhuTyping: 'حورس-بوت يكتب...',
    
    // Quiz
    quizTitle: 'اختبار المعلومات',
    question: 'السؤال',
    next: 'التالي',
    finish: 'إنهاء',
    greatJob: '🎉 أحسنت!',
    keepLearning: '📚 واصل التعلم',
    retry: 'إعادة المحاولة',
    
    // Progress
    tourProgress: 'تقدم الجولة',
    visited: 'تمت زيارتها',
    duration: 'المدة',
    completed: 'مكتمل',
    
    // Live Tour
    liveTourTitle: 'جولة حية',
    live: 'مباشر',
    liveTranscript: 'النص المباشر',
    
    // Tickets
    buyTickets: 'شراء التذاكر',
    adult: 'بالغ',
    student: 'طالب',
    child: 'طفل',
    selectDate: 'اختر التاريخ',
    totalTickets: 'إجمالي التذاكر',
    totalPrice: 'السعر الإجمالي',
    checkout: 'الدفع',
    myTickets: 'تذاكري',
    noTicketsYet: 'لا توجد تذاكر بعد',
    purchaseSuccess: 'تم الشراء بنجاح!',
    goToMyTickets: 'الذهاب إلى تذاكري',
    selectTickets: 'يرجى اختيار تذكرة واحدة على الأقل',
    
    // QR Scanner
    qrScanner: 'ماسح QR',
    scanQRCode: 'مسح رمز QR',
    pointCamera: 'وجه الكاميرا نحو رمز QR',
    
    // Settings
    settingsTitle: 'الإعدادات وإمكانية الوصول',
    highContrast: 'وضع التباين العالي',
    themeMode: 'وضع السمة',
    system: 'النظام',
    light: 'فاتح',
    dark: 'داكن',
    fontSize: 'حجم الخط',
    languageSetting: 'اللغة',
    settingsNote: 'يتم حفظ هذه الإعدادات على هذا الجهاز فقط.',
    english: 'English',
    arabic: 'العربية',
    
    // AR View
    arView: 'عرض الواقع المعزز',
    arModeActive: 'وضع AR نشط',
    cameraPermission: 'إذن الكاميرا مطلوب',
    grantPermission: 'منح الإذن',
    pointCameraExhibits: 'وجه الكاميرا نحو المعروضات لعرض المعلومات',
    scanned: 'تم المسح',
    
    // Feedback
    feedbackTitle: 'ملاحظات',
    feedbackPlaceholder: 'أخبرنا عن تجربتك...',
    submitFeedback: 'إرسال الملاحظات',
    feedbackThanks: 'شكراً لملاحظاتك!',
    
    // Favorites & Achievements
    favorites: 'المفضلة',
    achievements: 'الإنجازات',
    events: 'الفعاليات',
  },
} as const;

export function t(key: keyof typeof translations.en, lang: Language): string {
  return translations[lang][key] || translations.en[key] || key;
}
