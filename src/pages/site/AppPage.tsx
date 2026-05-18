import { Link } from 'react-router-dom';
import { MessageSquare, Map, BookOpen, Smartphone, Ticket, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import gemMapImage from '@/assets/gem-complex-map.png';

export default function AppPage() {
  const { isRTL } = useApp();

  const screens = [
    { icon: Ticket, label: isRTL ? 'تذاكري' : 'My Tickets' },
    { icon: QrCode, label: isRTL ? 'اقتران الروبوت' : 'Robot Pairing' },
    { icon: Map, label: isRTL ? 'الملاحة الحية' : 'Live navigation' },
    { icon: BookOpen, label: isRTL ? 'تفاصيل المعروضات' : 'Exhibit details' },
    { icon: MessageSquare, label: isRTL ? 'اسأل المرشد' : 'Ask the guide' },
  ];
  const appMoments = [
    {
      icon: Ticket,
      labelEn: 'Before the visit',
      labelAr: 'قبل الزيارة',
      titleEn: 'Tickets are ready before arrival',
      titleAr: 'تذاكرك جاهزة قبل الوصول',
      bodyEn: 'Your Museum Entry Ticket and Horus-Bot Tour Ticket stay linked to the same account used on the website.',
      bodyAr: 'تذكرة دخول المتحف وتذكرة جولة Horus-Bot تبقيان مرتبطتين بالحساب نفسه المستخدم على الموقع.',
    },
    {
      icon: QrCode,
      labelEn: 'At the museum',
      labelAr: 'داخل المتحف',
      titleEn: 'Pair with the physical robot',
      titleAr: 'اقترن بالروبوت الفعلي',
      bodyEn: 'Robot Pairing happens by scanning the physical QR on the robot, after your visit is booked.',
      bodyAr: 'يتم اقتران الروبوت عبر مسح رمز QR الفعلي على الروبوت بعد إتمام الحجز.',
    },
    {
      icon: Map,
      labelEn: 'During the tour',
      labelAr: 'أثناء الجولة',
      titleEn: 'Follow the Live Tour',
      titleAr: 'تابع الجولة الحية',
      bodyEn: 'The app carries the live map, exhibit details, questions, and tour progress while the robot guides the route.',
      bodyAr: 'يحمل التطبيق الخريطة الحية وتفاصيل المعروضات والأسئلة وتقدم الجولة بينما يقود الروبوت المسار.',
    },
  ];

  const actions = (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button asChild size="lg">
        <Link to="/book">
          <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link to="/tickets-mine">
          <Smartphone className="h-4 w-4" /> {isRTL ? 'عرض تذاكري' : 'My Tickets'}
        </Link>
      </Button>
    </div>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'التطبيق المرافق' : 'The Companion App'}
        title={isRTL ? 'تجربة المتحف في يدك أثناء الزيارة' : 'Your Museum Visit, Ready in Your Hand'}
        subtitle={
          isRTL
            ? 'احجز من الموقع، ثم استخدم التطبيق داخل المتحف لعرض التذاكر، واقتران الروبوت، ومتابعة الجولة الحية.'
            : 'Book on the website, then use the mobile app inside the museum for tickets, Robot Pairing, and the Live Tour.'
        }
        actions={actions}
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-6 mb-4 text-center space-y-2">
        <p className="text-sm text-foreground/85">
          {isRTL ? 'الموقع يجهز الزيارة، والتطبيق يكملها داخل المتحف.' : 'The website prepares the visit; the app carries it through inside the museum.'}
        </p>
        <p className="text-sm text-primary/90">
          {isRTL
            ? 'تذكرة دخول المتحف تستخدم عند البوابة. اقتران الروبوت يتم لاحقا في التطبيق بمسح رمز QR الفعلي على الروبوت.'
            : 'The museum entry QR is used at the gate. Robot Pairing happens later in the app by scanning the physical QR on the robot.'}
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="section-label mb-4">{isRTL ? 'دور التطبيق' : 'App Role'}</div>
            <h2 className="font-serif text-3xl md:text-5xl mb-5">{isRTL ? 'التطبيق هو رفيق الزيارة داخل المتحف' : 'The app is the in-museum companion'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'الموقع ينهي الحجز. التطبيق يحمل ما يحدث عند الوصول: التذاكر، اقتران الروبوت، الجولة الحية، والأسئلة.'
                : 'The website completes the booking. The app carries what happens on arrival: tickets, Robot Pairing, the Live Tour, and questions.'}
            </p>
          </div>
          <div className="space-y-5">
            {appMoments.map((moment) => (
              <div key={moment.labelEn} className="grid gap-4 rounded-2xl border border-border/60 bg-card/55 p-5 sm:grid-cols-[48px_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
                  <moment.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{isRTL ? moment.labelAr : moment.labelEn}</p>
                  <h3 className="mt-1 font-serif text-xl">{isRTL ? moment.titleAr : moment.titleEn}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? moment.bodyAr : moment.bodyEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-sidebar/15 overflow-hidden">
        <img
          src={gemMapImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="mb-10 max-w-2xl">
            <div className="section-label mb-4">{isRTL ? 'شاشات أساسية' : 'Core Screens'}</div>
            <h2 className="font-serif text-3xl md:text-4xl">{isRTL ? 'شاشات قليلة، كل منها له وظيفة واضحة' : 'A few screens, each with a clear job'}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {screens.map((s) => (
              <Card key={s.label} className="flex items-center gap-3 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'ابدأ من الموقع وأكمل داخل التطبيق' : 'Start on the Website, Continue in the App'}</h2>
        <p className="text-lg text-muted-foreground mb-10">
          {isRTL
            ? 'بعد الحجز، تظهر تذاكرك في حسابك. عند وصولك، استخدم التطبيق للدخول، واقتران الروبوت، ومتابعة الجولة.'
            : 'After booking, your tickets stay in your account. When you arrive, use the app for entry, Robot Pairing, and the Live Tour.'}
        </p>
        {actions}
      </section>
    </>
  );
}
