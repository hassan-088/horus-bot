import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, MapPin, Users, Compass, Building2, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { StepCard } from '@/components/site/StepCard';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';
import gemMapImage from '@/assets/gem-complex-map.png';

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
            <>جولات متاحف ذكية يقودها <span className="text-primary">روبوت ذاتي القيادة</span></>
          ) : (
            <>Smart Museum Tours Guided by an <span className="text-primary">Autonomous Robot</span></>
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
                <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
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

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-8 mb-4 text-center">
        <p className="text-sm text-muted-foreground/90">
          {isRTL
            ? 'مصمَّم للمتاحف والفضاءات الثقافية التي تريد جولات موجَّهة أكثر سلاسة، وضوحاً، وقابليةً للتوسّع.'
            : 'Built for museums and cultural spaces that want guided tours to feel smoother, clearer, and easier to scale.'}
        </p>
      </div>

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="section-label mb-4">{isRTL ? 'نظرة على المنتج' : 'Product Overview'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'تجربة متحف ذكية متكاملة' : 'A Complete Smart Museum Experience'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL
              ? 'يربط حورس-بوت بين الجولة الفعلية في المتحف وتجربة رقمية بسيطة. يقود الروبوت الزوار بين المعروضات، بينما يحتفظ التطبيق المرافق بالتذاكر والخرائط ومحتوى المعروضات والأسئلة وتقدّم الجولة في مكان واحد.'
              : 'Horus-Bot connects the physical museum tour with a simple digital experience. The robot guides visitors between exhibits, while the companion app keeps tickets, maps, exhibit content, questions, and tour progress in one place.'}
          </p>
        </div>
        {/* Visual band */}
        <div className="relative mb-14 overflow-hidden rounded-3xl ring-1 ring-primary/20 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)]">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار يستكشفون قاعات المتحف' : 'Visitors exploring museum galleries'}
            loading="lazy"
            className="h-[280px] md:h-[380px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="font-serif text-lg md:text-2xl text-foreground max-w-2xl">
              {isRTL ? 'رحلة موجَّهة عبر أعظم مجموعات مصر.' : "A guided journey through Egypt's greatest collections."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={gemImage} alt={isRTL ? 'قاعة المتحف' : 'Museum hall'} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Bot className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'الروبوت المرشد' : 'The Robot Guide'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'النجم الأساسي لتجربتك — يقودك بين قاعات المتحف ويتوقّف عند كل محطة ليرويها لك بوضوح.'
                  : 'The star of your experience — leading you through museum spaces and bringing every stop to life with clear narration.'}
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden bg-sidebar/30">
              <img src={gemMapImage} alt={isRTL ? 'خريطة الجولة' : 'Tour map'} loading="lazy" className="h-full w-full object-contain p-4" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Smartphone className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'التطبيق المرافق' : 'The Companion App'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'الرفيق الذي يبقي كل ما تحتاجه في يدك — التذاكر، الخرائط، محتوى المعروضات، والأسئلة.'
                  : 'The helpful companion that keeps everything you need in your hand — tickets, maps, exhibit content, and questions.'}
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={onboardingImage} alt={isRTL ? 'تجربة الزوار' : 'Visitor experience'} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Sparkles className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'تجربة جولة موجَّهة' : 'Guided Tour Experience'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'الروبوت والتطبيق معاً = تجربة متحف واحدة متّصلة، تتكيّف مع وقتك واهتماماتك ولغتك.'
                  : 'Robot + app = one connected museum experience that adapts to your time, interests, and language.'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="section-label mb-4">{isRTL ? 'القدرات الأساسية' : 'Core Capabilities'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {isRTL ? 'كل ما تحتاجه جولة متحف موجَّهة' : 'Everything a Guided Museum Visit Needs'}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Bot}
              title={isRTL ? 'إرشاد وتنقّل بالروبوت' : 'Robot Navigation & Guidance'}
              description={isRTL ? 'يقود الروبوت الزوار من معروضة إلى أخرى بإيقاع مريح، ممّا يقلّل التشتّت ويمنع تفويت أي محطة.' : 'The robot leads visitors from one exhibit to the next at a comfortable pace, reducing confusion and missed stops.'}
            />
            <FeatureCard
              icon={Smartphone}
              title={isRTL ? 'تطبيق جوال تفاعلي' : 'Interactive Mobile App'}
              description={isRTL ? 'التذاكر، التنقّل، محتوى المعروضات، الأسئلة، ودعم الجولة المباشر — كل ذلك في تطبيق واحد بسيط.' : 'Tickets, navigation, exhibit content, questions, and live tour support all in one simple app.'}
            />
            <FeatureCard
              icon={MapPin}
              title={isRTL ? 'تنقّل داخلي في الوقت الفعلي' : 'Real-Time Indoor Navigation'}
              description={isRTL ? 'يرى الزوار أين هم، أين الروبوت، وما هي المحطة التالية أثناء الجولة.' : 'Visitors can see where they are, where the robot is, and what comes next during the tour.'}
            />
            <FeatureCard
              icon={Languages}
              title={isRTL ? 'دعم متعدد اللغات' : 'Multilingual Support'}
              description={isRTL ? 'يمكن للزوار متابعة الجولة بالعربية، العامية المصرية، الإنجليزية، ولغات أخرى مدعومة وفقاً لإعداد المتحف.' : 'Visitors can follow the tour in Arabic, Egyptian Arabic, English, and other supported languages depending on the museum setup.'}
            />
            <FeatureCard
              icon={Route}
              title={isRTL ? 'مسارات جولات شخصية' : 'Personalized Tour Paths'}
              description={isRTL ? 'تُبنى المسارات حول وقت الزائر واهتماماته، فتشعر كل جولة بأنها أكثر ملاءمة وتركيزاً.' : 'Routes are shaped around visitor time and interests, making each tour feel more relevant and focused.'}
            />
            <FeatureCard
              icon={Users}
              title={isRTL ? 'تفاعل الزوار' : 'Visitor Engagement'}
              description={isRTL ? 'اختبارات قصيرة، إنجازات، لحظات تفاعل، ونقاط تصوير تُبقي الزوار منخرطين وتساعدهم على تذكّر التجربة.' : 'Quizzes, achievements, interactive moments, and photo points help visitors stay engaged and remember the experience.'}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="section-label mb-4">{isRTL ? 'كيف تعمل' : 'How It Works'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'من الحجز إلى الجولة في أربع خطوات بسيطة' : 'From Booking to Tour in Four Simple Steps'}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step={1}
            title={isRTL ? 'احجز عبر الإنترنت' : 'Book Online'}
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
            description={isRTL ? 'تكون تذكرة جولة الروبوت جاهزة في التطبيق، ويتم الاقتران داخل المتحف عبر مسح رمز QR على الروبوت.' : 'Your robot tour ticket will be ready in the app. Pairing happens at the museum by scanning the physical robot QR.'}
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

      {/* SYSTEM STATUS */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <div className="section-label mb-4 text-primary">{isRTL ? 'حالة المنتج' : 'System Status'}</div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {isRTL ? 'منتج جاهز للعرض، لا مجرّد فكرة' : 'A Product Ready to Demonstrate, Not Just a Concept'}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { en: 'Functional prototype completed', ar: 'نموذج أوّلي عامل مكتمل' },
            { en: 'Robot and app experience connected', ar: 'تجربة الروبوت والتطبيق متصلة بالكامل' },
            { en: 'Guided museum journey demonstrated', ar: 'تم عرض رحلة متحف موجَّهة كاملة' },
            { en: 'Built for real museum environments', ar: 'مبنيٌّ للعمل في بيئات المتاحف الحقيقية' },
          ].map((item) => (
            <div key={item.en} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-5">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90 leading-relaxed">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground italic">
          {isRTL
            ? 'صورة النموذج الأوّلي قريباً — يُستخدم للتنقّل واختبار النظام في بيئات المتحف الحقيقية.'
            : 'Prototype photo coming soon — used for navigation and system testing in real museum conditions.'}
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'استمتع بمستقبل جولات المتاحف' : 'Experience the Future of Museum Tours'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'احجز زيارتك واستمتع بجولة موجَّهة يقودها روبوت ذاتي القيادة، يدعمها تطبيق مرافق ذكي من اللحظة التي تصل فيها.'
            : 'Book your visit and enjoy a guided tour led by an autonomous robot, supported by a smart companion app from the moment you arrive.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><Compass className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
