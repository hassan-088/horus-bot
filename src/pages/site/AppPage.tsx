import { MessageSquare, Bell, Map, BookOpen, Smartphone, Apple } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AppPage() {
  const { isRTL } = useApp();

  return (
    <>
      <SectionHero
        label={isRTL ? 'التطبيق' : 'The App'}
        title={isRTL ? 'مركز التحكم في زيارتك' : 'The Control Center of Your Visit'}
        subtitle={isRTL ? 'الخريطة، شروحات المعروضات، المحادثة مع نظام الجولة، والإشعارات في تطبيق واحد.' : 'Maps, exhibit content, chat with the tour system, and notifications in one app.'}
        actions={
          <>
            <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
            <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'ما يقدمه التطبيق' : 'What the app does'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'أربع وظائف أساسية' : 'Four core functions'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Map}
            title={isRTL ? 'خريطة داخلية بموقع لحظي' : 'Indoor map with live position'}
            description={isRTL ? 'يعرض موقعك وموقع الروبوت على خريطة دقيقة لكل طابق، مع مسار المعروضة التالية.' : 'Shows your position and the robot on an accurate per-floor map, with the route to the next exhibit.'}
          />
          <FeatureCard
            icon={BookOpen}
            title={isRTL ? 'مكتبة معروضات' : 'Exhibit info library'}
            description={isRTL ? 'نص وصور وصوت لكل قطعة، قابل للحفظ في المفضلة والرجوع إليه بعد الزيارة.' : 'Text, images, and audio for every piece, savable to favorites and accessible after the visit.'}
          />
          <FeatureCard
            icon={MessageSquare}
            title={isRTL ? 'محادثة مع نظام الجولة' : 'Chat with the tour system'}
            description={isRTL ? 'اطرح أسئلة عن أي معروضة، ويجيبك النظام باستخدام المحتوى الرسمي للمتحف.' : 'Ask questions about any exhibit; the system answers from the museum-approved content.'}
          />
          <FeatureCard
            icon={Bell}
            title={isRTL ? 'إشعارات الفعاليات والمسار' : 'Live talks & route updates'}
            description={isRTL ? 'تنبيهات عند بدء عرض حي، أو عند تعديل مسار الجولة بسبب الازدحام.' : 'Alerts when a live talk starts, or when your route is adjusted due to crowding.'}
          />
        </div>
      </section>

      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'لقطات' : 'Screenshots'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'الواجهات الرئيسية' : 'Key screens'}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="aspect-[9/16] bg-gradient-to-br from-card via-card to-primary/5 flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-primary/40" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'حمّل التطبيق قبل الوصول' : 'Install the app before you arrive'}</h2>
        <p className="text-lg text-muted-foreground mb-10">{isRTL ? 'يفتح التطبيق تلقائياً بعد مسح تذكرة QR عند البوابة.' : 'It opens automatically once you scan your QR ticket at the gate.'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
          <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
        </div>
      </section>
    </>
  );
}
