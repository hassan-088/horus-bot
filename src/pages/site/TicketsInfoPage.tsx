import { Link } from 'react-router-dom';
import { Check, Calendar, Ticket as TicketIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function TicketsInfoPage() {
  const { isRTL } = useApp();

  const tiers = [
    { name: isRTL ? 'بالغ' : 'Adult', price: 25, perks: [isRTL ? 'دخول كامل' : 'Full access', isRTL ? 'دليل التطبيق' : 'App guide', isRTL ? 'تفاعل الروبوت' : 'Robot interaction'] },
    { name: isRTL ? 'طالب' : 'Student', price: 15, perks: [isRTL ? 'دخول كامل' : 'Full access', isRTL ? 'دليل التطبيق' : 'App guide', isRTL ? 'بهوية ساري' : 'Valid ID required'], featured: true },
    { name: isRTL ? 'مجموعة' : 'Group', price: 80, perks: [isRTL ? 'حتى 5 أشخاص' : 'Up to 5 people', isRTL ? 'مرشد مخصص' : 'Dedicated guide', isRTL ? 'خصم 20%' : '20% discount'] },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'التذاكر' : 'Tickets'}
        title={isRTL ? 'احجز زيارتك' : 'Book your visit'}
        subtitle={isRTL ? 'اختر التذكرة والوقت الذي يناسبك.' : 'Choose your ticket and the time that suits you.'}
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={`p-7 relative ${t.featured ? 'border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]' : ''}`}>
              {t.featured && (
                <div className="absolute -top-3 start-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {isRTL ? 'الأكثر شعبية' : 'Most popular'}
                </div>
              )}
              <div className="section-label mb-2">{t.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-4xl text-foreground">${t.price}</span>
                <span className="text-sm text-muted-foreground">/ {isRTL ? 'تذكرة' : 'ticket'}</span>
              </div>
              <ul className="space-y-3 mb-7">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant={t.featured ? 'default' : 'outline'}>
                <Link to="/tickets"><TicketIcon className="h-4 w-4" /> {isRTL ? 'احجز الآن' : 'Book now'}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
          <div className="section-label mb-4">{isRTL ? 'مرن وآمن' : 'Flexible & secure'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'كل ما تحتاج معرفته' : 'All you need to know'}</h2>
          <div className="grid gap-5 sm:grid-cols-3 text-start">
            <Card className="p-6">
              <Calendar className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'إلغاء مجاني' : 'Free cancellation'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'حتى 24 ساعة قبل الزيارة.' : 'Up to 24 hours before visit.'}</p>
            </Card>
            <Card className="p-6">
              <TicketIcon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'تذكرة رقمية' : 'Digital ticket'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'يصلك على البريد فوراً.' : 'Sent to your inbox instantly.'}</p>
            </Card>
            <Card className="p-6">
              <Check className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'دفع آمن' : 'Secure payment'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مشفّر بالكامل.' : 'Fully encrypted.'}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
