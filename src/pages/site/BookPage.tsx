import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Minus, Plus, Calendar as CalendarIcon, Clock, User as UserIcon, Mail, Lock, Phone, Flag,
  CreditCard, Wallet, Loader2, ShieldCheck, Check, X as XIcon, Eye, EyeOff,
  ArrowRight, ArrowLeft, Sparkles, Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { BookingStepper } from '@/components/site/BookingStepper';
import { useApp } from '@/contexts/AppContext';
import { useAuth, friendlyAuthError } from '@/contexts/AuthContext';
import { useExhibits } from '@/hooks/useExhibits';
import { useUserTickets, type TourType } from '@/hooks/useUserTickets';
import { isFutureVisitTime, maxExhibitsForDuration } from '@/lib/bookingContract';
import { CURRENCY, MAX_VISITORS_PER_BOOKING, museumTicketPrices, robotTourPrices, type MuseumTicketCategory } from '@/lib/pricing';
import { productMessage } from '@/lib/productMessages';
import { bookingErrorMessage } from '@/lib/errorMessages';
import { TOUR_NARRATION_LANGUAGES, isSupportedTourNarrationLanguage, normalizeTourNarrationLanguage } from '@/lib/tourLanguages';
import {
  loadRecommendedRoutes,
  type RecommendedRoute,
} from '@/lib/recommendedRoutes';
import { PASSWORD_RULES, isStrongPassword, isValidPhone } from '@/lib/passwordRules';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import gemImage from '@/assets/gem.jpg';

type StepKey = 'account' | 'tickets' | 'tour' | 'datetime' | 'language' | 'personalize' | 'payment';
type PayMethod = 'card' | 'cash';

const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const STANDARD_TOUR_DURATION_MIN = 45;
const ARTIFACT_ID_PATTERN = /^artifact_\d{3}$/;
const DURATIONS = [30, 45, 60, 90];

function todayDateInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

const emailSchema = z.string().trim().email();

interface CategoryRow {
  key: MuseumTicketCategory;
  en: string;
  ar: string;
  group: 'eg' | 'foreign';
}

const CATEGORY_ROWS: CategoryRow[] = [
  { key: 'egyptian_adult',   en: 'Egyptian Adult',    ar: 'بالغ مصري',    group: 'eg' },
  { key: 'egyptian_student', en: 'Egyptian Student',  ar: 'طالب مصري',    group: 'eg' },
  { key: 'egyptian_child',   en: 'Egyptian Child',    ar: 'طفل مصري',     group: 'eg' },
  { key: 'foreigner_adult',   en: 'Foreigner Adult',   ar: 'بالغ أجنبي',   group: 'foreign' },
  { key: 'foreigner_student', en: 'Foreigner Student', ar: 'طالب أجنبي',   group: 'foreign' },
  { key: 'foreigner_child',   en: 'Foreigner Child',   ar: 'طفل أجنبي',    group: 'foreign' },
];

