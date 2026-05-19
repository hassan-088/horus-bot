import { Link } from 'react-router-dom';
import { Bot, Camera, Languages, MessageSquare, Route, Sparkles, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';
import rosettaImage from '@/assets/exhibit-rosetta.jpg';
import maskImage from '@/assets/exhibit-golden-mask.jpg';

const ar = {
  label: 'التجربة',
  heroTitle: 'يبدو التاريخ مختلفا عندما يتحرك بجانبك',
  heroSubtitle: 'زيارة هادئة ومليئة بالدهشة، تبدأ من لحظة الدخول وتبقى في الذاكرة بعد نهاية الجولة.',
  arrivalLabel: 'الوصول',
  arrivalTitle: 'تبدأ الزيارة بلحظة فضول',
  arrivalBody: 'تدخل القاعة وأمامك مساحة واسعة من الضوء والقصص. تذكرتك جاهزة، والخطوة التالية واضحة، فيبقى انتباهك على المكان لا على التفاصيل الصغيرة.',
  arrivalNoteOne: 'Museum Entry Ticket جاهزة',
  arrivalNoteTwo: 'بداية هادئة للزيارة',
  meetLabel: 'لقاء Horus-Bot',
  meetTitle: 'مرشد يتحرك مع الإيقاع',
  meetBody: 'بدلا من متابعة اللوحات وحدك، يتحرك Horus-Bot معك بين المحطات. يفتح الطريق للقصة، ويترك لك مساحة السؤال والتوقف والنظر.',
  meetOne: 'الاتصال بـ Horus-Bot عند الوصول',
  meetTwo: 'Live Tour داخل القاعات',
  meetThree: 'أسئلة في لحظة الفضول',
  walkLabel: 'المشي عبر التاريخ',
  walkTitle: 'كل محطة تصبح أقرب',
  walkBody: 'تتحرك الجولة بإيقاع مريح. تسمع القصة باللغة التي تناسبك، وتكتشف التفاصيل التي تجعل القطع تبدو أقل بعدا وأكثر حياة.',
  pace: 'إيقاع مريح',
  language: 'قصة بلغتك',
  discovery: 'اكتشافات صغيرة',
  afterLabel: 'بعد الزيارة',
  afterTitle: 'لا تنتهي القصة عند الخروج',
  afterBody: 'تبقى الصور واللحظات وتفاصيل المسار معك، كأن الزيارة تترك أثرا هادئا يمكن الرجوع إليه بعد انتهاء اليوم.',
  memoryOne: 'ذكريات محفوظة',
  memoryTwo: 'لحظات قابلة للمشاركة',
  memoryThree: 'زيارة تبقى قريبة',
  ctaTitle: 'هل أنت مستعد للمشي عبر التاريخ؟',
  ctaBody: 'اختر وقت زيارتك، ودع Horus-Bot يحول الطريق داخل المتحف إلى قصة.',
  bookVisit: 'احجز زيارتك',
};

export default function ExperiencePage() {
  const { isRTL } = useApp();

  return (
    <>
      <SectionHero
        label={isRTL ? ar.label : 'Experience'}
        title={isRTL ? ar.heroTitle : 'History feels different when it moves beside you.'}
        subtitle={
          isRTL
            ? ar.heroSubtitle
            : 'A calm, wondrous museum visit that begins at arrival and stays with you after the tour ends.'
        }
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة متحف مضاءة بهدوء' : 'Quietly lit museum hall'}
        className="min-h-[calc(78vh-4rem)] md:min-h-[calc(88vh-4rem)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-32 after:bg-gradient-to-t after:from-background after:to-transparent"
      />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 -mt-10 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-primary/20 bg-card/75 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
            {[
              { icon: Ticket, en: 'Arrival', ar: ar.arrivalLabel },
              { icon: Bot, en: 'Meet Horus-Bot', ar: ar.meetLabel },
              { icon: Route, en: 'Walk Through History', ar: ar.walkLabel },
              { icon: Camera, en: 'After The Visit', ar: ar.afterLabel },
            ].map((item, index) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/45 px-4 py-3 ring-1 ring-primary/10">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
              </div>
            )).flatMap((node, index) => (
              index < 3
                ? [node, <div key={`line-${index}`} className="hidden h-px w-8 bg-primary/30 md:block" />]
                : [node]
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:py-20">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.arrivalLabel : 'Arrival'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.arrivalTitle : 'The visit begins with curiosity.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.arrivalBody
              : 'You enter the hall with light, space, and stories ahead. Your ticket is ready, the next step is clear, and your attention stays on the place.'}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)] ring-1 ring-primary/20">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار يدخلون قاعة متحف' : 'Visitors entering a museum gallery'}
            loading="lazy"
            className="h-[430px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-3 p-5 sm:grid-cols-2 md:p-7">
            {[ar.arrivalNoteOne, ar.arrivalNoteTwo].map((note, index) => (
              <div key={note} className="rounded-2xl border border-primary/20 bg-card/75 px-4 py-3 text-sm shadow-soft backdrop-blur">
                {isRTL ? note : index === 0 ? 'Museum Entry Ticket ready' : 'A quiet beginning'}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card/70 p-5 shadow-soft backdrop-blur md:p-7">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background/30" />
            <div className="relative">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Bot, en: 'Connect to Horus-Bot at arrival', ar: ar.meetOne },
                  { icon: Route, en: 'Live Tour in the galleries', ar: ar.meetTwo },
                  { icon: MessageSquare, en: 'Questions when curiosity appears', ar: ar.meetThree },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/55 p-4 ring-1 ring-primary/10">
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="self-center">
            <div className="section-label mb-4">{isRTL ? ar.meetLabel : 'Meeting Horus-Bot'}</div>
            <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {isRTL ? ar.meetTitle : 'A guide that moves with the moment.'}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {isRTL
                ? ar.meetBody
                : 'Instead of following the room alone, Horus-Bot moves with you between stops. It opens the path for the story and leaves room to pause, ask, and look.'}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[0.88fr_1.12fr] md:px-8 md:py-20">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.walkLabel : 'Walking Through History'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.walkTitle : 'Every stop comes closer.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.walkBody
              : 'The tour moves at a comfortable pace. You hear the story in a language that feels natural, and small discoveries make each artifact feel less distant and more alive.'}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)]">
          <img
            src={rosettaImage}
            alt={isRTL ? 'تفاصيل أثرية داخل المتحف' : 'Museum artifact detail'}
            loading="lazy"
            className="h-[430px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-3 p-5 sm:grid-cols-3 md:p-7">
            {[
              { icon: Route, en: 'Comfortable pace', ar: ar.pace },
              { icon: Languages, en: 'A story in your language', ar: ar.language },
              { icon: Sparkles, en: 'Small discoveries', ar: ar.discovery },
            ].map((item) => (
              <div key={item.en} className="rounded-2xl border border-primary/20 bg-card/75 p-3 shadow-soft backdrop-blur">
                <item.icon className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-medium leading-snug">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.08fr_0.92fr] md:px-8 md:py-20">
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)]">
            <img
              src={maskImage}
              alt={isRTL ? 'قطعة أثرية ذهبية' : 'Golden museum artifact'}
              loading="lazy"
              className="h-[410px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
          </div>
          <div className="self-center">
            <div className="section-label mb-4">{isRTL ? ar.afterLabel : 'After The Visit'}</div>
            <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {isRTL ? ar.afterTitle : 'The story does not end at the exit.'}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {isRTL
                ? ar.afterBody
                : 'Photos, moments, and route details stay with you, like a quiet trace of the visit you can return to after the day is over.'}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[ar.memoryOne, ar.memoryTwo, ar.memoryThree].map((item, index) => (
                <div key={item} className="rounded-2xl border border-primary/15 bg-card/65 p-4 text-sm shadow-soft backdrop-blur">
                  {isRTL ? item : index === 0 ? 'Saved memories' : index === 1 ? 'Shareable moments' : 'A visit kept close'}
                </div>
              ))}
            </div>
          </div>
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
              : 'Choose your visit time, then let Horus-Bot turn the path through the museum into a story.'}
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
