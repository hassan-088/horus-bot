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
        subtitle={isRTL ? 'رحلة خطوة بخطوة من الحجز وحتى نهاية جولتك الموجَّهة.' : 'A step-by-step journey from booking to the end of your guided tour.'}
      />

      <Stage
        label={isRTL ? 'قبل الزيارة' : 'Before Visit'}
        title={isRTL ? 'تجهيز هادئ من المنزل' : 'Prepare Calmly from Home'}
        items={[
          { icon: Ticket, title: isRTL ? 'اختر وقت زيارتك' : 'Choose Your Visit Time', desc: isRTL ? 'احجز التجربة التي تناسب مجموعتك وجدولك المفضّل.' : 'Reserve the experience that fits your group and preferred schedule.' },
          { icon: Navigation, title: isRTL ? 'حدّد مدة جولتك' : 'Pick Your Tour Length', desc: isRTL ? 'اختر طول الجولة الذي يناسب زيارتك — قصيرة، اعتيادية، أو موسَّعة.' : 'Choose the tour length that suits your visit — short, standard, or extended.' },
          { icon: Smartphone, title: isRTL ? 'حمّل التطبيق قبل الوصول' : 'Install the App Before Arrival', desc: isRTL ? 'جهّز كل شيء قبل وصولك ليكون كل شيء جاهزاً عند دخولك.' : 'Get set up before you arrive so everything is ready when you walk in.' },
          { icon: QrCode, title: isRTL ? 'تذكرة QR على هاتفك' : 'Your QR Ticket on Your Phone', desc: isRTL ? 'تصلك تذكرتك مباشرةً على هاتفك لدخول سريع وسلس.' : 'Receive your ticket instantly on your phone for fast, seamless entry.' },
        ]}
      />

      <div className="bg-sidebar/15">
        <Stage
          label={isRTL ? 'في المتحف' : 'At the Museum'}
          title={isRTL ? 'الوصول وبدء جولتك' : 'Arrive and Begin Your Tour'}
          items={[
            { icon: QrCode, title: isRTL ? 'امسح عند البوابة' : 'Scan at the Gate', desc: isRTL ? 'امسح رمز QR لتفعيل زيارتك فوراً.' : 'Scan your QR code to activate your visit instantly.' },
            { icon: Bot, title: isRTL ? 'اتصل بالروبوت المخصَّص لك' : 'Connect with Your Assigned Robot', desc: isRTL ? 'يبدأ مسارك بمجرد الاتصال بالروبوت المخصَّص لك.' : 'Your route begins as you connect to your assigned robot.' },
            { icon: Headphones, title: isRTL ? 'تجربة صوتية أكثر خصوصية' : 'A More Personal Audio Experience', desc: isRTL ? 'استخدم السمّاعات للحصول على تجربة استماع أكثر تركيزاً وخصوصية.' : 'Use headphones for a more focused and personal listening experience.' },
          ]}
        />
      </div>

      <Stage
        label={isRTL ? 'أثناء الجولة' : 'During the Tour'}
        title={isRTL ? 'جولة طبيعية تتكيّف معك' : 'A Natural Tour That Adapts to You'}
        intro={isRTL
          ? 'يقود الروبوت الزوار عبر المتحف بإيقاع مريح، فيساعدهم على التركيز في المعروضات بدلاً من القلق حول إلى أين يذهبون بعد ذلك.'
          : 'The robot guides visitors through the museum at a comfortable pace, helping them focus on the exhibits instead of worrying about where to go next.'}
        items={[
          { icon: Bot, title: isRTL ? 'الروبوت يقود بين المعروضات' : 'The Robot Leads Between Exhibits', desc: isRTL ? 'يقود الروبوت الزوار بسلاسة بين المعروضات بإيقاع مريح.' : 'The robot guides visitors smoothly between exhibits at a comfortable pace.' },
          { icon: Map, title: isRTL ? 'خريطة حية والمحطة التالية' : 'Live Map and Next Stop', desc: isRTL ? 'تابع موقعك، المحطة التالية، وتقدّم الجولة في الوقت الفعلي.' : 'Track location, next stop, and tour progress in real time.' },
          { icon: MapPin, title: isRTL ? 'استكشف أي معروضة بمزيد من التفاصيل' : 'Explore Any Exhibit in More Detail', desc: isRTL ? 'افتح محتوى موسَّعاً، صوراً، وتعليقاً صوتياً لأي معروضة.' : 'Open extended content, images, and audio for any exhibit.' },
          { icon: MessageSquare, title: isRTL ? 'اطرح أسئلتك بلغتك' : 'Ask Questions in Your Language', desc: isRTL ? 'اطرح أسئلتك في أي وقت واحصل على إجابات بالعربية، العامية المصرية، الإنجليزية، أو لغات أخرى مدعومة وفقاً لإعداد المتحف.' : 'Ask questions at any time and receive answers in Arabic, Egyptian Arabic, English, or other supported languages depending on the museum setup.' },
        ]}
      />

      <div className="bg-sidebar/15">
        <Stage
          label={isRTL ? 'التفاعل' : 'Engagement'}
          title={isRTL ? 'لحظات صغيرة تبقى معك' : 'Small Moments That Stay With You'}
          items={[
            { icon: Award, title: isRTL ? 'اختبارات قصيرة' : 'Short Quizzes', desc: isRTL ? 'اختبارات قصيرة ترسّخ ما استكشفه الزوار للتو.' : 'Short quizzes reinforce what visitors just explored.' },
            { icon: Award, title: isRTL ? 'تقدُّم محفوظ' : 'Saved Progress', desc: isRTL ? 'يبقى التقدّم والإنجازات محفوظَين عبر كل زياراتك.' : 'Progress and achievements stay saved across visits.' },
            { icon: Camera, title: isRTL ? 'نقاط تصوير' : 'Photo Points', desc: isRTL ? 'التقط لحظات لا تُنسى عند نقاط تصوير منتقاة بعناية على طول الجولة.' : 'Capture memorable moments at curated photo spots throughout the tour.' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="section-label mb-4">{isRTL ? 'إمكانية الوصول' : 'Accessibility'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'تجربة لكل زائر' : 'An Experience for Every Visitor'}</h2>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {isRTL ? 'صُمِّمت لتجعل زيارة المتحف أكثر سلاسة وشمولاً لمختلف احتياجات الزوار.' : 'Created to make the museum experience smoother and more inclusive for different visitor needs.'}
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card className="p-7">
            <Accessibility className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'مسارات بدون درج' : 'Step-Free Routes'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'كل المسارات مصمَّمة لتكون مناسبة للكراسي المتحركة وعربات الأطفال.' : 'All routes are designed to be wheelchair and stroller accessible.'}</p>
          </Card>
          <Card className="p-7">
            <Type className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'حجم نص قابل للتعديل' : 'Adjustable Text Size'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'عدِّل حجم النص وفعّل وضع التباين العالي عند الحاجة.' : 'Adjust text size and enable high-contrast mode when needed.'}</p>
          </Card>
          <Card className="p-7">
            <Volume2 className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'وصف صوتي موسَّع' : 'Extended Audio Descriptions'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'وصف صوتي تفصيلي يدعم الزوار ضعاف البصر.' : 'Detailed audio descriptions support visitors with low vision.'}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
