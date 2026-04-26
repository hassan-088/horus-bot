import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, MapPin, Users, Compass, Building2, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
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
            ? 'يعمل الروبوت المرشد والتطبيق المرافق معاً لمساعدة الزوار على التنقل داخل المتحف، فهم المعروضات، والاستمتاع بجولة موجَّهة في الوقت الفعلي.'
            : 'A robot guide and companion app work together to help visitors move through the museum, understand exhibits, and enjoy a guided tour in real time.'
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
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-7">
            <Bot className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'الروبوت المرشد' : 'The Robot Guide'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يقود الزوار بين قاعات المتحف، يتنقّل بين المعروضات، ويقدّم شرحاً واضحاً عند كل محطة.'
                : 'Leads visitors through museum spaces, moves between exhibits, and delivers clear narration at each stop.'}
            </p>
          </Card>
          <Card className="p-7">
            <Smartphone className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'التطبيق المرافق' : 'The Companion App'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يعمل جنباً إلى جنب مع الروبوت لتتمكّن من متابعة مسارك، استكشاف المعروضات، طرح الأسئلة، والبقاء على المسار.'
                : 'Works alongside the robot so visitors can follow their route, explore exhibits, ask questions, and stay on track.'}
            </p>
          </Card>
          <Card className="p-7">
            <Sparkles className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'تجربة جولة موجَّهة' : 'Guided Tour Experience'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'تجربة متكاملة من البداية للنهاية، تتكيّف مع وقت كل زائر واهتماماته ولغته المفضّلة.'
                : "Creates a smooth end-to-end journey that adapts to each visitor's time, interests, and preferred language."}
            </p>
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
            description={isRTL ? 'يرحّب بك الروبوت المخصَّص لك، ويُحمِّل التطبيق مسارك المختار.' : 'Your assigned robot welcomes you, and the app loads your selected route.'}
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
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'ابدأ جولتك الموجَّهة في المتحف مع حورس-بوت' : 'Start Your Guided Museum Tour with Horus-Bot'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'احجز زيارتك، اتصل بالتجربة فوراً، واستمتع بجولة متحف موجَّهة من اللحظة التي تصل فيها.'
            : 'Book your visit, connect instantly, and enjoy a guided museum experience from the moment you arrive.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><Compass className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
