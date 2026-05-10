import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';

export default function PrivacyPage() {
  const { isRTL } = useApp();
  return (
    <>
      <SectionHero
        label={isRTL ? 'الخصوصية' : 'Privacy'}
        title={isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
        subtitle={
          isRTL
            ? 'كيف يتعامل Horus-Bot مع بيانات الحساب والحجز والزيارة.'
            : 'How Horus-Bot handles account, booking, and visit data.'
        }
      />
      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-2 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>
          {isRTL
            ? 'تشرح هذه الصفحة كيف يجمع Horus-Bot بياناتك ويستخدمها لتشغيل حسابك، حجوزات المتحف، جولات الروبوت داخل المتحف.'
            : 'This page explains how Horus-Bot collects and uses your data to operate your account, your museum bookings, and your in-museum robot tours.'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'البيانات التي نجمعها' : 'Data we collect'}</h2>
        <p>
          {isRTL
            ? 'الاسم، البريد الإلكتروني، رقم الهاتف الاختياري، الجنسية، اللغة المفضّلة، تفاصيل الحجز (التاريخ، الفئات، تخصيص الجولة).'
            : 'Name, email address, optional phone number, nationality, preferred language, and booking details (date, visitor categories, tour preferences).'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'كيف نستخدم بياناتك' : 'How we use your data'}</h2>
        <p>
          {isRTL
            ? 'نستخدم بياناتك فقط لإصدار التذاكر، إقران زيارتك بروبوت الجولة في المتحف، ومنحك تجربة شخصية داخل تطبيق Horus-Bot.'
            : 'We only use your data to issue tickets, pair your visit with a tour robot at the museum, and provide a personalized experience inside the Horus-Bot app.'}
        </p>
        <h2 className="font-serif text-foreground text-lg">{isRTL ? 'حقوقك' : 'Your rights'}</h2>
        <p>
          {isRTL
            ? 'يمكنك تحديث ملفك الشخصي، إلغاء الحجوزات، أو طلب حذف حسابك في أي وقت من صفحة "حسابي".'
            : 'You can update your profile, cancel bookings, or request deletion of your account at any time from the "My Account" page.'}
        </p>
      </section>
    </>
  );
}
