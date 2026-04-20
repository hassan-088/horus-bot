import { Target, Eye, Users, Cpu, Map, BookOpen, Languages, BatteryLow, Compass, Route, Volume2, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AboutPage() {
  const { isRTL } = useApp();

  const team = [
    { name: isRTL ? 'فريق المنتج والتجربة' : 'Product & Experience', role: isRTL ? 'تصميم الجولات وواجهة التطبيق' : 'Tour design and app interface' },
    { name: isRTL ? 'فريق الروبوتات' : 'Robotics Team', role: isRTL ? 'هندسة المنصة المتحركة والمستشعرات' : 'Mobile platform and sensors engineering' },
    { name: isRTL ? 'فريق الذكاء الاصطناعي' : 'AI Team', role: isRTL ? 'فهم اللغة وتوليد شروحات المعروضات' : 'Language understanding and exhibit narration' },
  ];

  const problems = [
    { icon: Map, title: isRTL ? 'الزوار يضيعون داخل القاعات' : 'Visitors get lost between halls', desc: isRTL ? 'المتاحف الكبيرة بدون لافتات واضحة تجعل التنقل مرهقاً.' : 'Large museums with unclear signage make moving around exhausting.' },
    { icon: BookOpen, title: isRTL ? 'كثرة المعلومات تربك الزائر' : 'Information overload', desc: isRTL ? 'لوحات نصية طويلة عند كل قطعة دون ترتيب أولويات.' : 'Long text panels at every piece, with no prioritization.' },
    { icon: Languages, title: isRTL ? 'حواجز اللغة' : 'Language barriers', desc: isRTL ? 'الشروحات متاحة بلغة واحدة، والمرشدون البشريون غير متوفرين دائماً.' : 'Captions are often single-language and human guides are not always available.' },
    { icon: BatteryLow, title: isRTL ? 'ضعف التفاعل' : 'Low engagement', desc: isRTL ? 'الجولات الذاتية تتحول بسرعة إلى مرور سريع بدون تذكر شيء.' : 'Self-guided visits often turn into a fast walk-through with little retained.' },
  ];

  const solutions = [
    { icon: Compass, title: isRTL ? 'تموضع داخلي + مرافقة من الروبوت' : 'Indoor positioning + robot escort', desc: isRTL ? 'منارات Bluetooth وروبوت يقود المجموعة، فلا يحتاج الزائر لقراءة خرائط.' : 'Bluetooth beacons and a robot that leads the group, so visitors never need to read a map.' },
    { icon: Route, title: isRTL ? 'مسارات منسقة (30 / 60 / 90 د)' : 'Curated 30 / 60 / 90-minute paths', desc: isRTL ? 'ترتيب المعروضات حسب وقتك المتاح بدلاً من تركك للحظ.' : 'Exhibits sequenced for the time you have, instead of leaving it to chance.' },
    { icon: Volume2, title: isRTL ? 'صوت ونص بالعربية والإنجليزية' : 'Full EN/AR voice and text', desc: isRTL ? 'كل شرح متاح بكلتا اللغتين عبر الروبوت والتطبيق في الوقت ذاته.' : 'Every narration is available in both languages, via robot speech and app text simultaneously.' },
    { icon: Award, title: isRTL ? 'اختبارات قصيرة وشارات' : 'Short quizzes and collectible badges', desc: isRTL ? 'تفاعل خفيف بعد كل قاعة يعزز الفهم ويُذكر الزائر بما رآه.' : 'Light interaction after each hall reinforces what the visitor just saw.' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'من نحن' : 'About'}
        title={isRTL ? 'منتج حقيقي للمتاحف الحديثة' : 'A real product for modern museums'}
        subtitle={isRTL ? 'نبني نظام إرشاد متاحف يعمل في القاعات الفعلية، لا فكرة مفهومية.' : 'We build a museum guidance system that operates in real galleries, not a concept.'}
      />

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4 text-destructive/80">{isRTL ? 'المشكلة' : 'The Problem'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يواجهه الزائر اليوم' : 'What visitors deal with today'}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {problems.map((p) => <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.desc} />)}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4 text-primary">{isRTL ? 'الحل' : 'The Solution'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'كيف يعالج حورس-بوت كل مشكلة' : 'How Horus-Bot addresses each problem'}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {solutions.map((s) => <FeatureCard key={s.title} icon={s.icon} title={s.title} description={s.desc} />)}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-7">
            <Target className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-3">{isRTL ? 'مهمتنا' : 'Mission'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'جعل كل زيارة متحف موجهة شخصياً، بإيقاع مريح، ومفهومة بلغة الزائر نفسه.'
                : "Make every museum visit personally guided, well-paced, and understood in the visitor's own language."}
            </p>
          </Card>
          <Card className="p-7">
            <Eye className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-3">{isRTL ? 'رؤيتنا' : 'Vision'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'تجهيز 50 متحفاً في المنطقة بإرشاد ذاتي بحلول 2030، وتقليل الاعتماد على الجولات بمرشدين بشريين وطوابير الانتظار.'
                : 'Equip 50 museums across the region with autonomous guidance by 2030, reducing dependence on staffed tours and entry queues.'}
            </p>
          </Card>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'الفريق' : 'Team'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'من يبني حورس-بوت' : 'Who builds Horus-Bot'}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Card key={m.name} className="p-7 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'التقنية' : 'Technology'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'المكونات الفنية الأساسية' : 'Core technical components'}</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <FeatureCard icon={Cpu} title={isRTL ? 'الذكاء الاصطناعي' : 'AI Models'} description={isRTL ? 'نماذج لغوية تجيب على أسئلة الزوار وتولد شروحات المعروضات بكلتا اللغتين.' : 'Language models that answer visitor questions and generate exhibit narration in both languages.'} />
          <FeatureCard icon={Compass} title={isRTL ? 'منصة الروبوت' : 'Robot Platform'} description={isRTL ? 'قاعدة متحركة بـLiDAR وكاميرا عمق وحزمة ROS لملاحة آمنة بين الزوار.' : 'A mobile base with LiDAR, depth camera, and a ROS stack for safe navigation around visitors.'} />
          <FeatureCard icon={Cpu} title={isRTL ? 'تطبيق الجوال' : 'Mobile App'} description={isRTL ? 'مبني بـReact Native مع تموضع داخلي عبر Bluetooth، يعمل على iOS و Android.' : 'Built with React Native, with Bluetooth-based indoor positioning, on iOS and Android.'} />
        </div>
      </section>
    </>
  );
}
