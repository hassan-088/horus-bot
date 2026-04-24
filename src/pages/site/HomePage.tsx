import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, MapPin, Users, ArrowRight, Compass, PlayCircle, Building2, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
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
            <>جولات متاحف ذكية بقيادة <span className="text-primary">روبوت ذاتي القيادة</span></>
          ) : (
            <>Smart museum tours powered by an <span className="text-primary">autonomous robot</span></>
          )
        }
        subtitle={
          isRTL
            ? 'يجمع حورس-بوت بين روبوت إرشاد ذاتي القيادة وتطبيق مرافق لمساعدة الزوار على التنقل داخل المتحف، استكشاف المعروضات، ومتابعة جولة موجهة في الوقت الفعلي.'
            : 'Horus-Bot combines an autonomous robot guide with a companion app to help visitors navigate museums, explore exhibits, and follow a guided tour in real time.'
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/tickets-info">
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
            ? 'مصمَّم للمتاحف والفضاءات الثقافية لتقديم جولات موجهة على نطاق واسع.'
            : 'Designed for museums and cultural spaces to deliver guided tours at scale.'}
        </p>
      </div>

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="section-label mb-4">{isRTL ? 'نظرة على المنتج' : 'Product Overview'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'منظومة متحف ذكية متكاملة' : 'A Complete Smart Museum System'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL
              ? 'حورس-بوت يجمع بين جزأين متصلين يعملان معاً بسلاسة: روبوت إرشاد ذاتي القيادة يقود الزيارة بين المعروضات، وتطبيق مرافق يدعم التنقل ومحتوى المعروضات والتفاعل أثناء الجولة.'
              : 'Horus-Bot brings together two connected parts that work as one: an autonomous robot guide that leads the visit between exhibits, and a companion app that supports navigation, exhibit information, and interaction during the visit.'}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-7">
            <Bot className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'الروبوت المرشد' : 'The Robot Guide'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يقود الزوار عبر القاعات، يتحرك بأمان بين المعروضات، ويقدّم شروحات واضحة ومنظَّمة لكل قطعة.'
                : 'Guides visitors through museum spaces, moves safely between exhibits, and delivers clear, structured narration.'}
            </p>
          </Card>
          <Card className="p-7">
            <Smartphone className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'التطبيق المرافق' : 'The Companion App'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يعمل جنباً إلى جنب مع الروبوت ويتحوّل إلى وضع دعم الجولة المباشر بمجرد دخولك المتحف.'
                : 'Works alongside the robot and switches into live tour support the moment you arrive at the museum.'}
            </p>
          </Card>
          <Card className="p-7">
            <Sparkles className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'تجربة جولة موجهة' : 'Guided Tour Experience'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'تجربة متماسكة من البداية للنهاية، تتكيّف مع وقتك واهتماماتك ولغتك المفضّلة.'
                : 'A coherent end-to-end experience that adapts to your time, your interests, and your preferred language.'}
            </p>
          </Card>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="section-label mb-4">{isRTL ? 'القدرات الأساسية' : 'Core Capabilities'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {isRTL ? 'كل ما تحتاجه لجولة متحف ناجحة' : 'Everything a guided museum visit needs'}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Bot}
              title={isRTL ? 'إرشاد آلي بالروبوت' : 'Robot Navigation & Guidance'}
              description={isRTL ? 'يتحرّك الروبوت بأمان عبر القاعات بسرعة مشي مريحة، ويقود مجموعتك من معروضة إلى أخرى دون انتظار.' : 'The robot moves safely through the galleries at a comfortable walking pace and leads your group from one exhibit to the next without waiting.'}
            />
            <FeatureCard
              icon={Smartphone}
              title={isRTL ? 'تطبيق جوال موحَّد' : 'Interactive Mobile App'}
              description={isRTL ? 'تطبيق واحد للتذاكر، التنقل، محتوى المعروضات، ودعم الجولة المباشر.' : 'A unified app for tickets, navigation, exhibit content, and live tour support.'}
            />
            <FeatureCard
              icon={MapPin}
              title={isRTL ? 'ملاحة داخلية لحظية' : 'Real-Time Indoor Navigation'}
              description={isRTL ? 'اعرف دائماً أين أنت، أين الروبوت، وما هي المحطة التالية على خريطة المتحف.' : 'Always know where you are, where the robot is, and what your next stop looks like on the museum map.'}
            />
            <FeatureCard
              icon={Languages}
              title={isRTL ? 'دعم متعدد اللغات (EN/AR)' : 'Multilingual Support (EN/AR)'}
              description={isRTL ? 'اتبع الجولة كاملةً بالعربية أو الإنجليزية، صوتاً ونصاً، عبر الروبوت والتطبيق معاً.' : 'Follow the entire tour in English or Arabic, audio and text, through both the robot and the app.'}
            />
            <FeatureCard
              icon={Route}
              title={isRTL ? 'مسارات مخصَّصة' : 'Personalized Tour Paths'}
              description={isRTL ? 'مسارات مبنية حول وقتك واهتماماتك، حتى تشعر بأن الجولة موجَّهة لك لا عامة.' : 'Routes built around your time and interests, so the tour feels guided for you, not generic.'}
            />
            <FeatureCard
              icon={Users}
              title={isRTL ? 'تفاعل الزوار' : 'Visitor Engagement'}
              description={isRTL ? 'أدوات تفاعل مدمجة من اختبارات وإنجازات ونقاط تصوير موجَّهة، تجعل الزيارة أكثر رسوخاً في الذاكرة.' : 'Built-in engagement tools — quizzes, achievements, and guided photo points — that make visits more memorable.'}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="section-label mb-4">{isRTL ? 'كيف تعمل' : 'How It Works'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'من الحجز إلى الجولة في أربع خطوات' : 'From booking to tour in four steps'}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step={1}
            title={isRTL ? 'احجز عبر الإنترنت' : 'Book online'}
            description={isRTL ? 'اختر التاريخ والمدة، وأكمل الدفع، واستلم تذكرة QR على بريدك الإلكتروني.' : 'Pick a date and tour length, complete payment, and receive a QR ticket by email.'}
          />
          <StepCard
            step={2}
            title={isRTL ? 'امسح عند المدخل' : 'Scan at the entrance'}
            description={isRTL ? 'امسح رمز QR عند البوابة فيتم التحقق من تذكرتك وربطك بالتجربة.' : 'Scan the QR at the gate; your ticket is verified and your visit is connected to the experience.'}
          />
          <StepCard
            step={3}
            title={isRTL ? 'الروبوت يستقبلك' : 'The robot welcomes you'}
            description={isRTL ? 'يستقبلك الروبوت، ويقوم التطبيق بتحميل المسار الذي اخترته على خريطة المتحف.' : 'The robot greets you and the app loads your selected route on the museum map.'}
          />
          <StepCard
            step={4}
            title={isRTL ? 'اتبع الجولة الموجَّهة' : 'Follow the guided tour'}
            description={isRTL ? 'يقودك الروبوت بين المعروضات مع شرح حي، بينما يوفّر التطبيق محتوى إضافياً وتفاعلاً طوال الزيارة.' : 'The robot guides you between exhibits with live narration, while the app provides additional content and interaction during the visit.'}
          />
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="section-label mb-4">{isRTL ? 'التطبيق' : 'The App'}</div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
                {isRTL ? 'تجربة متحفك كاملةً في تطبيق واحد' : 'Your entire museum experience, in one place'}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {isRTL
                  ? 'تنقَّل، استكشف المعروضات، اطرح الأسئلة، وتابع تقدّمك — كل ذلك من تطبيق واحد بسيط.'
                  : 'Navigate, explore exhibits, ask questions, and stay on track — all through one simple app.'}
              </p>
              <p className="text-sm text-primary/90 mb-8">
                {isRTL ? 'يعمل قبل زيارتك وأثناءها وبعدها.' : 'Works before, during, and after your visit.'}
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

      {/* FOR MUSEUMS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="section-label mb-4">{isRTL ? 'للمؤسسات' : 'For Institutions'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'للمتاحف والمؤسسات الثقافية' : 'For Museums & Cultural Institutions'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL
              ? 'يساعد حورس-بوت المتاحف على تقديم جولات موجَّهة بشكل أكثر اتساقاً، خدمة عدد أكبر من الزوار، وتحسين رحلة الزائر داخل المساحات الكبيرة.'
              : 'Horus-Bot helps museums deliver guided experiences more consistently, support more visitors, and improve the visitor journey across large spaces.'}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Users, en: 'Reduce dependency on human guides', ar: 'تقليل الاعتماد على المرشدين البشريين' },
            { icon: Building2, en: 'Serve more visitors without staff pressure', ar: 'استيعاب عدد أكبر من الزوار دون ضغط على الفريق' },
            { icon: CheckCircle2, en: 'Deliver more consistent guided experiences', ar: 'تقديم جولات موجَّهة بجودة ثابتة' },
            { icon: Languages, en: 'Support multilingual audiences easily', ar: 'دعم الجمهور متعدد اللغات بسهولة' },
            { icon: Route, en: 'Improve visitor flow across galleries', ar: 'تحسين انسياب الزوار بين القاعات' },
          ].map((item) => (
            <Card key={item.en} className="p-5">
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <p className="text-sm text-foreground/90 leading-snug">{isRTL ? item.ar : item.en}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SYSTEM STATUS */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-5xl px-4 md:px-8 py-20">
          <div className="text-center mb-12">
            <div className="section-label mb-4 text-primary">{isRTL ? 'حالة النظام' : 'System Status'}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              {isRTL ? 'منتج جاهز للنشر، لا فكرة على ورق' : 'A product ready to deploy, not a paper concept'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { en: 'Functional prototype developed and tested', ar: 'نموذج أوّلي عامل تم تطويره واختباره' },
              { en: 'Robot and app designed as one connected visit flow', ar: 'الروبوت والتطبيق مصمَّمان كمسار زيارة واحد متصل' },
              { en: 'Real-time guided museum journey demonstrated', ar: 'عرض حي لرحلة متحف موجَّهة في الوقت الفعلي' },
              { en: 'Built for large museum environments', ar: 'مصمَّم للعمل داخل بيئات متاحف كبيرة' },
            ].map((item) => (
              <div key={item.en} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-5">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90 leading-relaxed">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'ابدأ جولتك الموجَّهة في المتحف مع حورس-بوت' : 'Start your guided museum tour with Horus-Bot'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'احجز زيارتك، اتصل بالتجربة، واستكشف المتحف من خلال جولة موجَّهة يقودها روبوت ذاتي القيادة وتطبيق مرافق.'
            : 'Book your visit, connect with the experience, and explore the museum through a guided tour powered by an autonomous robot and a companion app.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><PlayCircle className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
