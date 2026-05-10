import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function TermsPage() {
  const { isRTL } = useApp();
  return (
    <>
      <SectionHero
        label={isRTL ? 'الشروط' : 'Terms'}
        title={isRTL ? 'شروط الاستخدام' : 'Terms of Service'}
        subtitle={
          isRTL
            ? 'الشروط الأساسية لاستخدام خدمات الحجز والجولات في Horus-Bot.'
            : 'The basic terms for using Horus-Bot booking and tour services.'
        }
      />
      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-2 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'الحجز والتذاكر' : 'Bookings and tickets'}</h2>
        <p>
          {isRTL
            ? 'تذاكر المتحف وجولات الروبوت مرتبطة بحساب Horus-Bot الخاص بك. يجب الحضور في الموعد والوقت المحدد.'
            : 'Museum entry tickets and robot tours are linked to your Horus-Bot account. Please arrive at your chosen date and time slot.'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'الإلغاء' : 'Cancellations'}</h2>
        <p>
          {isRTL
            ? 'يمكن إلغاء الحجوزات النشطة من صفحة "تذاكري". يبقى الحجز الملغى ضمن سجل الحجوزات.'
            : 'Active bookings can be cancelled from the "My Tickets" page. Cancelled bookings remain visible in your booking history.'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'استخدام الروبوت' : 'Robot use'}</h2>
        <p>
          {isRTL
            ? 'يجب اتباع تعليمات الروبوت داخل المتحف، واحترام الزوار الآخرين والمعروضات.'
            : 'Please follow the robot’s instructions inside the museum and respect other visitors and exhibits.'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'الحساب' : 'Your account'}</h2>
        <p>
          {isRTL
            ? 'أنت مسؤول عن الحفاظ على سرية بيانات حسابك. تواصل مع الدعم في حال الاشتباه في وصول غير مصرَّح.'
            : 'You are responsible for keeping your account credentials confidential. Contact support if you suspect unauthorized access.'}
        </p>
      </section>
    </>
  );
}
