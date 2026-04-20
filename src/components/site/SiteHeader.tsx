import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-sidebar/80 backdrop-blur-xl">
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
          <Button variant="outline" size="sm" onClick={() => navigate('/home')}>
            {isRTL ? 'افتح التطبيق' : 'Open App'}
          </Button>
          <Button size="sm" onClick={() => navigate('/tickets-info')}>
            {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-sidebar/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                {isRTL ? item.labelAr : item.labelEn}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border/40 pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="justify-start gap-1.5"
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setOpen(false); navigate('/home'); }}>
                {isRTL ? 'افتح التطبيق' : 'Open App'}
              </Button>
              <Button size="sm" onClick={() => { setOpen(false); navigate('/tickets-info'); }}>
                {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
