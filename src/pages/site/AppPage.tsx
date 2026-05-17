import { Link } from 'react-router-dom';
import { MessageSquare, Bell, Map, BookOpen, Smartphone, Compass, Award, Sparkles, Ticket, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';
import gemMapImage from '@/assets/gem-complex-map.png';

export default function AppPage() {
  const { isRTL } = useApp();

  const screens = [
    { icon: Ticket, label: isRTL ? 'تذاكري' : 'My Tickets' },
    { icon: QrCode, label: isRTL ? 'اقتران الروبوت' : 'Robot pairing' },
    { icon: Map, label: isRTL ? 'الملاحة الحية' : 'Live navigation' },
    { icon: BookOpen, label: isRTL ? 'تفاصيل المعروضات' : 'Exhibit details' },
    { icon: MessageSquare, label: isRTL ? 'اسأل المرشد' : 'Ask the guide' },
  ];

  const actions = (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button asChild size="lg">
        <Link to="/book">
          <Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book your visit'}
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link to="/tickets-mine">
          <Smartphone className="h-4 w-4" /> {isRTL ? 'عرض تذاكري' : 'View my tickets'}
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
            : 'Book on the website, then use the mobile app inside the museum for tickets, robot pairing, and the live tour.'
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
            : 'The museum entry QR is used at the gate. Robot pairing happens later in the app by scanning the physical QR on the robot.'}
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'مصمم حول زيارتك' : 'Designed Around Your Visit'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'كل ما تحتاجه داخل المتحف' : 'Everything You Need Inside the Museum'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Compass}
            title={isRTL ? 'مسارك واضح' : 'Your Route Stays Clear'}
            description={isRTL ? 'تابع موقعك، محطتك التالية، وتقدم الجولة من شاشة واحدة.' : 'Follow your location, next stop, and tour progress from one place.'}
          />
          <FeatureCard
            icon={BookOpen}
            title={isRTL ? 'محتوى المعروضات' : 'Exhibit Content'}
            description={isRTL ? 'اقرأ تفاصيل المعروضات واستمع إلى السرد المناسب لجولتك.' : 'Read exhibit details and follow narration selected for your tour.'}
          />
          <FeatureCard
            icon={MessageSquare}
            title={isRTL ? 'أسئلة أثناء الجولة' : 'Questions During the Tour'}
            description={isRTL ? 'اطرح أسئلتك أثناء الزيارة واحصل على إجابات مرتبطة بالمعروضات والجولة.' : 'Ask during the visit and receive answers connected to exhibits and your tour.'}
          />
          <FeatureCard
            icon={Bell}
            title={isRTL ? 'تحديثات الزيارة' : 'Visit Updates'}
            description={isRTL ? 'تابع حالة الجولة، التقدم، وأي إرشادات مرتبطة بتجربتك.' : 'Keep track of tour state, progress, and guidance tied to your visit.'}
          />
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
          <div className="section-label mb-4">{isRTL ? 'شاشات أساسية' : 'Core Screens'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما ستستخدمه داخل المتحف' : 'What You Use at the Museum'}</h2>
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-5">
            {screens.map((s) => (
              <div key={s.label} className="space-y-3">
                <Card className="aspect-[9/16] bg-gradient-to-br from-card via-card to-primary/10 p-4 flex flex-col ring-1 ring-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-1.5 w-10 rounded-full bg-primary/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex-1 rounded-xl bg-background/50 ring-1 ring-border/40 flex flex-col items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center ring-1 ring-primary/30">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium px-2 text-center">{s.label}</p>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 rounded-full bg-muted" />
                    <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                  </div>
                </Card>
                <p className="text-xs text-center text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'ابدأ من الموقع وأكمل داخل التطبيق' : 'Start on the Website, Continue in the App'}</h2>
        <p className="text-lg text-muted-foreground mb-10">
          {isRTL
            ? 'بعد الحجز، تظهر تذاكرك في حسابك. عند وصولك، استخدم التطبيق للدخول، واقتران الروبوت، ومتابعة الجولة.'
            : 'After booking, your tickets stay in your account. When you arrive, use the app for entry, robot pairing, and the live tour.'}
        </p>
        {actions}
      </section>
    </>
  );
}