export default function BookPage() {
  const { isRTL } = useApp();
  const { user, signIn, signUp } = useAuth();
  const { createBooking } = useUserTickets();
  const {
    exhibits,
    loading: exhibitsLoading,
    error: exhibitsError,
    retry: retryExhibits,
  } = useExhibits();
  const navigate = useNavigate();
  const [tourType, setTourType] = useState<TourType>('standard');

  // ---- Step management ----
  const accountNeeded = !user;
  const allSteps: StepKey[] = useMemo(
    () => [
      ...(accountNeeded ? (['account'] as StepKey[]) : []),
      'tickets',
      'tour',
      'datetime',
      'language',
      ...(tourType === 'personalized' ? (['personalize'] as StepKey[]) : []),
      'payment',
    ],
    [accountNeeded, tourType],
  );
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = allSteps[stepIdx];

  const stepLabels = allSteps.map((s) => {
    if (s === 'account') return isRTL ? 'الحساب' : 'Account';
    if (s === 'tickets') return isRTL ? 'التذاكر' : 'Tickets';
    if (s === 'tour') return isRTL ? 'الجولة' : 'Tour';
    if (s === 'datetime') return isRTL ? 'الموعد' : 'Date & Time';
    if (s === 'language') return isRTL ? 'اللغة' : 'Language';
    if (s === 'personalize') return isRTL ? 'التفضيلات' : 'Preferences';
    return isRTL ? 'الدفع' : 'Payment';
  });
  const currentStepLabel = stepLabels[stepIdx] ?? '';
  const stepHelp: Record<StepKey, string> = {
    account: isRTL
      ? '\u0627\u062d\u0641\u0638 \u0632\u064a\u0627\u0631\u062a\u0643 \u0648\u062a\u0630\u0627\u0643\u0631\u0643 \u0641\u064a \u062d\u0633\u0627\u0628 \u0648\u0627\u062d\u062f.'
      : 'Keep your visit and tickets ready in one account.',
    tickets: isRTL
      ? '\u0627\u062e\u062a\u0631 \u062a\u0630\u0627\u0643\u0631 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641 \u0644\u0643 \u0648\u0644\u0645\u0631\u0627\u0641\u0642\u064a\u0643.'
      : 'Choose Museum Entry Tickets for you and your guests.',
    tour: isRTL
      ? '\u062d\u062f\u062f \u0643\u064a\u0641 \u062a\u0631\u064a\u062f \u0623\u0646 \u062a\u0634\u0639\u0631 \u0627\u0644\u062c\u0648\u0644\u0629 \u0645\u0639 Horus-Bot.'
      : 'Choose how you want the Horus-Bot guided tour to feel.',
    datetime: isRTL
      ? '\u0627\u062e\u062a\u0631 \u0645\u0648\u0639\u062f\u0627 \u064a\u0646\u0627\u0633\u0628 \u0625\u064a\u0642\u0627\u0639 \u0632\u064a\u0627\u0631\u062a\u0643.'
      : 'Choose when you would like to arrive for the visit.',
    language: isRTL
      ? '\u0627\u062e\u062a\u0631 \u0644\u063a\u0629 \u0627\u0644\u0642\u0635\u0629 \u0627\u0644\u062a\u064a \u0633\u064a\u0631\u0648\u064a\u0647\u0627 Horus-Bot.'
      : 'Choose the story language Horus-Bot will use during the tour.',
    personalize: isRTL
      ? '\u0627\u0634\u0643\u0644 \u0627\u0644\u0631\u062d\u0644\u0629 \u062d\u0648\u0644 \u0648\u0642\u062a\u0643 \u0648\u0627\u0647\u062a\u0645\u0627\u0645\u0627\u062a\u0643.'
      : 'Shape the visit around your time, pace, and interests.',
    payment: isRTL
      ? '\u0623\u0643\u062f \u0627\u0644\u062d\u062c\u0632 \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0628\u0647\u062f\u0648\u0621 \u0639\u0646\u062f \u0634\u0628\u0627\u0643 \u0627\u0644\u0645\u062a\u062d\u0641.'
      : 'Confirm now and pay calmly at the museum counter.',
  };
  const panelClass = [
    'rounded-[2rem] border-primary/20 bg-card/90 shadow-soft backdrop-blur',
    '[&_input]:h-11 [&_input]:rounded-xl [&_input]:border-primary/20 [&_input]:bg-background/90 [&_input]:shadow-inner [&_input]:shadow-primary/5',
    '[&_input::placeholder]:text-muted-foreground/55 [&_input:focus-visible]:ring-primary/25',
    '[&_textarea]:rounded-2xl [&_textarea]:border-primary/20 [&_textarea]:bg-background/90 [&_textarea]:shadow-inner [&_textarea]:shadow-primary/5',
    '[&_textarea::placeholder]:text-muted-foreground/55 [&_textarea:focus-visible]:ring-primary/25',
    '[&_[role=combobox]]:h-11 [&_[role=combobox]]:rounded-xl [&_[role=combobox]]:border-primary/20 [&_[role=combobox]]:bg-background/90 [&_[role=combobox]:focus]:ring-primary/25',
  ].join(' ');

  const goNext = () => setStepIdx((i) => Math.min(i + 1, allSteps.length - 1));
  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));

  // ---- State ----
  // Account
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [signupLanguage, setSignupLanguage] = useState('english');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authErrors, setAuthErrors] = useState<{
    fullName?: string; email?: string; password?: string; confirm?: string; phone?: string;
  }>({});

  // Tickets — categories
  const [quantities, setQuantities] = useState<Record<MuseumTicketCategory, number>>({
    egyptian_adult: 0, egyptian_student: 0, egyptian_child: 0,
    foreigner_adult: 0, foreigner_student: 0, foreigner_child: 0,
  });

  // Date & time
  const today = todayDateInputValue();
  const [date, setDate] = useState(today);
  const [time, setTime] = useState<string>('11:00');

  // Personalize
  const [duration, setDuration] = useState<number>(STANDARD_TOUR_DURATION_MIN);
  const [selectedExhibits, setSelectedExhibits] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [tourLanguage, setTourLanguage] = useState<string>('english');
  const [tourLanguageOther, setTourLanguageOther] = useState('');
  const [pace, setPace] = useState<string>('normal');
  const [photoSpots, setPhotoSpots] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [languageTouched, setLanguageTouched] = useState(false);
  const [routesLoading, setRoutesLoading] = useState(true);
  const [routeRows, setRouteRows] = useState<RecommendedRoute[]>([]);

  // Payment
  const [pay, setPay] = useState<PayMethod>('cash');
  const [busy, setBusy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const museumPrice = (Object.entries(quantities) as [MuseumTicketCategory, number][])
    .reduce((acc, [k, n]) => acc + n * museumTicketPrices[k], 0);
  const tourPrice = robotTourPrices[tourType];
  const totalPrice = museumPrice + tourPrice;
  const maxSelectedExhibits = maxExhibitsForDuration(duration);
  const exhibitLimitMessage = isRTL
    ? `تدعم هذه المدة حتى ${maxSelectedExhibits} قطع. اختر مدة أطول لإضافة المزيد.`
    : `This duration supports up to ${maxSelectedExhibits} exhibits. Choose a longer duration to add more.`;
  const activeRecommendedRoutes = routeRows.filter((route) => route.is_active);
  const selectedRecommendedRoute =
    activeRecommendedRoutes.find((route) => route.id === selectedRouteId) ?? null;
  const summaryTourLabel = selectedRecommendedRoute
    ? (isRTL && selectedRecommendedRoute.title_ar ? selectedRecommendedRoute.title_ar : selectedRecommendedRoute.title_en)
    : tourType === 'personalized'
      ? (isRTL ? '\u0631\u062d\u0644\u0629 \u0645\u062e\u0635\u0635\u0629' : 'Personalized Journey')
      : (isRTL ? '\u0623\u0628\u0631\u0632 \u0645\u062d\u0637\u0627\u062a Horus-Bot' : 'Horus-Bot Highlights');

  const retryRecommendedRoutes = () => {
    setRoutesLoading(true);
    const result = loadRecommendedRoutes();
    console.info('[Horus-Bot] Recommended routes loaded', {
      count: result.routes.length,
      activeCount: result.routes.filter((route) => route.is_active).length,
      warnings: result.warnings,
    });
    setRouteRows(result.routes);
    setRoutesLoading(false);
  };

  useEffect(() => {
    retryRecommendedRoutes();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (time && isFutureVisitTime(date, time)) return;
    const nextSlot = TIME_SLOTS.find((slot) => isFutureVisitTime(date, slot));
    if (nextSlot && nextSlot !== time) {
      setTime(nextSlot);
    }
  }, [date, time]);

  // ---- Handlers ----
  const visitorLimitMessage = isRTL
    ? `يمكن أن يشمل حجز Horus-Bot حتى ${MAX_VISITORS_PER_BOOKING} زوار فقط.`
    : `Each Horus-Bot booking can include up to ${MAX_VISITORS_PER_BOOKING} visitors.`;
  const visitorLimitHelper = isRTL
    ? `الحد الأقصى ${MAX_VISITORS_PER_BOOKING} زوار لكل حجز.`
    : `Maximum ${MAX_VISITORS_PER_BOOKING} visitors per booking.`;
  const unsupportedTourLanguageMessage = isRTL
    ? 'اختر لغة جولة مدعومة.'
    : 'Choose a supported tour language.';
  const standardRouteRequiredMessage = isRTL
    ? 'اختر مساراً مقترحاً للجولة القياسية.'
    : 'Choose a recommended route for the standard tour.';
  const personalizedExhibitRequiredMessage = isRTL
    ? 'اختر معروضاً واحداً على الأقل لجولتك المخصصة.'
    : 'Choose at least one exhibit for your personalized tour.';
  const futureVisitTimeMessage = isRTL
    ? 'يرجى اختيار وقت زيارة قادم.'
    : 'Please choose a future visit time.';
  const pastVisitTimeMessage = isRTL
    ? 'هذا الوقت قد مر بالفعل. يرجى اختيار وقت لاحق.'
    : 'This time has already passed. Please choose a later time.';
  const noRemainingVisitTimesMessage = isRTL
    ? 'لا توجد مواعيد زيارة متاحة اليوم. يرجى اختيار تاريخ آخر.'
    : 'No remaining visit times are available today. Please choose another date.';
  const availableTimeSlots = TIME_SLOTS.filter((slot) => isFutureVisitTime(date, slot));
  const hasNoRemainingSlotsToday = date === today && availableTimeSlots.length === 0;
  const isSelectedVisitTimeFuture = isFutureVisitTime(date, time);
  const visitTimeErrorMessage = hasNoRemainingSlotsToday
    ? noRemainingVisitTimesMessage
    : date === today
      ? pastVisitTimeMessage
      : futureVisitTimeMessage;

  const updateQuantity = (k: MuseumTicketCategory, d: number) =>
    setQuantities((q) => {
      const currentCategoryQuantity = q[k];
      const nextCategoryQuantity = Math.max(0, currentCategoryQuantity + d);
      const nextTotal = Object.entries(q).reduce(
        (total, [key, value]) => total + (key === k ? nextCategoryQuantity : value),
        0,
      );

      if (d > 0 && nextTotal > MAX_VISITORS_PER_BOOKING) {
        toast.error(visitorLimitMessage);
        return q;
      }

      return { ...q, [k]: nextCategoryQuantity };
    });

  const validateAuth = () => {
    const e: typeof authErrors = {};
    if (authMode === 'signup') {
      if (!fullName.trim() || fullName.trim().length < 2) {
        e.fullName = isRTL ? 'الرجاء إدخال اسمك الكامل.' : 'Please enter your full name.';
      }
    }
    if (!email.trim()) {
      e.email = isRTL ? 'الرجاء إدخال بريدك الإلكتروني.' : 'Please enter your email.';
    } else if (!emailSchema.safeParse(email).success) {
      e.email = isRTL ? 'الرجاء إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
    }
    if (!password) {
      e.password = isRTL ? 'الرجاء إدخال كلمة المرور.' : 'Please enter your password.';
    } else if (authMode === 'signup' && !isStrongPassword(password)) {
      e.password = isRTL
        ? 'كلمة المرور لا تستوفي المتطلبات.'
        : 'Password does not meet the requirements below.';
    }
    if (authMode === 'signup') {
      if (!confirm) e.confirm = isRTL ? 'الرجاء تأكيد كلمة المرور.' : 'Please confirm your password.';
      else if (confirm !== password) e.confirm = isRTL ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
      if (phone.trim() && !isValidPhone(phone)) {
        e.phone = isRTL ? 'الرجاء إدخال رقم هاتف صحيح.' : 'Please enter a valid phone number.';
      }
    }
    setAuthErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAuth()) return;
    setAuthBusy(true);
    try {
      if (authMode === 'signup') {
        const { error } = await signUp(email.trim(), password, {
          fullName: fullName.trim(),
          phoneNumber: phone.trim() || undefined,
          nationality: nationality.trim() || undefined,
          preferredLanguage: signupLanguage,
        });
        if (error) {
          toast.error(friendlyAuthError(error, isRTL));
          return;
        }
        setTourLanguage(signupLanguage);
      } else {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          toast.error(friendlyAuthError(error, isRTL));
          return;
        }
      }
      goNext();
    } finally {
      setAuthBusy(false);
    }
  };

  const proceedFromTickets = () => {
    if (totalTickets === 0) {
      toast.error(isRTL ? 'يرجى اختيار تذكرة زائر واحدة على الأقل.' : 'Please choose at least one visitor ticket.');
      return;
    }
    if (totalTickets > MAX_VISITORS_PER_BOOKING) {
      toast.error(visitorLimitMessage);
      return;
    }
    goNext();
  };

  const proceedFromDatetime = () => {
    if (!date || !time || !isSelectedVisitTimeFuture) {
      toast.error(visitTimeErrorMessage);
      return;
    }
    goNext();
  };

  const proceedFromLanguage = () => {
    if (!isSupportedTourNarrationLanguage(tourLanguage)) {
      toast.error(unsupportedTourLanguageMessage);
      return;
    }
    if (tourLanguage === 'other' && !tourLanguageOther.trim()) {
      toast.error(isRTL ? 'أدخل اللغة المفضلة للجولة.' : 'Enter preferred language.');
      return;
    }
    goNext();
  };

  const toggleInArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const applyRecommendedRoute = (route: RecommendedRoute) => {
    const validArtifactIds = route.artifact_ids.filter((id) => ARTIFACT_ID_PATTERN.test(id));
    setSelectedRouteId(route.id);
    setInterests(route.theme ? [route.theme] : route.recommended_for);
    setDuration(route.duration_min || STANDARD_TOUR_DURATION_MIN);
    setPace(route.pace || 'normal');
    setPhotoSpots(route.photo_spots);
    setTourType('standard');
    const recommendedLanguage = normalizeTourNarrationLanguage(route.recommended_language);
    if (!languageTouched && recommendedLanguage) {
      setTourLanguage(recommendedLanguage);
    }
  };

  const selectRobotTourType = (nextTourType: TourType) => {
    if (nextTourType === 'personalized' && !exhibitsLoading && exhibits.length === 0) {
      toast.error(productMessage('exhibits', isRTL));
      return;
    }
    setTourType(nextTourType);
    if (nextTourType === 'standard') {
      setSelectedExhibits([]);
    } else {
      setSelectedRouteId('');
      setInterests([]);
      setDuration(STANDARD_TOUR_DURATION_MIN);
      setPace('normal');
      setPhotoSpots(false);
    }
  };

  const proceedFromTour = () => {
    if (tourType === 'standard' && !selectedRecommendedRoute) {
      toast.error(standardRouteRequiredMessage);
      return;
    }
    goNext();
  };

  const proceedFromPersonalize = () => {
    if (selectedExhibits.length === 0) {
      toast.error(personalizedExhibitRequiredMessage);
      return;
    }
    if (selectedExhibits.length > maxSelectedExhibits) {
      toast.error(exhibitLimitMessage);
      return;
    }
    goNext();
  };

  const confirmAndPay = async () => {
    if (busy) return;
    if (totalTickets === 0) {
      toast.error(isRTL ? 'يرجى اختيار تذكرة زائر واحدة على الأقل.' : 'Please choose at least one visitor ticket.');
      return;
    }
    if (totalTickets > MAX_VISITORS_PER_BOOKING) {
      toast.error(visitorLimitMessage);
      return;
    }
    if (pay !== 'cash') {
      toast.error(isRTL
        ? '\u064a\u0643\u062a\u0645\u0644 \u0647\u0630\u0627 \u0627\u0644\u062d\u062c\u0632 \u0646\u0642\u062f\u0627\u064b \u0639\u0646\u062f \u0634\u0628\u0627\u0643 \u0627\u0644\u0645\u062a\u062d\u0641.'
        : 'This booking is completed with cash at the museum counter.');
      return;
    }
    if (!date || !time || !isFutureVisitTime(date, time)) {
      toast.error(visitTimeErrorMessage);
      return;
    }
    if (!isSupportedTourNarrationLanguage(tourLanguage)) {
      toast.error(unsupportedTourLanguageMessage);
      return;
    }
    if (tourLanguage === 'other' && !tourLanguageOther.trim()) {
      toast.error(isRTL ? 'أدخل اللغة المفضلة للجولة.' : 'Enter preferred language.');
      return;
    }
    const routeArtifactIds = tourType === 'standard'
      ? selectedRecommendedRoute?.artifact_ids.filter((id) => ARTIFACT_ID_PATTERN.test(id))
      : undefined;
    const effectiveTourType: TourType = tourType;
    const selectedExhibitIds =
      routeArtifactIds && routeArtifactIds.length > 0
        ? routeArtifactIds
        : selectedExhibits.filter((id) => ARTIFACT_ID_PATTERN.test(id));
    if (effectiveTourType === 'standard' && (!selectedRecommendedRoute || selectedExhibitIds.length === 0)) {
      toast.error(standardRouteRequiredMessage);
      return;
    }
    if (effectiveTourType === 'personalized' && selectedExhibitIds.length === 0) {
      toast.error(personalizedExhibitRequiredMessage);
      return;
    }
    const effectiveDuration = selectedRecommendedRoute?.duration_min ?? (effectiveTourType === 'personalized' ? duration : STANDARD_TOUR_DURATION_MIN);
    const maxForDuration = maxExhibitsForDuration(effectiveDuration);
    if (selectedExhibitIds.length > maxForDuration) {
      toast.error(isRTL
        ? `تدعم هذه المدة حتى ${maxForDuration} قطع. اختر مدة أطول لإضافة المزيد.`
        : `This duration supports up to ${maxForDuration} exhibits. Choose a longer duration to add more.`);
      return;
    }
    setBusy(true);
    const { ticket, error } = await createBooking({
      booking_source: 'website',
      visit_date: date,
      visit_time: time,
      ticket_types: quantities,
      visitor_count: totalTickets,
      museum_entry_total: museumPrice,
      robot_tour_price: tourPrice,
      tour_type: effectiveTourType,
      tour_duration_min: effectiveDuration,
      interests: effectiveTourType === 'personalized' ? interests : [],
      selected_exhibits: selectedExhibitIds,
      accessibility: effectiveTourType === 'personalized' ? accessibility : [],
      preferred_language: tourLanguage,
      preferred_language_other: tourLanguage === 'other' ? tourLanguageOther.trim() : undefined,
      pace: effectiveTourType === 'personalized' ? pace : 'normal',
      kids_mode: false,
      photo_spots: effectiveTourType === 'personalized' ? photoSpots : false,
      notes: notes || undefined,
      route_id: effectiveTourType === 'standard' ? selectedRecommendedRoute?.id : undefined,
      route_title_en: effectiveTourType === 'standard' ? selectedRecommendedRoute?.title_en : undefined,
      route_title_ar: effectiveTourType === 'standard' ? selectedRecommendedRoute?.title_ar : undefined,
    });
    setBusy(false);
    if (error || !ticket) {
      toast.error(bookingErrorMessage(error, isRTL));
      return;
    }
    setShowSuccess(true);
  };

  // ---- Option lists ----
  const interestOptions = [
    { id: 'ancient-egypt', en: 'Ancient Egypt', ar: 'مصر القديمة' },
    { id: 'royal-artifacts', en: 'Royal artifacts', ar: 'القطع الملكية' },
    { id: 'statues', en: 'Statues', ar: 'التماثيل' },
    { id: 'mummies', en: 'Mummies', ar: 'المومياوات' },
    { id: 'daily-life', en: 'Daily life', ar: 'الحياة اليومية' },
    { id: 'architecture', en: 'Architecture', ar: 'العمارة' },
    { id: 'highlights-only', en: 'Highlights only', ar: 'أبرز المعروضات فقط' },
  ];
  const accessibilityOptions = [
    { id: 'step-free', en: 'Step-free route', ar: 'مسار بدون درج' },
    { id: 'larger-text', en: 'Larger text in app', ar: 'حجم نص أكبر في التطبيق' },
    { id: 'extended-audio', en: 'Extended audio description', ar: 'وصف صوتي موسَّع' },
    { id: 'slower-pace', en: 'Slower tour pace', ar: 'إيقاع جولة أبطأ' },
  ];
  const paces = [
    { id: 'relaxed', en: 'Relaxed', ar: 'مريح' },
    { id: 'normal', en: 'Normal', ar: 'عادي' },
    { id: 'fast', en: 'Fast', ar: 'سريع' },
  ];
  const accountLanguages = [
    { id: 'arabic', en: 'Arabic', ar: 'العربية' },
    { id: 'english', en: 'English', ar: 'الإنجليزية' },
  ];
  const payOptions: { id: PayMethod; labelEn: string; labelAr: string; icon: typeof CreditCard; disabled?: boolean; note?: { en: string; ar: string } }[] = [
    { id: 'card', labelEn: 'Card payment', labelAr: 'بطاقة', icon: CreditCard,
      disabled: true,
      note: {
        en: 'Card payment is not active for this visit. Please use Pay at Counter.',
        ar: 'الدفع بالبطاقة غير متاح لهذا الحجز. أتمم الحجز نقداً عند شباك المتحف.',
      },
    },
    { id: 'cash', labelEn: 'Pay at Counter', labelAr: 'نقداً عند شبّاك المتحف', icon: Wallet },
  ];

  return (
    <>
      <section className="relative w-full max-w-full overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[-96px] z-0 overflow-hidden">
          <img
            src={gemImage}
            alt={isRTL ? '\u0642\u0627\u0639\u0629 \u0645\u062a\u062d\u0641 \u0647\u0627\u062f\u0626\u0629' : 'Soft museum hall light'}
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background/95" />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-b from-transparent via-background/90 to-background" />
          <div className="absolute inset-x-0 bottom-[-80px] h-40 bg-background blur-3xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-[600px] w-[min(900px,100%)] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 60%)' }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-[calc(env(safe-area-inset-top)+6.5rem)] text-center md:px-8 md:pb-20 md:pt-36">
          <div className="section-label mb-3">{isRTL ? 'الحجز' : 'Book'}</div>
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
            {isRTL ? '\u062c\u0647\u0632 \u0632\u064a\u0627\u0631\u062a\u0643 \u0645\u0639 Horus-Bot' : 'Prepare Your Horus-Bot Visit'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            {isRTL
              ? '\u0627\u062e\u062a\u0631 \u062a\u0630\u0643\u0631\u0629 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641\u060c \u0634\u0643\u0644 \u062c\u0648\u0644\u062a\u0643 \u0627\u0644\u0645\u0631\u0634\u062f\u0629\u060c \u0648\u0627\u0635\u0644 \u062c\u0627\u0647\u0632\u0627 \u0644\u0644\u0633\u064a\u0631 \u0641\u064a \u0627\u0644\u062a\u0627\u0631\u064a\u062e.'
              : 'Choose museum entry, shape the guided tour, and arrive ready to walk through history.'}
          </p>
        </div>
      </section>

      <div className="relative w-full max-w-full overflow-x-clip bg-background">

      <section className="relative mx-auto mb-16 w-full max-w-7xl overflow-visible px-4 pt-6 sm:px-6 md:mb-20 md:pt-8 lg:px-8">
        <div className="grid min-w-0 items-start gap-8 overflow-visible lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
        <div className="rounded-[2rem] border border-primary/20 bg-card/70 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {isRTL ? `الخطوة ${stepIdx + 1} من ${allSteps.length}` : `Step ${stepIdx + 1} of ${allSteps.length}`}
              </p>
              <h2 className="font-serif text-xl text-foreground">{currentStepLabel}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{stepHelp[currentStep]}</p>
            </div>
            <span className="w-fit rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {totalTickets > 0
                ? (isRTL ? `${totalTickets} زائر` : `${totalTickets} visitor${totalTickets === 1 ? '' : 's'}`)
                : (isRTL ? 'اختر التذاكر' : 'Select tickets')}
            </span>
          </div>
          <BookingStepper
            steps={stepLabels}
            currentIndex={stepIdx}
          />
        </div>

        {/* STEP: ACCOUNT */}
        {currentStep === 'account' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-2">
                {isRTL ? 'أنشئ حسابك على Horus-Bot' : 'Create your Horus-Bot account'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'حسابك يحفظ تذاكرك ويربطها بتطبيق Horus-Bot وروبوت الجولة في المتحف.'
                  : 'Create or enter your Horus-Bot account so your tickets are ready when you arrive.'}
              </p>
            </div>

            <div className="flex gap-1.5 rounded-2xl border border-primary/10 bg-background/80 p-1.5">
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthErrors({}); }}
                className={cn(
                  'flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  authMode === 'signup' ? 'bg-primary/15 text-foreground shadow-sm shadow-primary/10 ring-1 ring-primary/15' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isRTL ? 'إنشاء حساب' : 'Create account'}
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthErrors({}); }}
                className={cn(
                  'flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  authMode === 'login' ? 'bg-primary/15 text-foreground shadow-sm shadow-primary/10 ring-1 ring-primary/15' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isRTL ? 'تسجيل الدخول' : 'Log in'}
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 md:space-y-5" noValidate>
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <Label htmlFor="bp-name">{isRTL ? 'الاسم الكامل' : 'Full name'}</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                    <Input
                      id="bp-name" value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={cn('pl-9 rtl:pl-3 rtl:pr-9', authErrors.fullName && 'border-destructive')}
                      placeholder={isRTL ? 'اسمك' : 'Your name'}
                    />
                  </div>
                  {authErrors.fullName && <p className="text-xs text-destructive">{authErrors.fullName}</p>}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="bp-email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="bp-email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn('pl-9 rtl:pl-3 rtl:pr-9', authErrors.email && 'border-destructive')}
                    placeholder="you@email.com"
                  />
                </div>
                {authErrors.email && <p className="text-xs text-destructive">{authErrors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bp-pw">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="bp-pw" type={showPw ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn('pl-9 pr-10 rtl:pl-10 rtl:pr-9', authErrors.password && 'border-destructive')}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-3"
                    aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {authErrors.password && <p className="text-xs text-destructive">{authErrors.password}</p>}
                {authMode === 'signup' && (
                  <div className="mt-1 space-y-1 rounded-2xl border border-primary/10 bg-background/75 p-3">
                    {PASSWORD_RULES.map((r) => {
                      const ok = r.test(password);
                      return (
                        <div key={r.id} className={cn('flex items-center gap-2 text-xs', ok ? 'text-emerald-600' : 'text-muted-foreground')}>
                          {ok ? <Check className="h-3.5 w-3.5" /> : <XIcon className="h-3.5 w-3.5 opacity-50" />}
                          <span>{isRTL ? r.labelAr : r.labelEn}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {authMode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-pw2">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm password'}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                      <Input
                        id="bp-pw2" type={showPw2 ? 'text' : 'password'} value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={cn('pl-9 pr-10 rtl:pl-10 rtl:pr-9', authErrors.confirm && 'border-destructive')}
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowPw2((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-3"
                        aria-label={showPw2 ? 'Hide password' : 'Show password'}>
                        {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {authErrors.confirm && <p className="text-xs text-destructive">{authErrors.confirm}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="bp-phone">{isRTL ? 'رقم الهاتف (اختياري)' : 'Phone number (optional)'}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                        <Input
                          id="bp-phone" type="tel" value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={cn('pl-9 rtl:pl-3 rtl:pr-9', authErrors.phone && 'border-destructive')}
                          placeholder="+20 ..."
                        />
                      </div>
                      {authErrors.phone && <p className="text-xs text-destructive">{authErrors.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bp-nat">{isRTL ? 'الجنسية (اختياري)' : 'Nationality (optional)'}</Label>
                      <div className="relative">
                        <Flag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                        <Input
                          id="bp-nat" value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="pl-9 rtl:pl-3 rtl:pr-9"
                          placeholder={isRTL ? 'مثال: مصري' : 'e.g. Egyptian'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="bp-lang">{isRTL ? 'اللغة المفضّلة (اختياري)' : 'Preferred language (optional)'}</Label>
                    <Select value={signupLanguage} onValueChange={setSignupLanguage}>
                      <SelectTrigger id="bp-lang"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {accountLanguages.map((l) => (
                          <SelectItem key={l.id} value={l.id}>{isRTL ? l.ar : l.en}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full h-12" disabled={authBusy}>
                {authBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  authMode === 'signup'
                    ? (isRTL ? 'إنشاء حساب ومتابعة' : 'Create account & continue')
                    : (isRTL ? 'تسجيل الدخول ومتابعة' : 'Log in & continue')
                )}
              </Button>
            </form>
          </Card>
        )}

        {/* STEP: TICKETS */}
        {currentStep === 'tickets' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'تذاكر دخول المتحف' : 'Choose Museum Entry Tickets'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'الأسعار وفقاً لسياسة المتحف المصرية. الجنسية تحدّد الفئة.'
                  : 'Select who is visiting. Your Horus-Bot Guided Tour is added once per booking.'}
              </p>
              <p className="mt-2 text-xs font-medium text-primary">{visitorLimitHelper}</p>
            </div>

            {(['eg', 'foreign'] as const).map((group) => (
              <div key={group} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {group === 'eg' ? (isRTL ? 'المصريون' : 'Egyptians') : (isRTL ? 'الأجانب' : 'Foreigners')}
                </h3>
                {CATEGORY_ROWS.filter((r) => r.group === group).map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-3 p-3 md:p-4 rounded-2xl border border-primary/10 bg-background/75">
                    <div>
                      <p className="font-semibold">{isRTL ? row.ar : row.en}</p>
                      <p className="text-sm text-muted-foreground">{museumTicketPrices[row.key]} {CURRENCY}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-primary/15 bg-background/40 hover:bg-primary/10" onClick={() => updateQuantity(row.key, -1)} aria-label="decrease">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold tabular-nums">{quantities[row.key]}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          'h-9 w-9 rounded-full border-primary/15 bg-background/40 hover:bg-primary/10',
                          totalTickets >= MAX_VISITORS_PER_BOOKING && 'opacity-55',
                        )}
                        onClick={() => updateQuantity(row.key, 1)}
                        aria-label="increase"
                        aria-disabled={totalTickets >= MAX_VISITORS_PER_BOOKING}
                        title={totalTickets >= MAX_VISITORS_PER_BOOKING ? visitorLimitMessage : undefined}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="rounded-2xl border border-primary/15 bg-primary/10 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? 'إجمالي التذاكر' : 'Total tickets'}</span>
                <span className="font-semibold">{totalTickets}/{MAX_VISITORS_PER_BOOKING}</span>
              </div>
              <div className="flex justify-between">
                <span>{isRTL ? 'إجمالي دخول المتحف' : 'Museum entry total'}</span>
                <span className="font-bold text-lg">{museumPrice} {CURRENCY}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={proceedFromTickets} className="h-12 px-6">
                {isRTL ? 'متابعة' : 'Continue'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: TOUR TYPE */}
        {currentStep === 'tour' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر جولة Horus-Bot' : 'Choose how the tour should feel'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'الروبوت يقود جولتك داخل المتحف ويرويك قصص القطع.'
                  : 'Horus-Bot will guide the route inside the museum and bring each stop into the story.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {([
                { id: 'standard' as TourType, icon: Zap,
                  titleEn: 'Horus-Bot Highlights', titleAr: 'جولة قياسية',
                  descEn: 'A calm highlights route through the museum favorites.',
                  descAr: 'مسار جاهز ومحطات مختارة — بدون أي إعدادات إضافية.' },
                { id: 'personalized' as TourType, icon: Sparkles,
                  titleEn: 'Personalized Journey', titleAr: 'جولة مخصَّصة',
                  descEn: 'Shape the route around your time, interests, language, and pace.',
                  descAr: 'اختر المدة، المواضيع، اللغة، الإيقاع، واحتياجات الوصول.' },
              ]).map((t) => {
                const active = tourType === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectRobotTourType(t.id)}
                    className={cn(
                      'text-start rounded-2xl border p-4 md:p-5 transition-colors',
                      active ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center', active ? 'bg-primary/15' : 'bg-muted/70')}>
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-serif text-lg">{isRTL ? t.titleAr : t.titleEn}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{isRTL ? t.descAr : t.descEn}</p>
                    <p className="mt-3 text-sm font-semibold text-primary">
                      {robotTourPrices[t.id]} {CURRENCY} / {isRTL ? 'حجز' : 'visit'}
                    </p>
                  </button>
                );
              })}
            </div>

            {tourType === 'standard' && routesLoading && (
                <div className="rounded-2xl border border-primary/10 bg-background/75 p-4 text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {isRTL
                  ? '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062a...'
                  : 'Loading recommended routes...'}
              </div>
            )}
            {tourType === 'standard' && !routesLoading && activeRecommendedRoutes.length > 0 && (
              <div className="space-y-3">
                <div>
                  <Label>{isRTL ? 'المسارات المقترحة' : 'Recommended Routes'}</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL
                      ? 'اختر مسارا جاهزا لملء محطات الجولة وتفضيلاتها.'
                      : 'Choose a ready-made museum route for the Standard Tour.'}
                  </p>
                </div>
                <div className="grid gap-2">
                  {activeRecommendedRoutes.map((route) => {
                    const active = selectedRouteId === route.id;
                    return (
                      <button
                        key={route.id}
                        type="button"
                        onClick={() => applyRecommendedRoute(route)}
                        className={cn(
                          'text-start rounded-2xl border p-4 transition-colors',
                          active ? 'border-primary bg-primary/10 text-primary' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{isRTL ? route.title_ar : route.title_en}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {isRTL ? route.description_ar : route.description_en}
                            </p>
                          </div>
                          {active && <Check className="h-4 w-4 shrink-0" />}
                        </div>
                        <p className="mt-2 text-xs font-medium">
                          {route.duration_min} {isRTL ? 'دقيقة' : 'min'} • {route.artifact_ids.length} {isRTL ? 'محطات' : 'stops'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {tourType === 'standard' && !routesLoading && activeRecommendedRoutes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-background/75 p-4 text-sm text-muted-foreground space-y-3">
                <p>{productMessage('routes', isRTL)}</p>
                <Button type="button" variant="outline" size="sm" onClick={retryRecommendedRoutes}>
                  {productMessage('tryAgain', isRTL)}
                </Button>
              </div>
            )}

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={proceedFromTour} className="h-12 px-6">
                {isRTL ? 'متابعة' : 'Continue'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: DATE & TIME */}
        {currentStep === 'datetime' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر التاريخ والوقت' : 'Choose when you would like to visit'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'الأماكن محدودة لكل فترة.' : 'Select a calm arrival time for your museum visit.'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-primary" /> {isRTL ? 'تاريخ الزيارة' : 'Visit date'}</Label>
              <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {isRTL ? 'الوقت' : 'Time slot'}</Label>
              {hasNoRemainingSlotsToday && (
                <p className="text-sm text-muted-foreground">{noRemainingVisitTimesMessage}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isAvailable = isFutureVisitTime(date, slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        if (!isAvailable) {
                          toast.error(date === today ? pastVisitTimeMessage : futureVisitTimeMessage);
                          return;
                        }
                        setTime(slot);
                      }}
                      aria-disabled={!isAvailable}
                      className={cn(
                        'h-11 rounded-xl border text-sm font-medium transition-colors',
                        time === slot && isAvailable
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-primary/10 bg-background/75 hover:border-primary/50',
                        !isAvailable && 'cursor-not-allowed opacity-45 hover:border-primary/10',
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={proceedFromDatetime} className="h-12 px-6">
                {isRTL ? 'متابعة' : 'Continue'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: LANGUAGE */}
        {currentStep === 'language' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر لغة السرد' : 'Choose the narration language'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'اختر لغة السرد لجولة Horus-Bot داخل المتحف.'
                  : 'Choose the narration language for your Horus-Bot guided tour.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {TOUR_NARRATION_LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setLanguageTouched(true);
                    setTourLanguage(l.id);
                  }}
                  className={cn(
                    'h-12 rounded-xl border text-sm font-medium transition-colors',
                    tourLanguage === l.id ? 'border-primary bg-primary/10 text-primary' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                  )}
                >
                  {isRTL ? l.ar : l.en}
                </button>
              ))}
            </div>
            {tourLanguage === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="tour-language-other">
                  {isRTL ? 'أدخل اللغة المفضلة' : 'Enter preferred language'}
                </Label>
                <Input
                  id="tour-language-other"
                  value={tourLanguageOther}
                  onChange={(e) => setTourLanguageOther(e.target.value)}
                  placeholder={isRTL ? 'مثال: البرتغالية' : 'e.g. Portuguese'}
                />
              </div>
            )}

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={proceedFromLanguage} className="h-12 px-6">
                {tourType === 'personalized'
                  ? (isRTL ? 'متابعة إلى التخصيص' : 'Continue')
                  : (isRTL ? 'متابعة إلى الدفع' : 'Continue')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: PERSONALIZE */}
        {currentStep === 'personalize' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-6')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'تفضيلاتك' : 'Shape the visit around you'}</h2>
              <p className="text-sm text-muted-foreground">
                {tourType === 'personalized'
                  ? (isRTL
                    ? 'خصّص جولة Horus-Bot وفق وقتك واهتماماتك.'
                    : 'Let Horus-Bot adapt the route to the stories, pace, and support you prefer.')
                  : (isRTL
                    ? 'بضع تفضيلات أساسية — جولتك القياسية جاهزة بالفعل.'
                    : 'A few gentle preferences. Your highlights tour is otherwise ready.')}
              </p>
            </div>

            {tourType === 'personalized' && (
              <>
                <div className="space-y-2">
                  <Label>{isRTL ? 'مدة الجولة' : 'Tour duration'}</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={cn(
                          'h-11 rounded-xl border text-sm font-medium transition-colors',
                          duration === d ? 'border-primary bg-primary/10 text-primary' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                        )}
                      >
                        {d} {isRTL ? 'د' : 'min'}
                      </button>
                    ))}
                  </div>
                  {selectedExhibits.length > maxSelectedExhibits && (
                    <p className="text-sm text-destructive">{exhibitLimitMessage}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'القطع المختارة' : 'Selected exhibits'}</Label>
                  {exhibitsLoading && exhibits.length === 0 ? (
                    <div className="flex items-center gap-2 rounded-2xl border border-primary/10 bg-background/75 p-3 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isRTL ? 'جاري تحميل القطع...' : 'Loading exhibits...'}
                    </div>
                  ) : exhibits.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-primary/20 bg-background/75 p-4 text-sm text-muted-foreground space-y-3">
                      <p>{productMessage('exhibits', isRTL)}</p>
                      <Button type="button" variant="outline" size="sm" onClick={retryExhibits}>
                        {productMessage('tryAgain', isRTL)}
                      </Button>
                    </div>
                  ) : (
                    <>
                      {exhibitsError && (
                        <div className="rounded-2xl border border-primary/10 bg-background/75 p-3 text-sm text-muted-foreground">
                          {productMessage('savedContent', isRTL)}
                        </div>
                      )}
                      <div className="grid sm:grid-cols-2 gap-2">
                        {exhibits.map((exhibit) => {
                        const active = selectedExhibits.includes(exhibit.id);
                        const blockedByLimit = !active && selectedExhibits.length >= maxSelectedExhibits;
                        return (
                          <button
                            key={exhibit.id}
                            type="button"
                            onClick={() => {
                              if (blockedByLimit) {
                                toast.error(exhibitLimitMessage);
                                return;
                              }
                              setSelectedExhibits((arr) => toggleInArray(arr, exhibit.id));
                            }}
                            aria-disabled={blockedByLimit}
                            className={cn(
                              'min-h-16 rounded-2xl border p-3 text-left transition-colors rtl:text-right',
                              active ? 'border-primary bg-primary/10 text-primary' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                              blockedByLimit && 'cursor-not-allowed opacity-50 hover:border-primary/10',
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <ExhibitThumb exhibit={exhibit} isRTL={isRTL} />
                              <span className={cn(
                                'mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0',
                                active ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40',
                              )}>
                                {active && <Check className="h-3 w-3" />}
                              </span>
                              <span>
                                <span className="block text-sm font-medium">{isRTL && exhibit.titleAr ? exhibit.titleAr : exhibit.titleEn}</span>
                                {exhibit.summary && (
                                  <span className="block text-xs text-muted-foreground mt-1 line-clamp-1">
                                    {exhibit.summary}
                                  </span>
                                )}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                      </div>
                      <p className="text-xs text-muted-foreground">{exhibitLimitMessage}</p>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'اهتماماتك' : 'Interests / themes'}</Label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((opt) => {
                      const active = interests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setInterests((arr) => toggleInArray(arr, opt.id))}
                          className={cn(
                            'rounded-full border px-4 py-2 text-sm transition-colors flex items-center gap-1.5',
                            active ? 'border-primary bg-primary/10 text-primary' : 'border-primary/15 bg-background/75 hover:border-primary/50',
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                          {isRTL ? opt.ar : opt.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'احتياجات الوصول' : 'Accessibility'}</Label>
                  <div className="flex flex-wrap gap-2">
                    {accessibilityOptions.map((opt) => {
                      const active = accessibility.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAccessibility((arr) => toggleInArray(arr, opt.id))}
                          className={cn(
                            'rounded-full border px-4 py-2 text-sm transition-colors flex items-center gap-1.5',
                            active ? 'border-primary bg-primary/10 text-primary' : 'border-primary/15 bg-background/75 hover:border-primary/50',
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                          {isRTL ? opt.ar : opt.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الإيقاع' : 'Pace'}</Label>
                    <Select value={pace} onValueChange={setPace}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {paces.map((p) => <SelectItem key={p.id} value={p.id}>{isRTL ? p.ar : p.en}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-primary/10 bg-background/75 p-3">
                    <span className="text-sm">{isRTL ? 'محطات تصوير' : 'Photo spots'}</span>
                    <button
                      type="button"
                      onClick={() => setPhotoSpots((v) => !v)}
                      className={cn('h-6 w-11 rounded-full transition-colors', photoSpots ? 'bg-primary' : 'bg-muted-foreground/30')}
                      aria-pressed={photoSpots}
                    >
                      <span className={cn('block h-5 w-5 rounded-full bg-background transition-transform', photoSpots ? 'translate-x-5' : 'translate-x-0.5')} />
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="bp-notes">{isRTL ? 'ملاحظات (اختياري)' : 'Optional notes'}</Label>
              <Textarea
                id="bp-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isRTL ? 'أخبرنا بأي شيء يساعد على تخصيص زيارتك.' : 'Share anything that would make the visit feel smoother.'}
                className="min-h-24"
              />
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={proceedFromPersonalize} className="h-12 px-6">
                {isRTL ? 'متابعة إلى الدفع' : 'Continue'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: PAYMENT */}
        {currentStep === 'payment' && (
          <Card className={cn(panelClass, 'p-5 md:p-8 space-y-5')}>
            <div>
              <h2 className="font-serif text-2xl mb-1">Pay at Counter</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? '\u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u062d\u0627\u0644\u064a\u0627\u064b. \u0633\u064a\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u062d\u062c\u0632\u0643 \u0648\u062a\u062f\u0641\u0639 \u0639\u0646\u062f \u0634\u0628\u0627\u0643 \u0627\u0644\u0645\u062a\u062d\u0641.'
                  : 'Your booking is confirmed here. Payment happens calmly at the museum counter when you arrive.'}
              </p>
            </div>

            <div className="space-y-2">
              {payOptions.map((opt) => {
                const Icon = opt.icon;
                const active = pay === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => !opt.disabled && setPay(opt.id)}
                    disabled={opt.disabled}
                    className={cn(
                      'w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-colors rtl:text-right',
                      active ? 'border-primary bg-primary/10' : 'border-primary/10 bg-background/75 hover:border-primary/50',
                      opt.disabled && 'cursor-not-allowed opacity-60 hover:border-primary/10',
                    )}
                  >
                    <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center shrink-0', active ? 'bg-primary/15' : 'bg-background/50')}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{isRTL ? opt.labelAr : opt.labelEn}</span>
                      {opt.note && (active || opt.disabled) && (
                        <p className="text-xs text-muted-foreground mt-1">{isRTL ? opt.note.ar : opt.note.en}</p>
                      )}
                    </div>
                    <span className={cn('h-4 w-4 rounded-full border-2 mt-1', active ? 'border-primary bg-primary' : 'border-muted-foreground/40')} />
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/10 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'إجمالي التذاكر' : 'Total visitors'}</span><span>{totalTickets}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'الموعد' : 'When'}</span><span>{date} • {time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'نوع الجولة' : 'Tour'}</span><span className="capitalize">{tourType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'دخول المتحف' : 'Museum entry'}</span><span>{museumPrice} {CURRENCY}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'جولة الروبوت' : 'Robot tour'}</span><span>{tourPrice} {CURRENCY}</span></div>
              <div className="flex justify-between border-t border-primary/15 pt-2 mt-2"><span>{isRTL ? 'الإجمالي' : 'Total'}</span><span className="font-bold">{totalPrice} {CURRENCY}</span></div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {isRTL ? 'ستُحفظ تذكرتك في حسابك وتظهر في تطبيق Horus-Bot.' : 'Your ticket will be saved to your account and appear in the Horus-Bot app.'}
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={confirmAndPay} disabled={busy} className="h-12 px-6">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {busy
                  ? (isRTL ? '\u062c\u0627\u0631\u064a \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u062c\u0632...' : 'Creating booking...')
                  : (isRTL ? '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632' : 'Confirm booking')}
              </Button>
            </div>
          </Card>
        )}
        </div>

        <aside className="hidden self-start lg:block">
          <div className="sticky top-24">
            <BookingSummaryPanel
              isRTL={isRTL}
              totalTickets={totalTickets}
              museumPrice={museumPrice}
              tourPrice={tourPrice}
              totalPrice={totalPrice}
              tourType={tourType}
              tourLabel={summaryTourLabel}
              date={date}
              time={time}
              currentStepLabel={currentStepLabel}
            />
          </div>
        </aside>
        </div>
      </section>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {isRTL
                ? '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632'
                : 'Booking confirmed'}
            </DialogTitle>
            <DialogDescription>
              {isRTL
                ? '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632. \u064a\u0631\u062c\u0649 \u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0634\u0628\u0627\u0643 \u0627\u0644\u0645\u062a\u062d\u0641. \u062a\u0630\u0627\u0643\u0631\u0643 \u0645\u062a\u0627\u062d\u0629 \u0627\u0644\u0622\u0646 \u0641\u064a \u062a\u0630\u0627\u0643\u0631\u064a.'
                : 'Booking confirmed. Pay at Counter. Your tickets are now available in My Tickets.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => { setShowSuccess(false); navigate('/tickets-mine'); }}>
              {isRTL ? '\u0639\u0631\u0636 \u062a\u0630\u0627\u0643\u0631\u064a' : 'My Tickets'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function BookingSummaryPanel({
  isRTL,
  totalTickets,
  museumPrice,
  tourPrice,
  totalPrice,
  tourType,
  tourLabel,
  date,
  time,
  currentStepLabel,
}: {
  isRTL: boolean;
  totalTickets: number;
  museumPrice: number;
  tourPrice: number;
  totalPrice: number;
  tourType: TourType;
  tourLabel: string;
  date: string;
  time: string;
  currentStepLabel: string;
}) {
  return (
    <div className="space-y-4">
      <Card className="max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] border-primary/30 bg-card/90 p-5 shadow-[0_24px_70px_-34px_hsl(var(--primary)/0.7)] backdrop-blur">
        <div className="mb-5">
          <div className="section-label mb-2">{isRTL ? '\u0645\u0644\u062e\u0635 \u0627\u0644\u0632\u064a\u0627\u0631\u0629' : 'Visit Summary'}</div>
          <h2 className="font-serif text-2xl">{isRTL ? '\u0632\u064a\u0627\u0631\u062a\u0643 \u0625\u0644\u0649 \u0627\u0644\u0645\u062a\u062d\u0641' : 'Your museum visit'}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {isRTL
              ? '\u0645\u0631\u0627\u062c\u0639\u0629 \u0647\u0627\u062f\u0626\u0629 \u0644\u0644\u0632\u064a\u0627\u0631\u0629 \u0627\u0644\u062a\u064a \u062a\u062c\u0647\u0632\u0647\u0627.'
              : 'A quiet check of the visit you are preparing.'}
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="space-y-2 rounded-2xl bg-background/75 p-4 ring-1 ring-primary/20">
            <SummaryLine label={isRTL ? '\u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u0622\u0646' : 'Now shaping'} value={currentStepLabel} />
            <SummaryLine label={isRTL ? '\u0627\u0644\u0632\u0648\u0627\u0631' : 'Visitors'} value={String(totalTickets || 0)} />
            <SummaryLine label={isRTL ? '\u0627\u0644\u062a\u0627\u0631\u064a\u062e' : 'Visit date'} value={date} />
            <SummaryLine label={isRTL ? '\u0627\u0644\u0648\u0642\u062a' : 'Time slot'} value={time} />
            <SummaryLine label={isRTL ? '\u0627\u0644\u062c\u0648\u0644\u0629' : 'Tour'} value={tourLabel} />
            <SummaryLine label={isRTL ? '\u0646\u0648\u0639 \u0627\u0644\u062c\u0648\u0644\u0629' : 'Tour type'} value={tourType === 'personalized' ? (isRTL ? '\u0645\u062e\u0635\u0635\u0629' : 'Personalized') : (isRTL ? '\u0642\u064a\u0627\u0633\u064a\u0629' : 'Standard')} />
          </div>
          <div className="space-y-2 border-t border-primary/15 pt-3">
            <SummaryLine label={isRTL ? '\u062a\u0630\u0643\u0631\u0629 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641' : 'Museum Entry Ticket'} value={`${museumPrice} ${CURRENCY}`} />
            <SummaryLine label={isRTL ? '\u062c\u0648\u0644\u0629 Horus-Bot \u0627\u0644\u0645\u0631\u0634\u062f\u0629' : 'Horus-Bot Guided Tour'} value={`${tourPrice} ${CURRENCY}`} />
            <SummaryLine label={isRTL ? '\u0627\u0644\u062f\u0641\u0639' : 'Payment'} value="Pay at Counter" />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/15 p-4 text-base">
            <span>{isRTL ? '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0645\u0633\u062a\u062d\u0642' : 'Total due'}</span>
            <span className="font-bold text-primary">{totalPrice} {CURRENCY}</span>
          </div>
        </div>
      </Card>
      <div className="rounded-[1.5rem] border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
        <p className="font-medium text-foreground">
          {isRTL ? '\u062c\u0627\u0647\u0632\u0629 \u0639\u0646\u062f \u0627\u0644\u0648\u0635\u0648\u0644' : 'Ready when you arrive'}
        </p>
        <p className="mt-2 leading-relaxed">
          {isRTL
            ? '\u0633\u062a\u0643\u0648\u0646 \u062a\u0630\u0643\u0631\u0629 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641 \u0648\u062c\u0648\u0644\u0629 Horus-Bot \u0645\u062d\u0641\u0648\u0638\u062a\u064a\u0646 \u0641\u064a \u062a\u0630\u0627\u0643\u0631\u064a. \u064a\u062a\u0645 \u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0634\u0628\u0627\u0643 \u0627\u0644\u0645\u062a\u062d\u0641.'
            : 'Your Museum Entry Ticket and Horus-Bot Guided Tour are saved in My Tickets. Payment happens at the museum counter.'}
        </p>
      </div>
    </div>
  );
}

function BookingSummaryCard({
  isRTL,
  totalTickets,
  museumPrice,
  tourPrice,
  totalPrice,
  tourType,
  date,
  time,
  currentStepLabel,
}: {
  isRTL: boolean;
  totalTickets: number;
  museumPrice: number;
  tourPrice: number;
  totalPrice: number;
  tourType: TourType;
  date: string;
  time: string;
  currentStepLabel: string;
}) {
  return (
    <div className="space-y-4">
      <Card className="p-6 shadow-soft">
        <div className="mb-5">
          <div className="section-label mb-2">{isRTL ? 'ملخص الحجز' : 'Booking Summary'}</div>
          <h2 className="font-serif text-2xl">{isRTL ? 'زيارتك إلى المتحف' : 'Your museum visit'}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isRTL ? 'راجع التفاصيل أثناء إكمال الخطوات.' : 'Review details as you complete each step.'}
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <SummaryLine label={isRTL ? 'الخطوة الحالية' : 'Current step'} value={currentStepLabel} />
          <SummaryLine label={isRTL ? 'الزوار' : 'Visitors'} value={String(totalTickets || 0)} />
          <SummaryLine label={isRTL ? 'الموعد' : 'When'} value={`${date} • ${time}`} />
          <SummaryLine label={isRTL ? 'الجولة' : 'Tour'} value={tourType === 'personalized' ? (isRTL ? 'مخصَّصة' : 'Personalized') : (isRTL ? 'قياسية' : 'Standard')} />
          <div className="border-t border-border/60 pt-3">
            <SummaryLine label={isRTL ? 'دخول المتحف' : 'Museum entry'} value={`${museumPrice} ${CURRENCY}`} />
            <SummaryLine label={isRTL ? 'جولة Horus-Bot' : 'Horus-Bot tour'} value={`${tourPrice} ${CURRENCY}`} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-primary/10 p-3 text-base">
            <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
            <span className="font-bold text-primary">{totalPrice} {CURRENCY}</span>
          </div>
        </div>
      </Card>
      <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
        <p className="font-medium text-foreground">
          {isRTL ? 'ما ستحصل عليه' : 'What you receive'}
        </p>
        <p className="mt-2 leading-relaxed">
          {isRTL
            ? 'تذكرة دخول المتحف وتذكرة جولة Horus-Bot محفوظتان في تذاكري. يتم الدفع عند شباك المتحف.'
            : 'A Museum Entry Ticket and Horus-Bot Tour Ticket saved in My Tickets. Payment happens at the museum counter.'}
        </p>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right font-medium text-foreground rtl:text-left">{value}</span>
    </div>
  );
}

function ExhibitThumb({
  exhibit,
  isRTL,
}: {
  exhibit: { imageUrl: string | null; altEn: string; titleAr: string | null; titleEn: string };
  isRTL: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const label = isRTL && exhibit.titleAr ? exhibit.titleAr : exhibit.titleEn;
  if (!exhibit.imageUrl || failed) {
    return (
      <span
        aria-label={label}
        className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50"
      >
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </span>
    );
  }
  return (
    <img
      src={exhibit.imageUrl}
      alt={exhibit.altEn || label}
      className="h-10 w-10 rounded-lg object-cover border border-border/50 shrink-0"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
