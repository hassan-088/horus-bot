import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function FaqPage() {
  const { isRTL } = useApp();

  const faqs = isRTL
    ? [
        { q: 'هل يجب استخدام التطبيق؟', a: 'موصى به بشدة. بدون التطبيق ستحصل على المرافقة من الروبوت، لكن لن تتوفر الخريطة الداخلية والاختبارات والمكتبة التفصيلية للمعروضات.' },
        { q: 'ماذا لو كانت كل الروبوتات مشغولة؟', a: 'يعمل في المتحف ما يصل إلى 8 روبوتات بالتوازي. يقوم النظام بتوجيهك إلى أول روبوت متاح، وعادة لا يتجاوز وقت الانتظار 5 دقائق في ساعات الذروة.' },
        { q: 'ما اللغات المدعومة؟', a: 'العربية والإنجليزية بشكل كامل، صوتاً ونصاً، عبر الروبوت والتطبيق معاً، مع تخطيط RTL أصلي.' },
        { q: 'هل التجربة مناسبة للأطفال؟', a: 'نعم. تتوفر جولة عائلية بمدة 45 دقيقة، بمحطات أقصر، ولغة أبسط، وألغاز قصيرة بعد كل قاعة.' },
        { q: 'هل أحتاج إلى إنترنت؟', a: 'يوفر المتحف شبكة Wi-Fi مجانية، وهي مطلوبة للملاحة الداخلية والمحادثة مع نظام الجولة. تعمل بياناتك الخلوية أيضاً.' },
        { q: 'هل المتحف مهيأ لذوي الاحتياجات الخاصة؟', a: 'نعم. كل المسارات التي يقودها الروبوت بدون درج ومناسبة للكراسي المتحركة، مع وضع وصف صوتي موسّع للزوار ضعاف البصر.' },
        { q: 'هل يمكنني الإلغاء أو تغيير الموعد؟', a: 'يمكنك الإلغاء حتى 24 ساعة قبل وقت الدخول واسترداد المبلغ كاملاً، أو تغيير الموعد مجاناً من نفس رابط التذكرة في البريد.' },
      ]
    : [
        { q: 'Do I have to use the app?', a: 'Strongly recommended. Without it you still get the robot escort, but you lose the indoor map, the quizzes, and the detailed exhibit library.' },
        { q: 'What if all robots are busy?', a: 'Up to 8 robots run in parallel. The system routes you to the next available one — wait time is typically under 5 minutes even at peak.' },
        { q: 'Which languages are supported?', a: 'English and Arabic, fully — audio and text — through both the robot and the app, with native RTL layout.' },
        { q: 'Is it suitable for children?', a: 'Yes. A 45-minute Family preset is available with shorter stops, simpler narration, and short puzzles after each hall.' },
        { q: 'Do I need internet?', a: 'The museum provides free Wi-Fi, and it is required for live navigation and chat with the tour system. Your cellular data also works.' },
        { q: 'Is the museum wheelchair accessible?', a: 'Yes. All robot-led routes are step-free and wheelchair friendly, and an extended audio description mode is available for low-vision visitors.' },
        { q: 'Can I cancel or reschedule?', a: 'Cancel up to 24 hours before your slot for a full refund, or reschedule for free using the link in your ticket email.' },
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
