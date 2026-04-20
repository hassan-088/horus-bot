import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function SiteFooter() {
  const { isRTL } = useApp();

  return (
    <footer className="border-t border-border/40 bg-sidebar/60">
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
                ? 'نظام إرشاد متاحف يجمع روبوتاً ذاتي القيادة وتطبيقاً للزائر ومنصة لإدارة الجولات.'
                : 'A museum guidance system combining an autonomous robot, a visitor app, and a tour management backend.'}
            </p>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'استكشف' : 'Explore'}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'من نحن' : 'About'}</Link></li>
              <li><Link to="/experience" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'التجربة' : 'Experience'}</Link></li>
              <li><Link to="/app" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'التطبيق' : 'App'}</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">{isRTL ? 'الأسئلة' : 'FAQ'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'تواصل' : 'Contact'}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@horus-bot.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +20 100 000 0000</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Cairo, Egypt</li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-4">{isRTL ? 'تابعنا' : 'Follow'}</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Horus-Bot. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</a>
            <a href="#" className="hover:text-primary transition-colors">{isRTL ? 'الشروط' : 'Terms'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
