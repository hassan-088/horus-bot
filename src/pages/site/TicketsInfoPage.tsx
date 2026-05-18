import { Link } from 'react-router-dom';
import { Check, Calendar, Ticket as TicketIcon, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import vaseImage from '@/assets/exhibit-vase.jpg';
import { CURRENCY, museumTicketPrices, robotTourPrices } from '@/lib/pricing';

export default function TicketsInfoPage() {
  const { isRTL } = useApp();

  const tiers = [
    {
      name: isRTL ? 'بالغ مصري' : 'Egyptian Adult',
      price: museumTicketPrices.egyptian_adult,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'دخول المتحف للمواطنين المصريين' : 'Museum entry for Egyptian citizens',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
    },
    {
      name: isRTL ? 'طالب مصري' : 'Egyptian Student',
      price: museumTicketPrices.egyptian_student,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'يلزم إبراز بطاقة طالب' : 'Valid student ID required',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
      featured: true,
    },
    {
      name: isRTL ? 'طفل مصري' : 'Egyptian Child',
      price: museumTicketPrices.egyptian_child,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'دخول المتحف للأطفال المصريين' : 'Museum entry for Egyptian children',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
    },
    {
      name: isRTL ? 'بالغ أجنبي' : 'Foreigner Adult',
      price: museumTicketPrices.foreigner_adult,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'دخول المتحف للزوار الأجانب' : 'Museum entry for foreign visitors',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
    },
    {
      name: isRTL ? 'طالب أجنبي' : 'Foreigner Student',
      price: museumTicketPrices.foreigner_student,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'يلزم إبراز بطاقة طالب' : 'Valid student ID required',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
    },
    {
      name: isRTL ? 'طفل أجنبي' : 'Foreigner Child',
      price: museumTicketPrices.foreigner_child,
      unit: isRTL ? 'تذكرة' : 'ticket',
      perks: [
        isRTL ? 'دخول المتحف للأطفال الأجانب' : 'Museum entry for foreign children',
        isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival',
      ],
    },
    {
      name: isRTL ? 'جولة Horus-Bot القياسية' : 'Standard Horus-Bot Tour',
      price: robotTourPrices.standard,
      unit: isRTL ? 'حجز' : 'booking',
      perks: [
        isRTL ? 'إضافة جولة روبوت للحجز' : 'Robot tour add-on per booking',
        isRTL ? 'ليست لكل زائر' : 'Not charged per visitor',
      ],
    },
    {
      name: isRTL ? 'جولة Horus-Bot المخصصة' : 'Personalized Horus-Bot Tour',
      price: robotTourPrices.personalized,
      unit: isRTL ? 'حجز' : 'booking',
      perks: [
        isRTL ? 'إضافة جولة روبوت مخصصة للحجز' : 'Personalized robot tour add-on per booking',
        isRTL ? 'ليست لكل زائر' : 'Not charged per visitor',
      ],
    },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'التذاكر' : 'Tickets'}
        title={isRTL ? 'خطط لزيارتك في دقائق' : 'Plan Your Visit in Minutes'}
        subtitle={isRTL ? 'اختر تذكرتك، حدد موعد زيارتك، خصص جولتك، واستعد لتجربة موجهة مع Horus-Bot.' : 'Choose your ticket, schedule your visit, personalize your tour, and get ready for a guided experience with Horus-Bot.'}
      />

      <div className="mx-auto max-w-5xl px-4 md:px-8 -mt-6 mb-8">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-primary/15">
          <img
            src={vaseImage}
            alt={isRTL ? 'قطعة أثرية مصرية' : 'Egyptian artifact'}
            loading="lazy"
            className="h-32 md:h-40 w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 md:px-8 mb-10 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {isRTL ? 'الأماكن محدودة لكل فترة، وينصح بالحجز المبكر.' : 'Spots are limited per time slot, so booking early is recommended.'}
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-4">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {isRTL ? 'جولة الروبوت تضاف مرة واحدة لكل حجز، وليست لكل زائر.' : 'Robot tour pricing is added once per booking, not per visitor.'}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={`p-7 relative ${t.featured ? 'border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]' : ''}`}>
              {t.featured && (
                <div className="absolute -top-3 start-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {isRTL ? 'الأكثر طلبا' : 'Most popular'}
                </div>
              )}
              <div className="section-label mb-2">{t.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-4xl text-foreground">{t.price} {CURRENCY}</span>
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
                <Link to="/book"><TicketIcon className="h-4 w-4" /> {isRTL ? 'احجز الآن' : 'Book Visit'}</Link>
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center text-sm">
          <Link to="/tickets-mine" className="text-primary hover:underline">
            {isRTL ? 'حجزت بالفعل؟ اعرض تذاكرك' : 'Already booked? View your tickets'}
          </Link>
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
          <div className="section-label mb-4">{isRTL ? 'حجز موثوق' : 'Trusted Booking'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'تفاصيل تطمئنك قبل الحجز' : 'Details That Put You at Ease Before You Book'}</h2>
          <div className="grid gap-5 sm:grid-cols-3 text-start">
            <Card className="p-6">
              <Calendar className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'إلغاء مجاني حتى 24 ساعة قبل الزيارة' : 'Free cancellation up to 24 hours before your visit'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تحديث حالة الحجز بدون حذف التذاكر.' : 'Cancellation updates your booking status without deleting tickets.'}</p>
            </Card>
            <Card className="p-6">
              <TicketIcon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'تذكرة QR فورية على هاتفك' : 'Instant QR ticket sent to your phone'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'جاهزة للمسح عند البوابة.' : 'Ready to scan at the gate.'}</p>
            </Card>
            <Card className="p-6">
              <ShieldCheck className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'الدفع نقدا عند الوصول' : 'Cash payment on arrival'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'أكد حجزك الآن وادفع بالجنيه المصري عند شباك المتحف.' : 'Confirm now and pay in EGP at the museum counter.'}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
