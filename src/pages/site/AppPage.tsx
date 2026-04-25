import { useState } from 'react';
import { MessageSquare, Bell, Map, BookOpen, Smartphone, Apple, Compass, Award, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { ComingSoonModal } from '@/components/site/ComingSoonModal';
import { useApp } from '@/contexts/AppContext';

export default function AppPage() {
  const { isRTL } = useApp();
  const [showSoon, setShowSoon] = useState(false);

  const screens = [
    { icon: Map, label: isRTL ? 'الملاحة الحية' : 'Live navigation' },
    { icon: BookOpen, label: isRTL ? 'تفاصيل المعروضة' : 'Exhibit details' },
    { icon: MessageSquare, label: isRTL ? 'اسأل المرشد' : 'Ask the guide' },
    { icon: Award, label: isRTL ? 'اختبار تفاعلي' : 'Interactive quiz' },
    { icon: Sparkles, label: isRTL ? 'تقدّم الزيارة' : 'Visit progress' },
  ];

  const StoreButtons = () => (
    <>
      <Button size="lg" onClick={() => setShowSoon(true)}>
        <Apple className="h-4 w-4" /> App Store
      </Button>
      <Button size="lg" variant="outline" onClick={() => setShowSoon(true)}>
        <Smartphone className="h-4 w-4" /> Google Play
      </Button>
    </>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'التطبيق' : 'The App'}
        title={isRTL ? 'تجربة متحفك كاملةً في مكان واحد' : 'Your Entire Museum Experience, in One Place'}
        subtitle={isRTL ? 'تنقَّل، استكشف، اطرح الأسئلة، وابقَ على المسار — كل ذلك من تطبيق واحد بسيط.' : 'Navigate, explore, ask questions, and stay on track — all through one simple app.'}
        actions={<StoreButtons />}
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-6 mb-4 text-center space-y-2">
        <p className="text-sm text-foreground/85">
          {isRTL ? 'يعمل قبل زيارتك وأثناءها وبعدها.' : 'Works before, during, and after your visit.'}
        </p>
        <p className="text-sm text-primary/90">
          {isRTL ? 'يعمل بسلاسة مع الروبوت المخصَّص لك ليُرشد رحلة متحفك بالكامل.' : 'Works seamlessly with your assigned robot to guide your full museum journey.'}
        </p>
        <p className="text-xs text-muted-foreground">
          {isRTL ? 'حمّله قبل زيارتك للحصول على أكثر تجربة سلاسة.' : 'Download before your visit for the smoothest experience.'}
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'القدرات الأساسية' : 'Core Capabilities'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما الذي تحصل عليه فعلياً' : 'What You Actually Get'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Compass}
            title={isRTL ? 'لن تشعر بالضياع' : 'Never Feel Lost'}
            description={isRTL ? 'موقعك، خطوتك التالية، ومسارك دائماً واضحون.' : 'Your location, next step, and route are always clear.'}
          />
          <FeatureCard
            icon={BookOpen}
            title={isRTL ? 'كل معروضة تنبض بالحياة' : 'Every Exhibit Comes to Life'}
            description={isRTL ? 'استكشف المعروضات من خلال نص واضح، صور، وملف صوتي.' : 'Explore exhibits through clear text, visuals, and audio.'}
          />
          <FeatureCard
            icon={MessageSquare}
            title={isRTL ? 'اسأل أي شيء، احصل على إجابة فورية' : 'Ask Anything, Get an Instant Answer'}
            description={isRTL ? 'اطرح أسئلتك أثناء الزيارة وتلقَّ إجابات بلغتك المختارة.' : 'Ask questions during your visit and receive answers in your selected language.'}
          />
          <FeatureCard
            icon={Bell}
            title={isRTL ? 'تحديثات لحظية' : 'Real-Time Updates'}
            description={isRTL ? 'ابقَ على اطلاع بالعروض الحية، تغيّرات المسار، وتقدّم الجولة فلا يفوتك شيء.' : 'Stay updated on live talks, route changes, and tour progress so you never miss a moment.'}
          />
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'لقطات' : 'Screens'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'الواجهات التي ستستخدمها' : 'The Screens You Will Use'}</h2>
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
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'حمّل التطبيق قبل أن تصل' : 'Install the App Before You Arrive'}</h2>
        <p className="text-lg text-muted-foreground mb-10">{isRTL ? 'ادخل وأنت جاهز — كل شيء مهيّأ قبل وصولك بالفعل.' : 'Walk in ready — everything is set before you even arrive.'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <StoreButtons />
        </div>
      </section>

      <ComingSoonModal open={showSoon} onOpenChange={setShowSoon} />
    </>
  );
}
