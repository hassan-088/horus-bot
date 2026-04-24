import { Target, Eye, Users, Map, BookOpen, Languages, BatteryLow, Compass, Route, Volume2, Award, Building2, Bot, Smartphone, Accessibility } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AboutPage() {
  const { isRTL } = useApp();

  const team = [
    { name: isRTL ? 'المنتج والتجربة' : 'Product & Experience', role: isRTL ? 'تصميم كيفية تنقّل الزوار وتفاعلهم واستمتاعهم بالرحلة.' : 'Designing how visitors move, interact, and enjoy the journey.' },
    { name: isRTL ? 'فريق الروبوتات' : 'Robotics Team', role: isRTL ? 'بناء الحركة الذاتية والإرشاد الفيزيائي.' : 'Building autonomous movement and physical guidance.' },
    { name: isRTL ? 'فريق الذكاء والمحتوى' : 'AI & Content Team', role: isRTL ? 'تشغيل شروحات المعروضات والتفاعل مع الزوار.' : 'Powering exhibit narration and visitor interaction.' },
    { name: isRTL ? 'تجربة الجوال' : 'Mobile Experience', role: isRTL ? 'إنشاء التطبيق المرافق ورحلة المستخدم بالكامل.' : 'Creating the companion app and full user journey.' },
  ];

  const problems = [
    { icon: Map, title: isRTL ? 'الزوار يفقدون الوقت والطاقة في التنقل بين القاعات' : 'Visitors lose time and energy navigating large museum spaces', desc: isRTL ? 'قد تبدو المتاحف الكبيرة مربكة عندما لا يعرف الزوار أين يذهبون أو ماذا يشاهدون بعد ذلك.' : 'Large museums can feel confusing when visitors are unsure where to go or what to see next.' },
    { icon: BookOpen, title: isRTL ? 'كثرة المعلومات تُصعِّب التركيز' : 'Too much information makes it hard to focus', desc: isRTL ? 'لوحات المعروضات الطويلة قد تُربك الزوار بدلاً من مساعدتهم على فهم القصة وراء كل قطعة.' : 'Long exhibit panels can overwhelm visitors instead of helping them understand the story behind each piece.' },
    { icon: Languages, title: isRTL ? 'حواجز اللغة تحدّ من التجربة' : 'Language barriers limit the experience', desc: isRTL ? 'يُفوِّت كثير من الزوار سياقاً ثقافياً مهماً عندما لا يتوفّر الإرشاد بلغة يفهمونها.' : 'Many visitors miss important cultural context when guidance is not available in a language they understand.' },
    { icon: BatteryLow, title: isRTL ? 'الزوار يتنقّلون بسرعة دون تفاعل' : 'Visitors often move quickly without engaging', desc: isRTL ? 'قد تتحوّل الزيارات الذاتية إلى مرور سريع، مع تفاعل قليل وذاكرة محدودة بعد الزيارة.' : 'Self-guided visits can become a fast walk-through, with little interaction or memory afterward.' },
    { icon: Building2, title: isRTL ? 'المتاحف تواجه ضغطاً في ساعات الذروة' : 'Museums face pressure during peak hours', desc: isRTL ? 'تحتاج المتاحف غالباً إلى استيعاب أعداد كبيرة من الزوار بينما تظل أعداد المرشدين محدودة.' : 'Museums often need to support large visitor numbers while guide availability remains limited.' },
  ];

  const solutions = [
    { icon: Compass, title: isRTL ? 'إرشاد حي داخل المتحف' : 'Live Guidance Inside the Museum', desc: isRTL ? 'يحصل الزوار على إرشاد لحظي عبر قاعات المتحف دون الاعتماد فقط على اللافتات أو الخرائط الثابتة.' : 'Visitors receive real-time guidance through museum spaces without relying only on signs or static maps.' },
    { icon: Route, title: isRTL ? 'جولات مبنيّة حول وقت الزائر' : 'Tours Built Around Visitor Time', desc: isRTL ? 'تتكيّف مسارات الجولة مع وقت الزائر واهتماماته، لتجربة أكثر راحةً وتركيزاً.' : 'Tour routes adapt to visitor time and interests, creating a more comfortable and focused experience.' },
    { icon: Languages, title: isRTL ? 'دعم لغوي شامل' : 'Full Language Support', desc: isRTL ? 'يمكن للزوار متابعة التجربة بالعربية، العامية المصرية، الإنجليزية، ولغات أخرى مدعومة وفقاً لإعداد المتحف.' : 'Visitors can follow the experience in Arabic, Egyptian Arabic, English, and other supported languages depending on the museum setup.' },
    { icon: Award, title: isRTL ? 'تفاعل يبقى في الذاكرة' : 'Interaction That Sticks', desc: isRTL ? 'لحظات تفاعلية موزَّعة طوال الجولة تُبقي الزوار منخرطين وتساعدهم على تذكُّر ما عاشوه.' : 'Interactive moments throughout the tour keep visitors engaged and help them remember what they experienced.' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'من نحن' : 'About'}
        title={isRTL ? 'لماذا يوجد حورس-بوت' : 'Why Horus-Bot Exists'}
        subtitle={isRTL ? 'مبنيٌّ ليجعل زيارة المتحف أكثر وضوحاً وتفاعلاً، وأسهل في الإدارة داخل بيئات المتاحف الحقيقية.' : 'Built to make museum visits clearer, more engaging, and easier to manage in real museum environments.'}
      />

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4 text-destructive/80">{isRTL ? 'المشكلة' : 'The Problem'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يواجهه الزوار والمتاحف اليوم' : 'What Visitors and Museums Deal With Today'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.desc} />)}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4 text-primary">{isRTL ? 'الحل' : 'The Solution'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'كيف يعالج حورس-بوت هذه التحديات' : 'How Horus-Bot Solves These Challenges'}</h2>
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
                ? 'جعل زيارة المتحف أكثر وضوحاً وتفاعلاً، وفي متناول كل زائر.'
                : 'Make museum visits clearer, more engaging, and accessible for every visitor.'}
            </p>
          </Card>
          <Card className="p-7">
            <Eye className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-3">{isRTL ? 'رؤيتنا' : 'Vision'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'تقديم تجارب موجَّهة ذكية وقابلة للتوسّع لمتاحف المنطقة.'
                : 'Bring smart, scalable guided experiences to museums across the region.'}
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
              ? 'يطوّر حورس-بوت فريق يجمع بين تصميم المنتج، الروبوتات، وتجارب الزوار المدعومة بالذكاء.'
              : 'Horus-Bot is developed by a team combining product design, robotics, and AI-driven visitor experiences.'}
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
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ما يقدّمه النظام للزوار والمتاحف' : 'What the System Delivers to Visitors and Museums'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Bot} title={isRTL ? 'إرشاد ذاتي القيادة' : 'Autonomous Guidance'} description={isRTL ? 'يتنقّل بأمان داخل قاعات المتحف المعقّدة ويدعم جولات موجَّهة منظَّمة.' : 'Moves safely through complex museum spaces and supports structured guided visits.'} />
          <FeatureCard icon={Volume2} title={isRTL ? 'شروحات ذكية للمعروضات' : 'Intelligent Exhibit Narration'} description={isRTL ? 'يقدّم شروحات واضحة للمعروضات ويُجيب على أسئلة الزوار أثناء الجولة.' : 'Delivers clear exhibit explanations and responds to visitor questions during the tour.'} />
          <FeatureCard icon={Smartphone} title={isRTL ? 'تطبيق زائر مرافق' : 'Companion Visitor App'} description={isRTL ? 'يدعم التنقل، استكشاف المعروضات، التذاكر، والتفاعل عبر الزيارة بأكملها.' : 'Supports navigation, exhibit exploration, tickets, and interaction across the entire visit.'} />
          <FeatureCard icon={Accessibility} title={isRTL ? 'تفاعل في متناول الجميع' : 'Accessible Interaction'} description={isRTL ? 'مزايا إمكانية الوصول تجعل التجربة أكثر سلاسة وشمولاً لمختلف الزوار.' : 'Provides accessibility features that make the experience smoother and more inclusive for different visitors.'} />
        </div>
      </section>
    </>
  );
}
