import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Flag,
  Globe,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Ticket,
  User as UserIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { productMessage } from '@/lib/productMessages';
import { toast } from 'sonner';
import gemImage from '@/assets/gem.jpg';

const ar = {
  account: 'حسابي',
  signInTitle: 'سجل الدخول للمتابعة',
  signInSubtitle: 'سجل الدخول للوصول إلى ملفك الشخصي وتذاكرك.',
  signInCta: 'تسجيل الدخول',
  heroTitle: 'حسابي',
  heroSubtitle: 'احتفظ بتفاصيل زيارتك وتفضيلاتك وتذاكر Horus-Bot جاهزة في مكان واحد.',
  welcome: 'مرحبا',
  visitorProfile: 'ملف الزائر',
  readyForVisit: 'جاهز للزيارة',
  preferredLanguage: 'اللغة المفضلة',
  quickActions: 'إجراءات سريعة',
  bookVisit: 'احجز زيارتك',
  myTickets: 'تذاكري',
  viewTickets: 'عرض التذاكر',
  profileDetails: 'تفاصيل الملف الشخصي',
  profileHelper: 'هذه التفاصيل تساعدنا على تجهيز زيارتك وحفظ تذاكرك بهدوء.',
  edit: 'تعديل',
  cancel: 'إلغاء',
  fullName: 'الاسم الكامل',
  displayName: 'اسم العرض',
  email: 'البريد الإلكتروني',
  phone: 'الهاتف',
  nationality: 'الجنسية',
  avatarUrl: 'رابط الصورة الشخصية',
  preferences: 'تفضيلات الزيارة',
  preferencesHelper: 'اختر اللغة التي تفضلها لواجهة الموقع وتجربة Horus-Bot.',
  marketingOptIn: 'أرغب في استقبال أخبار وعروض المتحف',
  english: 'الإنجليزية',
  arabic: 'العربية',
  saveChanges: 'حفظ التغييرات',
  saving: 'جاري الحفظ...',
  profileUpdated: 'تم تحديث الملف الشخصي.',
  loadingProfile: 'جاري تحميل الملف الشخصي...',
  retry: 'إعادة المحاولة',
  ticketsSummary: 'ملخص التذاكر',
  noTickets: 'لا توجد تذاكر بعد. احجز زيارتك للبدء.',
  activeBooking: 'حجز نشط',
  activeBookings: 'حجوزات نشطة',
  pastBooking: 'حجز سابق في سجلك.',
  pastBookings: 'حجوزات سابقة في سجلك.',
  accountActions: 'إجراءات الحساب',
  logoutHelper: 'يمكنك تسجيل الخروج من هذا الجهاز مع بقاء تذاكرك محفوظة في حسابك.',
  logout: 'تسجيل الخروج',
  logoutDevice: 'تسجيل الخروج من هذا الجهاز',
  loggingOut: 'جاري تسجيل الخروج...',
  loggedOut: 'تم تسجيل الخروج.',
};

