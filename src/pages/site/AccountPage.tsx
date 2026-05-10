import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon, Mail, Phone, Globe, Flag, LogOut, Pencil, Loader2, Ticket,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { toast } from 'sonner';

export default function AccountPage() {
  const { isRTL } = useApp();
  const { user, profile, signOut, updateProfile } = useAuth();
  const { tickets } = useUserTickets();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name ?? profile?.display_name ?? '');
  const [phone, setPhone] = useState(profile?.phone_number ?? '');
  const [nationality, setNationality] = useState(profile?.nationality ?? '');
  const [prefLang, setPrefLang] = useState(profile?.preferred_language ?? 'english');

  if (!user) {
    return (
      <>
        <SectionHero
          label={isRTL ? 'حسابي' : 'My Account'}
          title={isRTL ? 'سجّل الدخول للمتابعة' : 'Sign in to continue'}
          subtitle={isRTL
            ? 'سجّل الدخول للوصول إلى ملفك الشخصي وتذاكرك.'
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
      display_name: fullName.trim() || null,
      phone_number: phone.trim() || null,
      nationality: nationality.trim() || null,
      preferred_language: prefLang || null,
    });
    setBusy(false);
    if (error) {
      toast.error(isRTL ? 'تعذّر حفظ التغييرات.' : "Couldn't save your changes.");
      return;
    }
    toast.success(isRTL ? 'تم حفظ ملفك.' : 'Profile saved.');
    setEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success(isRTL ? 'تم تسجيل الخروج.' : 'You have been logged out.');
    navigate('/');
  };

  const activeTickets = tickets.filter((t) => t.status === 'active');
  const pastTickets = tickets.filter((t) => t.status !== 'active');

  return (
    <>
      <SectionHero
        label={isRTL ? 'حسابي' : 'My Account'}
        title={profile?.full_name || profile?.display_name || (isRTL ? 'مرحباً' : 'Welcome')}
        subtitle={user.email ?? ''}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-2 space-y-6">
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
              <Field icon={<UserIcon className="h-4 w-4" />} label={isRTL ? 'الاسم' : 'Full name'} value={profile?.full_name || profile?.display_name || '—'} />
              <Field icon={<Mail className="h-4 w-4" />} label={isRTL ? 'البريد' : 'Email'} value={user.email ?? '—'} />
              <Field icon={<Phone className="h-4 w-4" />} label={isRTL ? 'الهاتف' : 'Phone'} value={profile?.phone_number || '—'} />
              <Field icon={<Flag className="h-4 w-4" />} label={isRTL ? 'الجنسية' : 'Nationality'} value={profile?.nationality || '—'} />
              <Field icon={<Globe className="h-4 w-4" />} label={isRTL ? 'اللغة المفضّلة' : 'Preferred language'} value={profile?.preferred_language || '—'} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{isRTL ? 'الاسم الكامل' : 'Full name'}</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
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
                <Label>{isRTL ? 'اللغة المفضّلة' : 'Preferred language'}</Label>
                <Input value={prefLang} onChange={(e) => setPrefLang(e.target.value)} />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button onClick={handleSave} disabled={busy}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? 'حفظ' : 'Save')}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 md:p-8 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">{isRTL ? 'تذاكري' : 'My tickets'}</h2>
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
              <Link to="/book">{isRTL ? 'احجز زيارتك' : 'Book your visit'}</Link>
            </Button>
          )}
          {pastTickets.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {isRTL
                ? `${pastTickets.length} حجز سابق في السجل.`
                : `${pastTickets.length} past booking${pastTickets.length === 1 ? '' : 's'} in your history.`}
            </p>
          )}
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> {isRTL ? 'تسجيل الخروج' : 'Log out'}
          </Button>
        </div>
      </section>
    </>
  );
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
