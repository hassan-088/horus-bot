import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Loader2, LogIn, LogOut, Menu, Ticket as TicketIcon, User as UserIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { productMessage } from '@/lib/productMessages';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const navItems = [
  { to: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
  { to: '/experience', labelEn: 'Experience', labelAr: 'التجربة' },
  { to: '/tickets-info', labelEn: 'Tickets', labelAr: 'التذاكر' },
  { to: '/app', labelEn: 'App', labelAr: 'التطبيق' },
  { to: '/faq', labelEn: 'FAQ', labelAr: 'الأسئلة' },
];

export function SiteHeader() {
  const { language, setLanguage, isRTL } = useApp();
  const { user, signOut, syncPreferredLanguage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const [languageBusy, setLanguageBusy] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    if (logoutBusy) return;
    setLogoutBusy(true);
    setOpen(false);
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

  const handleLanguageToggle = async () => {
    if (languageBusy) return;
    const next = language === 'en' ? 'ar' : 'en';
    setLanguage(next);
    setLanguageBusy(true);
    try {
      await syncPreferredLanguage(next);
    } catch (e) {
      console.error('[Horus-Bot] Preferred language sync failed', e);
      toast.warning(isRTL
        ? 'تم تغيير اللغة، لكن تعذر تحديث الملف الشخصي.'
        : 'Language changed, but we could not update your profile.');
    } finally {
      setLanguageBusy(false);
    }
  };

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-3 pt-3 md:px-8 lg:py-0">
        <div
          className={cn(
            'flex h-12 items-center justify-between rounded-full border px-3 shadow-[0_18px_45px_-28px_hsl(var(--primary)/0.55)] backdrop-blur-md lg:h-16 lg:rounded-none lg:border-0 lg:bg-sidebar/55 lg:px-0 lg:shadow-none lg:backdrop-blur-lg',
            scrolled
              ? 'border-primary/20 bg-card/85 backdrop-blur-2xl'
              : 'border-primary/10 bg-card/60',
          )}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <span className="font-serif text-lg font-bold text-primary">H</span>
            </div>
            <span className="truncate font-serif text-lg tracking-wide text-foreground">Horus-Bot</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                {isRTL ? item.labelAr : item.labelEn}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              disabled={languageBusy}
              className="gap-1.5"
            >
              {languageBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
              {language === 'en' ? 'EN' : 'ع'}
            </Button>
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/tickets-mine')} className="gap-1.5">
                  <TicketIcon className="h-4 w-4" />
                  {isRTL ? 'تذاكري' : 'My Tickets'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/account')} className="gap-1.5">
                  <UserIcon className="h-4 w-4" />
                  {isRTL ? 'حسابي' : 'My Account'}
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="gap-1.5">
                <LogIn className="h-4 w-4" />
                {isRTL ? 'تسجيل الدخول' : 'Log in'}
              </Button>
            )}
            <Button size="sm" onClick={() => navigate('/book')} className="shadow-soft">
              {isRTL ? 'احجز زيارتك' : 'Book Visit'}
            </Button>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              disabled={languageBusy}
              aria-label={isRTL ? 'تغيير اللغة' : 'Change language'}
              className="h-9 w-9 rounded-full"
            >
              {languageBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
            </Button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-3 top-3 max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[2rem] border border-primary/20 bg-card/95 shadow-2xl backdrop-blur-xl animate-slide-in-right">
            <div className="flex h-16 items-center justify-between border-b border-primary/15 px-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <span className="font-serif text-lg font-bold text-primary">H</span>
                </div>
                <span className="truncate font-serif text-lg tracking-wide text-foreground">Horus-Bot</span>
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-base font-medium',
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )
                  }
                >
                  {isRTL ? item.labelAr : item.labelEn}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-primary/15 pt-4">
                {user ? (
                  <>
                    <Button variant="ghost" onClick={() => { setOpen(false); navigate('/tickets-mine'); }} className="justify-start gap-1.5">
                      <TicketIcon className="h-4 w-4" />
                      {isRTL ? 'تذاكري' : 'My Tickets'}
                    </Button>
                    <Button variant="ghost" onClick={() => { setOpen(false); navigate('/account'); }} className="justify-start gap-1.5">
                      <UserIcon className="h-4 w-4" />
                      {isRTL ? 'حسابي' : 'My Account'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      disabled={logoutBusy}
                      className="justify-start gap-1.5"
                    >
                      {logoutBusy ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      {logoutBusy
                        ? (isRTL ? 'جاري تسجيل الخروج...' : 'Logging out...')
                        : (isRTL ? 'تسجيل الخروج' : 'Log out')}
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" onClick={() => { setOpen(false); navigate('/auth'); }} className="justify-start gap-1.5">
                    <LogIn className="h-4 w-4" />
                    {isRTL ? 'تسجيل الدخول' : 'Log in'}
                  </Button>
                )}
                <Button onClick={() => { setOpen(false); navigate('/book'); }} className="mt-1">
                  {isRTL ? 'احجز زيارتك' : 'Book Visit'}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
