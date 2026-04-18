import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function FaqPage() {
  const { isRTL } = useApp();

  const faqs = isRTL
    ? [
        { q: 'هل أحتاج التطبيق؟', a: 'يُنصح به بشدة. التطبيق يعزز تجربتك بمرشد ذكي وخرائط تفاعلية.' },
        { q: 'هل يمكنني الزيارة بدون حجز؟', a: 'الحجز المسبق مفضّل لضمان دخولك في الوقت المناسب.' },
        { q: 'ما اللغات المدعومة؟', a: 'العربية والإنجليزية، مع دعم RTL كامل.' },
        { q: 'هل الروبوت متوفر دائماً؟', a: 'نعم، خلال ساعات عمل المتحف.' },
        { q: 'هل التجربة مناسبة للأطفال؟', a: 'بالطبع! لدينا اختبارات ومحتوى ممتع لكل الأعمار.' },
        { q: 'هل المتحف مهيأ لذوي الاحتياجات الخاصة؟', a: 'نعم، مع مسارات ميسّرة وميزات إمكانية الوصول.' },
      ]
    : [
        { q: 'Do I need the app?', a: 'Highly recommended. It enhances your visit with a smart guide and interactive maps.' },
        { q: 'Can I visit without booking?', a: 'Pre-booking is preferred to guarantee timed entry.' },
        { q: 'What languages are supported?', a: 'English and Arabic, with full RTL support.' },
        { q: 'Is the robot always available?', a: 'Yes, during museum operating hours.' },
        { q: 'Is it suitable for kids?', a: 'Absolutely! We have quizzes and fun content for all ages.' },
        { q: 'Is the museum accessible?', a: 'Yes, with accessible paths and accessibility features.' },
      ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
        title={isRTL ? 'أسئلة قد تشغل بالك' : 'Questions you might have'}
        subtitle={isRTL ? 'لم تجد إجابتك؟ تواصل معنا.' : 'Did not find your answer? Get in touch.'}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border/60 bg-card px-5">
              <AccordionTrigger className="font-serif text-base text-foreground hover:text-primary hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
