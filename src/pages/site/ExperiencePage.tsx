import { Ticket, Bot, Navigation, Award, Accessibility, Smartphone, QrCode, Headphones, MapPin, MessageSquare, Camera, Volume2, Type, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function ExperiencePage() {
  const { isRTL } = useApp();

  const Stage = ({ label, title, intro, items }: { label: string; title: string; intro?: string; items: { icon: any; title: string; desc: string }[] }) => (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
      <div className="section-label mb-4">{label}</div>
      <h2 className="font-serif text-3xl md:text-4xl mb-4">{title}</h2>
      {intro && <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">{intro}</p>}
      {!intro && <div className="mb-10" />}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => <FeatureCard key={it.title} icon={it.icon} title={it.title} description={it.desc} />)}
      </div>
    </section>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'التجربة' : 'Experience'}
        title={isRTL ? 'ما يحدث خلال زيارتك' : 'What Happens During Your Visit'}
        subtitle={isRTL ? 'تجربة خطوة بخطوة من الحجز وحتى نهاية جولتك.' : 'A step-by-step experience from booking to the end of your tour.'}
      />

      <Stage
        label={isRTL ? 'قبل الزيارة' : 'Before Visit'}
        title={isRTL ? 'تجهيز هادئ من المنزل' : 'Prepare calmly from home'}
        items={[
          { icon: Ticket, title: isRTL ? 'اختر وقت زيارتك' : 'Choose your visit time', desc: isRTL ? 'احجز التجربة التي تناسب مجموعتك في الفترة التي تفضّلها.' : 'Reserve the experience that fits your group at the time you prefer.' },
          { icon: Navigation, title: isRTL ? 'حدّد مدة الجولة' : 'Pick your tour length', desc: isRTL ? 'اختر المدة التي تناسب جدولك: قصيرة، متوسطة، أو موسَّعة.' : 'Pick the tour length that suits your schedule — short, standard, or extended.' },
          { icon: Smartphone, title: isRTL ? 'حمّل التطبيق قبل الوصول' : 'Install the app before arrival', desc: isRTL ? 'حمّله مسبقاً لتتصل بالتجربة فور دخولك المتحف.' : 'Install it ahead of time so you connect with the experience the moment you walk in.' },
          { icon: QrCode, title: isRTL ? 'تذكرتك على هاتفك' : 'Your QR ticket on your phone', desc: isRTL ? 'يصلك رمز QR مباشرةً على هاتفك لدخول سريع وسلس.' : 'Receive your QR ticket directly on your phone for quick, smooth entry.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'في المتحف' : 'At the Museum'}
          title={isRTL ? 'الوصول وبدء جولتك' : 'Arrive and begin your tour'}
          items={[
            { icon: QrCode, title: isRTL ? 'امسح عند البوابة' : 'Scan at the gate', desc: isRTL ? 'مسح رمز QR يفعّل تذكرتك ويبدأ تجربتك.' : 'Scanning your QR activates your ticket and starts your experience.' },
            { icon: Bot, title: isRTL ? 'اتصل بالروبوت المخصَّص لك' : 'Connect with your assigned robot', desc: isRTL ? 'يعرض التطبيق روبوتك ويبدأ المسار في ثوانٍ معدودة.' : 'The app shows your assigned robot and your route starts within seconds.' },
            { icon: Headphones, title: isRTL ? 'تجربة صوتية أكثر خصوصية' : 'A more personal audio experience', desc: isRTL ? 'للحصول على تجربة صوتية أهدأ وأكثر خصوصية، يُنصح باستخدام السماعات.' : 'For a more personal audio experience, headphones are recommended.' },
          ]}
        />
      </div>

      <Stage
        label={isRTL ? 'أثناء الجولة' : 'During the Tour'}
        title={isRTL ? 'جولة طبيعية تتكيّف معك' : 'A natural tour that adapts to you'}
        intro={isRTL
          ? 'يقودك الروبوت بطبيعية بين القاعات، يتكيّف مع إيقاعك ويساعدك على التركيز على التجربة نفسها.'
          : 'The robot guides you naturally through the museum, adapting to your pace and helping you focus on the experience.'}
        items={[
          { icon: Bot, title: isRTL ? 'الروبوت يقود بين المعروضات' : 'The robot leads between exhibits', desc: isRTL ? 'تتبعه بهدوء، يتوقّف عند كل قطعة، ويستأنف عندما تكون مستعداً.' : 'You follow at a calm pace; it stops at each piece and resumes when you are ready.' },
          { icon: Map, title: isRTL ? 'خريطة حية والمحطة التالية' : 'Live map and next stop', desc: isRTL ? 'ترى أين أنت، ما هي المحطة التالية، وكم تبقى من الجولة.' : 'You see where you are, what your next stop is, and how much of the tour remains.' },
          { icon: MapPin, title: isRTL ? 'اضغط أي معروضة للتعمق' : 'Tap any exhibit for deeper information', desc: isRTL ? 'تحصل على صور إضافية، نص أطول، وملف صوتي مفصَّل عن القطعة.' : 'You get extra images, longer text, and a detailed audio track for the piece.' },
          { icon: MessageSquare, title: isRTL ? 'اطرح أسئلة بالعربية أو الإنجليزية' : 'Ask questions in English or Arabic', desc: isRTL ? 'اطرح أي سؤال خلال الزيارة وتأتيك إجابة فورية باللغة التي اخترتها.' : 'Ask any question during your visit and get an instant answer in your chosen language.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'التفاعل' : 'Engagement'}
          title={isRTL ? 'لحظات صغيرة تبقى معك' : 'Small moments that stay with you'}
          items={[
            { icon: Award, title: isRTL ? 'اختبارات قصيرة ممتعة' : 'Quick, playful quizzes', desc: isRTL ? 'تساعدك على تذكّر ما استكشفته للتو في كل قاعة.' : 'Quick quizzes help you remember what you just explored.' },
            { icon: Award, title: isRTL ? 'إنجازاتك تبقى محفوظة' : 'Your achievements stay with you', desc: isRTL ? 'تُحفظ إنجازاتك في حسابك وترافقك عبر زياراتك القادمة.' : 'Your achievements stay saved in your profile across visits.' },
            { icon: Camera, title: isRTL ? 'نقاط تصوير لأبرز اللحظات' : 'Photo points for the highlights', desc: isRTL ? 'نقاط مقترحة لتلتقط أجمل صور الزيارة دون أن تفوّت لقطة تستحق.' : 'Photo points help you capture the highlights worth remembering.' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="section-label mb-4">{isRTL ? 'إمكانية الوصول' : 'Accessibility'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'تجربة لكل زائر' : 'An experience for every visitor'}</h2>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {isRTL ? 'مصمَّمة لتكون قابلة للاستخدام من قِبَل كل زائر، أياً كانت قدراته.' : 'Designed to be usable by every visitor, regardless of ability.'}
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card className="p-7">
            <Accessibility className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'مسارات بدون درج' : 'Step-free routes'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'كل المسارات التي يقودها الروبوت متاحة للكراسي المتحركة وعربات الأطفال.' : 'Every robot-led route is wheelchair- and stroller-accessible.'}</p>
          </Card>
          <Card className="p-7">
            <Type className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'حجم نص قابل للتعديل' : 'Adjustable text size'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'كبّر النصوص في التطبيق وفعّل وضع التباين العالي عند الحاجة.' : 'Scale up app text and enable a high-contrast mode when needed.'}</p>
          </Card>
          <Card className="p-7">
            <Volume2 className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'وصف صوتي موسَّع' : 'Extended audio descriptions'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'نسخة صوتية موسَّعة تصف القطع البصرية للزوار ضعاف البصر.' : 'Extended audio that describes visual pieces for low-vision visitors.'}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
