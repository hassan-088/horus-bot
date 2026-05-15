import { sharedExhibitRecords } from '@/lib/exhibitCatalog';

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

export const exhibits: Exhibit[] = sharedExhibitRecords.map((exhibit) => ({
  id: exhibit.id,
  nameEn: exhibit.title_en ?? exhibit.id,
  nameAr: exhibit.title_ar ?? exhibit.title_en ?? exhibit.id,
  descriptionEn: exhibit.content_en?.summary ?? exhibit.content_en?.historical_background ?? '',
  descriptionAr: exhibit.title_ar ?? exhibit.content_en?.summary ?? exhibit.title_en ?? exhibit.id,
  x: exhibit.locations?.map?.x ?? 0,
  y: exhibit.locations?.map?.y ?? 0,
  originEn: exhibit.locations?.original ?? exhibit.locations?.current ?? '',
  originAr: exhibit.locations?.original ?? exhibit.locations?.current ?? '',
  periodEn: exhibit.historical_period ?? '',
  periodAr: exhibit.historical_period ?? '',
  galleryEn: exhibit.locations?.gallery ?? '',
  galleryAr: exhibit.locations?.gallery ?? '',
  floor: exhibit.locations?.floor === 'floor-1' || exhibit.locations?.floor === 'floor-2'
    ? exhibit.locations.floor
    : 'ground',
}));

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

// ============================================================================
// MUSEUM ENTRY TICKET PRICING — Egypt (placeholder values, easy to edit later)
// ============================================================================
// Categories split into Egyptians and Foreigners as required by Egyptian
// museum policy. Prices are in EGP.
export const museumTicketPrices = {
  egyptian_adult: 60,
  egyptian_student: 30,
  egyptian_child: 20,
  foreigner_adult: 500,
  foreigner_student: 250,
  foreigner_child: 250,
} as const;

export type MuseumTicketCategory = keyof typeof museumTicketPrices;

// ----------------------------------------------------------------------------
// HORUS-BOT ROBOT TOUR PRICING
// ----------------------------------------------------------------------------
export const robotTourPrices = {
  standard: 150,
  personalized: 300,
} as const;

// Back-compat alias used by older screens (mobile companion app etc.).
export const ticketPrices = {
  adult: museumTicketPrices.egyptian_adult,
  student: museumTicketPrices.egyptian_student,
  child: museumTicketPrices.egyptian_child,
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
