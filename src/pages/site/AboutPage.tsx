import { Target, Eye, Lightbulb, Users, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AboutPage() {
  const { isRTL } = useApp();

  const team = [
    { name: isRTL ? 'الفريق الإبداعي' : 'Creative Team', role: isRTL ? 'تصميم وتجربة' : 'Design & Experience' },
    { name: isRTL ? 'فريق الروبوتات' : 'Robotics Team', role: isRTL ? 'هندسة' : 'Engineering' },
    { name: isRTL ? 'فريق الذكاء الاصطناعي' : 'AI Team', role: isRTL ? 'بحث وتطوير' : 'Research & Dev' },
  ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'من نحن' : 'About'}
        title={isRTL ? 'إعادة تخيّل تجربة المتحف' : 'Reimagining the museum visit'}
        subtitle={isRTL ? 'نمزج بين التراث والتقنية لخلق تجربة لا تُنسى.' : 'We blend heritage with technology to craft unforgettable experiences.'}
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <FeatureCard icon={Target} title={isRTL ? 'مهمتنا' : 'Mission'} description={isRTL ? 'جعل التراث الثقافي حياً وقابلاً للوصول للجميع.' : 'Make cultural heritage alive and accessible to everyone.'} />
          <FeatureCard icon={Eye} title={isRTL ? 'رؤيتنا' : 'Vision'} description={isRTL ? 'مستقبل تكون فيه المتاحف ذكية وشخصية.' : 'A future where museums are smart and personal.'} />
        </div>
      </section>

      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-5xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'الفكرة' : 'The Idea'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'مشكلة وحل' : 'A problem and a solution'}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-7">
              <div className="section-label mb-3 text-destructive/80">{isRTL ? 'المشكلة' : 'Problem'}</div>
              <p className="text-muted-foreground leading-relaxed">{isRTL ? 'الزوار يضيعون أو يشعرون بالملل أو الإرهاق من كثرة المعروضات.' : 'Visitors get lost, bored, or overwhelmed by the volume of exhibits.'}</p>
            </Card>
            <Card className="p-7">
              <div className="section-label mb-3 text-primary">{isRTL ? 'الحل' : 'Solution'}</div>
              <p className="text-muted-foreground leading-relaxed">{isRTL ? 'مرشد روبوت ذكي يعمل مع تطبيق تفاعلي للحصول على تجربة موجهة.' : 'A smart robot guide working with an interactive app for a guided journey.'}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'الفريق' : 'Team'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'صانعو التجربة' : 'The makers'}</h2>
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
      </section>

      <section className="bg-sidebar/40 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'التقنية' : 'Technology'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'البنية التحتية' : 'Built on modern foundations'}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <FeatureCard icon={Cpu} title={isRTL ? 'الذكاء الاصطناعي' : 'AI'} description={isRTL ? 'محادثات طبيعية بنماذج لغوية متقدمة.' : 'Natural conversations with advanced language models.'} />
            <FeatureCard icon={Lightbulb} title={isRTL ? 'الروبوتات' : 'Robotics'} description={isRTL ? 'روبوت متحرك بدقة في المساحات.' : 'A mobile robot navigating spaces with precision.'} />
            <FeatureCard icon={Cpu} title={isRTL ? 'تطبيق الجوال' : 'Mobile App'} description={isRTL ? 'يعمل على iOS و Android.' : 'Available on iOS and Android.'} />
          </div>
        </div>
      </section>
    </>
  );
}
