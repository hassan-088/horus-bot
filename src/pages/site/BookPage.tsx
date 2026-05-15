import { useMemo, useState } from 'react';
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
import { SectionHero } from '@/components/site/SectionHero';
import { BookingStepper } from '@/components/site/BookingStepper';
import { useApp } from '@/contexts/AppContext';
import { useAuth, friendlyAuthError } from '@/contexts/AuthContext';
import { useExhibits } from '@/hooks/useExhibits';
import { useUserTickets, type TourType } from '@/hooks/useUserTickets';
import { museumTicketPrices, robotTourPrices, type MuseumTicketCategory } from '@/lib/data';
import { sharedStandardRouteIds } from '@/lib/exhibitCatalog';
import { PASSWORD_RULES, isStrongPassword, isValidPhone } from '@/lib/passwordRules';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@/lib/utils';

type StepKey = 'account' | 'tickets' | 'tour' | 'datetime' | 'personalize' | 'payment';
type PayMethod = 'card' | 'cash';

const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const STANDARD_TOUR_DURATION_MIN = 45;
const STANDARD_ROUTE_IDS = sharedStandardRouteIds;
const ARTIFACT_ID_PATTERN = /^artifact_\d{3}$/;
const DURATIONS = [30, 45, 60, 90];

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
  const { exhibits, loading: exhibitsLoading, standardRoute } = useExhibits();
  const navigate = useNavigate();

  // ---- Step management ----
  const accountNeeded = !user;
  const allSteps: StepKey[] = useMemo(
    () => (accountNeeded
      ? ['account', 'tickets', 'tour', 'datetime', 'personalize', 'payment']
      : ['tickets', 'tour', 'datetime', 'personalize', 'payment']),
    [accountNeeded],
  );
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = allSteps[stepIdx];

  const stepLabels = allSteps.map((s) => {
    if (s === 'account') return isRTL ? 'الحساب' : 'Account';
    if (s === 'tickets') return isRTL ? 'التذاكر' : 'Tickets';
    if (s === 'tour') return isRTL ? 'الجولة' : 'Tour';
    if (s === 'datetime') return isRTL ? 'الموعد' : 'Date & Time';
    if (s === 'personalize') return isRTL ? 'التفضيلات' : 'Preferences';
    return isRTL ? 'الدفع' : 'Payment';
  });

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

  // Tour type
  const [tourType, setTourType] = useState<TourType>('standard');

  // Date & time
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState<string>('11:00');

  // Personalize
  const [duration, setDuration] = useState<number>(STANDARD_TOUR_DURATION_MIN);
  const [selectedExhibits, setSelectedExhibits] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [tourLanguage, setTourLanguage] = useState<string>('english');
  const [pace, setPace] = useState<string>('normal');
  const [kidsMode, setKidsMode] = useState(false);
  const [photoSpots, setPhotoSpots] = useState(false);
  const [notes, setNotes] = useState('');

  // Payment
  const [pay, setPay] = useState<PayMethod>('cash');
  const [busy, setBusy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const museumPrice = (Object.entries(quantities) as [MuseumTicketCategory, number][])
    .reduce((acc, [k, n]) => acc + n * museumTicketPrices[k], 0);
  const tourPrice = robotTourPrices[tourType];
  const totalPrice = museumPrice + tourPrice;
  const standardSelectedExhibitIds =
    standardRoute.length === STANDARD_ROUTE_IDS.length
      ? standardRoute.map((exhibit) => exhibit.id)
      : STANDARD_ROUTE_IDS;

  // ---- Handlers ----
  const updateQuantity = (k: MuseumTicketCategory, d: number) =>
    setQuantities((q) => ({ ...q, [k]: Math.max(0, q[k] + d) }));

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
      toast.error(isRTL ? 'اختر تذكرة واحدة على الأقل.' : 'Please select at least one ticket.');
      return;
    }
    goNext();
  };

  const proceedFromDatetime = () => {
    if (!date || !time) {
      toast.error(isRTL ? 'اختر التاريخ والوقت.' : 'Please pick a date and time.');
      return;
    }
    goNext();
  };

  const toggleInArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const confirmAndPay = async () => {
    if (pay !== 'cash') {
      toast.error(isRTL ? 'الحجز متاح نقداً فقط حالياً.' : 'Bookings can only be completed with cash right now.');
      return;
    }
    const selectedExhibitIds =
      tourType === 'standard'
        ? standardSelectedExhibitIds
        : selectedExhibits.filter((id) => ARTIFACT_ID_PATTERN.test(id));
    if (tourType === 'personalized' && selectedExhibitIds.length === 0) {
      toast.error(isRTL ? 'اختر قطعة واحدة على الأقل لجولتك.' : 'Please select at least one exhibit for your tour.');
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
      tour_type: tourType,
      tour_duration_min: tourType === 'personalized' ? duration : STANDARD_TOUR_DURATION_MIN,
      interests: tourType === 'personalized' ? interests : [],
      selected_exhibits: selectedExhibitIds,
      accessibility: tourType === 'personalized' ? accessibility : [],
      preferred_language: tourLanguage,
      pace: tourType === 'personalized' ? pace : 'normal',
      kids_mode: tourType === 'personalized' ? kidsMode : false,
      photo_spots: tourType === 'personalized' ? photoSpots : false,
      notes: notes || undefined,
    });
    setBusy(false);
    if (error || !ticket) {
      toast.error(isRTL ? 'حدث خطأ ما. حاول مرة أخرى.' : 'Something went wrong. Please try again.');
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
  const languages = [
    { id: 'arabic', en: 'Arabic', ar: 'العربية' },
    { id: 'egyptian_arabic', en: 'Egyptian Arabic', ar: 'العامية المصرية' },
    { id: 'english', en: 'English', ar: 'الإنجليزية' },
  ];
  const payOptions: { id: PayMethod; labelEn: string; labelAr: string; icon: typeof CreditCard; disabled?: boolean; note?: { en: string; ar: string } }[] = [
    { id: 'card', labelEn: 'Card payment', labelAr: 'بطاقة', icon: CreditCard,
      disabled: true,
      note: {
        en: 'Card checkout is not available yet. Complete this booking using cash at the museum counter.',
        ar: 'الدفع بالبطاقة غير متاح حالياً. أتمم الحجز نقداً عند شبّاك المتحف.',
      },
    },
    { id: 'cash', labelEn: 'Cash at museum counter', labelAr: 'نقداً عند شبّاك المتحف', icon: Wallet },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'الحجز' : 'Book'}
        title={isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
        subtitle={
          isRTL
            ? 'تذكرة دخول المتحف + جولة Horus-Bot في خطوات بسيطة.'
            : 'Museum entry + Horus-Bot robot tour in a few simple steps.'
        }
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 -mt-4 pb-24">
        <div className="mb-8">
          <BookingStepper steps={stepLabels} currentIndex={stepIdx} />
        </div>

        {/* STEP: ACCOUNT */}
        {currentStep === 'account' && (
          <Card className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl mb-2">
                {isRTL ? 'أنشئ حسابك على Horus-Bot' : 'Create your Horus-Bot account'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'حسابك يحفظ تذاكرك ويربطها بتطبيق Horus-Bot وروبوت الجولة في المتحف.'
                  : 'Your account saves your tickets and links them to the Horus-Bot app and the in-museum tour robot.'}
              </p>
            </div>

            <div className="flex gap-2 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthErrors({}); }}
                className={cn(
                  'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  authMode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                )}
              >
                {isRTL ? 'إنشاء حساب' : 'Create account'}
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthErrors({}); }}
                className={cn(
                  'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  authMode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                )}
              >
                {isRTL ? 'تسجيل الدخول' : 'Log in'}
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4" noValidate>
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
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-3 mt-1 space-y-1">
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
                        {languages.map((l) => (
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
          <Card className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'تذاكر دخول المتحف' : 'Museum Entry Tickets'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'الأسعار وفقاً لسياسة المتحف المصرية. الجنسية تحدّد الفئة.'
                  : 'Pricing follows Egyptian museum policy. Choose categories that match your group.'}
              </p>
            </div>

            {(['eg', 'foreign'] as const).map((group) => (
              <div key={group} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {group === 'eg' ? (isRTL ? 'المصريون' : 'Egyptians') : (isRTL ? 'الأجانب' : 'Foreigners')}
                </h3>
                {CATEGORY_ROWS.filter((r) => r.group === group).map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card">
                    <div>
                      <p className="font-semibold">{isRTL ? row.ar : row.en}</p>
                      <p className="text-sm text-muted-foreground">{museumTicketPrices[row.key]} EGP</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(row.key, -1)} aria-label="decrease">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold tabular-nums">{quantities[row.key]}</span>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(row.key, 1)} aria-label="increase">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="p-4 bg-primary/10 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? 'إجمالي التذاكر' : 'Total tickets'}</span>
                <span className="font-semibold">{totalTickets}</span>
              </div>
              <div className="flex justify-between">
                <span>{isRTL ? 'إجمالي دخول المتحف' : 'Museum entry total'}</span>
                <span className="font-bold text-lg">{museumPrice} EGP</span>
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
          <Card className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر جولة Horus-Bot' : 'Choose your Horus-Bot tour'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'الروبوت يقود جولتك داخل المتحف ويرويك قصص القطع.'
                  : 'A robot guide leads your visit inside the museum and tells you the stories behind the artifacts.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {([
                { id: 'standard' as TourType, icon: Zap,
                  titleEn: 'Standard Tour', titleAr: 'جولة قياسية',
                  descEn: 'Predefined route, fixed highlights, simple setup.',
                  descAr: 'مسار جاهز ومحطات مختارة — بدون أي إعدادات إضافية.' },
                { id: 'personalized' as TourType, icon: Sparkles,
                  titleEn: 'Personalized Tour', titleAr: 'جولة مخصَّصة',
                  descEn: 'Pick duration, themes, language, pace, and accessibility.',
                  descAr: 'اختر المدة، المواضيع، اللغة، الإيقاع، واحتياجات الوصول.' },
              ]).map((t) => {
                const active = tourType === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTourType(t.id)}
                    className={cn(
                      'text-start rounded-2xl border p-5 transition-colors',
                      active ? 'border-primary bg-primary/5 ring-2 ring-primary/30' : 'border-border bg-card hover:border-primary/50',
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center', active ? 'bg-primary/15' : 'bg-muted')}>
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-serif text-lg">{isRTL ? t.titleAr : t.titleEn}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{isRTL ? t.descAr : t.descEn}</p>
                    <p className="mt-3 text-sm font-semibold text-primary">
                      {robotTourPrices[t.id]} EGP / {isRTL ? 'حجز' : 'booking'}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={goNext} className="h-12 px-6">
                {isRTL ? 'متابعة' : 'Continue'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: DATE & TIME */}
        {currentStep === 'datetime' && (
          <Card className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر التاريخ والوقت' : 'Pick Date & Time'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'الأماكن محدودة لكل فترة.' : 'Spots are limited per time slot.'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-primary" /> {isRTL ? 'تاريخ الزيارة' : 'Visit date'}</Label>
              <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {isRTL ? 'الوقت' : 'Time slot'}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cn(
                      'h-11 rounded-xl border text-sm font-medium transition-colors',
                      time === slot ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
                    )}
                  >
                    {slot}
                  </button>
                ))}
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

        {/* STEP: PERSONALIZE */}
        {currentStep === 'personalize' && (
          <Card className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'تفضيلاتك' : 'Your Preferences'}</h2>
              <p className="text-sm text-muted-foreground">
                {tourType === 'personalized'
                  ? (isRTL
                    ? 'خصّص جولة Horus-Bot وفق وقتك واهتماماتك.'
                    : 'Tailor your Horus-Bot tour around your time and interests.')
                  : (isRTL
                    ? 'بضع تفضيلات أساسية — جولتك القياسية جاهزة بالفعل.'
                    : 'A few basic preferences — your standard tour is otherwise ready.')}
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
                          duration === d ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
                        )}
                      >
                        {d} {isRTL ? 'د' : 'min'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'القطع المختارة' : 'Selected exhibits'}</Label>
                  {exhibitsLoading && exhibits.length === 0 ? (
                    <div className="flex items-center gap-2 rounded-xl border border-border/60 p-3 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isRTL ? 'جاري تحميل القطع...' : 'Loading exhibits...'}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {exhibits.map((exhibit) => {
                        const active = selectedExhibits.includes(exhibit.id);
                        return (
                          <button
                            key={exhibit.id}
                            type="button"
                            onClick={() => setSelectedExhibits((arr) => toggleInArray(arr, exhibit.id))}
                            className={cn(
                              'min-h-16 rounded-xl border p-3 text-left transition-colors',
                              active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
                            )}
                          >
                            <div className="flex items-start gap-2">
                              {exhibit.imageUrl ? (
                                <img
                                  src={exhibit.imageUrl}
                                  alt={exhibit.altEn}
                                  className="h-10 w-10 rounded-lg object-cover border border-border/50 shrink-0"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                                </span>
                              )}
                              <span className={cn(
                                'mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0',
                                active ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40',
                              )}>
                                {active && <Check className="h-3 w-3" />}
                              </span>
                              <span>
                                <span className="block text-sm font-medium">{isRTL && exhibit.titleAr ? exhibit.titleAr : exhibit.titleEn}</span>
                                <span className="block text-xs text-muted-foreground mt-1">{exhibit.id}</span>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
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
                            active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
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
                            active ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                          {isRTL ? opt.ar : opt.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الإيقاع' : 'Pace'}</Label>
                    <Select value={pace} onValueChange={setPace}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {paces.map((p) => <SelectItem key={p.id} value={p.id}>{isRTL ? p.ar : p.en}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                    <span className="text-sm">{isRTL ? 'وضع الأطفال' : 'Kids mode'}</span>
                    <button
                      type="button"
                      onClick={() => setKidsMode((v) => !v)}
                      className={cn('h-6 w-11 rounded-full transition-colors', kidsMode ? 'bg-primary' : 'bg-muted-foreground/30')}
                      aria-pressed={kidsMode}
                    >
                      <span className={cn('block h-5 w-5 rounded-full bg-background transition-transform', kidsMode ? 'translate-x-5' : 'translate-x-0.5')} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
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
              <Label>{isRTL ? 'لغة الجولة' : 'Tour language'}</Label>
              <Select value={tourLanguage} onValueChange={setTourLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {languages.map((l) => <SelectItem key={l.id} value={l.id}>{isRTL ? l.ar : l.en}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bp-notes">{isRTL ? 'ملاحظات (اختياري)' : 'Optional notes'}</Label>
              <Textarea
                id="bp-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isRTL ? 'أخبرنا بأي شيء يساعد على تخصيص زيارتك.' : 'Tell us anything that can help personalize your visit.'}
                className="min-h-24"
              />
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={goNext} className="h-12 px-6">
                {isRTL ? 'متابعة إلى الدفع' : 'Continue to payment'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP: PAYMENT */}
        {currentStep === 'payment' && (
          <Card className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'الدفع الآمن' : 'Secure Checkout'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'اختر طريقة الدفع لإتمام الحجز.'
                  : 'Choose how you would like to pay to complete your booking.'}
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
                      'w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-colors',
                      active ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50',
                      opt.disabled && 'cursor-not-allowed opacity-60 hover:border-border',
                    )}
                  >
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-primary/15' : 'bg-muted')}>
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

            <div className="p-4 bg-primary/10 rounded-2xl space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'إجمالي التذاكر' : 'Total visitors'}</span><span>{totalTickets}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'الموعد' : 'When'}</span><span>{date} • {time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'نوع الجولة' : 'Tour'}</span><span className="capitalize">{tourType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'دخول المتحف' : 'Museum entry'}</span><span>{museumPrice} EGP</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'جولة الروبوت' : 'Robot tour'}</span><span>{tourPrice} EGP</span></div>
              <div className="flex justify-between border-t border-border/50 pt-2 mt-2"><span>{isRTL ? 'الإجمالي' : 'Total'}</span><span className="font-bold">{totalPrice} EGP</span></div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {isRTL ? 'ستُحفظ تذكرتك في حسابك وتظهر في تطبيق Horus-Bot.' : 'Your ticket will be saved to your account and appear in the Horus-Bot app.'}
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={confirmAndPay} disabled={busy} className="h-12 px-6">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? 'تأكيد الحجز' : 'Confirm booking')}
              </Button>
            </div>
          </Card>
        )}
      </section>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              🎉 {isRTL ? 'كل شيء جاهز!' : "You're all set!"}
            </DialogTitle>
            <DialogDescription>
              {isRTL
                ? 'تذكرة المتحف وجولة Horus-Bot محفوظتان في حسابك.'
                : 'Your museum ticket and Horus-Bot tour are saved to your account.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => { setShowSuccess(false); navigate('/tickets-mine'); }}>
              {isRTL ? 'عرض تذاكري' : 'View My Tickets'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
