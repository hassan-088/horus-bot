import { Link } from 'react-router-dom';
import { Mail, Briefcase, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
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
                ? 'طريقة جديدة لاستكشاف المتاحف — موجَّهة، شخصية، وسلِسة من البداية إلى النهاية.'
                : 'A new way to experience museums — guided, personalized, and effortless from start to finish.'}
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
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@horus-bot.com</li>
              <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> museums@horus-bot.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Cairo, Egypt</li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'تابعنا' : 'Follow'}</h4>
            <div className="flex gap-3">
              <span aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground">
                <Instagram className="h-4 w-4" />
              </span>
              <span aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground">
                <Twitter className="h-4 w-4" />
              </span>
              <span aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground">
                <Facebook className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {isRTL ? 'قنواتنا الرسمية قريباً.' : 'Official channels coming soon.'}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Horus-Bot. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-primary transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">{isRTL ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
