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
        { q: 'هل يجب استخدام التطبيق؟', a: 'موصى به بشدّة. معظم الزوار يستخدمون التطبيق للتنقل بسهولة، الوصول إلى محتوى المعروضات، والحصول على التجربة الكاملة. بدونه ستحصل على إرشاد الروبوت، لكنك ستفقد الخريطة والاختبارات والمحتوى التفصيلي.' },
        { q: 'ماذا لو كانت كل الروبوتات مشغولة؟', a: 'لا تقلق. يعمل في المتحف ما يصل إلى 8 روبوتات بالتوازي، ويوجّهك التطبيق تلقائياً إلى الروبوت التالي المتاح. وقت الانتظار في الذروة عادةً أقل من 5 دقائق.' },
        { q: 'كم تستغرق التجربة كاملةً؟', a: 'الجولات مصمَّمة لتناسب وقتك: 30 أو 60 أو 90 دقيقة، مع خيار جولة عائلية أقصر تناسب الأطفال.' },
        { q: 'ما اللغات المدعومة؟', a: 'العربية والإنجليزية بالكامل — صوتاً ونصاً — عبر الروبوت والتطبيق معاً، مع تخطيط RTL أصلي.' },
        { q: 'هل التجربة مناسبة للأطفال؟', a: 'نعم. تتوفر جولة عائلية بمدة 45 دقيقة بمحطات أقصر، لغة أبسط، وألغاز قصيرة بعد كل قاعة.' },
        { q: 'هل أحتاج إلى إنترنت؟', a: 'نعم. يوفّر المتحف شبكة Wi-Fi مجانية، كما تعمل بياناتك الخلوية أيضاً — لتبقى متّصلاً بالتجربة طوال الزيارة.' },
        { q: 'ماذا يحدث إذا انقطع الاتصال؟', a: 'تستمر التجربة، ويعيد التطبيق الاتصال تلقائياً بمجرد عودة الإنترنت، دون أي تدخّل منك.' },
        { q: 'هل المتحف مهيَّأ لذوي الاحتياجات الخاصة؟', a: 'نعم. كل المسارات التي يقودها الروبوت بدون درج ومناسبة للكراسي المتحركة، مع وضع وصف صوتي موسَّع للزوار ضعاف البصر.' },
        { q: 'هل يمكنني الإلغاء أو تغيير الموعد؟', a: 'بالطبع. يمكنك الإلغاء حتى 24 ساعة قبل الزيارة واسترداد المبلغ كاملاً، أو تغيير الموعد مجاناً من رابط التذكرة في بريدك.' },
      ]
    : [
        { q: 'Do I have to use the app?', a: 'Strongly recommended. Most visitors use the app to navigate easily, access exhibit information, and get the full experience. Without it you still get the robot escort, but you lose the map, the quizzes, and the detailed content.' },
        { q: 'What if all robots are busy?', a: 'No need to worry. Up to 8 robots run in parallel, and the app automatically routes you to the next available one. Wait time at peak is typically under 5 minutes.' },
        { q: 'How long does the full experience take?', a: 'Tours are designed to fit your time — 30, 60, or 90 minutes, with a shorter family-friendly option also available.' },
        { q: 'Which languages are supported?', a: 'English and Arabic, fully — audio and text — through both the robot and the app, with native RTL layout.' },
        { q: 'Is it suitable for children?', a: 'Yes. A 45-minute Family preset is available with shorter stops, simpler narration, and short puzzles after each hall.' },
        { q: 'Do I need internet?', a: 'Yes. Free Wi-Fi is available at the museum, and mobile data also works — so you can stay connected to the experience throughout your visit.' },
        { q: 'What happens if I get disconnected?', a: 'The experience continues, and the app reconnects automatically once your connection returns — no action needed from you.' },
        { q: 'Is the museum wheelchair accessible?', a: 'Yes. All robot-led routes are step-free and wheelchair friendly, and an extended audio description mode is available for low-vision visitors.' },
        { q: 'Can I cancel or reschedule?', a: 'Of course. Cancel up to 24 hours before your visit for a full refund, or reschedule for free using the link in your ticket email.' },
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
            {isRTL ? 'لا تزال لديك أسئلة؟' : 'Still have questions?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'احجز زيارتك وعشها بنفسك.' : 'Book your visit and experience it firsthand.'}
          </p>
          <Button asChild size="lg">
            <Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book your visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
