import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Building2, Mail, MapPin, Smartphone, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const exploreLinks = [
  { to: '/about', en: 'About', ar: 'من نحن' },
  { to: '/experience', en: 'Experience', ar: 'التجربة' },
  { to: '/tickets-info', en: 'Tickets', ar: 'التذاكر' },
  { to: '/app', en: 'App', ar: 'التطبيق' },
  { to: '/faq', en: 'FAQ', ar: 'الأسئلة' },
  { to: '/contact', en: 'Contact', ar: 'تواصل' },
];

export function SiteFooter() {
  const { isRTL } = useApp();

  return (
    <footer className="border-t border-border/30 bg-sidebar/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="rounded-[2rem] border border-primary/20 bg-card/70 p-5 shadow-soft backdrop-blur md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr_1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                  <img src="/horus-eye.png" alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif text-2xl leading-tight text-foreground">Horus-Bot</p>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'رفيق زيارة المتحف' : 'Museum visit companion'}</p>
                </div>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {isRTL
                  ? 'يساعد Horus-Bot الزوار على تجهيز زيارة المتحف، إبقاء التذاكر قريبة، ومتابعة الجولة الموجهة داخل التطبيق.'
                  : 'Horus-Bot helps visitors prepare their museum visit, keep tickets close, and continue the guided journey in the app.'}
              </p>
              <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
                <BookOpen className="mb-3 h-5 w-5 text-primary" />
                {isRTL
                  ? 'احجز قبل الوصول، ثم دع Horus-Bot يرشد رحلتك داخل المتحف بهدوء.'
                  : 'Book before arrival, then let Horus-Bot guide your museum journey with calm support.'}
              </div>
            </div>

            <div>
              <h4 className="section-label mb-4">{isRTL ? 'استكشف' : 'Explore'}</h4>
              <nav className="grid grid-cols-2 gap-2 text-sm sm:max-w-sm lg:grid-cols-1">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl border border-primary/10 bg-background/40 px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {isRTL ? link.ar : link.en}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="section-label mb-4">{isRTL ? 'للمتاحف' : 'For Museums'}</h4>
                <div className="space-y-3 rounded-2xl border border-primary/15 bg-background/45 p-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      {isRTL
                        ? 'للمتاحف والمساحات الثقافية التي تريد تجربة جولات أكثر تنظيما.'
                        : 'For museums and cultural spaces building a more guided visitor experience.'}
                    </span>
                  </div>
                  <a className="flex items-center gap-2 hover:text-primary transition-colors" href="mailto:tourguiderobot@gmail.com">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    tourguiderobot@gmail.com
                  </a>
                  <a className="flex items-center gap-2 hover:text-primary transition-colors" href="mailto:museums@horus-bot.com">
                    <Briefcase className="h-4 w-4 shrink-0 text-primary" />
                    museums@horus-bot.com
                  </a>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    Cairo, Egypt
                  </div>
                </div>
              </div>

              <div>
                <h4 className="section-label mb-4">{isRTL ? 'ابدأ الزيارة' : 'Start the Visit'}</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <Button asChild>
                    <Link to="/book">
                      <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/app">
                      <Smartphone className="h-4 w-4" /> {isRTL ? 'التطبيق المرافق' : 'Companion App'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-primary/15 pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Horus-Bot. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">{isRTL ? 'الشروط' : 'Terms'}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
