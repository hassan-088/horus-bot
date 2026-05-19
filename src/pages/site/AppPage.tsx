import { Link } from 'react-router-dom';
import { Bot, Camera, MessageSquare, Route, Sparkles, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';

const ar = {
  heroLabel: 'تجربة التطبيق',
  heroTitle: 'يبقى المتحف قريبا طوال الزيارة',
  heroSubtitle: 'احتفظ بالتذاكر والمسارات وإرشاد Horus-Bot والذكريات جاهزة قبل تجربة المتحف وأثناءها وبعدها.',
  beforeLabel: 'قبل الوصول',
  beforeTitle: 'تصل وأنت مطمئن',
  beforeBody: 'تظل تذاكرك وتفاصيل زيارتك قريبة، حتى تبدأ اليوم من لحظة هادئة بدلا من البحث عن كل شيء عند الباب.',
  beforeOne: 'تذاكر الزيارة جاهزة',
  beforeTwo: 'المسار واضح قبل الدخول',
  beforeThree: 'تفاصيل الزيارة في مكان واحد',
  insideLabel: 'داخل المتحف',
  insideTitle: 'يتحرك الإرشاد معك',
  insideBody: 'عند وصولك، يساعدك التطبيق على استخدام تذاكرك، ثم الاتصال بـ Horus-Bot ومتابعة Live Tour وطرح الأسئلة بينما تتقدم في القاعات.',
  pairRobot: 'الاتصال بـ Horus-Bot',
  liveTour: 'Live Tour',
  questions: 'أسئلة أثناء الزيارة',
  afterLabel: 'بعد الزيارة',
  afterTitle: 'تبقى الزيارة معك',
  afterBody: 'بعد الجولة، تبقى الذكريات وتفاصيل الزيارة محفوظة، لتعود إلى ما شاهدته وتشارك لحظات المتحف بهدوء.',
  memories: 'ذكريات الزيارة',
  history: 'سجل الزيارات',
  moments: 'لحظات محفوظة',
  ctaTitle: 'هل أنت مستعد للمشي عبر التاريخ؟',
  ctaBody: 'ابدأ بالحجز، ثم دع Horus-Bot يجعل الزيارة أوضح وأكثر هدوءا داخل المتحف.',
  bookVisit: 'احجز زيارتك',
};

export default function AppPage() {
  const { isRTL } = useApp();

  return (
    <>
      <SectionHero
        label={isRTL ? ar.heroLabel : 'Companion Experience'}
        title={isRTL ? ar.heroTitle : 'The museum stays close throughout the visit.'}
        subtitle={
          isRTL
            ? ar.heroSubtitle
            : 'Keep tickets, routes, Horus-Bot guidance, and memories ready before, during, and after the museum experience.'
        }
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة متحف هادئة' : 'Quiet museum hall'}
        bleedBehindNav
        className="after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:from-background after:to-transparent"
      />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-8 -mt-8 md:px-8 md:pb-10">
        <div className="rounded-[2rem] border border-primary/20 bg-card/80 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {[
              { icon: Ticket, en: 'Before arrival', ar: ar.beforeLabel },
              { icon: Bot, en: 'Inside the museum', ar: ar.insideLabel },
              { icon: Camera, en: 'After the visit', ar: ar.afterLabel },
            ].map((item, index) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/45 px-4 py-3 ring-1 ring-primary/10">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
              </div>
            )).flatMap((node, index) => (
              index < 2
                ? [node, <div key={`line-${index}`} className="hidden h-px w-8 bg-primary/30 md:block" />]
                : [node]
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[0.82fr_1.18fr] md:px-8 md:py-16">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.beforeLabel : 'Before Arrival'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.beforeTitle : 'You arrive already settled.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.beforeBody
              : 'Your tickets and visit details stay close, so the day begins calmly instead of with searching at the gate.'}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card/70 p-5 shadow-soft backdrop-blur md:p-7">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background/30" />
          <div className="relative grid gap-3 sm:grid-cols-3">
            {[
              { icon: Ticket, en: 'Tickets ready', ar: ar.beforeOne },
              { icon: Route, en: 'Route prepared', ar: ar.beforeTwo },
              { icon: Sparkles, en: 'Visit details together', ar: ar.beforeThree },
            ].map((item) => (
              <div key={item.en} className="rounded-2xl bg-background/55 p-4 ring-1 ring-primary/15">
                <item.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="text-sm font-medium leading-snug text-foreground">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.08fr_0.92fr] md:px-8 md:py-20">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)] ring-1 ring-primary/20">
            <img
              src={onboardingImage}
              alt={isRTL ? 'زوار داخل قاعة متحف' : 'Visitors inside a museum gallery'}
              loading="lazy"
              className="h-full min-h-[360px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <div className="grid gap-2 sm:grid-cols-3">
                {[
              { icon: Bot, en: 'Connect to Horus-Bot', ar: ar.pairRobot },
                  { icon: Route, en: 'Live Tour', ar: ar.liveTour },
                  { icon: MessageSquare, en: 'Questions during the visit', ar: ar.questions },
                ].map((item) => (
                  <div key={item.en} className="rounded-2xl border border-primary/20 bg-card/75 p-3 shadow-soft backdrop-blur">
                    <item.icon className="mb-2 h-4 w-4 text-primary" />
                    <p className="text-sm font-medium leading-snug">{isRTL ? item.ar : item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="self-center">
            <div className="section-label mb-4">{isRTL ? ar.insideLabel : 'Inside The Museum'}</div>
            <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {isRTL ? ar.insideTitle : 'Guidance moves with you.'}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {isRTL
                ? ar.insideBody
                : 'When you arrive, the app helps with your tickets, Horus-Bot connection, the Live Tour, and questions as you move through the galleries.'}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.afterLabel : 'After The Visit'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.afterTitle : 'The visit stays with you.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.afterBody
              : 'After the tour, memories and visit details remain close, so the museum does not disappear when the day ends.'}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Sparkles, en: 'Visit memories', ar: ar.memories },
            { icon: Route, en: 'Visit history', ar: ar.history },
            { icon: Camera, en: 'Captured moments', ar: ar.moments },
          ].map((item) => (
            <div key={item.en} className="rounded-[2rem] border border-primary/15 bg-card/70 p-5 shadow-soft backdrop-blur">
              <item.icon className="mb-5 h-5 w-5 text-primary" />
              <p className="font-serif text-lg leading-snug text-foreground">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center md:px-8 md:py-20">
        <div className="rounded-[2rem] border border-primary/25 bg-gradient-to-br from-card/90 via-card/75 to-primary/10 p-6 shadow-[0_22px_70px_-35px_hsl(var(--primary)/0.55)] backdrop-blur md:p-12">
          <h2 className="mb-6 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.ctaTitle : 'Ready to walk through history?'}
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {isRTL
              ? ar.ctaBody
              : 'Start with a booking, then let Horus-Bot make the museum visit clearer and calmer inside the galleries.'}
          </p>
          <Button asChild size="lg">
            <Link to="/book">
              <Ticket className="h-4 w-4" /> {isRTL ? ar.bookVisit : 'Book Visit'}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
