import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, Users, Compass, Building2, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة المتحف المصري الكبير' : 'Grand Egyptian Museum hall'}
        label={isRTL ? 'حورس-بوت • تجربة إرشاد المتاحف' : 'Horus-Bot • Museum Guidance Experience'}
        title={
          isRTL ? (
            <>حورس-بوت يحوّل زيارة المتحف إلى <span className="text-primary">جولة روبوتية ذكية</span></>
          ) : (
            <>Horus-Bot Turns Museum Visits into <span className="text-primary">Guided Robot Tours</span></>
          )
        }
        subtitle={
          isRTL
            ? 'يقود حورس-بوت جولتك في المتحف في الوقت الفعلي، يرشدك بين المعروضات بينما يحتفظ التطبيق المرافق بكل ما تحتاجه في يدك — التذاكر، الخرائط، المحتوى، والتفاعل.'
            : 'Horus-Bot leads your museum tour in real time, guiding you between exhibits while the companion app keeps everything you need in your hand — tickets, maps, content, and interaction.'
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/book">
                <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app">
                <Compass className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}
              </Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto grid max-w-5xl gap-3 px-4 md:grid-cols-3 md:px-8 -mt-8 mb-8">
        {[
          { icon: Bot, en: 'Autonomous robot guidance', ar: 'إرشاد روبوتي ذاتي' },
          { icon: QrCode, en: 'Website booking, app handoff', ar: 'حجز عبر الموقع وانتقال للتطبيق' },
          { icon: ShieldCheck, en: 'Pay at Counter ticket flow', ar: 'تذاكر بالدفع عند الشباك' },
        ].map((item) => (
          <div key={item.en} className="rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-soft backdrop-blur">
            <item.icon className="mb-3 h-5 w-5 text-primary" />
            <p className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</p>
          </div>
        ))}
      </section>

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        {/* Visual band */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-primary/20 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)]">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار يستكشفون قاعات المتحف' : 'Visitors exploring museum galleries'}
            loading="lazy"
            className="h-[280px] md:h-[380px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div>
              <div className="section-label mb-3">{isRTL ? 'نظرة على المنتج' : 'Product Overview'}</div>
              <p className="font-serif text-xl md:text-4xl text-foreground max-w-2xl">
                {isRTL ? 'جولة متحف متصلة بين الروبوت، التطبيق، والتذكرة.' : 'One connected museum journey across robot, app, and ticket.'}
              </p>
            </div>
            <p className="self-end text-sm leading-relaxed text-muted-foreground md:text-base">
              {isRTL
                ? 'يقود الروبوت الزوار بين المعروضات، بينما يحتفظ التطبيق بالتذاكر والخرائط ومحتوى الجولة في مكان واحد.'
                : 'The robot leads visitors between exhibits while the app keeps tickets, maps, and tour content in one calm place.'}
            </p>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 py-20 md:grid-cols-[0.85fr_1.15fr] md:py-28">
          <div>
            <div className="section-label mb-4">{isRTL ? 'القيمة الأساسية' : 'Product Value'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
              {isRTL ? 'إرشاد حيّ بدون تعقيد للزائر أو المتحف' : 'Live guidance without complexity for visitors or museums'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يركّز حورس-بوت على ما يهم في الزيارة: طريق واضح، شرح مناسب، وتذاكر محفوظة في حساب واحد.'
                : 'Horus-Bot focuses the visit around what matters: a clear route, useful storytelling, and tickets saved in one account.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Bot, titleEn: 'Robot-guided movement', titleAr: 'تنقّل يقوده الروبوت', descEn: 'Visitors move from stop to stop with a clear pace and fewer missed highlights.', descAr: 'ينتقل الزوار بين المحطات بإيقاع واضح وارتباك أقل.' },
              { icon: Smartphone, titleEn: 'Companion app continuity', titleAr: 'استمرارية عبر التطبيق', descEn: 'Tickets, Robot Pairing, Live Tour, maps, and questions stay connected.', descAr: 'التذاكر، اقتران الروبوت، الجولة الحية، الخرائط، والأسئلة تبقى مترابطة.' },
              { icon: Languages, titleEn: 'Multilingual visit support', titleAr: 'دعم لغات متعددة', descEn: 'The experience supports different visitor languages and narration preferences.', descAr: 'تدعم التجربة لغات الزوار وتفضيلات السرد المختلفة.' },
              { icon: Route, titleEn: 'Routes shaped by the visit', titleAr: 'مسارات تناسب الزيارة', descEn: 'Standard and personalized routes keep the tour focused on time and interests.', descAr: 'المسارات القياسية والمخصصة تحافظ على تركيز الجولة حسب الوقت والاهتمامات.' },
            ].map((item) => (
              <div key={item.titleEn} className="border-b border-border/60 pb-5">
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg text-foreground">{isRTL ? item.titleAr : item.titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <div className="section-label mb-4">{isRTL ? 'رحلة الزائر' : 'Visitor Journey'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'ابدأ من الموقع، وأكمل الجولة داخل التطبيق' : 'Start on the website, continue inside the app'}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          <StepCard
            step={1}
            title={isRTL ? 'احجز عبر الإنترنت' : 'Book Visit'}
            description={isRTL ? 'اختر وقت الزيارة، حدّد مدة الجولة، واستلم تذكرتك.' : 'Choose your visit time, select your tour length, and receive your ticket.'}
          />
          <StepCard
            step={2}
            title={isRTL ? 'امسح عند المدخل' : 'Scan at the Entrance'}
            description={isRTL ? 'امسح تذكرة QR عند البوابة لتفعيل زيارتك.' : 'Scan your QR ticket at the gate to activate your visit.'}
          />
          <StepCard
            step={3}
            title={isRTL ? 'قابل روبوتك المرشد' : 'Meet Your Robot Guide'}
            description={isRTL ? 'تكون تذكرة جولة الروبوت جاهزة في التطبيق، ويتم الاقتران داخل المتحف عبر مسح رمز QR على الروبوت.' : 'Your Horus-Bot Tour Ticket will be ready in the app. Robot Pairing happens at the museum by scanning the physical robot QR.'}
          />
          <StepCard
            step={4}
            title={isRTL ? 'استمتع بالجولة الموجَّهة' : 'Enjoy the Guided Tour'}
            description={isRTL ? 'يقودك الروبوت بين المعروضات بينما يدعمك التطبيق بالخرائط ومحتوى المعروضات والتفاعل المباشر.' : 'The robot leads the way while the app supports you with maps, exhibit content, and live interaction.'}
          />
        </div>
      </section>

      {/* FOR MUSEUMS */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="section-label mb-4">{isRTL ? 'للمؤسسات' : 'For Institutions'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
              {isRTL ? 'للمتاحف والفضاءات الثقافية' : 'For Museums & Cultural Spaces'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يساعد حورس-بوت المتاحف على تقديم تجارب موجَّهة على نطاق واسع، خدمة عدد أكبر من الزوار بضغط أقل على الفريق، وخلق رحلة أكثر سلاسة عبر المساحات الكبيرة.'
                : 'Horus-Bot helps museums deliver guided experiences at scale, serve more visitors with less pressure on staff, and create a smoother journey across large spaces.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Users, en: 'Reduce pressure on human guides', ar: 'تخفيف الضغط على المرشدين البشريين' },
              { icon: Building2, en: 'Serve more visitors at the same time', ar: 'خدمة عدد أكبر من الزوار في الوقت ذاته' },
              { icon: CheckCircle2, en: 'Deliver consistent tour quality', ar: 'تقديم جودة جولة ثابتة' },
              { icon: Languages, en: 'Support multilingual audiences with ease', ar: 'دعم الجمهور متعدد اللغات بسهولة' },
              { icon: Route, en: 'Improve visitor flow across galleries', ar: 'تحسين انسياب الزوار بين القاعات' },
            ].map((item) => (
              <Card key={item.en} className="p-5">
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <p className="text-sm text-foreground/90 leading-snug">{isRTL ? item.ar : item.en}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT STATUS */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-20">
        <div className="rounded-3xl border border-primary/20 bg-card/70 p-6 md:p-10">
          <div className="mb-8 max-w-2xl">
            <div className="section-label mb-4 text-primary">{isRTL ? 'ثقة تشغيلية' : 'Operational Confidence'}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              {isRTL ? 'نظام زيارة متصل من الحجز حتى الجولة' : 'A connected visit system from booking to tour'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
          {[
            { en: 'Website booking and account management are connected', ar: 'الحجز وإدارة الحساب متصلان عبر الموقع' },
            { en: 'Tickets sync with the mobile app account', ar: 'التذاكر متزامنة مع حساب تطبيق الهاتف' },
            { en: 'Museum Entry Ticket and Horus-Bot Tour Ticket stay separate', ar: 'تذكرة الدخول وجولة الروبوت واضحتان ومنفصلتان' },
            { en: 'Robot Pairing starts later in the mobile app', ar: 'اقتران الروبوت يبدأ لاحقا داخل تطبيق الهاتف' },
          ].map((item) => (
            <div key={item.en} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-5">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90 leading-relaxed">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {isRTL
              ? 'استخدم الموقع لتجهيز زيارتك، ثم افتح التطبيق داخل المتحف للتذاكر والجولة والاقتران بالروبوت.'
              : 'Use the website to prepare your visit, then use the mobile app at the museum for tickets, Robot Pairing, and the Live Tour.'}
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'استمتع بمستقبل جولات المتاحف' : 'Experience the Future of Museum Tours'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'احجز زيارتك واستمتع بجولة موجَّهة يقودها روبوت ذاتي القيادة، يدعمها تطبيق مرافق ذكي من اللحظة التي تصل فيها.'
            : 'Book a visit and enjoy a guided tour led by an autonomous robot, supported by a smart companion app from the moment you arrive.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><Compass className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
