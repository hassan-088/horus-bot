import { Link } from 'react-router-dom';
import { Check, Calendar, Ticket as TicketIcon, ShieldCheck, Clock, Sparkles } from 'lucide-react';
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
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'تجربة متحف موجَّهة لمدة 60 دقيقة' : 'A 60-minute guided museum experience',
        isRTL ? 'وصول كامل للتنقل والخرائط ومحتوى المعروضات داخل التطبيق' : 'Full access to navigation, maps, and exhibit content in the app',
        isRTL ? 'مزايا تفاعلية مفعَّلة طوال الزيارة' : 'Interactive features included during the visit',
      ],
    },
    {
      name: isRTL ? 'طالب' : 'Student',
      price: 15,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'تجربة متحف موجَّهة لمدة 60 دقيقة' : 'A 60-minute guided museum experience',
        isRTL ? 'وصول كامل للتطبيق طوال الزيارة' : 'Full app access during the visit',
        isRTL ? 'تقديم بطاقة جامعية سارية' : 'Valid student ID required',
      ],
      featured: true,
    },
    {
      name: isRTL ? 'مجموعة (حتى 5)' : 'Group (up to 5)',
      price: 80,
      unit: isRTL ? 'مجموعة' : 'group',
      perks: [
        isRTL ? 'تجربة موجَّهة واحدة لمجموعتك بالكامل' : 'One guided experience for your group',
        isRTL ? 'مسار مرن للزيارات المشتركة' : 'Flexible route for shared visits',
        isRTL ? 'قيمة أفضل مقارنة بالحجز الفردي' : 'Better value than individual booking',
      ],
    },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'التذاكر' : 'Tickets'}
        title={isRTL ? 'احجز زيارتك' : 'Book your visit'}
        subtitle={isRTL ? 'كل تذكرة تشمل تجربة كاملة بقيادة الروبوت ووصولاً للتطبيق من البداية للنهاية.' : 'Your ticket includes a full robot-guided experience and app access from start to finish.'}
      />

      <div className="mx-auto max-w-4xl px-4 md:px-8 -mt-6 mb-10 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {isRTL ? 'عدد محدود من الروبوتات لكل فترة — يُفضَّل الحجز المبكر.' : 'Limited robots are available per time slot — early booking is recommended.'}
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-4">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {isRTL ? 'إجراء بسيط. لا حاجة لأي إعداد — كل شيء يعمل بمجرد وصولك.' : 'Simple process. No setup needed — everything works when you arrive.'}
          </p>
        </div>
      </div>

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
                <span className="text-sm text-muted-foreground">/ {t.unit}</span>
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

      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
          <div className="section-label mb-4">{isRTL ? 'حجز موثوق' : 'Trusted booking'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'تفاصيل تطمئنك قبل الحجز' : 'Details that put you at ease before you book'}</h2>
          <div className="grid gap-5 sm:grid-cols-3 text-start">
            <Card className="p-6">
              <Calendar className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'إلغاء مجاني قبل 24 ساعة' : 'Free cancellation up to 24 hours before your visit'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'استرداد كامل دون أي رسوم.' : 'Full refund, no questions asked.'}</p>
            </Card>
            <Card className="p-6">
              <TicketIcon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'تذكرة QR فورية على هاتفك' : 'Instant QR ticket sent to your phone'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تصلك خلال دقيقة جاهزة للمسح عند البوابة.' : 'Arrives within a minute, ready to scan at the gate.'}</p>
            </Card>
            <Card className="p-6">
              <ShieldCheck className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'دفع آمن ومشفَّر' : 'Secure payment with trusted encryption'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تتم معالجة الدفع عبر مزوّد موثوق ومعتمد.' : 'Processed through a trusted, certified provider.'}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
