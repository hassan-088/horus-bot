import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function FaqPage() {
  const { isRTL } = useApp();

  const faqs = isRTL
    ? [
        { q: 'هل عليّ استخدام التطبيق؟', a: 'يُنصح به بشدّة، لأن التطبيق يوفّر للزوار الخرائط، محتوى المعروضات، التذاكر، تقدّم الجولة، والتجربة المتصلة كاملة.' },
        { q: 'ماذا لو كانت كل الروبوتات مشغولة؟', a: 'إذا كانت كل الروبوتات قيد الاستخدام، يُخصَّص الروبوت التالي المتاح في أقرب وقت ممكن. الحجز المبكر يساعد على ضمان فترتك المفضّلة.' },
        { q: 'ما اللغات المدعومة؟', a: 'تدعم التجربة العربية، العامية المصرية، الإنجليزية، ولغات إضافية وفقاً لإعداد المتحف.' },
        { q: 'هل التجربة مناسبة للأطفال؟', a: 'نعم — يتوفر خيار عائلي ودود مع محطات أقصر، شرح أبسط، وألغاز ممتعة بعد كل قسم.' },
        { q: 'هل أحتاج إنترنت؟', a: 'يتوفّر Wi-Fi مجاني داخل المتحف، كما تعمل بياناتك الخلوية أيضاً، فيظل الزوار متصلين طوال الزيارة.' },
        { q: 'ماذا يحدث إذا انقطع الاتصال؟', a: 'لا داعي للقلق — تستمر التجربة، ويعيد التطبيق الاتصال تلقائياً بمجرد عودة الشبكة.' },
        { q: 'هل المتحف مهيَّأ لذوي الاحتياجات الخاصة؟', a: 'نعم — مسارات الروبوت مصمَّمة لتكون بدون درج ومناسبة للكراسي المتحركة، مع وصف صوتي موسَّع متاح للزوار ضعاف البصر.' },
        { q: 'هل يمكنني الإلغاء أو تغيير الموعد؟', a: 'نعم — يمكن للزوار الإلغاء حتى 24 ساعة قبل الزيارة لاسترداد كامل، أو تغيير الموعد عبر الرابط الموجود في بريد التذكرة.' },
      ]
    : [
        { q: 'Do I have to use the app?', a: 'The app is strongly recommended because it gives visitors maps, exhibit content, tickets, tour progress, and the full connected experience.' },
        { q: 'What if all robots are busy?', a: 'If all robots are in use, the next available robot is assigned as soon as possible. Booking early helps secure your preferred time slot.' },
        { q: 'Which languages are supported?', a: 'The experience supports Arabic, Egyptian Arabic, English, and additional languages depending on the museum setup.' },
        { q: 'Is it suitable for children?', a: 'Yes — there is a family-friendly option with shorter stops, simpler narration, and fun puzzles after each section.' },
        { q: 'Do I need internet?', a: 'Free Wi-Fi is available at the museum, and mobile data also works so visitors can stay connected throughout the visit.' },
        { q: 'What happens if I get disconnected?', a: 'No worries — the experience continues, and the app reconnects automatically when the connection returns.' },
        { q: 'Is the museum wheelchair accessible?', a: 'Yes — robot-led routes are designed to be step-free and wheelchair accessible, with extended audio descriptions available for low-vision visitors.' },
        { q: 'Can I cancel or reschedule?', a: 'Yes — visitors can cancel up to 24 hours before the visit for a full refund, or reschedule using the link in the ticket email.' },
      ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
        title={isRTL ? 'أسئلة قد تشغل بالك' : 'Questions you might have'}
        subtitle={isRTL ? 'إجابات واضحة قبل أن تحجز.' : 'Clear answers before you book.'}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-16">
        <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border/60 bg-card px-5">
              <AccordionTrigger className="font-serif text-base text-foreground hover:text-primary hover:no-underline text-start">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            {isRTL ? 'لا تزال لديك أسئلة؟' : 'Still Have Questions?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'احجز زيارتك واختبرها بنفسك.' : 'Book your visit and experience it for yourself.'}
          </p>
          <Button asChild size="lg">
            <Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book your visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
