import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Minus, Plus, Calendar as CalendarIcon, Clock, User as UserIcon, Mail, Lock, Phone,
  CreditCard, Wallet, Apple, Smartphone, Loader2, ShieldCheck, Check, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { SectionHero } from '@/components/site/SectionHero';
import { BookingStepper } from '@/components/site/BookingStepper';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { ticketPrices } from '@/lib/data';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@/lib/utils';

type StepKey = 'account' | 'tickets' | 'datetime' | 'personalize' | 'payment';
type PayMethod = 'card' | 'apple_pay' | 'google_pay' | 'cash';

const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const DURATIONS = [30, 45, 60, 90];

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

export default function BookPage() {
  const { isRTL } = useApp();
  const { user, signIn, signUp } = useAuth();
  const { createTicket } = useUserTickets();
  const navigate = useNavigate();

  // ---- Step management ----
  const accountNeeded = !user;
  const allSteps: StepKey[] = useMemo(
    () => (accountNeeded ? ['account', 'tickets', 'datetime', 'personalize', 'payment'] : ['tickets', 'datetime', 'personalize', 'payment']),
    [accountNeeded],
  );
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = allSteps[stepIdx];

  const stepLabels = allSteps.map((s) => {
    if (s === 'account') return isRTL ? 'الحساب' : 'Account';
    if (s === 'tickets') return isRTL ? 'التذاكر' : 'Tickets';
    if (s === 'datetime') return isRTL ? 'الموعد' : 'Date & Time';
    if (s === 'personalize') return isRTL ? 'الجولة' : 'Tour';
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
  const [signupLanguage, setSignupLanguage] = useState('english');
  const [authBusy, setAuthBusy] = useState(false);

  // Tickets
  const [quantities, setQuantities] = useState({ adult: 0, student: 0, child: 0 });
  // Date & time
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState<string>('11:00');
  // Personalize
  const [duration, setDuration] = useState<number>(60);
  const [visitorType, setVisitorType] = useState<string>('adult');
  const [interests, setInterests] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [tourLanguage, setTourLanguage] = useState<string>('english');
  const [notes, setNotes] = useState('');
  // Payment
  const [pay, setPay] = useState<PayMethod>('card');
  const [busy, setBusy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalTickets = quantities.adult + quantities.student + quantities.child;
  const totalPrice =
    quantities.adult * ticketPrices.adult +
    quantities.student * ticketPrices.student +
    quantities.child * ticketPrices.child;

  // ---- Handlers ----
  const updateQuantity = (k: keyof typeof quantities, d: number) =>
    setQuantities((q) => ({ ...q, [k]: Math.max(0, q[k] + d) }));

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success || !passwordSchema.safeParse(password).success) {
      toast.error(
        authMode === 'signup'
          ? isRTL ? 'تعذّر إنشاء حسابك. تأكّد من بياناتك وحاول مرة أخرى.' : "We couldn't create your account. Please check your details and try again."
          : isRTL ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.' : 'Email or password is incorrect. Please try again.',
      );
      return;
    }
    if (authMode === 'signup' && password !== confirm) {
      toast.error(isRTL ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }
    setAuthBusy(true);
    try {
      if (authMode === 'signup') {
        const { error } = await signUp(email, password, fullName || undefined);
        if (error) {
          toast.error(isRTL ? 'تعذّر إنشاء حسابك. حاول مرة أخرى.' : "We couldn't create your account. Please try again.");
          return;
        }
        // Pre-set personalization defaults from signup
        setTourLanguage(signupLanguage);
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(isRTL ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Email or password is incorrect.');
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
    setBusy(true);
    const { ticket, error } = await createTicket({
      visit_date: date,
      visit_time: time,
      ticket_types: quantities,
      total_tickets: totalTickets,
      total_price: totalPrice,
      currency: 'EGP',
      payment_method: pay,
      tour_duration: duration,
      visitor_type: visitorType,
      interests,
      accessibility,
      preferred_language: tourLanguage,
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
  const visitorTypes = [
    { id: 'adult', en: 'Adult', ar: 'بالغ' },
    { id: 'student', en: 'Student', ar: 'طالب' },
    { id: 'child', en: 'Child', ar: 'طفل' },
    { id: 'family', en: 'Family', ar: 'عائلة' },
    { id: 'group', en: 'Group', ar: 'مجموعة' },
  ];
  const languages = [
    { id: 'arabic', en: 'Arabic', ar: 'العربية' },
    { id: 'egyptian-arabic', en: 'Egyptian Arabic', ar: 'العامية المصرية' },
    { id: 'english', en: 'English', ar: 'الإنجليزية' },
  ];
  const payOptions: { id: PayMethod; labelEn: string; labelAr: string; icon: typeof CreditCard }[] = [
    { id: 'card', labelEn: 'Credit / Debit Card', labelAr: 'بطاقة ائتمان / خصم', icon: CreditCard },
    { id: 'apple_pay', labelEn: 'Apple Pay', labelAr: 'Apple Pay', icon: Apple },
    { id: 'google_pay', labelEn: 'Google Pay', labelAr: 'Google Pay', icon: Smartphone },
    { id: 'cash', labelEn: 'Cash at museum counter', labelAr: 'نقداً عند شبّاك المتحف', icon: Wallet },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'الحجز' : 'Book'}
        title={isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
        subtitle={
          isRTL
            ? 'خطوات بسيطة: التذاكر، الموعد، تخصيص الجولة، ثم الدفع.'
            : 'A few simple steps: tickets, date, tour personalization, and payment.'
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
                  ? 'أنشئ حساباً لتُحفظ تذاكرك، خصّص جولتك، واستخدم كل شيء لاحقاً عبر تطبيق Horus-Bot.'
                  : 'Create an account to save your tickets, personalize your tour, and access everything later from the Horus-Bot app.'}
              </p>
            </div>

            <div className="flex gap-2 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={cn(
                  'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  authMode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                )}
              >
                {isRTL ? 'إنشاء حساب' : 'Create account'}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={cn(
                  'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  authMode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                )}
              >
                {isRTL ? 'تسجيل الدخول' : 'Log in'}
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <Label htmlFor="bp-name">{isRTL ? 'الاسم الكامل' : 'Full name'}</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                    <Input
                      id="bp-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-9 rtl:pl-3 rtl:pr-9"
                      placeholder={isRTL ? 'اسمك' : 'Your name'}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="bp-email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="bp-email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 rtl:pl-3 rtl:pr-9"
                    placeholder="you@email.com" required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bp-pw">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="bp-pw" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 rtl:pl-3 rtl:pr-9"
                    placeholder="••••••••" required
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-pw2">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm password'}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                      <Input
                        id="bp-pw2" type="password" value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="pl-9 rtl:pl-3 rtl:pr-9"
                        placeholder="••••••••" required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
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
                    <div className="space-y-1.5">
                      <Label htmlFor="bp-phone">{isRTL ? 'رقم الهاتف (اختياري)' : 'Phone number (optional)'}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                        <Input
                          id="bp-phone" type="tel" value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-9 rtl:pl-3 rtl:pr-9"
                          placeholder="+20 ..."
                        />
                      </div>
                    </div>
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
          <Card className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر تذاكرك' : 'Select Your Tickets'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'اختر العدد الذي يناسب مجموعتك.' : 'Pick the right amount for your group.'}
              </p>
            </div>

            {[
              { key: 'adult' as const, en: 'Adult', ar: 'بالغ', price: ticketPrices.adult },
              { key: 'student' as const, en: 'Student', ar: 'طالب', price: ticketPrices.student },
              { key: 'child' as const, en: 'Child', ar: 'طفل', price: ticketPrices.child },
            ].map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card">
                <div>
                  <p className="font-semibold">{isRTL ? row.ar : row.en}</p>
                  <p className="text-sm text-muted-foreground">{row.price} EGP</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(row.key, -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold tabular-nums">{quantities[row.key]}</span>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(row.key, 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="p-4 bg-primary/10 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? 'إجمالي التذاكر' : 'Total tickets'}</span>
                <span className="font-semibold">{totalTickets}</span>
              </div>
              <div className="flex justify-between">
                <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
                <span className="font-bold text-lg">{totalPrice} EGP</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={proceedFromTickets} className="h-12 px-6">
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
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'خصّص جولتك' : 'Personalize Your Tour'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? 'اختر ما تودّ مشاهدته لتُرشد Horus-Bot جولتك حسب وقتك واهتماماتك.'
                  : 'Choose what you would like to see so Horus-Bot can guide your visit around your time and interests.'}
              </p>
            </div>

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
              <Label>{isRTL ? 'نوع الزائر' : 'Visitor type'}</Label>
              <div className="flex flex-wrap gap-2">
                {visitorTypes.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVisitorType(v.id)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition-colors',
                      visitorType === v.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50',
                    )}
                  >
                    {isRTL ? v.ar : v.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? 'اهتماماتك' : 'Interests'}</Label>
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'لغة الجولة' : 'Preferred language'}</Label>
                <Select value={tourLanguage} onValueChange={setTourLanguage}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.id} value={l.id}>{isRTL ? l.ar : l.en}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر طريقة الدفع' : 'Choose Payment Method'}</h2>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'دفع تجريبي — لن يتم خصم أي مبلغ حقيقي.' : 'Demo checkout — no real payment will be charged.'}
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
                    onClick={() => setPay(opt.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-colors',
                      active ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50',
                    )}
                  >
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', active ? 'bg-primary/15' : 'bg-muted')}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium flex-1">{isRTL ? opt.labelAr : opt.labelEn}</span>
                    <span className={cn('h-4 w-4 rounded-full border-2', active ? 'border-primary bg-primary' : 'border-muted-foreground/40')} />
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-primary/10 rounded-2xl space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'إجمالي التذاكر' : 'Total tickets'}</span><span>{totalTickets}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'الموعد' : 'When'}</span><span>{date} • {time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'مدة الجولة' : 'Tour duration'}</span><span>{duration} {isRTL ? 'دقيقة' : 'min'}</span></div>
              <div className="flex justify-between border-t border-border/50 pt-2 mt-2"><span>{isRTL ? 'الإجمالي' : 'Total'}</span><span className="font-bold">{totalPrice} EGP</span></div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {isRTL ? 'ستُحفظ تذكرتك في حسابك وتظهر في تطبيق Horus-Bot.' : 'Your ticket will be saved to your account and appear in the Horus-Bot app.'}
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={goBack}><ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}</Button>
              <Button onClick={confirmAndPay} disabled={busy} className="h-12 px-6">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? 'أكّد وادفع' : 'Confirm & Pay')}
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
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'تذاكرك جاهزة ومحفوظة في حسابك.' : 'Your tickets are ready and saved to your account.'}
          </p>
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
