import { Link } from 'react-router-dom';
import { Mail, Briefcase, MapPin, Ticket, Smartphone } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function SiteFooter() {
  const { isRTL } = useApp();

  return (
    <footer className="border-t border-border/30 bg-sidebar/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <span className="font-serif text-lg font-bold text-primary">H</span>
              </div>
              <span className="font-serif text-lg tracking-wide text-foreground">Horus-Bot</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'طريقة متصلة لتجهيز زيارة المتحف، حفظ التذاكر، ومتابعة الجولة داخل التطبيق.'
                : 'A connected way to prepare your museum visit, save tickets, and continue the tour in the app.'}
            </p>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'استكشف' : 'Explore'}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'من نحن' : 'About'}</Link></li>
              <li><Link to="/experience" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'التجربة' : 'Experience'}</Link></li>
              <li><Link to="/tickets-info" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'التذاكر' : 'Tickets'}</Link></li>
              <li><Link to="/app" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'التطبيق' : 'App'}</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'الأسئلة' : 'FAQ'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'تواصل' : 'Contact'}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a className="hover:text-primary transition-colors" href="mailto:support@horus-bot.com">support@horus-bot.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <a className="hover:text-primary transition-colors" href="mailto:museums@horus-bot.com">museums@horus-bot.com</a>
              </li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Cairo, Egypt</li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'ابدأ الزيارة' : 'Start the Visit'}</h4>
            <div className="space-y-2">
              <Link to="/book" className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/15 transition-colors">
                <Ticket className="h-4 w-4" />
                {isRTL ? 'احجز زيارتك' : 'Book Visit'}
              </Link>
              <Link to="/app" className="flex items-center gap-2 rounded-xl border border-border/60 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Smartphone className="h-4 w-4" />
                {isRTL ? 'كيف يعمل التطبيق' : 'How the app works'}
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {isRTL ? 'الحجز يتم عبر الموقع، واقتران الروبوت والجولة الحية داخل التطبيق.' : 'Book on the website. Robot Pairing and the Live Tour continue inside the app.'}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Horus-Bot. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{isRTL ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
