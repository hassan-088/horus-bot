import { Target, Eye, Users, Map, BookOpen, Languages, BatteryLow, Compass, Route, Volume2, Award, Building2, Bot, Smartphone, Accessibility } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AboutPage() {
  const { isRTL } = useApp();

  const team = [
    { name: isRTL ? 'المنتج والتجربة' : 'Product & Experience', role: isRTL ? 'تصميم الجولات وانسياب رحلة الزائر' : 'Tour design and visitor flow' },
    { name: isRTL ? 'فريق الروبوتات' : 'Robotics Team', role: isRTL ? 'حركة الروبوت والإرشاد الفيزيائي' : 'Robot movement and physical guidance' },
    { name: isRTL ? 'الذكاء والمحتوى' : 'AI & Content Team', role: isRTL ? 'شروحات المعروضات والإجابة على أسئلة الزوار' : 'Exhibit narration and visitor questions' },
    { name: isRTL ? 'تجربة الجوال' : 'Mobile Experience', role: isRTL ? 'التطبيق المرافق والتفاعل أثناء الزيارة' : 'Companion app and visitor interaction' },
  ];

  const problems = [
    { icon: Map, title: isRTL ? 'الزوار يضيعون داخل القاعات' : 'Visitors get lost between halls', desc: isRTL ? 'المتاحف الكبيرة بدون لافتات واضحة تجعل التنقل مرهقاً وتقلّل وقت الاستكشاف الفعلي.' : 'Large museums with unclear signage make moving around exhausting and shrink real exploration time.' },
    { icon: BookOpen, title: isRTL ? 'كثرة المعلومات تربك الزائر' : 'Information overload', desc: isRTL ? 'لوحات نصية طويلة عند كل قطعة دون ترتيب أولويات.' : 'Long text panels at every piece, with no prioritization.' },
    { icon: Languages, title: isRTL ? 'حواجز اللغة' : 'Language barriers', desc: isRTL ? 'الشروحات متاحة بلغة واحدة، والمرشدون البشريون غير متوفرين دائماً.' : 'Captions are often single-language and human guides are not always available.' },
    { icon: BatteryLow, title: isRTL ? 'ضعف التفاعل' : 'Low engagement', desc: isRTL ? 'الجولات الذاتية تتحول بسرعة إلى مرور سريع بدون تذكر شيء.' : 'Self-guided visits often turn into a fast walk-through with little retained.' },
    { icon: Building2, title: isRTL ? 'ضغط على الفريق في ساعات الذروة' : 'Guide pressure during peak hours', desc: isRTL ? 'تحتاج المتاحف إلى استيعاب أعداد كبيرة من الزوار مع توفر محدود للمرشدين، خصوصاً في الأوقات المزدحمة.' : 'Museums often need to support large visitor numbers with limited guide availability, especially during peak hours.' },
  ];

  const solutions = [
    { icon: Compass, title: isRTL ? 'إرشاد حي داخل المتحف' : 'Live guidance inside the museum', desc: isRTL ? 'يحصل الزوار على إرشاد لحظي عبر القاعات دون الاعتماد فقط على اللافتات أو الخرائط الثابتة.' : 'Visitors receive live guidance through museum spaces without relying only on signs or static maps.' },
    { icon: Route, title: isRTL ? 'جولات مبنيّة حول وقتك' : 'Tours built around your time', desc: isRTL ? 'الجولات منظَّمة حسب الوقت والاهتمامات لتشعر بأن التجربة موجَّهة لا مرهقة.' : 'Tours are structured around visitor time and interests so the experience feels guided, not overwhelming.' },
    { icon: Volume2, title: isRTL ? 'لغتان كاملتان طوال الزيارة' : 'Two full languages throughout', desc: isRTL ? 'يمكن للزوار اتباع الجولة بالعربية أو الإنجليزية عبر الروبوت والتطبيق معاً.' : 'Visitors can follow the tour in English or Arabic through both the robot and the app.' },
    { icon: Award, title: isRTL ? 'تفاعل يبقى في الذاكرة' : 'Interaction that sticks', desc: isRTL ? 'لحظات تفاعل خفيفة بعد كل قسم تساعد الزوار على تذكّر ما رأوه فعلاً.' : 'Small interaction moments after each section help visitors actually remember what they saw.' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'من نحن' : 'About'}
        title={isRTL ? 'لماذا يوجد حورس-بوت' : 'Why Horus-Bot exists'}
        subtitle={isRTL ? 'مبنيٌّ ليعمل داخل بيئات متاحف حقيقية، لا كمجرد فكرة.' : 'Built to operate in real museum environments, not just as a concept.'}
      />

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4 text-destructive/80">{isRTL ? 'المشكلة' : 'The Problem'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يواجهه الزوار والمتاحف اليوم' : 'What visitors and museums deal with today'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.desc} />)}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4 text-primary">{isRTL ? 'الحل' : 'The Solution'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يقدّمه حورس-بوت لكل مشكلة' : 'What Horus-Bot brings to each problem'}</h2>
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
                ? 'ضمان حصول كل زائر على معلومات واضحة، موجَّهة، ومتاحة بلغته، مهما كانت ظروف الازدحام.'
                : "Ensure every museum visitor receives clear, guided, and accessible information regardless of language or crowd conditions."}
            </p>
          </Card>
          <Card className="p-7">
            <Eye className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-3">{isRTL ? 'رؤيتنا' : 'Vision'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'نشر حورس-بوت في متاحف المنطقة لجعل الجولات الموجَّهة قابلة للتوسّع والوصول والاتساق.'
                : 'Deploy Horus-Bot across museums in the region to make guided visits more scalable, accessible, and consistent.'}
            </p>
          </Card>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'الفريق' : 'Team'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'من يبني حورس-بوت' : 'Who builds Horus-Bot'}</h2>
          <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            {isRTL
              ? 'يتكوّن فريق حورس-بوت من تخصصات متعددة تجمع بين تصميم تجربة الزائر، الروبوتات، وتقنيات الإرشاد الذكية.'
              : 'Horus-Bot is built by a multidisciplinary team combining visitor experience design, robotics, and intelligent guidance technologies.'}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Card key={m.name} className="p-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-base">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-snug">{m.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'القدرات' : 'Capabilities'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يقدّمه النظام للزائر والمتحف' : 'What the system delivers to visitors and museums'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Bot} title={isRTL ? 'إرشاد ذاتي القيادة' : 'Autonomous Guidance'} description={isRTL ? 'مصمَّم للتحرّك بأمان داخل قاعات المتاحف ودعم جولات موجَّهة منظَّمة.' : 'Designed to move through museum spaces safely and support structured guided visits.'} />
          <FeatureCard icon={Volume2} title={isRTL ? 'شروحات ذكية للمعروضات' : 'Intelligent Exhibit Narration'} description={isRTL ? 'تقديم شروحات واضحة ومتسقة لكل قطعة، مع دعم أسئلة الزوار أثناء الجولة.' : 'Delivers clear and consistent explanations while supporting visitor questions during the tour.'} />
          <FeatureCard icon={Smartphone} title={isRTL ? 'تطبيق مرافق للزائر' : 'Companion Visitor App'} description={isRTL ? 'يدعم التنقل، محتوى المعروضات، والتفاعل قبل الزيارة وأثناءها وبعدها.' : 'Supports navigation, exhibit information, and interaction before, during, and after the visit.'} />
          <FeatureCard icon={Accessibility} title={isRTL ? 'تفاعل متاح للجميع' : 'Accessible Interaction'} description={isRTL ? 'مسارات وأدوات تجعل التجربة قابلة للاستخدام من قِبَل زوار بقدرات مختلفة.' : 'Routes and tools that keep the experience usable for visitors with different abilities.'} />
        </div>
      </section>
    </>
  );
}
