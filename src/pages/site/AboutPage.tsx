import { Target, Eye, Users, Map, BookOpen, Languages, BatteryLow, Compass, Route, Award, Building2, Bot, Smartphone, Accessibility } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
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

  const scope = [
    { icon: Bot, en: 'Autonomous robot guidance inside the museum', ar: 'إرشاد روبوتي ذاتي داخل المتحف' },
    { icon: Smartphone, en: 'Companion app for tickets, pairing, maps, and tour continuity', ar: 'تطبيق مرافق للتذاكر والاقتران والخرائط واستمرارية الجولة' },
    { icon: Route, en: 'Website booking and route planning before arrival', ar: 'حجز وتخطيط للمسار عبر الموقع قبل الوصول' },
    { icon: Accessibility, en: 'Accessibility-aware visitor preferences', ar: 'تفضيلات زيارة تراعي احتياجات الوصول' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'من نحن' : 'About'}
        title={isRTL ? 'لماذا يوجد حورس-بوت' : 'Why Horus-Bot Exists'}
        subtitle={isRTL ? 'مبنيٌّ ليجعل زيارة المتحف أكثر وضوحاً وتفاعلاً، وأسهل في الإدارة داخل بيئات المتاحف الحقيقية.' : 'Built to make museum visits clearer, more engaging, and easier to manage in real museum environments.'}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="section-label mb-4 text-destructive/80">{isRTL ? 'المشكلة' : 'The Problem'}</div>
          <h2 className="font-serif text-3xl md:text-5xl mb-5">{isRTL ? 'المتاحف الكبيرة تحتاج إرشاداً أوضح، وليس ضوضاء أكثر' : 'Large museums need clearer guidance, not more noise'}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isRTL
              ? 'حورس-بوت يبدأ من مشكلة تشغيلية وإنسانية واضحة: الزائر يريد طريقاً مفهوماً وقصة جيدة، والمتحف يحتاج تجربة قابلة للتوسع.'
              : 'Horus-Bot starts from a clear operational and human problem: visitors need a readable path and a good story; museums need an experience that can scale.'}
          </p>
        </div>
        <div className="divide-y divide-border/60">
          {problems.map((p) => (
            <div key={p.title} className="grid gap-3 py-5 sm:grid-cols-[40px_1fr]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-primary/20 bg-card/70 p-6 md:p-8">
            <div className="section-label mb-4 text-primary">{isRTL ? 'الحل' : 'The Solution'}</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'نظام زيارة متصل، لا مجرد روبوت' : 'A connected visit system, not just a robot'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'الموقع يجهّز الزيارة، التطبيق يحمل التذاكر والجولة، والروبوت يقود التجربة داخل المتحف. كل جزء له دور واضح.'
                : 'The website prepares the visit, the app carries tickets and the tour, and the robot guides the in-museum experience. Each part has a clear role.'}
            </p>
          </div>
          <div className="space-y-4">
            {solutions.map((s) => (
              <div key={s.title} className="flex gap-4">
                <s.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-serif text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-7 md:p-8">
            <Target className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-xl mb-3">{isRTL ? 'مهمتنا' : 'Mission'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'جعل زيارة المتحف أكثر وضوحاً وتفاعلاً، وفي متناول كل زائر.'
                : 'Make museum visits clearer, more engaging, and accessible for every visitor.'}
            </p>
          </Card>
          <Card className="p-7 md:p-8">
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

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-label mb-4">{isRTL ? 'الموقع' : 'Positioning'}</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'مشروع متحف-تقني بحدود واضحة' : 'A museum-tech product with clear boundaries'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL
                ? 'حورس-بوت ليس صفحة تسويق فقط ولا تطبيقاً منفصلاً فقط؛ هو تجربة زيارة كاملة موزعة بين الموقع والتطبيق والروبوت.'
                : 'Horus-Bot is not just a marketing site or a standalone app; it is a complete visit experience distributed across website, app, and robot.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {scope.map((item) => (
              <div key={item.en} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm leading-relaxed text-foreground/90">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="mb-10 max-w-3xl">
          <div className="section-label mb-4">{isRTL ? 'الفريق' : 'Team'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'تخصصات تعمل حول رحلة واحدة' : 'Disciplines working around one visit journey'}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isRTL
              ? 'يطوّر حورس-بوت فريق يجمع بين تصميم المنتج، الروبوتات، وتجارب الزوار المدعومة بالذكاء.'
              : 'Horus-Bot is developed by a team combining product design, robotics, and AI-driven visitor experiences.'}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="border-s border-primary/30 ps-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-base">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-snug">{m.role}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
