import { Link } from 'react-router-dom';
import { Bot, Sparkles, Languages, Route, Ticket, MapPin, Smartphone, Award, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { StepCard } from '@/components/site/StepCard';
import { useApp } from '@/contexts/AppContext';

export default function HomePage() {
  const { isRTL } = useApp();

  return (
    <>
      {/* HERO */}
      <SectionHero
        label={isRTL ? 'متاحف مصر • تجربة سينمائية' : 'Egyptian Museums • Cinematic Experience'}
        title={
          isRTL ? (
            <>اكتشف المتاحف <span className="text-primary">بذكاء اصطناعي</span> وروبوت</>
          ) : (
            <>Experience museums with <span className="text-primary">AI & robotics</span></>
          )
        }
        subtitle={
          isRTL
            ? 'مرشدك الشخصي للمتحف يجمع بين روبوت ذكي وتطبيق تفاعلي لجولة لا تُنسى.'
            : 'Your personal museum companion — a smart robot guide and interactive app for an unforgettable tour.'
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/tickets-info">
                <Ticket className="h-4 w-4" /> {isRTL ? 'احجز التذاكر' : 'Book Tickets'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app">
                <Download className="h-4 w-4" /> {isRTL ? 'حمّل التطبيق' : 'Download App'}
              </Link>
            </Button>
          </>
        }
      />

      {/* WHAT IS IT */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="section-label mb-4">{isRTL ? 'ما هي التجربة؟' : 'What is this experience?'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'روبوت + تطبيق + جولة ذكية' : 'Robot + App + Smart Tour'}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Bot} title={isRTL ? 'مرشد روبوت ذكي' : 'Smart Robot Guide'} description={isRTL ? 'حورس-بوت يرافقك في جولتك ويشرح المعروضات.' : 'Horus-Bot walks with you and narrates exhibits.'} />
          <FeatureCard icon={Smartphone} title={isRTL ? 'تطبيق تفاعلي' : 'Interactive App'} description={isRTL ? 'كل ما تحتاجه في جيبك: خرائط، شروحات، اختبارات.' : 'Everything in your pocket: maps, audio, quizzes.'} />
          <FeatureCard icon={Languages} title={isRTL ? 'دعم متعدد اللغات' : 'Multilingual Support'} description={isRTL ? 'العربية والإنجليزية بدعم RTL كامل.' : 'English and Arabic with full RTL support.'} />
          <FeatureCard icon={Route} title={isRTL ? 'جولات مخصصة' : 'Personalized Tours'} description={isRTL ? 'مسارات تناسب اهتماماتك ووقتك.' : 'Routes tailored to your interests and time.'} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="section-label mb-4">{isRTL ? 'كيف تعمل؟' : 'How it works'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {isRTL ? 'أربع خطوات بسيطة' : 'Four simple steps'}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard step={1} title={isRTL ? 'احجز عبر الإنترنت' : 'Book online'} description={isRTL ? 'اختر التاريخ والوقت المناسبين لك.' : 'Pick the date and time that suits you.'} />
            <StepCard step={2} title={isRTL ? 'الوصول للمتحف' : 'Arrive at the museum'} description={isRTL ? 'اعرض تذكرتك الرقمية عند المدخل.' : 'Show your digital ticket at the entrance.'} />
            <StepCard step={3} title={isRTL ? 'افتح التطبيق' : 'Use app + robot'} description={isRTL ? 'افتح التطبيق وقابل حورس-بوت.' : 'Open the app and meet Horus-Bot.'} />
            <StepCard step={4} title={isRTL ? 'استمتع بالجولة' : 'Enjoy the tour'} description={isRTL ? 'استمتع بتجربة موجهة لا تُنسى.' : 'Enjoy a guided, unforgettable experience.'} />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="section-label mb-4">{isRTL ? 'أبرز المميزات' : 'Experience Highlights'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'كل ما يجعل زيارتك مميزة' : 'What makes your visit special'}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Bot} title={isRTL ? 'دليل بالذكاء الاصطناعي' : 'AI Robot Guide'} description={isRTL ? 'محادثة طبيعية مع مرشدك الآلي.' : 'Natural conversations with your robotic guide.'} />
          <FeatureCard icon={Sparkles} title={isRTL ? 'معروضات تفاعلية' : 'Interactive Exhibits'} description={isRTL ? 'اكتشف القصص خلف كل قطعة.' : 'Discover the stories behind every artifact.'} />
          <FeatureCard icon={MapPin} title={isRTL ? 'تنقل مباشر' : 'Live Navigation'} description={isRTL ? 'لا تضيع أبداً داخل المتحف.' : 'Never get lost inside the museum.'} />
          <FeatureCard icon={Award} title={isRTL ? 'اختبارات ومكافآت' : 'Quizzes & Rewards'} description={isRTL ? 'تعلّم واكسب الإنجازات.' : 'Learn and unlock achievements.'} />
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="section-label mb-4">{isRTL ? 'التطبيق' : 'The App'}</div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
                {isRTL ? 'مساعدك الشخصي في المتحف' : 'Your personal museum assistant'}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {isRTL
                  ? 'كل ما تحتاجه قبل وأثناء وبعد زيارتك، في مكان واحد. خرائط، شروحات صوتية، محادثة مع حورس-بوت، والمزيد.'
                  : 'Everything you need before, during and after your visit. Maps, audio guides, chat with Horus-Bot, and more.'}
              </p>
              <Button asChild size="lg">
                <Link to="/app">
                  {isRTL ? 'تعرّف على التطبيق' : 'Explore the App'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Card className="aspect-[9/16] max-w-xs mx-auto bg-gradient-to-br from-card via-card to-primary/5 p-6 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-4 ring-1 ring-primary/30">
                  <Smartphone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-2">Horus-Bot App</h3>
                <p className="text-xs text-muted-foreground">{isRTL ? 'معاينة الواجهة' : 'App preview'}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'هل أنت مستعد للزيارة؟' : 'Ready to visit?'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          {isRTL ? 'احجز تذكرتك اليوم وحمّل التطبيق لتجربة كاملة.' : 'Book your ticket today and download the app for the full experience.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز التذاكر' : 'Book Tickets'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><Download className="h-4 w-4" /> {isRTL ? 'حمّل التطبيق' : 'Download App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