export default function AccountPage() {
  const { isRTL, setLanguage } = useApp();
  const {
    user,
    profile,
    signOut,
    updateProfile,
    isLoading,
    profileLoadError,
    reloadProfile,
  } = useAuth();
  const { tickets } = useUserTickets();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name ?? profile?.display_name ?? '');
  const [displayName, setDisplayName] = useState(profile?.display_name ?? profile?.full_name ?? '');
  const [phone, setPhone] = useState(profile?.phone_number ?? '');
  const [nationality, setNationality] = useState(profile?.nationality ?? '');
  const [prefLang, setPrefLang] = useState<'english' | 'arabic'>(
    profile?.preferred_language === 'arabic' ? 'arabic' : 'english',
  );
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');
  const [marketingOptIn, setMarketingOptIn] = useState(profile?.marketing_opt_in ?? false);

  useEffect(() => {
    setFullName(profile?.full_name ?? profile?.display_name ?? '');
    setDisplayName(profile?.display_name ?? profile?.full_name ?? '');
    setPhone(profile?.phone_number ?? '');
    setNationality(profile?.nationality ?? '');
    setPrefLang(profile?.preferred_language === 'arabic' ? 'arabic' : 'english');
    setAvatarUrl(profile?.avatar_url ?? '');
    setMarketingOptIn(profile?.marketing_opt_in ?? false);
  }, [profile]);

  if (!user) {
    return (
      <>
        <SectionHero
          label={isRTL ? ar.account : 'My Account'}
          title={isRTL ? ar.signInTitle : 'Sign in to continue'}
          subtitle={isRTL ? ar.signInSubtitle : 'Log in to access your profile and tickets.'}
          backgroundImage={gemImage}
          backgroundAlt={isRTL ? 'قاعة متحف هادئة' : 'Quiet museum hall'}
          bleedBehindNav
          atmosphereContinuity
          className="after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:from-background after:to-transparent"
        />
        <section className="relative z-10 mx-auto max-w-3xl px-4 pb-24 -mt-10 md:px-8">
          <Card className="rounded-[2rem] border-primary/20 bg-card/90 p-8 text-center shadow-soft backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <UserIcon className="h-6 w-6 text-primary" />
            </div>
            <Button asChild><Link to="/auth">{isRTL ? ar.signInCta : 'Log in'}</Link></Button>
          </Card>
        </section>
      </>
    );
  }

  const handleSave = async () => {
    setBusy(true);
    const { error } = await updateProfile({
      full_name: fullName.trim() || null,
      display_name: displayName.trim() || fullName.trim() || null,
      phone_number: phone.trim() || null,
      nationality: nationality.trim() || null,
      preferred_language: prefLang,
      avatar_url: avatarUrl.trim() || null,
      marketing_opt_in: marketingOptIn,
    });
    setBusy(false);
    if (error) {
      toast.error(
        error.message === productMessage('network')
          ? productMessage('network', isRTL)
          : productMessage('profile', isRTL),
      );
      return;
    }
    setLanguage(prefLang === 'arabic' ? 'ar' : 'en');
    toast.success(isRTL ? ar.profileUpdated : 'Profile updated.');
    setEditing(false);
  };

  const handleLogout = async () => {
    if (logoutBusy) return;
    setLogoutBusy(true);
    try {
      await signOut();
      toast.success(isRTL ? ar.loggedOut : 'You have been logged out.');
      navigate('/');
    } catch (e) {
      console.error('[Horus-Bot] Sign out failed', e);
      toast.error(productMessage('generic', isRTL));
    } finally {
      setLogoutBusy(false);
    }
  };

  const activeTickets = tickets.filter((t) => t.status === 'active');
  const pastTickets = tickets.filter((t) => t.status !== 'active');
  const profileName = profile?.full_name || profile?.display_name || (isRTL ? ar.welcome : 'Welcome');
  const initials = profileName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'H';
  const normalizedEmail = (user.email ?? '').toLowerCase();
  const emptyValue = isRTL ? 'غير مضاف' : 'Not added';
  const activeBookingLabel = isRTL
    ? `${activeTickets.length} ${activeTickets.length === 1 ? ar.activeBooking : ar.activeBookings}`
    : `${activeTickets.length} active booking${activeTickets.length === 1 ? '' : 's'}`;

  return (
    <>
      <SectionHero
        label={isRTL ? ar.account : 'My Account'}
        title={isRTL ? ar.heroTitle : 'My Account'}
        subtitle={isRTL ? ar.heroSubtitle : 'Keep your visit details, preferences, and Horus-Bot tickets ready in one place.'}
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة متحف هادئة' : 'Quiet museum hall'}
        bleedBehindNav
        atmosphereContinuity
        className="after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:from-background after:to-transparent"
      />

      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-24 -mt-10 space-y-6 md:px-8">
        {isLoading && !profile && (
          <Card className="rounded-[2rem] border-primary/20 bg-card/90 p-6 shadow-soft backdrop-blur md:p-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              {isRTL ? ar.loadingProfile : 'Loading profile...'}
            </div>
          </Card>
        )}

        {profileLoadError && !profile && (
          <Card className="space-y-4 rounded-[2rem] border-primary/20 bg-card/90 p-6 shadow-soft backdrop-blur md:p-8">
            <div>
              <h2 className="font-serif text-xl">{productMessage('profileLoad', isRTL)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isRTL
                  ? 'حدثت مشكلة في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.'
                  : 'Connection issue. Please check your internet connection and try again.'}
              </p>
            </div>
            <Button onClick={reloadProfile} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isRTL ? ar.retry : 'Try again'}
            </Button>
          </Card>
        )}

        <Card className="rounded-[2rem] border-primary/20 bg-card/90 p-5 shadow-soft backdrop-blur md:p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/15 font-serif text-2xl font-semibold text-primary ring-1 ring-primary/25">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="section-label mb-1">{isRTL ? ar.visitorProfile : 'Visitor Profile'}</div>
                <h2 className="truncate font-serif text-2xl leading-tight text-foreground md:text-3xl">{profileName}</h2>
                <p className="mt-1 break-all text-sm text-muted-foreground">{normalizedEmail || emptyValue}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="border-0 bg-primary/15 text-primary">{isRTL ? ar.readyForVisit : 'Ready for the visit'}</Badge>
                  <Badge variant="secondary" className="border-0 bg-background/65 text-muted-foreground">
                    {activeBookingLabel}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Button asChild variant="outline">
                <Link to="/tickets-mine"><Ticket className="h-4 w-4" /> {isRTL ? ar.viewTickets : 'My Tickets'}</Link>
              </Button>
              <Button asChild>
                <Link to="/book"><Calendar className="h-4 w-4" /> {isRTL ? ar.bookVisit : 'Book Visit'}</Link>
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr]">
          <Card className="space-y-5 rounded-[2rem] border-primary/20 bg-card/90 p-5 shadow-soft backdrop-blur md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl">{isRTL ? ar.profileDetails : 'Profile details'}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{isRTL ? ar.profileHelper : 'These details help keep your visit and tickets ready.'}</p>
              </div>
              {!editing ? (
                <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                  <Pencil className="h-4 w-4" /> {isRTL ? ar.edit : 'Edit'}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  {isRTL ? ar.cancel : 'Cancel'}
                </Button>
              )}
            </div>

            {!editing ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field icon={<UserIcon className="h-4 w-4" />} label={isRTL ? ar.fullName : 'Full name'} value={profile?.full_name || profile?.display_name || emptyValue} />
                <Field icon={<Mail className="h-4 w-4" />} label={isRTL ? ar.email : 'Email'} value={normalizedEmail || emptyValue} />
                <Field icon={<Phone className="h-4 w-4" />} label={isRTL ? ar.phone : 'Phone'} value={profile?.phone_number || emptyValue} />
                <Field icon={<Flag className="h-4 w-4" />} label={isRTL ? ar.nationality : 'Nationality'} value={profile?.nationality || emptyValue} />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{isRTL ? ar.fullName : 'Full name'}</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{isRTL ? ar.displayName : 'Display name'}</Label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{isRTL ? ar.phone : 'Phone'}</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{isRTL ? ar.nationality : 'Nationality'}</Label>
                  <Input value={nationality} onChange={(e) => setNationality(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{isRTL ? ar.preferredLanguage : 'Preferred language'}</Label>
                  <Select
                    value={prefLang}
                    onValueChange={(value) => setPrefLang(value === 'arabic' ? 'arabic' : 'english')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">{isRTL ? ar.english : 'English'}</SelectItem>
                      <SelectItem value="arabic">{isRTL ? ar.arabic : 'Arabic'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{isRTL ? ar.avatarUrl : 'Avatar URL'}</Label>
                  <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                </div>
                <label className="flex items-center gap-2 rounded-2xl border border-primary/15 bg-background/55 p-3 text-sm sm:col-span-2">
                  <Checkbox
                    checked={marketingOptIn}
                    onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
                  />
                  {isRTL ? ar.marketingOptIn : 'Send me museum news and offers'}
                </label>
                <div className="flex justify-end sm:col-span-2">
                  <Button onClick={handleSave} disabled={busy}>
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                    {busy ? (isRTL ? ar.saving : 'Saving...') : (isRTL ? ar.saveChanges : 'Save changes')}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className="space-y-6">
            <Card className="space-y-4 rounded-[2rem] border-primary/20 bg-card/90 p-5 shadow-soft backdrop-blur md:p-6">
              <div>
                <h2 className="font-serif text-2xl">{isRTL ? ar.preferences : 'Visit preferences'}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{isRTL ? ar.preferencesHelper : 'Choose the language you prefer for the website and Horus-Bot experience.'}</p>
              </div>
              <Field icon={<Globe className="h-4 w-4" />} label={isRTL ? ar.preferredLanguage : 'Preferred language'} value={languageLabel(profile?.preferred_language, isRTL)} />
              <div className="rounded-2xl border border-primary/15 bg-background/55 p-3 text-sm text-muted-foreground">
                <ShieldCheck className="mb-2 h-4 w-4 text-primary" />
                {profile?.marketing_opt_in
                  ? (isRTL ? ar.marketingOptIn : 'Museum news and offers are enabled.')
                  : (isRTL ? 'أخبار وعروض المتحف غير مفعلة حاليا.' : 'Museum news and offers are currently off.')}
              </div>
            </Card>

            <Card className="space-y-3 rounded-[2rem] border-primary/20 bg-card/90 p-5 shadow-soft backdrop-blur md:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl">{isRTL ? ar.ticketsSummary : 'Ticket summary'}</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/tickets-mine"><Ticket className="h-4 w-4" /> {isRTL ? ar.viewTickets : 'View tickets'}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {activeTickets.length === 0
                  ? (isRTL ? ar.noTickets : "You haven't booked a Horus-Bot visit yet.")
                  : (isRTL
                    ? `${activeTickets.length} ${activeTickets.length === 1 ? ar.activeBooking : ar.activeBookings}.`
                    : `${activeTickets.length} active booking${activeTickets.length === 1 ? '' : 's'}.`)}
              </p>
              {activeTickets.length === 0 && (
                <Button asChild className="w-fit">
                  <Link to="/book">{isRTL ? ar.bookVisit : 'Book Visit'}</Link>
                </Button>
              )}
              {pastTickets.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {isRTL
                    ? `${pastTickets.length} ${pastTickets.length === 1 ? ar.pastBooking : ar.pastBookings}`
                    : `${pastTickets.length} past booking${pastTickets.length === 1 ? '' : 's'} in your history.`}
                </p>
              )}
            </Card>

            <Card className="space-y-3 rounded-[2rem] border-primary/20 bg-card/90 p-5 shadow-soft backdrop-blur md:p-6">
              <h2 className="font-serif text-2xl">{isRTL ? ar.accountActions : 'Account actions'}</h2>
              <p className="text-sm text-muted-foreground">{isRTL ? ar.logoutHelper : 'Sign out from this device. Your tickets stay saved in your account.'}</p>
              <Button variant="outline" onClick={handleLogout} disabled={logoutBusy} className="w-fit">
                {logoutBusy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                {logoutBusy ? (isRTL ? ar.loggingOut : 'Logging out...') : (isRTL ? ar.logoutDevice : 'Sign out from this device')}
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function languageLabel(value: string | null | undefined, isRTL: boolean) {
  return value === 'arabic' ? (isRTL ? ar.arabic : 'Arabic') : (isRTL ? ar.english : 'English');
}

function Field({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-primary/15 bg-background/55 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="break-words font-medium text-foreground">{value}</div>
    </div>
  );
}
