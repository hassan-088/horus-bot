import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon, Mail, Phone, Globe, Flag, LogOut, Pencil, Loader2, Ticket,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { productMessage } from '@/lib/productMessages';
import { toast } from 'sonner';

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
          label={isRTL ? 'حسابي' : 'My Account'}
          title={isRTL ? 'سجل الدخول للمتابعة' : 'Sign in to continue'}
          subtitle={isRTL
            ? 'سجل الدخول للوصول إلى ملفك الشخصي وتذاكرك.'
            : 'Log in to access your profile and tickets.'}
        />
        <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-2">
          <Card className="p-8 text-center">
            <Button asChild><Link to="/auth">{isRTL ? 'تسجيل الدخول' : 'Log in'}</Link></Button>
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
    toast.success(
      isRTL
        ? '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a.'
        : 'Profile updated.',
    );
    setEditing(false);
  };

  const handleLogout = async () => {
    if (logoutBusy) return;
    setLogoutBusy(true);
    try {
      await signOut();
      toast.success(isRTL ? 'تم تسجيل الخروج.' : 'You have been logged out.');
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

  return (
    <>
      <SectionHero
        label={isRTL ? 'حسابي' : 'My Account'}
        title={profile?.full_name || profile?.display_name || (isRTL ? 'مرحبا' : 'Welcome')}
        subtitle={user.email ?? ''}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-2 space-y-6">
        {isLoading && !profile && (
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              {isRTL ? '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a...' : 'Loading profile...'}
            </div>
          </Card>
        )}

        {profileLoadError && !profile && (
          <Card className="p-6 md:p-8 space-y-4">
            <div>
              <h2 className="font-serif text-xl">{productMessage('profileLoad', isRTL)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isRTL
                  ? '\u062d\u062f\u062b\u062a \u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.'
                  : 'Connection issue. Please check your internet connection and try again.'}
              </p>
            </div>
            <Button onClick={reloadProfile} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isRTL ? '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629' : 'Try again'}
            </Button>
          </Card>
        )}

        <Card className="p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">{isRTL ? 'الملف الشخصي' : 'Profile'}</h2>
            {!editing ? (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="h-4 w-4" /> {isRTL ? 'تعديل' : 'Edit'}
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            )}
          </div>

          {!editing ? (
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Field icon={<UserIcon className="h-4 w-4" />} label={isRTL ? 'الاسم الكامل' : 'Full name'} value={profile?.full_name || profile?.display_name || '-'} />
              <Field icon={<Mail className="h-4 w-4" />} label={isRTL ? 'البريد الإلكتروني' : 'Email'} value={user.email ?? '-'} />
              <Field icon={<Phone className="h-4 w-4" />} label={isRTL ? 'الهاتف' : 'Phone'} value={profile?.phone_number || '-'} />
              <Field icon={<Flag className="h-4 w-4" />} label={isRTL ? 'الجنسية' : 'Nationality'} value={profile?.nationality || '-'} />
              <Field icon={<Globe className="h-4 w-4" />} label={isRTL ? 'لغة الواجهة' : 'UI language'} value={languageLabel(profile?.preferred_language, isRTL)} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{isRTL ? 'الاسم الكامل' : 'Full name'}</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{isRTL ? 'اسم العرض' : 'Display name'}</Label>
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{isRTL ? 'الهاتف' : 'Phone'}</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{isRTL ? 'الجنسية' : 'Nationality'}</Label>
                <Input value={nationality} onChange={(e) => setNationality(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{isRTL ? 'لغة الواجهة' : 'UI language'}</Label>
                <Select
                  value={prefLang}
                  onValueChange={(value) => setPrefLang(value === 'arabic' ? 'arabic' : 'english')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">{isRTL ? 'الإنجليزية' : 'English'}</SelectItem>
                    <SelectItem value="arabic">{isRTL ? 'العربية' : 'Arabic'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>{isRTL ? 'رابط الصورة الشخصية' : 'Avatar URL'}</Label>
                <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
              </div>
              <label className="sm:col-span-2 flex items-center gap-2 text-sm">
                <Checkbox
                  checked={marketingOptIn}
                  onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
                />
                {isRTL ? 'أرغب في استقبال أخبار وعروض المتحف' : 'Send me museum news and offers'}
              </label>
              <div className="sm:col-span-2 flex justify-end">
                <Button onClick={handleSave} disabled={busy}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  {busy
                    ? (isRTL ? '\u062c\u0627\u0631\u064a \u0627\u0644\u062d\u0641\u0638...' : 'Saving...')
                    : (isRTL ? '\u062d\u0641\u0638 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a' : 'Save changes')}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 md:p-8 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">{isRTL ? 'تذاكري' : 'My Tickets'}</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/tickets-mine"><Ticket className="h-4 w-4" /> {isRTL ? 'عرض الكل' : 'View all'}</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {activeTickets.length === 0
              ? (isRTL
                ? 'لا توجد تذاكر بعد. احجز زيارتك للبدء.'
                : "You haven't booked a Horus-Bot visit yet.")
              : (isRTL
                ? `${activeTickets.length} حجز نشط.`
                : `${activeTickets.length} active booking${activeTickets.length === 1 ? '' : 's'}.`)}
          </p>
          {activeTickets.length === 0 && (
            <Button asChild className="self-start">
              <Link to="/book">{isRTL ? 'احجز زيارتك' : 'Book Visit'}</Link>
            </Button>
          )}
          {pastTickets.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {isRTL
                ? `${pastTickets.length} حجز سابق في سجلك.`
                : `${pastTickets.length} past booking${pastTickets.length === 1 ? '' : 's'} in your history.`}
            </p>
          )}
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout} disabled={logoutBusy}>
            {logoutBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            {logoutBusy
              ? (isRTL
                ? '\u062c\u0627\u0631\u064a \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c...'
                : 'Logging out...')
              : (isRTL ? '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c' : 'Log out')}
          </Button>
        </div>
      </section>
    </>
  );
}

function languageLabel(value: string | null | undefined, isRTL: boolean) {
  return value === 'arabic' ? (isRTL ? 'العربية' : 'Arabic') : (isRTL ? 'الإنجليزية' : 'English');
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        {icon}
        {label}
      </div>
      <div className="font-medium text-foreground capitalize">{value}</div>
    </div>
  );
}
