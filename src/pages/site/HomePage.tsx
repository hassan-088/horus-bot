import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Smartphone, Languages, Route, Ticket, Users, Compass, Building2, ShieldCheck, CheckCircle2, QrCode, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { StepCard } from '@/components/site/StepCard';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';

export default function HomePage() {
  const { isRTL } = useApp();

  return (
    <>
      {/* HERO */}
      <SectionHero
        className="min-h-[calc(100vh-4rem)]"
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة المتحف المصري الكبير' : 'Grand Egyptian Museum hall'}
        label={isRTL ? 'حورس-بوت • جولة متحف مستقبلية' : 'Horus-Bot • Future Museum Tour'}
        title={
          isRTL ? (
            <>ادخل التاريخ مع <span className="text-primary">Horus-Bot</span></>
          ) : (
            <>Step into history with <span className="text-primary">Horus-Bot</span></>
          )
        }
        subtitle={
          isRTL
            ? 'جولة متحف هادئة ومبهرة يقودها روبوت ذاتي الحركة، بينما تبقى تذكرتك ومسارك وذكرياتك قريبة في التطبيق.'
            : 'A quiet, cinematic museum visit guided by an autonomous robot, with your ticket, route, and memories kept close in the app.'
        }
        actions={
          <>
            <Button asChild size="lg" className="shadow-[0_18px_45px_-18px_hsl(var(--primary)/0.75)]">
              <Link to="/book">
                <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/experience">
                <Compass className="h-4 w-4" /> {isRTL ? 'استكشف التجربة' : 'Explore Experience'}
              </Link>
            </Button>
          </>
        }
      >
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-primary/25 bg-card/70 p-4 shadow-soft backdrop-blur-xl md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {[
              { icon: Ticket, en: 'Book your visit', ar: 'احجز زيارتك', detailEn: 'Arrive ready for the story', detailAr: 'صل وأنت جاهز للقصة' },
              { icon: Bot, en: 'Meet Horus-Bot', ar: 'قابل Horus-Bot', detailEn: 'Let the robot guide the way', detailAr: 'دع الروبوت يقود الطريق' },
              { icon: Sparkles, en: 'Walk through history', ar: 'امشِ عبر التاريخ', detailEn: 'Every stop feels alive', detailAr: 'كل محطة تنبض بالحياة' },
            ].map((item, index) => (
              <div key={item.en} className="rounded-2xl bg-background/45 p-4 text-start ring-1 ring-primary/15 transition-colors hover:bg-background/60">
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <p className="font-serif text-base text-foreground">{isRTL ? item.ar : item.en}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{isRTL ? item.detailAr : item.detailEn}</p>
              </div>
            )).flatMap((node, index) => (
              index < 2
                ? [node, <ArrowRight key={`arrow-${index}`} className="hidden h-5 w-5 text-primary/70 rtl:rotate-180 md:block" />]
                : [node]
            ))}
          </div>
        </div>
      </SectionHero>

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-28">
        {/* Visual band */}
        <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)]">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار يستكشفون قاعات المتحف' : 'Visitors exploring museum galleries'}
            loading="lazy"
            className="h-[360px] md:h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-transparent to-background/60" />
          <div className="absolute inset-x-0 bottom-0 grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <div className="section-label mb-3">{isRTL ? 'لمحة عن التجربة' : 'Experience Preview'}</div>
              <p className="font-serif text-2xl md:text-5xl text-foreground max-w-2xl leading-tight">
                {isRTL ? 'زيارة تتحرك معك من أول تذكرة إلى آخر ذكرى.' : 'A visit that moves with you from first ticket to final memory.'}
              </p>
            </div>
            <div className="self-end space-y-3">
              {[
                { en: 'Book ahead and arrive ready', ar: 'احجز مسبقاً وصل جاهزاً' },
                { en: 'Keep your ticket and route close', ar: 'احتفظ بتذكرتك ومسارك قريبين' },
                { en: 'Let Horus-Bot lead the story', ar: 'دع Horus-Bot يقود القصة' },
              ].map((item) => (
                <div key={item.en} className="flex items-center gap-3 rounded-full bg-background/70 px-4 py-2 text-sm ring-1 ring-border/50 backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>{isRTL ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-gradient-to-b from-sidebar/20 via-sidebar/10 to-transparent">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 py-20 md:grid-cols-[0.82fr_1.18fr] md:py-28">
          <div>
            <div className="section-label mb-4">{isRTL ? 'لماذا تبدو مختلفة' : 'Why It Feels Different'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
              {isRTL ? 'طريقة أهدأ وأذكى لاكتشاف المتحف' : 'A quieter, smarter way to explore'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'بدلاً من البحث عن الطريق أو قراءة كل شيء وحدك، تتحرك مع مرشد روبوتي يجعل القاعات والمعروضات أقرب وأسهل تذكراً.'
                : 'Instead of searching for the next room or reading alone, you move with a robot guide that makes galleries and artifacts easier to follow and remember.'}
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {[
              { icon: Bot, titleEn: 'Guided by movement', titleAr: 'إرشاد يتحرك معك', descEn: 'Horus-Bot moves with you from stop to stop, keeping the visit calm and easy to follow.', descAr: 'يتحرك Horus-Bot معك من محطة إلى أخرى، فتظل الزيارة هادئة وسهلة المتابعة.' },
              { icon: Smartphone, titleEn: 'Kept close in the app', titleAr: 'رحلتك قريبة في التطبيق', descEn: 'Your phone keeps the ticket, route, questions, and tour memories within reach.', descAr: 'يبقي هاتفك التذكرة والمسار والأسئلة وذكريات الجولة في متناولك.' },
              { icon: Languages, titleEn: 'Told in your language', titleAr: 'قصة بلغتك', descEn: 'Narration and questions feel easier when the story meets visitors in the language they understand.', descAr: 'تصبح القصة أوضح عندما يصل السرد والأسئلة باللغة التي يفهمها الزائر.' },
              { icon: Route, titleEn: 'Shaped around your pace', titleAr: 'جولة على إيقاعك', descEn: 'Routes keep the visit focused, whether you want highlights or a more personal path.', descAr: 'تحافظ المسارات على تركيز الزيارة، سواء أردت أبرز المحطات أو مساراً أكثر تخصيصاً.' },
            ].map((item) => (
              <div key={item.titleEn} className="border-s border-primary/25 ps-5">
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg text-foreground">{isRTL ? item.titleAr : item.titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
          <div className="section-label mb-4">{isRTL ? 'رحلة الزائر' : 'Visitor Journey'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'من التذكرة إلى لحظة الدهشة' : 'From ticket to wonder'}
          </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/experience">
              {isRTL ? 'عرض الرحلة كاملة' : 'View full journey'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          <StepCard
            step={1}
            title={isRTL ? 'احجز زيارتك' : 'Book your visit'}
            description={isRTL ? 'اختر موعدك واستعد لتجربة متحف مختلفة.' : 'Choose your time and get ready for a different kind of museum visit.'}
          />
          <StepCard
            step={2}
            title={isRTL ? 'صل وأنت جاهز' : 'Arrive ready'}
            description={isRTL ? 'تذكرتك ومسارك قريبان منك منذ لحظة الوصول.' : 'Your ticket and route stay close from the moment you arrive.'}
          />
          <StepCard
            step={3}
            title={isRTL ? 'قابل Horus-Bot' : 'Meet Horus-Bot'}
            description={isRTL ? 'عند المتحف، يقترن التطبيق بالروبوت الفعلي لتبدأ الجولة.' : 'At the museum, the app pairs with the physical robot so the tour can begin.'}
          />
          <StepCard
            step={4}
            title={isRTL ? 'امشِ عبر التاريخ' : 'Walk through history'}
            description={isRTL ? 'يتحوّل التنقل بين المعروضات إلى قصة حية تتحرك معك.' : 'Moving between exhibits becomes a living story that moves with you.'}
          />
        </div>
      </section>

      {/* FOR MUSEUMS */}
      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-28">
          <div>
            <div className="section-label mb-4">{isRTL ? 'ثقة المتحف' : 'Museum Confidence'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
              {isRTL ? 'تجربة أنيقة للزائر، ومنظمة للمتحف' : 'Elegant for visitors, organized for museums'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يحافظ Horus-Bot على الزيارة واضحة وسلسة، من دون أن يفقد المتحف طابعه الهادئ أو وقاره.'
                : 'Horus-Bot keeps the visit clear and smooth without taking away the calm, dignified feeling of the museum.'}
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              { icon: Users, en: 'A calmer path for visitor groups', ar: 'مسار أهدأ لمجموعات الزوار' },
              { icon: Building2, en: 'Designed for large museum spaces', ar: 'مصمم لمساحات المتاحف الكبيرة' },
              { icon: CheckCircle2, en: 'Consistent guided storytelling', ar: 'سرد موجّه ومتسق' },
              { icon: Languages, en: 'Welcoming for multilingual guests', ar: 'مرحب بالزوار متعددي اللغات' },
              { icon: Route, en: 'Clearer flow between galleries', ar: 'انسياب أوضح بين القاعات' },
            ].map((item) => (
              <div key={item.en} className="border-t border-primary/25 pt-4">
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <p className="text-sm text-foreground/90 leading-snug">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT STATUS */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-20">
        <div className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-card via-card/80 to-primary/10 p-6 shadow-[0_22px_70px_-35px_hsl(var(--primary)/0.5)] md:p-10">
          <div className="mb-8 max-w-2xl">
            <div className="section-label mb-4 text-primary">{isRTL ? 'من التذكرة إلى الذكرى' : 'From Ticket to Memory'}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              {isRTL ? 'كل جزء من الزيارة يبقى قريباً وواضحاً' : 'Every part of the visit stays close and clear'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
          {[
            { en: 'Book the visit before you arrive', ar: 'احجز الزيارة قبل الوصول' },
            { en: 'Keep your Museum Entry Ticket ready', ar: 'احتفظ بتذكرة دخول المتحف جاهزة' },
            { en: 'Meet Horus-Bot inside the museum', ar: 'قابل Horus-Bot داخل المتحف' },
            { en: 'Carry the route, questions, and memories in the app', ar: 'احمل المسار والأسئلة والذكريات في التطبيق' },
          ].map((item) => (
            <div key={item.en} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-5">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90 leading-relaxed">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {isRTL
              ? 'التفاصيل العملية موجودة عند الحاجة، لكن التجربة نفسها تبقى بسيطة: احجز، وصل، واتبع القصة.'
              : 'The practical details are there when needed, but the experience stays simple: book, arrive, and follow the story.'}
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'هل أنت مستعد للمشي عبر التاريخ مع Horus-Bot؟' : 'Ready to walk through history with Horus-Bot?'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'احجز زيارتك واستمتع بجولة موجَّهة يقودها روبوت ذاتي القيادة، يدعمها تطبيق مرافق ذكي من اللحظة التي تصل فيها.'
            : 'Book your visit and let a quieter, smarter museum journey unfold around you.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/experience"><Compass className="h-4 w-4" /> {isRTL ? 'استكشف التجربة' : 'Explore Experience'}</Link></Button>
        </div>
      </section>
    </>
  );
}
