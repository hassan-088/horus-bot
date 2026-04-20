import { Link } from 'react-router-dom';
import { Check, Calendar, Ticket as TicketIcon, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function TicketsInfoPage() {
  const { isRTL } = useApp();

  const tiers = [
    {
      name: isRTL ? 'بالغ' : 'Adult',
      price: 25,
      perks: [
        isRTL ? 'جولة بقيادة الروبوت (60 د)' : 'Robot-guided tour (60 min)',
        isRTL ? 'وصول كامل للتطبيق والخرائط' : 'Full app and map access',
        isRTL ? 'اختبارات وشارات تفاعلية' : 'Interactive quizzes and badges',
      ],
    },
    {
      name: isRTL ? 'طالب' : 'Student',
      price: 15,
      perks: [
        isRTL ? 'جولة بقيادة الروبوت (60 د)' : 'Robot-guided tour (60 min)',
        isRTL ? 'وصول كامل للتطبيق' : 'Full app access',
        isRTL ? 'تقديم بطاقة جامعية سارية' : 'Valid student ID required',
      ],
      featured: true,
    },
    {
      name: isRTL ? 'مجموعة (حتى 5)' : 'Group (up to 5)',
      price: 80,
      perks: [
        isRTL ? 'روبوت مخصص للمجموعة' : 'Dedicated robot for the group',
        isRTL ? 'مسار قابل للتخصيص (60-90 د)' : 'Customizable route (60–90 min)',
        isRTL ? 'خصم 20% مقارنة بالتذاكر الفردية' : '20% off vs individual tickets',
      ],
    },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'التذاكر' : 'Tickets'}
        title={isRTL ? 'احجز زيارتك' : 'Book your visit'}
        subtitle={isRTL ? 'كل تذكرة تشمل الجولة بقيادة الروبوت ووصولاً كاملاً للتطبيق.' : 'Every ticket includes the robot-guided tour and full app access.'}
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={`p-7 relative ${t.featured ? 'border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]' : ''}`}>
              {t.featured && (
                <div className="absolute -top-3 start-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {isRTL ? 'الأكثر طلباً' : 'Most popular'}
                </div>
              )}
              <div className="section-label mb-2">{t.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-4xl text-foreground">${t.price}</span>
                <span className="text-sm text-muted-foreground">/ {isRTL ? 'تذكرة' : 'ticket'}</span>
              </div>
              <ul className="space-y-3 mb-7">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>{p}</span>
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
          <div className="section-label mb-4">{isRTL ? 'حجز موثوق' : 'Trusted booking'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'تفاصيل تحتاج معرفتها' : 'Details you should know'}</h2>
          <div className="grid gap-5 sm:grid-cols-3 text-start">
            <Card className="p-6">
              <Calendar className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'إلغاء مجاني' : 'Free cancellation'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'حتى 24 ساعة قبل وقت الدخول، يُسترد المبلغ كاملاً.' : 'Up to 24 hours before your slot, full refund.'}</p>
            </Card>
            <Card className="p-6">
              <TicketIcon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'تذكرة رقمية' : 'Digital ticket'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تصل إلى بريدك خلال دقيقة كرمز QR جاهز للمسح.' : 'Sent to your inbox within a minute as a scannable QR code.'}</p>
            </Card>
            <Card className="p-6">
              <ShieldCheck className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'دفع آمن' : 'Secure payment'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مشفّر ومُعالَج عبر مزود متوافق مع PCI-DSS.' : 'Encrypted and processed through a PCI-DSS compliant provider.'}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
