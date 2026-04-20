import { Ticket, Bot, Navigation, Award, Accessibility, Smartphone, QrCode, Headphones, MapPin, MessageSquare, Camera, Volume2, Type, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function ExperiencePage() {
  const { isRTL } = useApp();

  const Stage = ({ label, title, items }: { label: string; title: string; items: { icon: any; title: string; desc: string }[] }) => (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
      <div className="section-label mb-4">{label}</div>
      <h2 className="font-serif text-3xl md:text-4xl mb-10">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => <FeatureCard key={it.title} icon={it.icon} title={it.title} description={it.desc} />)}
      </div>
    </section>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'التجربة' : 'Experience'}
        title={isRTL ? 'ما يحدث خلال زيارتك' : 'What Happens During Your Visit'}
        subtitle={isRTL ? 'خطوات حقيقية من لحظة الحجز إلى مغادرة المتحف.' : 'Real steps from the moment you book until you leave the museum.'}
      />

      <Stage
        label={isRTL ? 'قبل الزيارة' : 'Before Visit'}
        title={isRTL ? 'الإعداد من المنزل' : 'Get ready from home'}
        items={[
          { icon: Ticket, title: isRTL ? 'اختر التاريخ والوقت' : 'Pick date and time slot', desc: isRTL ? 'اختر فترة دخول من 60 دقيقة، فيتم تخصيص روبوت لمجموعتك.' : 'Choose a 60-minute entry slot; a robot is reserved for your group.' },
          { icon: Navigation, title: isRTL ? 'اختر مدة الجولة' : 'Choose your tour length', desc: isRTL ? '30 أو 60 أو 90 دقيقة، أو جولة عائلية بـ45 دقيقة.' : '30, 60, or 90 minutes, or a 45-minute family preset.' },
          { icon: Smartphone, title: isRTL ? 'نزّل التطبيق' : 'Install the app', desc: isRTL ? 'نزّله من App Store أو Google Play قبل الوصول لتفعيل التذكرة.' : 'Get it from the App Store or Google Play before arrival to activate your ticket.' },
          { icon: QrCode, title: isRTL ? 'استلم تذكرة QR' : 'Receive a QR ticket', desc: isRTL ? 'يصلك رمز QR على البريد، احفظه في التطبيق أو محفظة الجوال.' : 'A QR code is emailed to you; save it in the app or your phone wallet.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'في المتحف' : 'At the Museum'}
          title={isRTL ? 'الوصول والاقتران مع الروبوت' : 'Arrive and pair with the robot'}
          items={[
            { icon: QrCode, title: isRTL ? 'امسح عند البوابة' : 'Scan at the gate', desc: isRTL ? 'مسح رمز QR يفعّل التذكرة ويسجّل دخولك في النظام.' : 'Scanning the QR validates your ticket and checks you into the system.' },
            { icon: Bot, title: isRTL ? 'اقتران بأقرب روبوت' : 'Pair with the nearest robot', desc: isRTL ? 'يعرض التطبيق الروبوت المخصص لك ويقترن به عبر Bluetooth خلال ثوانٍ.' : 'The app shows your assigned robot and pairs over Bluetooth within seconds.' },
            { icon: Headphones, title: isRTL ? 'سماعات موصى بها' : 'Headphones recommended', desc: isRTL ? 'استخدم سماعات للحصول على شرح صوتي خاص بك بدلاً من السماعة الخارجية.' : 'Use headphones for a private audio narration instead of the robot speaker.' },
          ]}
        />
      </div>

      <Stage
        label={isRTL ? 'أثناء الجولة' : 'During the Tour'}
        title={isRTL ? 'الجولة بين القاعات' : 'Moving through the galleries'}
        items={[
          { icon: Bot, title: isRTL ? 'الروبوت يقود بين المعروضات' : 'The robot leads between exhibits', desc: isRTL ? 'يتحرك بسرعة المشي، يتوقف عند كل قطعة، ويستأنف عندما تكون مستعداً.' : 'It moves at walking pace, stops at each piece, and resumes when you are ready.' },
          { icon: Map, title: isRTL ? 'خريطة ثلاثية الأبعاد ووقت الوصول' : '3D map with ETA', desc: isRTL ? 'يعرض التطبيق موقعك والمعروضة التالية والوقت المتبقي.' : 'The app shows your position, next exhibit, and remaining time.' },
          { icon: MapPin, title: isRTL ? 'اضغط أي معروضة للتعمق' : 'Tap any exhibit for deeper info', desc: isRTL ? 'صور إضافية، نصوص أطول، وملف صوتي مفصل عن القطعة.' : 'Extra images, longer text, and a detailed audio track for the piece.' },
          { icon: MessageSquare, title: isRTL ? 'اطرح سؤالاً بالعربية أو الإنجليزية' : 'Ask questions in EN or AR', desc: isRTL ? 'اكتب سؤالاً في التطبيق ويجيبك نظام الجولة باستخدام محتوى المتحف الموثّق.' : 'Type a question in the app; the tour system answers using the museum-approved content.' },
        ]}
      />

      <div className="bg-sidebar/40 border-y border-border/30">
        <Stage
          label={isRTL ? 'التفاعل' : 'Engagement'}
          title={isRTL ? 'تفاعلات صغيرة بأثر حقيقي' : 'Small interactions, real retention'}
          items={[
            { icon: Award, title: isRTL ? 'اختبار قصير لكل قاعة' : 'A short quiz per hall', desc: isRTL ? 'ثلاثة أسئلة بعد كل قسم لترسيخ ما رأيته.' : 'Three questions after each section to lock in what you saw.' },
            { icon: Award, title: isRTL ? 'شارات محفوظة في حسابك' : 'Badges saved to your profile', desc: isRTL ? 'تجمعها عبر الزيارات وتظهر في سجل الزائر.' : 'Collected across visits and shown in your visitor history.' },
            { icon: Camera, title: isRTL ? 'نقاط تصوير على الخريطة' : 'Photo spots tagged on the map', desc: isRTL ? 'مواقع موصى بها لأفضل لقطة لكل معروضة بارزة.' : 'Recommended spots for the best shot of each highlight piece.' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="section-label mb-4">{isRTL ? 'إمكانية الوصول' : 'Accessibility'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'مصمم ليعمل لكل زائر' : 'Built to work for every visitor'}</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card className="p-7">
            <Accessibility className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'مسارات بدون درج' : 'Step-free routes'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'كل المسارات التي يقودها الروبوت متاحة للكراسي المتحركة وعربات الأطفال.' : 'Every robot-led route is wheelchair- and stroller-accessible.'}</p>
          </Card>
          <Card className="p-7">
            <Type className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'حجم نص قابل للتعديل' : 'Adjustable text size'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'كبّر النصوص في التطبيق وفعّل وضع التباين العالي عند الحاجة.' : 'Scale up app text and enable a high-contrast mode when needed.'}</p>
          </Card>
          <Card className="p-7">
            <Volume2 className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'وصف صوتي' : 'Audio descriptions'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'نسخة صوتية موسعة تصف القطع البصرية للزوار ضعاف البصر.' : 'Extended audio that describes visual pieces for low-vision visitors.'}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
