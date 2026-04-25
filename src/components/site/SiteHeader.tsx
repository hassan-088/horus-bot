import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
  { to: '/about', labelEn: 'About', labelAr: 'من نحن' },
  { to: '/experience', labelEn: 'Experience', labelAr: 'التجربة' },
  { to: '/tickets-info', labelEn: 'Tickets', labelAr: 'التذاكر' },
  { to: '/app', labelEn: 'App', labelAr: 'التطبيق' },
  { to: '/faq', labelEn: 'FAQ', labelAr: 'الأسئلة' },
  { to: '/contact', labelEn: 'Contact', labelAr: 'تواصل' },
];

export function SiteHeader() {
  const { language, setLanguage, isRTL } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-sidebar/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <span className="font-serif text-lg font-bold text-primary">H</span>
          </div>
          <span className="font-serif text-lg tracking-wide text-foreground">Horus-Bot</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
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
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {isRTL ? item.labelAr : item.labelEn}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="gap-1.5"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'EN' : 'ع'}
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/tickets-mine')} className="gap-1.5">
              <TicketIcon className="h-4 w-4" />
              {isRTL ? 'تذاكري' : 'My tickets'}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => navigate('/home')}>
            {isRTL ? 'افتح التطبيق' : 'Open App'}
          </Button>
          <Button size="sm" onClick={() => navigate('/tickets-info')}>
            {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY — full viewport, above everything */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Panel */}
          <div className="absolute inset-x-0 top-0 max-h-screen overflow-y-auto bg-sidebar border-b border-border/40 shadow-2xl animate-slide-in-right">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <span className="font-serif text-lg font-bold text-primary">H</span>
                </div>
                <span className="font-serif text-lg tracking-wide text-foreground">Horus-Bot</span>
              </Link>
              <button
                type="button"
                className="p-2 text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-3 text-base font-medium',
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )
                  }
                >
                  {isRTL ? item.labelAr : item.labelEn}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="justify-start gap-1.5"
                >
                  <Globe className="h-4 w-4" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
                <Button variant="outline" onClick={() => { setOpen(false); navigate('/home'); }}>
                  {isRTL ? 'افتح التطبيق' : 'Open App'}
                </Button>
                <Button onClick={() => { setOpen(false); navigate('/tickets-info'); }}>
                  {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
