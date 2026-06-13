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
        {
          q: 'ما هو Horus-Bot؟',
          a: 'Horus-Bot مرشد متحفي ذاتي يساعد الزوار على استكشاف المعروضات من خلال السرد الموجّه والمساعدة التفاعلية داخل القاعات.',
        },
        {
          q: 'هل أحتاج إلى التطبيق؟',
          a: 'نعم، التطبيق يرافقك داخل المتحف لاستخدام التذاكر، والاتصال بـ Horus-Bot، ومتابعة الجولة المباشرة أثناء الزيارة.',
        },
        {
          q: 'أين أحجز التذاكر؟',
          a: 'يمكنك حجز تذكرة دخول المتحف وتذكرة جولة Horus-Bot من الموقع. بعد الحجز ستظهر التذاكر في حسابك على الموقع وفي تطبيق الهاتف.',
        },
        {
          q: 'هل رمز دخول المتحف هو نفسه رمز الاتصال بـ Horus-Bot؟',
          a: 'لا. رمز تذكرة دخول المتحف يستخدم عند بوابة المتحف. الاتصال بـ Horus-Bot يتم لاحقا داخل تطبيق الهاتف عن طريق مسح رمز QR الموجود على الروبوت.',
        },
        {
          q: 'ما طرق الدفع المتاحة؟',
          a: 'الحجز الحالي يستخدم الدفع النقدي عند شباك المتحف. حالة الدفع تظهر باسم Pay at Counter، ولا يوجد دفع إلكتروني داخل الموقع أو التطبيق حاليا.',
        },
        {
          q: 'هل يمكنني إلغاء الحجز؟',
          a: 'نعم، يمكن إلغاء الحجز من صفحة تذاكري حتى 24 ساعة قبل موعد الزيارة إذا لم تكن التذاكر مستخدمة أو منتهية أو مرتبطة بجولة روبوت بدأت بالفعل.',
        },
        {
          q: 'هل يمكنني تغيير الموعد؟',
          a: 'تغيير الموعد غير متاح حاليا. إذا كان الحجز مؤهلا للإلغاء، يمكنك إلغاءه ثم إنشاء حجز جديد بالموعد المناسب.',
        },
        {
          q: 'ما اللغات المدعومة؟',
          a: 'واجهة الموقع والتطبيق تدعم العربية والإنجليزية. لغة سرد جولة Horus-Bot يتم اختيارها ضمن إعدادات تذكرة الجولة.',
        },
        {
          q: 'هل التجربة مناسبة لذوي الاحتياجات الخاصة؟',
          a: 'تدعم خطط الجولة تفضيلات الوصول مثل المسارات الأسهل والوصف الصوتي، وتظهر هذه التفضيلات ضمن بيانات الجولة في تذكرتك.',
        },
      ]
    : [
        {
          q: 'What is Horus-Bot?',
          a: 'Horus-Bot is an autonomous museum guide that helps visitors explore exhibits through guided storytelling and interactive assistance.',
        },
        {
          q: 'Do I need the mobile app?',
          a: 'Yes. The website prepares your visit. Robot connection and Live Tour continue inside the mobile app during your museum visit.',
        },
        {
          q: 'Where do I book tickets?',
          a: 'You can book the Museum Entry Ticket and Horus-Bot Tour Ticket on the website. The same tickets appear in your account on both website and mobile app.',
        },
        {
          q: 'Is the Museum Entry QR the same as the Horus-Bot connection QR?',
          a: 'No. The Museum Entry QR is used at the museum gate. Horus-Bot connection happens later in the mobile app by scanning the QR code on the robot.',
        },
        {
          q: 'Which payment methods are supported?',
          a: 'Bookings currently use Pay at Counter. There is no online payment in the current experience.',
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes. Eligible pending or confirmed bookings can be cancelled from My Tickets until the visit starts, as long as the tickets have not been used, completed, expired, or started as a robot tour.',
        },
        {
          q: 'Can I change the visit time?',
          a: 'Changing the visit time is not available in this version. If your booking is eligible, cancel it and create a new booking for the date and time you want.',
        },
        {
          q: 'Which languages are supported?',
          a: 'The website and app UI support English and Arabic. Live Tour narration language is selected separately for the Horus-Bot Tour Ticket.',
        },
        {
          q: 'Does the experience support accessibility needs?',
          a: 'Tour plans can include accessibility preferences such as easier routes and audio description needs, and those preferences are saved with the Horus-Bot Tour Ticket.',
        },
      ];

  return (
    <>
      <SectionHero
        label={isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
        title={isRTL ? 'إجابات واضحة قبل الزيارة' : 'Clear answers before you book'}
        subtitle={
          isRTL
            ? 'اعرف أين تحجز، وكيف تستخدم التذاكر، ومتى يبدأ دور تطبيق الهاتف.'
            : 'Understand booking, tickets, payment, cancellation, and the handoff to the mobile app.'
        }
        bleedBehindNav
        atmosphereContinuity
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-16">
        <Accordion type="single" collapsible className="space-y-3">
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
            {isRTL ? 'هل تريد تجهيز زيارتك؟' : 'Ready to plan your visit?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'احجز تذكرتك الآن وستظهر في حسابك على الموقع والتطبيق.' : 'Book a visit and your tickets will appear in both the website and mobile app.'}
          </p>
          <Button asChild size="lg">
            <Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book Visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
