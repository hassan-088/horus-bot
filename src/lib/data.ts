export interface Exhibit {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  x: number;
  y: number;
  originEn: string;
  originAr: string;
  periodEn: string;
  periodAr: string;
  galleryEn: string;
  galleryAr: string;
  floor: 'ground' | 'floor-1' | 'floor-2';
  visited?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionAr: string;
  options: {
    id: string;
    textEn: string;
    textAr: string;
  }[];
  correctAnswer: string;
}

export interface Ticket {
  id: string;
  type: 'adult' | 'student' | 'child';
  quantity: number;
  date: string;
  price: number;
  museum?: string;
  status?: 'active' | 'used' | 'expired';
}

export const exhibits: Exhibit[] = [
  {
    id: 'golden-mask',
    nameEn: 'Golden Mask of Tutankhamun',
    nameAr: 'قناع توت عنخ آمون الذهبي',
    descriptionEn: 'The iconic golden death mask of the young pharaoh Tutankhamun, crafted from solid gold and inlaid with semi-precious stones and colored glass. It weighs approximately 11 kg and is one of the most recognized artifacts in the world. The mask was discovered by Howard Carter in 1925 when he opened the innermost coffin in the pharaoh\'s tomb.',
    descriptionAr: 'القناع الذهبي الشهير للفرعون الصغير توت عنخ آمون، مصنوع من الذهب الخالص ومرصع بالأحجار شبه الكريمة والزجاج الملون. يزن حوالي 11 كجم وهو من أشهر القطع الأثرية في العالم.',
    x: 250,
    y: 150,
    originEn: 'Ancient Egypt',
    originAr: 'مصر القديمة',
    periodEn: 'New Kingdom',
    periodAr: 'المملكة الحديثة',
    galleryEn: 'Hall A',
    galleryAr: 'القاعة أ',
    floor: 'ground',
    visited: true,
  },
  {
    id: 'rosetta-stone',
    nameEn: 'Rosetta Stone Replica',
    nameAr: 'نسخة حجر رشيد',
    descriptionEn: 'A detailed replica of the famous Rosetta Stone, the key to deciphering Egyptian hieroglyphics. The original stone features the same text in three scripts: hieroglyphic, demotic, and ancient Greek, allowing scholars to finally understand the ancient Egyptian writing system.',
    descriptionAr: 'نسخة مفصلة من حجر رشيد الشهير، مفتاح فك رموز الهيروغليفية المصرية. يتضمن الحجر الأصلي نفس النص بثلاث لغات: الهيروغليفية والديموطيقية واليونانية القديمة.',
    x: 400,
    y: 200,
    originEn: 'Ancient Egypt',
    originAr: 'مصر القديمة',
    periodEn: 'Ptolemaic Period',
    periodAr: 'العصر البطلمي',
    galleryEn: 'Hall B',
    galleryAr: 'القاعة ب',
    floor: 'ground',
    visited: false,
  },
  {
    id: 'ancient-vase',
    nameEn: 'Ceremonial Vase',
    nameAr: 'الإناء الاحتفالي',
    descriptionEn: 'An exquisite ceremonial vase used in religious rituals during the New Kingdom period. The intricate carvings depict scenes of offerings to the gods and showcase the remarkable craftsmanship of ancient Egyptian artisans.',
    descriptionAr: 'إناء احتفالي رائع استخدم في الطقوس الدينية خلال فترة المملكة الحديثة. تصور النقوش المعقدة مشاهد تقديم القرابين للآلهة.',
    x: 150,
    y: 300,
    originEn: 'Ancient Egypt',
    originAr: 'مصر القديمة',
    periodEn: 'New Kingdom',
    periodAr: 'المملكة الحديثة',
    galleryEn: 'Hall C',
    galleryAr: 'القاعة ج',
    floor: 'floor-1',
    visited: false,
  },
  {
    id: 'scarab-amulet',
    nameEn: 'Sacred Scarab Amulet',
    nameAr: 'تميمة الجعران المقدس',
    descriptionEn: 'A beautifully preserved scarab amulet made of blue faience. Scarabs were powerful symbols of rebirth and regeneration in ancient Egypt, associated with the god Khepri who rolled the sun across the sky.',
    descriptionAr: 'تميمة جعران محفوظة بشكل جميل مصنوعة من القيشاني الأزرق. كانت الجعارين رموزاً قوية للبعث والتجديد في مصر القديمة.',
    x: 350,
    y: 350,
    originEn: 'Ancient Egypt',
    originAr: 'مصر القديمة',
    periodEn: 'Middle Kingdom',
    periodAr: 'المملكة الوسطى',
    galleryEn: 'Hall D',
    galleryAr: 'القاعة د',
    floor: 'floor-1',
    visited: true,
  },
  {
    id: 'papyrus-scroll',
    nameEn: 'Book of the Dead Papyrus',
    nameAr: 'بردية كتاب الموتى',
    descriptionEn: 'A rare and well-preserved section of the Book of the Dead, containing spells and instructions to help the deceased navigate the afterlife. The colorful illustrations show the journey through the underworld.',
    descriptionAr: 'قسم نادر ومحفوظ جيداً من كتاب الموتى، يحتوي على تعاويذ وتعليمات لمساعدة المتوفى في رحلته للآخرة.',
    x: 280,
    y: 280,
    originEn: 'Ancient Egypt',
    originAr: 'مصر القديمة',
    periodEn: 'New Kingdom',
    periodAr: 'المملكة الحديثة',
    galleryEn: 'Hall B',
    galleryAr: 'القاعة ب',
    floor: 'floor-2',
    visited: false,
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionEn: 'What is the weight of Tutankhamun\'s golden mask?',
    questionAr: 'ما هو وزن قناع توت عنخ آمون الذهبي؟',
    options: [
      { id: 'a', textEn: '5 kg', textAr: '5 كجم' },
      { id: 'b', textEn: '11 kg', textAr: '11 كجم' },
      { id: 'c', textEn: '15 kg', textAr: '15 كجم' },
      { id: 'd', textEn: '20 kg', textAr: '20 كجم' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'q2',
    questionEn: 'The Rosetta Stone contains text in how many scripts?',
    questionAr: 'كم عدد اللغات المكتوبة على حجر رشيد؟',
    options: [
      { id: 'a', textEn: '2 scripts', textAr: 'لغتين' },
      { id: 'b', textEn: '3 scripts', textAr: '3 لغات' },
      { id: 'c', textEn: '4 scripts', textAr: '4 لغات' },
      { id: 'd', textEn: '5 scripts', textAr: '5 لغات' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'q3',
    questionEn: 'What god is associated with the scarab beetle?',
    questionAr: 'أي إله مرتبط بخنفساء الجعران؟',
    options: [
      { id: 'a', textEn: 'Ra', textAr: 'رع' },
      { id: 'b', textEn: 'Osiris', textAr: 'أوزوريس' },
      { id: 'c', textEn: 'Khepri', textAr: 'خبري' },
      { id: 'd', textEn: 'Anubis', textAr: 'أنوبيس' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'q4',
    questionEn: 'Who discovered Tutankhamun\'s tomb?',
    questionAr: 'من اكتشف مقبرة توت عنخ آمون؟',
    options: [
      { id: 'a', textEn: 'Howard Carter', textAr: 'هوارد كارتر' },
      { id: 'b', textEn: 'Jean-François Champollion', textAr: 'جان فرانسوا شامبليون' },
      { id: 'c', textEn: 'Giovanni Belzoni', textAr: 'جيوفاني بلزوني' },
      { id: 'd', textEn: 'Flinders Petrie', textAr: 'فلندرز بيتري' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'q5',
    questionEn: 'What was the purpose of the Book of the Dead?',
    questionAr: 'ما كان الغرض من كتاب الموتى؟',
    options: [
      { id: 'a', textEn: 'Recording history', textAr: 'تسجيل التاريخ' },
      { id: 'b', textEn: 'Legal documents', textAr: 'وثائق قانونية' },
      { id: 'c', textEn: 'Guide to afterlife', textAr: 'دليل للحياة الآخرة' },
      { id: 'd', textEn: 'Medical texts', textAr: 'نصوص طبية' },
    ],
    correctAnswer: 'c',
  },
];

export const liveTranscriptLines = {
  en: [
    "Welcome to the Egyptian Museum's Hall A...",
    "Horus-Bot here, showing you the magnificent Golden Mask of Tutankhamun...",
    "Crafted over 3,000 years ago from solid gold...",
    "The mask weighs approximately 11 kilograms...",
    "Notice the intricate inlay work with lapis lazuli...",
    "The stripes represent the nemes headdress worn by pharaohs...",
    "This artifact was discovered by Howard Carter in 1925...",
    "Let's move on to the next exhibit...",
  ],
  ar: [
    "مرحباً بكم في القاعة أ بالمتحف المصري...",
    "حورس-بوت هنا، يعرض لكم قناع توت عنخ آمون الذهبي الرائع...",
    "صُنع منذ أكثر من 3000 عام من الذهب الخالص...",
    "يزن القناع حوالي 11 كيلوجراماً...",
    "لاحظوا أعمال الترصيع الدقيقة باللازورد...",
    "تمثل الخطوط غطاء الرأس النمس الذي كان يرتديه الفراعنة...",
    "اكتشف هذه القطعة هوارد كارتر عام 1925...",
    "لننتقل إلى المعروض التالي...",
  ],
};

export const ticketPrices = {
  adult: 200,
  student: 100,
  child: 50,
};

// Events data
export interface MuseumEvent {
  id: string;
  type: 'exhibition' | 'tour' | 'workshop';
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  date: string;
  time: string;
  locationEn: string;
  locationAr: string;
  featured?: boolean;
}

export const museumEvents: MuseumEvent[] = [
  {
    id: 'evt-1',
    type: 'exhibition',
    titleEn: 'Treasures of the Nile',
    titleAr: 'كنوز النيل',
    descriptionEn: 'A special exhibition featuring newly discovered artifacts from recent excavations along the Nile.',
    descriptionAr: 'معرض خاص يضم قطعاً أثرية مكتشفة حديثاً من الحفريات على ضفاف النيل.',
    date: '2026-02-15',
    time: '10:00 AM - 6:00 PM',
    locationEn: 'Hall D',
    locationAr: 'القاعة د',
    featured: true,
  },
  {
    id: 'evt-2',
    type: 'tour',
    titleEn: 'Guided Tour: Royal Mummies',
    titleAr: 'جولة إرشادية: المومياوات الملكية',
    descriptionEn: 'Join our expert Egyptologist for an in-depth tour of the Royal Mummies collection.',
    descriptionAr: 'انضم إلى عالم المصريات لجولة متعمقة في مجموعة المومياوات الملكية.',
    date: '2026-01-20',
    time: '2:00 PM',
    locationEn: 'Hall B',
    locationAr: 'القاعة ب',
  },
  {
    id: 'evt-3',
    type: 'workshop',
    titleEn: 'Hieroglyphics Workshop',
    titleAr: 'ورشة الهيروغليفية',
    descriptionEn: 'Learn to read and write basic hieroglyphics in this hands-on workshop for all ages.',
    descriptionAr: 'تعلم قراءة وكتابة الهيروغليفية الأساسية في ورشة عمل عملية لجميع الأعمار.',
    date: '2026-01-25',
    time: '11:00 AM',
    locationEn: 'Education Center',
    locationAr: 'مركز التعليم',
  },
  {
    id: 'evt-4',
    type: 'tour',
    titleEn: 'Sunset Tour: Tutankhamun Gallery',
    titleAr: 'جولة الغروب: معرض توت عنخ آمون',
    descriptionEn: 'Experience the golden treasures of Tutankhamun in a special evening tour.',
    descriptionAr: 'استمتع بكنوز توت عنخ آمون الذهبية في جولة مسائية خاصة.',
    date: '2026-01-28',
    time: '5:00 PM',
    locationEn: 'Hall A',
    locationAr: 'القاعة أ',
  },
  {
    id: 'evt-5',
    type: 'workshop',
    titleEn: 'Mummy Wrapping Demo',
    titleAr: 'عرض تحنيط المومياء',
    descriptionEn: 'Watch a live demonstration of ancient mummification techniques.',
    descriptionAr: 'شاهد عرضاً حياً لتقنيات التحنيط القديمة.',
    date: '2026-02-01',
    time: '3:00 PM',
    locationEn: 'Hall C',
    locationAr: 'القاعة ج',
  },
];
