import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, Users, Compass, Building2, ShieldCheck, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';

export default function HomePage() {
  const { isRTL } = useApp();

  return (
    <>
      {/* HERO */}
      <SectionHero
        className="min-h-[calc(100vh-4rem)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-32 after:bg-gradient-to-t after:from-background after:to-transparent"
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
            : 'A quiet, cinematic museum visit guided by Horus-Bot, with your ticket, route, and memories kept close in the app.'
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
        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-primary/25 bg-card/65 p-3 shadow-soft backdrop-blur-xl md:mt-10 md:p-4">
          <div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
            {[
              { icon: Ticket, en: 'Arrive ready', ar: 'صل وأنت جاهز', detailEn: 'Your ticket waits with the story', detailAr: 'تذكرتك تنتظر مع القصة' },
              { icon: Bot, en: 'Meet Horus-Bot', ar: 'قابل Horus-Bot', detailEn: 'Let the robot guide the way', detailAr: 'دع الروبوت يقود الطريق' },
              { icon: Sparkles, en: 'Walk through history', ar: 'امشِ عبر التاريخ', detailEn: 'Every stop feels alive', detailAr: 'كل محطة تنبض بالحياة' },
            ].map((item, index) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/45 p-3 text-start ring-1 ring-primary/15 transition-all duration-300 hover:bg-background/60 hover:shadow-soft md:block md:p-4">
                <item.icon className="h-5 w-5 shrink-0 text-primary md:mb-3" />
                <div>
                  <p className="font-serif text-sm text-foreground md:text-base">{isRTL ? item.ar : item.en}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground md:mt-1">{isRTL ? item.detailAr : item.detailEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionHero>

      <section className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-14">
        <div className="rounded-[2rem] border border-primary/20 bg-card/65 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {[
              { icon: Ticket, en: 'Prepare before arrival', ar: 'استعد قبل الوصول' },
              { icon: Bot, en: 'Meet Horus-Bot inside the museum', ar: 'قابل Horus-Bot داخل المتحف' },
              { icon: Camera, en: 'Keep the memory after the tour', ar: 'احتفظ بالذكرى بعد الجولة' },
            ].map((item, index) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/35 px-4 py-3 ring-1 ring-primary/10">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
              </div>
            )).flatMap((node, index) => (
              index < 2
                ? [node, <div key={`line-${index}`} className="hidden h-px w-8 bg-primary/30 md:block" />]
                : [node]
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {isRTL
              ? 'يحوّل Horus-Bot مسار المتحف إلى قصة موجَّهة، بينما يبقي التطبيق الأساسيات قريبة منك.'
              : 'Horus-Bot turns the museum route into a guided story, while the app keeps the essentials close.'}
          </p>
        </div>
      </section>

      {/* EXPERIENCE PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-24">
        <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)]">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار يستكشفون قاعات المتحف' : 'Visitors exploring museum galleries'}
            loading="lazy"
            className="h-[430px] md:h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,hsl(var(--background)/0.38)_62%,hsl(var(--background)/0.86)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <div className="section-label mb-3">{isRTL ? 'لمحة من الزيارة' : 'A Glimpse of the Visit'}</div>
              <p className="font-serif text-2xl md:text-5xl text-foreground max-w-2xl leading-tight">
                {isRTL ? 'حين يتحرك المرشد معك، تصبح القاعة قصة.' : 'When the guide moves with you, the gallery becomes a story.'}
              </p>
            </div>
            <div className="self-end grid gap-2.5 md:gap-3">
              {[
                { icon: Bot, en: 'Horus-Bot leads the pace', ar: 'Horus-Bot يقود الإيقاع' },
                { icon: Languages, en: 'The story meets your language', ar: 'القصة تصل بلغتك' },
                { icon: Camera, en: 'Moments stay with you after the tour', ar: 'لحظات تبقى معك بعد الجولة' },
              ].map((item) => (
                <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/70 px-3 py-2.5 text-sm shadow-soft backdrop-blur md:px-4 md:py-3">
                  <item.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{isRTL ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEELING */}
      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 py-14 md:grid-cols-[0.82fr_1.18fr] md:py-24">
          <div>
            <div className="section-label mb-4">{isRTL ? 'كيف تبدو الزيارة' : 'What the Visit Feels Like'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
              {isRTL ? 'طريقة أهدأ وأذكى لاكتشاف المتحف' : 'A quieter, smarter way to explore'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'بدلاً من البحث عن الطريق أو قراءة كل شيء وحدك، تتحرك مع مرشد روبوتي يجعل القاعات والمعروضات أقرب وأسهل تذكراً.'
                : 'Instead of searching for the next room or reading alone, you move with a robot guide that makes galleries and artifacts easier to follow and remember.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              { icon: Bot, titleEn: 'Guided by movement', titleAr: 'إرشاد يتحرك معك', descEn: 'Horus-Bot moves with you from stop to stop, keeping the visit calm and easy to follow.', descAr: 'يتحرك Horus-Bot معك من محطة إلى أخرى، فتظل الزيارة هادئة وسهلة المتابعة.' },
              { icon: Smartphone, titleEn: 'Kept close in the app', titleAr: 'رحلتك قريبة في التطبيق', descEn: 'Your phone keeps the ticket, route, questions, and tour memories within reach.', descAr: 'يبقي هاتفك التذكرة والمسار والأسئلة وذكريات الجولة في متناولك.' },
              { icon: Languages, titleEn: 'Told in your language', titleAr: 'قصة بلغتك', descEn: 'Narration and questions feel easier when the story meets visitors in the language they understand.', descAr: 'تصبح القصة أوضح عندما يصل السرد والأسئلة باللغة التي يفهمها الزائر.' },
              { icon: Route, titleEn: 'Shaped around your pace', titleAr: 'جولة على إيقاعك', descEn: 'Routes keep the visit focused, whether you want highlights or a more personal path.', descAr: 'تحافظ المسارات على تركيز الزيارة، سواء أردت أبرز المحطات أو مساراً أكثر تخصيصاً.' },
            ].map((item) => (
              <div key={item.titleEn} className="rounded-2xl border border-primary/15 bg-card/65 p-4 shadow-soft backdrop-blur transition-colors hover:border-primary/30 md:p-5">
                <div className="flex items-start gap-3 md:block">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary md:mb-3 md:mt-0" />
                  <div>
                    <h3 className="font-serif text-base text-foreground md:text-lg">{isRTL ? item.titleAr : item.titleEn}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:mt-2">{isRTL ? item.descAr : item.descEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MUSEUM VALUE */}
      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 py-14 md:grid-cols-[0.95fr_1.05fr] md:py-24">
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
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              { icon: Users, en: 'A calmer path for visitor groups', ar: 'مسار أهدأ لمجموعات الزوار' },
              { icon: Building2, en: 'Designed for large museum spaces', ar: 'مصمم لمساحات المتاحف الكبيرة' },
              { icon: ShieldCheck, en: 'Consistent guided storytelling', ar: 'سرد موجّه ومتسق' },
              { icon: Languages, en: 'Welcoming for multilingual guests', ar: 'مرحب بالزوار متعددي اللغات' },
            ].map((item) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-card/60 p-4 shadow-soft md:block md:p-5">
                <item.icon className="h-5 w-5 shrink-0 text-primary md:mb-3" />
                <p className="text-sm text-foreground/90 leading-snug">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 py-14 md:py-24">
        <div className="rounded-[2rem] border border-primary/25 bg-gradient-to-br from-card/90 via-card/75 to-primary/10 p-6 text-center shadow-[0_22px_70px_-35px_hsl(var(--primary)/0.55)] backdrop-blur md:p-12">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'هل أنت مستعد للمشي عبر التاريخ مع Horus-Bot؟' : 'Ready to walk through history with Horus-Bot?'}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-9 max-w-2xl mx-auto">
            {isRTL
              ? 'اختر موعدك ودع جولة أكثر هدوءاً وذكاءً تتفتح حولك.'
              : 'Choose your visit time and let a quieter, smarter museum journey unfold around you.'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'ابدأ الزيارة' : 'Start the Visit'}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
