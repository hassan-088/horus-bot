import { Link } from 'react-router-dom';
import { BookOpen, Building2, Compass, Heart, Languages, Route, Sparkles, Ticket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';
import maskImage from '@/assets/exhibit-golden-mask.jpg';

const ar = {
  label: 'من نحن',
  heroTitle: 'نجعل زيارة المتحف أكثر قربا وشخصية',
  heroSubtitle: 'تحمل زيارات المتاحف قصصا كثيرة. يساعد Horus-Bot على إبقاء الإرشاد والفضول والحركة أقرب إلى الزائر.',
  whyLabel: 'لماذا يوجد Horus-Bot',
  whyTitle: 'المتاحف الكبيرة قد تكون مدهشة ومربكة في الوقت نفسه',
  whyBody: 'يدخل الزائر إلى مساحة واسعة من التاريخ، لكنه قد لا يعرف من أين يبدأ أو كيف يحافظ على تركيزه. نؤمن أن الزيارة الجيدة يجب أن تكون أوضح، أهدأ، وأكثر إنسانية.',
  whyOne: 'مساحات كبيرة تحتاج إلى طريق واضح',
  whyTwo: 'لغات مختلفة واحتياجات مختلفة',
  whyThree: 'قصص كثيرة تحتاج إلى إيقاع مريح',
  ideaLabel: 'الفكرة',
  ideaTitle: 'مرشد يبقى بجانب تجربة الزائر',
  ideaBody: 'الفكرة بسيطة: بدلا من أن يشعر الزائر أنه يمشي وحده بين القاعات، يجد إرشادا يتحرك معه، يساعده على السؤال والاكتشاف وتذكر ما شاهده.',
  ideaOne: 'حركة أوضح بين المحطات',
  ideaTwo: 'أسئلة في لحظة الفضول',
  ideaThree: 'ذكريات تبقى بعد الزيارة',
  visionLabel: 'الرؤية',
  visionTitle: 'زيارات أكثر ترحيبا وخصوصية وذاكرة',
  visionBody: 'نريد أن يشعر كل زائر أن المتحف يتحدث إليه بإيقاع يناسبه، بلغة يفهمها، وبطريقة تحفظ وقار المكان وتفتح القصة.',
  welcoming: 'أكثر ترحيبا',
  personal: 'أكثر شخصية',
  memorable: 'أكثر رسوخا',
  confidenceLabel: 'ثقة للمؤسسات',
  confidenceTitle: 'مصمم ليحترم هدوء المتحف وقيمته التعليمية',
  confidenceBody: 'Horus-Bot يقدم إحساسا منظما وجادا للمتحف: حركة موجهة، سرد ثقافي، وتجربة تساعد الزوار على الفهم دون أن تطغى على المكان.',
  learning: 'قيمة تعليمية',
  guided: 'حركة موجهة',
  storytelling: 'سرد ثقافي',
  ctaTitle: 'ابدأ زيارة أكثر هدوءا',
  ctaBody: 'احجز الزيارة ودع Horus-Bot يجعل الطريق داخل المتحف أقرب إلى القصة.',
  bookVisit: 'احجز زيارتك',
};

export default function AboutPage() {
  const { isRTL } = useApp();

  return (
    <>
      <SectionHero
        label={isRTL ? ar.label : 'About'}
        title={isRTL ? ar.heroTitle : 'Helping museum visits feel more personal.'}
        subtitle={
          isRTL
            ? ar.heroSubtitle
            : 'Museum visits hold stories. Horus-Bot keeps guidance, curiosity, and movement closer to the visitor.'
        }
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'قاعة متحف هادئة' : 'Quiet museum hall'}
        className="after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:from-background after:to-transparent"
      />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 -mt-8 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-primary/20 bg-card/75 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {[
              { icon: Heart, en: 'The Why', ar: ar.whyLabel },
              { icon: Sparkles, en: 'The Idea', ar: ar.ideaLabel },
              { icon: Building2, en: 'Museum Confidence', ar: ar.confidenceLabel },
            ].map((item, index) => (
              <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/45 px-4 py-3 ring-1 ring-primary/10">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
              </div>
            )).flatMap((node, index) => (
              index < 2
                ? [node, <div key={`line-${index}`} className="hidden h-px w-8 bg-primary/30 md:block" />]
                : [node]
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.88fr_1.12fr] md:px-8 md:py-20">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.whyLabel : 'Why Horus-Bot Exists'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.whyTitle : 'Large museums can feel wondrous and overwhelming at once.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.whyBody
              : 'Visitors step into a wide space of history, but they may not know where to begin or how to keep focus. We believe a good visit should feel clearer, calmer, and more human.'}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)] ring-1 ring-primary/20">
          <img
            src={onboardingImage}
            alt={isRTL ? 'زوار في قاعة متحف' : 'Visitors in a museum gallery'}
            loading="lazy"
            className="h-[430px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-3 p-5 sm:grid-cols-3 md:p-7">
            {[
              { icon: Compass, en: 'A clear path through large spaces', ar: ar.whyOne },
              { icon: Languages, en: 'Different languages and needs', ar: ar.whyTwo },
              { icon: BookOpen, en: 'Many stories, calmer pacing', ar: ar.whyThree },
            ].map((item) => (
              <div key={item.en} className="rounded-2xl border border-primary/20 bg-card/75 p-3 shadow-soft backdrop-blur">
                <item.icon className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-medium leading-snug">{isRTL ? item.ar : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card/70 p-5 shadow-soft backdrop-blur md:p-7">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background/30" />
            <div className="relative">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Route, en: 'Clearer movement between stops', ar: ar.ideaOne },
                  { icon: Users, en: 'Questions at the moment of curiosity', ar: ar.ideaTwo },
                  { icon: Heart, en: 'Memories that stay after the visit', ar: ar.ideaThree },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-background/55 p-4 ring-1 ring-primary/10">
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">{isRTL ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="self-center">
            <div className="section-label mb-4">{isRTL ? ar.ideaLabel : 'The Idea'}</div>
            <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {isRTL ? ar.ideaTitle : 'A guide that stays beside the visitor experience.'}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {isRTL
                ? ar.ideaBody
                : 'The idea is simple: instead of feeling alone between galleries, the visitor finds guidance that moves with them, helps them ask, discover, and remember what they saw.'}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
        <div className="self-center">
          <div className="section-label mb-4">{isRTL ? ar.visionLabel : 'Vision'}</div>
          <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.visionTitle : 'Museum visits that feel more welcoming, personal, and memorable.'}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {isRTL
              ? ar.visionBody
              : 'We want every visitor to feel that the museum can speak to them at their pace, in a language they understand, while preserving the calm dignity of the place.'}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Heart, en: 'More welcoming', ar: ar.welcoming },
            { icon: Languages, en: 'More personal', ar: ar.personal },
            { icon: Sparkles, en: 'More memorable', ar: ar.memorable },
          ].map((item) => (
            <div key={item.en} className="rounded-[2rem] border border-primary/15 bg-card/70 p-5 shadow-soft backdrop-blur">
              <item.icon className="mb-5 h-5 w-5 text-primary" />
              <p className="font-serif text-lg leading-snug text-foreground">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sidebar/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.08fr_0.92fr] md:px-8 md:py-20">
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-[0_28px_90px_-28px_hsl(var(--primary)/0.45)]">
            <img
              src={maskImage}
              alt={isRTL ? 'قطعة أثرية ذهبية' : 'Golden museum artifact'}
              loading="lazy"
              className="h-[410px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
          </div>
          <div className="self-center">
            <div className="section-label mb-4">{isRTL ? ar.confidenceLabel : 'Institution Confidence'}</div>
            <h2 className="mb-5 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {isRTL ? ar.confidenceTitle : 'Made to respect the museum’s calm and educational value.'}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {isRTL
                ? ar.confidenceBody
                : 'Horus-Bot gives museums an organized, serious feeling: guided movement, cultural storytelling, and a visitor experience that helps people understand without overpowering the place.'}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[ar.learning, ar.guided, ar.storytelling].map((item, index) => (
                <div key={item} className="rounded-2xl border border-primary/15 bg-card/65 p-4 text-sm shadow-soft backdrop-blur">
                  {isRTL ? item : index === 0 ? 'Educational value' : index === 1 ? 'Guided movement' : 'Cultural storytelling'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center md:px-8 md:py-20">
        <div className="rounded-[2rem] border border-primary/25 bg-gradient-to-br from-card/90 via-card/75 to-primary/10 p-6 shadow-[0_22px_70px_-35px_hsl(var(--primary)/0.55)] backdrop-blur md:p-12">
          <h2 className="mb-6 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            {isRTL ? ar.ctaTitle : 'Begin a calmer museum visit.'}
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {isRTL
              ? ar.ctaBody
              : 'Book the visit and let Horus-Bot bring the path through the museum closer to the story.'}
          </p>
          <Button asChild size="lg">
            <Link to="/book">
              <Ticket className="h-4 w-4" /> {isRTL ? ar.bookVisit : 'Book Visit'}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
