import { MessageSquare, Bell, Map, BookOpen, Smartphone, Apple, Compass, Headphones, Award, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AppPage() {
  const { isRTL } = useApp();

  const screens = [
    { icon: Map, label: isRTL ? 'الملاحة الحية' : 'Live navigation' },
    { icon: BookOpen, label: isRTL ? 'تفاصيل المعروضة' : 'Exhibit details' },
    { icon: MessageSquare, label: isRTL ? 'اسأل المرشد' : 'Ask the guide' },
    { icon: Award, label: isRTL ? 'اختبار تفاعلي' : 'Interactive quiz' },
    { icon: Sparkles, label: isRTL ? 'تقدّم الزيارة' : 'Visit progress' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'التطبيق' : 'The App'}
        title={isRTL ? 'تجربة متحفك كاملةً في تطبيق واحد' : 'Your entire museum experience, in one place'}
        subtitle={isRTL ? 'تنقَّل، استكشف المعروضات، اطرح الأسئلة، وتابع تقدّمك — كل ذلك من تطبيق واحد بسيط.' : 'Navigate, explore exhibits, ask questions, and stay on track — all through one simple app.'}
        actions={
          <>
            <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
            <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-6 mb-4 text-center space-y-2">
        <p className="text-sm text-primary/90">
          {isRTL ? 'يعمل التطبيق جنباً إلى جنب مع الروبوت المخصَّص لك لدعم زيارتك بالكامل.' : 'The app works together with your assigned robot to support your full visit.'}
        </p>
        <p className="text-xs text-muted-foreground">
          {isRTL ? 'حمّله قبل الزيارة للحصول على أفضل تجربة.' : 'Download before your visit for the best experience.'}
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'القدرات الأساسية' : 'Core Capabilities'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما الذي تحصل عليه فعلياً' : 'What you actually get'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Compass}
            title={isRTL ? 'تعرف دائماً أين أنت' : 'Always know where you are'}
            description={isRTL ? 'موقع الزائر والمحطة التالية واضحان على خريطة المتحف طوال الزيارة.' : 'Always see your location and where to go next, clearly mapped through the museum.'}
          />
          <FeatureCard
            icon={BookOpen}
            title={isRTL ? 'كل معروضة بصورها وصوتها ونصها' : 'Each exhibit in text, image, and audio'}
            description={isRTL ? 'وصول لكل قطعة عبر وصف نصي، صور، وملف صوتي عند الحاجة.' : 'Access each exhibit through clear text, images, and audio whenever you need it.'}
          />
          <FeatureCard
            icon={MessageSquare}
            title={isRTL ? 'اسأل أي سؤال، تأتيك إجابة فورية' : 'Ask anything, get an instant answer'}
            description={isRTL ? 'اطرح سؤالك أثناء الزيارة وتحصل على إجابة فورية باللغة التي اخترتها.' : 'Ask any question during your visit and get an instant answer in your chosen language.'}
          />
          <FeatureCard
            icon={Bell}
            title={isRTL ? 'تحديثات لحظية فلا يفوتك شيء' : 'Real-time updates so nothing slips by'}
            description={isRTL ? 'تنبيهات بالعروض الحية وأي تحديث على مسار جولتك.' : 'Get real-time updates on live talks and route changes so you never miss anything important.'}
          />
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'لقطات' : 'Screens'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'الواجهات التي ستستخدمها' : 'The screens you will use'}</h2>
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-5">
            {screens.map((s) => (
              <div key={s.label} className="space-y-3">
                <Card className="aspect-[9/16] bg-gradient-to-br from-card via-card to-primary/5 p-4 flex flex-col">
                  <div className="flex-1 rounded-xl bg-background/40 ring-1 ring-border/40 flex items-center justify-center">
                    <s.icon className="h-8 w-8 text-primary/60" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <div className="h-1 flex-1 rounded-full bg-muted" />
                  </div>
                </Card>
                <p className="text-xs text-center text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'حمّل التطبيق قبل وصولك' : 'Install the app before you arrive'}</h2>
        <p className="text-lg text-muted-foreground mb-10">{isRTL ? 'كل شيء جاهز فور دخولك — لا إعداد، ولا انتظار.' : 'Everything is ready the moment you enter — no setup, no waiting.'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
          <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
        </div>
      </section>
    </>
  );
}
