import { Ticket, Bot, Navigation, Award, Accessibility, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function ExperiencePage() {
  const { isRTL } = useApp();

  const Stage = ({ label, title, items }: { label: string; title: string; items: { icon: any; title: string; desc: string }[] }) => (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
      <div className="section-label mb-4">{label}</div>
      <h2 className="font-serif text-3xl md:text-4xl mb-10">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => <FeatureCard key={it.title} icon={it.icon} title={it.title} description={it.desc} />)}
      </div>
    </section>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'التجربة' : 'Experience'}
        title={isRTL ? 'ماذا ستعيش في زيارتك' : 'What you will live during your visit'}
        subtitle={isRTL ? 'من الحجز إلى المغادرة، تجربة موجهة في كل خطوة.' : 'From booking to leaving, a guided journey at every step.'}
      />

      <Stage
        label={isRTL ? 'قبل الزيارة' : 'Before Visit'}
        title={isRTL ? 'الاستعداد' : 'Get ready'}
        items={[
          { icon: Ticket, title: isRTL ? 'احجز تذكرتك' : 'Book your ticket', desc: isRTL ? 'احجز عبر الإنترنت في دقائق.' : 'Reserve online in minutes.' },
          { icon: Bot, title: isRTL ? 'حمّل التطبيق' : 'Download the app', desc: isRTL ? 'متاح على iOS و Android.' : 'Available on iOS and Android.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'في المتحف' : 'At the Museum'}
          title={isRTL ? 'الوصول والبدء' : 'Arrive and begin'}
          items={[
            { icon: Bot, title: isRTL ? 'قابل الروبوت' : 'Meet the robot', desc: isRTL ? 'حورس-بوت ينتظرك عند المدخل.' : 'Horus-Bot greets you at the entrance.' },
            { icon: Navigation, title: isRTL ? 'افتح التطبيق' : 'Open the app', desc: isRTL ? 'يتزامن تلقائياً مع وضع الجولة.' : 'Auto-syncs into tour mode.' },
            { icon: Sparkles, title: isRTL ? 'ابدأ الجولة' : 'Start the tour', desc: isRTL ? 'تجربة موجهة شخصياً.' : 'A personally guided experience.' },
          ]}
        />
      </div>

      <Stage
        label={isRTL ? 'أثناء الجولة' : 'During the Tour'}
        title={isRTL ? 'استكشف بحرية' : 'Explore freely'}
        items={[
          { icon: Navigation, title: isRTL ? 'تنقل سلس' : 'Smooth navigation', desc: isRTL ? 'بين المعروضات بدون عناء.' : 'Between exhibits without effort.' },
          { icon: Bot, title: isRTL ? 'تفاعل مع الروبوت' : 'Robot interaction', desc: isRTL ? 'اسأل أي سؤال في أي وقت.' : 'Ask any question at any time.' },
          { icon: Sparkles, title: isRTL ? 'محتوى صوتي ومرئي' : 'Audio & visual content', desc: isRTL ? 'شروحات غامرة لكل قطعة.' : 'Immersive explanations for every piece.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'التفاعل' : 'Engagement'}
          title={isRTL ? 'تعلّم وامرح' : 'Learn and have fun'}
          items={[
            { icon: Award, title: isRTL ? 'اختبارات' : 'Quizzes', desc: isRTL ? 'اختبر معرفتك.' : 'Test what you learned.' },
            { icon: Sparkles, title: isRTL ? 'مكافآت' : 'Rewards', desc: isRTL ? 'افتح إنجازات وشارات.' : 'Unlock badges and achievements.' },
            { icon: Bot, title: isRTL ? 'حقائق ممتعة' : 'Fun facts', desc: isRTL ? 'قصص لم تسمعها من قبل.' : 'Stories you have not heard before.' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="section-label mb-4">{isRTL ? 'إمكانية الوصول' : 'Accessibility'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'مصمم للجميع' : 'Designed for everyone'}</h2>
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Accessibility className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'دعم كامل للعربية والإنجليزية، خط متغير الحجم، أوضاع تباين عالية، ومسارات ميسرة الحركة.'
                  : 'Full English and Arabic support, scalable text, high-contrast modes, and motion-friendly paths.'}
              </p>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
