import { Bot, Navigation, Bell, Languages, Smartphone, Apple } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';

export default function AppPage() {
  const { isRTL } = useApp();

  return (
    <>
      <SectionHero
        label={isRTL ? 'التطبيق' : 'The App'}
        title={isRTL ? 'مرشدك في جيبك' : 'Your guide in your pocket'}
        subtitle={isRTL ? 'يقودك ويتنقل معك ويتحدث إليك.' : 'It guides you, navigates with you, and talks to you.'}
        actions={
          <>
            <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
            <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'المميزات الرئيسية' : 'Key Features'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'كل ما يحتاجه الزائر' : 'Everything a visitor needs'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Navigation} title={isRTL ? 'تنقل مباشر' : 'Live navigation'} description={isRTL ? 'خرائط داخلية وتوجيه فوري.' : 'Indoor maps and instant directions.'} />
          <FeatureCard icon={Bot} title={isRTL ? 'محادثة AI' : 'Chat with AI'} description={isRTL ? 'اسأل أي شيء عن المعروضات.' : 'Ask anything about exhibits.'} />
          <FeatureCard icon={Bell} title={isRTL ? 'إشعارات' : 'Notifications'} description={isRTL ? 'لا تفوّت الفعاليات الحية.' : 'Never miss live events.'} />
          <FeatureCard icon={Languages} title={isRTL ? 'متعدد اللغات' : 'Multilingual'} description={isRTL ? 'العربية والإنجليزية.' : 'English and Arabic.'} />
        </div>
      </section>

      <section className="bg-sidebar/40 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'لقطات' : 'Screenshots'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'نظرة على التطبيق' : 'A look inside'}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="aspect-[9/16] bg-gradient-to-br from-card via-card to-primary/5 flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-primary/40" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'حمّل التطبيق' : 'Get the app'}</h2>
        <p className="text-lg text-muted-foreground mb-10">{isRTL ? 'مجاناً على متاجر التطبيقات.' : 'Free on the app stores.'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg"><Apple className="h-4 w-4" /> App Store</Button>
          <Button size="lg" variant="outline"><Smartphone className="h-4 w-4" /> Google Play</Button>
        </div>
      </section>
    </>
  );
}
