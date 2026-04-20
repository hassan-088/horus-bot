import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, MapPin, Users, ArrowRight, Compass, QrCode, PlayCircle } from 'lucide-react';
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
        label={isRTL ? 'حورس-بوت • نظام إرشاد متاحف' : 'Horus-Bot • Museum Guidance System'}
        title={
          isRTL ? (
            <>جولات متاحف ذكية بقيادة <span className="text-primary">روبوت ذاتي</span> وتطبيق مرافق</>
          ) : (
            <>Smart museum tours led by an <span className="text-primary">autonomous robot</span> and a companion app</>
          )
        }
        subtitle={
          isRTL
            ? 'حورس-بوت نظام متكامل يجمع روبوتاً متحركاً، تطبيق جوال، ومنصة إدارة جولات. الروبوت يرافق الزوار بين القاعات، والتطبيق يعرض الخريطة وشروحات المعروضات بالعربية والإنجليزية.'
            : 'Horus-Bot is an integrated system: a mobile robot, a visitor app, and a tour management backend. The robot escorts visitors between halls while the app delivers maps and exhibit narration in English and Arabic.'
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/tickets-info">
                <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/experience">
                <Compass className="h-4 w-4" /> {isRTL ? 'اكتشف النظام' : 'Explore the System'}
              </Link>
            </Button>
          </>
        }
      />

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="section-label mb-4">{isRTL ? 'نظرة على المنتج' : 'Product Overview'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'منظومة متحف ذكية متكاملة' : 'A Complete Smart Museum System'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL
              ? 'حورس-بوت ليس مجرد روبوت. هو ثلاث طبقات تعمل معاً: روبوت ميداني يقود الزوار بين القاعات، تطبيق جوال يعرض الخريطة وشروحات المعروضات، ومنصة خلفية تدير المسارات والحجوزات وأسطول الروبوتات في الوقت الفعلي.'
              : 'Horus-Bot is not just a robot. It is three layers working together: a floor robot that guides visitors between halls, a mobile app that delivers the map and exhibit content, and a backend that manages tours, bookings, and the robot fleet in real time.'}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-7">
            <Bot className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'الروبوت' : 'The Robot'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'منصة متحركة بمستشعرات LiDAR ورؤية حاسوبية تتحرك بأمان حول الزوار وتتوقف عند كل معروضة لتقديم الشرح.'
                : 'A mobile platform with LiDAR and computer vision that moves safely around visitors and stops at each exhibit to narrate.'}
            </p>
          </Card>
          <Card className="p-7">
            <Smartphone className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'تطبيق الزائر' : 'The Visitor App'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'يربط الزائر بالروبوت عبر QR، يعرض خريطة داخلية لحظية، مكتبة المعروضات، وقناة محادثة مع نظام الجولة.'
                : 'Pairs the visitor with the robot via QR, shows a live indoor map, the exhibit library, and a chat channel with the tour system.'}
            </p>
          </Card>
          <Card className="p-7">
            <Route className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-2">{isRTL ? 'منصة الجولات' : 'Tour Backend'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRTL
                ? 'تنسّق الحجوزات، توزّع الزوار على الروبوتات المتاحة، وتعدّل المسارات حسب الازدحام لتقليل وقت الانتظار.'
                : 'Coordinates bookings, assigns visitors to available robots, and adjusts routes based on crowding to reduce wait time.'}
            </p>
          </Card>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="section-label mb-4">{isRTL ? 'المزايا الأساسية' : 'Core Features'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {isRTL ? 'ما الذي يقدمه النظام فعلياً' : 'What the system actually does'}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Bot}
              title={isRTL ? 'إرشاد وملاحة الروبوت' : 'Robot Navigation & Guidance'}
              description={isRTL ? 'يرسم الروبوت مساره بنفسه ويتفادى العقبات والزوار، ويقود المجموعة من معروضة إلى أخرى بسرعة مشي مريحة.' : 'The robot plans its own path, avoids obstacles and visitors, and leads the group from exhibit to exhibit at a comfortable walking pace.'}
            />
            <FeatureCard
              icon={Smartphone}
              title={isRTL ? 'تطبيق جوال تفاعلي' : 'Interactive Mobile App'}
              description={isRTL ? 'تذكرة، خريطة، شروحات صوتية ونصية، ومركز تحكم بالجولة في تطبيق واحد على iOS و Android.' : 'Ticket, map, audio and text narration, and a tour control center in one app on iOS and Android.'}
            />
            <FeatureCard
              icon={MapPin}
              title={isRTL ? 'ملاحة داخلية لحظية' : 'Real-Time Indoor Navigation'}
              description={isRTL ? 'تموضع داخلي بدقة متر واحد عبر منارات Bluetooth، مع موقع الزائر والروبوت على خريطة المتحف لحظياً.' : 'One-meter indoor positioning via Bluetooth beacons, showing your live location and the robot on the museum map.'}
            />
            <FeatureCard
              icon={Languages}
              title={isRTL ? 'دعم ثنائي اللغة (EN/AR)' : 'Multilingual Support (EN/AR)'}
              description={isRTL ? 'صوت الروبوت ومحتوى التطبيق بالكامل بالعربية والإنجليزية، مع تخطيط RTL أصلي للزوار العرب.' : 'Robot speech and full app content in English and Arabic, with native RTL layout for Arabic visitors.'}
            />
            <FeatureCard
              icon={Route}
              title={isRTL ? 'مسارات جولات مخصصة' : 'Personalized Tour Paths'}
              description={isRTL ? 'اختر بين 30 و60 و90 دقيقة، أو حدد اهتماماتك (فن، تاريخ، عائلة) وسيقوم النظام ببناء المسار وترتيب المعروضات.' : 'Choose 30, 60, or 90 minutes, or pick interests (art, history, family) and the system builds the route and exhibit order.'}
            />
            <FeatureCard
              icon={Users}
              title={isRTL ? 'تفاعل الزوار' : 'Visitor Engagement'}
              description={isRTL ? 'اختبار قصير بعد كل قاعة، شارات يجمعها الزائر، ونقاط تصوير محددة على الخريطة لتشجيع الاستكشاف.' : 'A short quiz after each hall, badges the visitor collects, and tagged photo spots on the map to encourage exploration.'}
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
            description={isRTL ? 'اختر التاريخ والمدة، وادفع، واستلم تذكرة QR على البريد الإلكتروني.' : 'Pick a date and tour length, pay, and receive a QR ticket by email.'}
          />
          <StepCard
            step={2}
            title={isRTL ? 'امسح عند المدخل' : 'Scan at entrance'}
            description={isRTL ? 'امسح الـQR عند البوابة، فيتحقق التطبيق من تذكرتك ويربطك بأقرب روبوت متاح.' : 'Scan the QR at the gate; the app validates your ticket and pairs you with the nearest available robot.'}
          />
          <StepCard
            step={3}
            title={isRTL ? 'الروبوت يستقبلك' : 'The robot greets you'}
            description={isRTL ? 'يحييك الروبوت بالاسم، ويحمّل التطبيق المسار الذي اخترته على خريطة المتحف.' : 'The robot greets you by name and the app loads your selected route on the museum map.'}
          />
          <StepCard
            step={4}
            title={isRTL ? 'اتبع الجولة الموجهة' : 'Follow the guided tour'}
            description={isRTL ? 'يقودك الروبوت من معروضة إلى أخرى مع شرح صوتي مباشر وإمكانية طرح الأسئلة في التطبيق.' : 'The robot leads you between exhibits with live narration; ask follow-up questions inside the app.'}
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
                {isRTL ? 'مركز التحكم في زيارتك' : 'The control center of your visit'}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {isRTL
                  ? 'خريطة داخلية لحظية، مكتبة معروضات بالصور والصوت والنصوص، محادثة مع نظام الجولة للأسئلة، وإشعارات بالفعاليات الحية والتغييرات في المسار.'
                  : 'A live indoor map, an exhibit library with images, audio and text, a chat channel with the tour system for questions, and push notifications for live talks and route updates.'}
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
          {isRTL ? 'ابدأ تجربتك في المتحف الذكي' : 'Start Your Smart Museum Experience'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          {isRTL
            ? 'احجز زيارتك الآن، نزّل التطبيق قبل وصولك، وسيكون الروبوت في انتظارك عند البوابة.'
            : 'Book your visit now, install the app before you arrive, and a robot will be waiting for you at the gate.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Your Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><PlayCircle className="h-4 w-4" /> {isRTL ? 'اكتشف التطبيق' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
