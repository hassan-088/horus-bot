import { Link } from 'react-router-dom';
import { Bot, Smartphone, Languages, Route, Ticket, MapPin, Users, Compass, Building2, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { StepCard } from '@/components/site/StepCard';
import { useApp } from '@/contexts/AppContext';
import gemImage from '@/assets/gem.jpg';
import onboardingImage from '@/assets/onboarding.jpg';
import gemMapImage from '@/assets/gem-complex-map.png';

export default function HomePage() {
  const { isRTL } = useApp();

  return (
    <>
      {/* HERO */}
      <SectionHero
        backgroundImage={gemImage}
        backgroundAlt={isRTL ? 'Ù‚Ø§Ø¹Ø© Ø§Ù„Ù…ØªØ­Ù Ø§Ù„Ù…ØµØ±ÙŠ Ø§Ù„ÙƒØ¨ÙŠØ±' : 'Grand Egyptian Museum hall'}
        label={isRTL ? 'Ø­ÙˆØ±Ø³-Ø¨ÙˆØª â€¢ ØªØ¬Ø±Ø¨Ø© Ø¥Ø±Ø´Ø§Ø¯ Ø§Ù„Ù…ØªØ§Ø­Ù' : 'Horus-Bot â€¢ Museum Guidance Experience'}
        title={
          isRTL ? (
            <>Ø¬ÙˆÙ„Ø§Øª Ù…ØªØ§Ø­Ù Ø°ÙƒÙŠØ© ÙŠÙ‚ÙˆØ¯Ù‡Ø§ <span className="text-primary">Ø±ÙˆØ¨ÙˆØª Ø°Ø§ØªÙŠ Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©</span></>
          ) : (
            <>Smart Museum Tours Guided by an <span className="text-primary">Autonomous Robot</span></>
          )
        }
        subtitle={
          isRTL
            ? 'ÙŠÙ‚ÙˆØ¯ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ø¬ÙˆÙ„ØªÙƒ ÙÙŠ Ø§Ù„Ù…ØªØ­Ù ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠØŒ ÙŠØ±Ø´Ø¯Ùƒ Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ø¨ÙŠÙ†Ù…Ø§ ÙŠØ­ØªÙØ¸ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù…Ø±Ø§ÙÙ‚ Ø¨ÙƒÙ„ Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ ÙÙŠ ÙŠØ¯Ùƒ â€” Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ Ø§Ù„Ø®Ø±Ø§Ø¦Ø·ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ØŒ ÙˆØ§Ù„ØªÙØ§Ø¹Ù„.'
            : 'Horus-Bot leads your museum tour in real time, guiding you between exhibits while the companion app keeps everything you need in your hand â€” tickets, maps, content, and interaction.'
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/book">
                <Ticket className="h-4 w-4" /> {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ' : 'Book Your Visit'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app">
                <Compass className="h-4 w-4" /> {isRTL ? 'Ø§ÙƒØªØ´Ù Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'Explore the App'}
              </Link>
            </Button>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-8 mb-4 text-center">
        <p className="text-sm text-muted-foreground/90">
          {isRTL
            ? 'Ù…ØµÙ…ÙŽÙ‘Ù… Ù„Ù„Ù…ØªØ§Ø­Ù ÙˆØ§Ù„ÙØ¶Ø§Ø¡Ø§Øª Ø§Ù„Ø«Ù‚Ø§ÙÙŠØ© Ø§Ù„ØªÙŠ ØªØ±ÙŠØ¯ Ø¬ÙˆÙ„Ø§Øª Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø© Ø£ÙƒØ«Ø± Ø³Ù„Ø§Ø³Ø©ØŒ ÙˆØ¶ÙˆØ­Ø§Ù‹ØŒ ÙˆÙ‚Ø§Ø¨Ù„ÙŠØ©Ù‹ Ù„Ù„ØªÙˆØ³Ù‘Ø¹.'
            : 'Built for museums and cultural spaces that want guided tours to feel smoother, clearer, and easier to scale.'}
        </p>
      </div>

      {/* PRODUCT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="section-label mb-4">{isRTL ? 'Ù†Ø¸Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†ØªØ¬' : 'Product Overview'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            {isRTL ? 'ØªØ¬Ø±Ø¨Ø© Ù…ØªØ­Ù Ø°ÙƒÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø©' : 'A Complete Smart Museum Experience'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL
              ? 'ÙŠØ±Ø¨Ø· Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ø¨ÙŠÙ† Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„ÙØ¹Ù„ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØªØ­Ù ÙˆØªØ¬Ø±Ø¨Ø© Ø±Ù‚Ù…ÙŠØ© Ø¨Ø³ÙŠØ·Ø©. ÙŠÙ‚ÙˆØ¯ Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ø²ÙˆØ§Ø± Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§ØªØŒ Ø¨ÙŠÙ†Ù…Ø§ ÙŠØ­ØªÙØ¸ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù…Ø±Ø§ÙÙ‚ Ø¨Ø§Ù„ØªØ°Ø§ÙƒØ± ÙˆØ§Ù„Ø®Ø±Ø§Ø¦Ø· ÙˆÙ…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª ÙˆØ§Ù„Ø£Ø³Ø¦Ù„Ø© ÙˆØªÙ‚Ø¯Ù‘Ù… Ø§Ù„Ø¬ÙˆÙ„Ø© ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.'
              : 'Horus-Bot connects the physical museum tour with a simple digital experience. The robot guides visitors between exhibits, while the companion app keeps tickets, maps, exhibit content, questions, and tour progress in one place.'}
          </p>
        </div>
        {/* Visual band */}
        <div className="relative mb-14 overflow-hidden rounded-3xl ring-1 ring-primary/20 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)]">
          <img
            src={onboardingImage}
            alt={isRTL ? 'Ø²ÙˆØ§Ø± ÙŠØ³ØªÙƒØ´ÙÙˆÙ† Ù‚Ø§Ø¹Ø§Øª Ø§Ù„Ù…ØªØ­Ù' : 'Visitors exploring museum galleries'}
            loading="lazy"
            className="h-[280px] md:h-[380px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="font-serif text-lg md:text-2xl text-foreground max-w-2xl">
              {isRTL ? 'Ø±Ø­Ù„Ø© Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø© Ø¹Ø¨Ø± Ø£Ø¹Ø¸Ù… Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ù…ØµØ±.' : "A guided journey through Egypt's greatest collections."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={gemImage} alt={isRTL ? 'Ù‚Ø§Ø¹Ø© Ø§Ù„Ù…ØªØ­Ù' : 'Museum hall'} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Bot className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ù…Ø±Ø´Ø¯' : 'The Robot Guide'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'Ø§Ù„Ù†Ø¬Ù… Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ Ù„ØªØ¬Ø±Ø¨ØªÙƒ â€” ÙŠÙ‚ÙˆØ¯Ùƒ Ø¨ÙŠÙ† Ù‚Ø§Ø¹Ø§Øª Ø§Ù„Ù…ØªØ­Ù ÙˆÙŠØªÙˆÙ‚Ù‘Ù Ø¹Ù†Ø¯ ÙƒÙ„ Ù…Ø­Ø·Ø© Ù„ÙŠØ±ÙˆÙŠÙ‡Ø§ Ù„Ùƒ Ø¨ÙˆØ¶ÙˆØ­.'
                  : 'The star of your experience â€” leading you through museum spaces and bringing every stop to life with clear narration.'}
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden bg-sidebar/30">
              <img src={gemMapImage} alt={isRTL ? 'Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ø¬ÙˆÙ„Ø©' : 'Tour map'} loading="lazy" className="h-full w-full object-contain p-4" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Smartphone className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù…Ø±Ø§ÙÙ‚' : 'The Companion App'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'Ø§Ù„Ø±ÙÙŠÙ‚ Ø§Ù„Ø°ÙŠ ÙŠØ¨Ù‚ÙŠ ÙƒÙ„ Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ ÙÙŠ ÙŠØ¯Ùƒ â€” Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ Ø§Ù„Ø®Ø±Ø§Ø¦Ø·ØŒ Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§ØªØŒ ÙˆØ§Ù„Ø£Ø³Ø¦Ù„Ø©.'
                  : 'The helpful companion that keeps everything you need in your hand â€” tickets, maps, exhibit content, and questions.'}
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={onboardingImage} alt={isRTL ? 'ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø²ÙˆØ§Ø±' : 'Visitor experience'} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
            </div>
            <div className="p-7">
              <Sparkles className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">{isRTL ? 'ØªØ¬Ø±Ø¨Ø© Ø¬ÙˆÙ„Ø© Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø©' : 'Guided Tour Experience'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? 'Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù…Ø¹Ø§Ù‹ = ØªØ¬Ø±Ø¨Ø© Ù…ØªØ­Ù ÙˆØ§Ø­Ø¯Ø© Ù…ØªÙ‘ØµÙ„Ø©ØŒ ØªØªÙƒÙŠÙ‘Ù Ù…Ø¹ ÙˆÙ‚ØªÙƒ ÙˆØ§Ù‡ØªÙ…Ø§Ù…Ø§ØªÙƒ ÙˆÙ„ØºØªÙƒ.'
                  : 'Robot + app = one connected museum experience that adapts to your time, interests, and language.'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="section-label mb-4">{isRTL ? 'Ø§Ù„Ù‚Ø¯Ø±Ø§Øª Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©' : 'Core Capabilities'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {isRTL ? 'ÙƒÙ„ Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ Ø¬ÙˆÙ„Ø© Ù…ØªØ­Ù Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø©' : 'Everything a Guided Museum Visit Needs'}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Bot}
              title={isRTL ? 'Ø¥Ø±Ø´Ø§Ø¯ ÙˆØªÙ†Ù‚Ù‘Ù„ Ø¨Ø§Ù„Ø±ÙˆØ¨ÙˆØª' : 'Robot Navigation & Guidance'}
              description={isRTL ? 'ÙŠÙ‚ÙˆØ¯ Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ø²ÙˆØ§Ø± Ù…Ù† Ù…Ø¹Ø±ÙˆØ¶Ø© Ø¥Ù„Ù‰ Ø£Ø®Ø±Ù‰ Ø¨Ø¥ÙŠÙ‚Ø§Ø¹ Ù…Ø±ÙŠØ­ØŒ Ù…Ù…Ù‘Ø§ ÙŠÙ‚Ù„Ù‘Ù„ Ø§Ù„ØªØ´ØªÙ‘Øª ÙˆÙŠÙ…Ù†Ø¹ ØªÙÙˆÙŠØª Ø£ÙŠ Ù…Ø­Ø·Ø©.' : 'The robot leads visitors from one exhibit to the next at a comfortable pace, reducing confusion and missed stops.'}
            />
            <FeatureCard
              icon={Smartphone}
              title={isRTL ? 'ØªØ·Ø¨ÙŠÙ‚ Ø¬ÙˆØ§Ù„ ØªÙØ§Ø¹Ù„ÙŠ' : 'Interactive Mobile App'}
              description={isRTL ? 'Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ Ø§Ù„ØªÙ†Ù‚Ù‘Ù„ØŒ Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§ØªØŒ Ø§Ù„Ø£Ø³Ø¦Ù„Ø©ØŒ ÙˆØ¯Ø¹Ù… Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„Ù…Ø¨Ø§Ø´Ø± â€” ÙƒÙ„ Ø°Ù„Ùƒ ÙÙŠ ØªØ·Ø¨ÙŠÙ‚ ÙˆØ§Ø­Ø¯ Ø¨Ø³ÙŠØ·.' : 'Tickets, navigation, exhibit content, questions, and Live Tour support all in one simple app.'}
            />
            <FeatureCard
              icon={MapPin}
              title={isRTL ? 'ØªÙ†Ù‚Ù‘Ù„ Ø¯Ø§Ø®Ù„ÙŠ ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ' : 'Real-Time Indoor Navigation'}
              description={isRTL ? 'ÙŠØ±Ù‰ Ø§Ù„Ø²ÙˆØ§Ø± Ø£ÙŠÙ† Ù‡Ù…ØŒ Ø£ÙŠÙ† Ø§Ù„Ø±ÙˆØ¨ÙˆØªØŒ ÙˆÙ…Ø§ Ù‡ÙŠ Ø§Ù„Ù…Ø­Ø·Ø© Ø§Ù„ØªØ§Ù„ÙŠØ© Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¬ÙˆÙ„Ø©.' : 'Visitors can see where they are, where the robot is, and what comes next during the tour.'}
            />
            <FeatureCard
              icon={Languages}
              title={isRTL ? 'Ø¯Ø¹Ù… Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ù„ØºØ§Øª' : 'Multilingual Support'}
              description={isRTL ? 'ÙŠÙ…ÙƒÙ† Ù„Ù„Ø²ÙˆØ§Ø± Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¬ÙˆÙ„Ø© Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©ØŒ Ø§Ù„Ø¹Ø§Ù…ÙŠØ© Ø§Ù„Ù…ØµØ±ÙŠØ©ØŒ Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©ØŒ ÙˆÙ„ØºØ§Øª Ø£Ø®Ø±Ù‰ Ù…Ø¯Ø¹ÙˆÙ…Ø© ÙˆÙÙ‚Ø§Ù‹ Ù„Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…ØªØ­Ù.' : 'Visitors can follow the tour in Arabic, Egyptian Arabic, English, and other supported languages depending on the museum setup.'}
            />
            <FeatureCard
              icon={Route}
              title={isRTL ? 'Ù…Ø³Ø§Ø±Ø§Øª Ø¬ÙˆÙ„Ø§Øª Ø´Ø®ØµÙŠØ©' : 'Personalized Tour Paths'}
              description={isRTL ? 'ØªÙØ¨Ù†Ù‰ Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª Ø­ÙˆÙ„ ÙˆÙ‚Øª Ø§Ù„Ø²Ø§Ø¦Ø± ÙˆØ§Ù‡ØªÙ…Ø§Ù…Ø§ØªÙ‡ØŒ ÙØªØ´Ø¹Ø± ÙƒÙ„ Ø¬ÙˆÙ„Ø© Ø¨Ø£Ù†Ù‡Ø§ Ø£ÙƒØ«Ø± Ù…Ù„Ø§Ø¡Ù…Ø© ÙˆØªØ±ÙƒÙŠØ²Ø§Ù‹.' : 'Routes are shaped around visitor time and interests, making each tour feel more relevant and focused.'}
            />
            <FeatureCard
              icon={Users}
              title={isRTL ? 'ØªÙØ§Ø¹Ù„ Ø§Ù„Ø²ÙˆØ§Ø±' : 'Visitor Engagement'}
              description={isRTL ? 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù‚ØµÙŠØ±Ø©ØŒ Ø¥Ù†Ø¬Ø§Ø²Ø§ØªØŒ Ù„Ø­Ø¸Ø§Øª ØªÙØ§Ø¹Ù„ØŒ ÙˆÙ†Ù‚Ø§Ø· ØªØµÙˆÙŠØ± ØªÙØ¨Ù‚ÙŠ Ø§Ù„Ø²ÙˆØ§Ø± Ù…Ù†Ø®Ø±Ø·ÙŠÙ† ÙˆØªØ³Ø§Ø¹Ø¯Ù‡Ù… Ø¹Ù„Ù‰ ØªØ°ÙƒÙ‘Ø± Ø§Ù„ØªØ¬Ø±Ø¨Ø©.' : 'Quizzes, achievements, interactive moments, and photo points help visitors stay engaged and remember the experience.'}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="section-label mb-4">{isRTL ? 'ÙƒÙŠÙ ØªØ¹Ù…Ù„' : 'How It Works'}</div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            {isRTL ? 'Ù…Ù† Ø§Ù„Ø­Ø¬Ø² Ø¥Ù„Ù‰ Ø§Ù„Ø¬ÙˆÙ„Ø© ÙÙŠ Ø£Ø±Ø¨Ø¹ Ø®Ø·ÙˆØ§Øª Ø¨Ø³ÙŠØ·Ø©' : 'From Booking to Tour in Four Simple Steps'}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step={1}
            title={isRTL ? 'Ø§Ø­Ø¬Ø² Ø¹Ø¨Ø± Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª' : 'Book Online'}
            description={isRTL ? 'Ø§Ø®ØªØ± ÙˆÙ‚Øª Ø§Ù„Ø²ÙŠØ§Ø±Ø©ØŒ Ø­Ø¯Ù‘Ø¯ Ù…Ø¯Ø© Ø§Ù„Ø¬ÙˆÙ„Ø©ØŒ ÙˆØ§Ø³ØªÙ„Ù… ØªØ°ÙƒØ±ØªÙƒ.' : 'Choose your visit time, select your tour length, and receive your ticket.'}
          />
          <StepCard
            step={2}
            title={isRTL ? 'Ø§Ù…Ø³Ø­ Ø¹Ù†Ø¯ Ø§Ù„Ù…Ø¯Ø®Ù„' : 'Scan at the Entrance'}
            description={isRTL ? 'Ø§Ù…Ø³Ø­ ØªØ°ÙƒØ±Ø© QR Ø¹Ù†Ø¯ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø© Ù„ØªÙØ¹ÙŠÙ„ Ø²ÙŠØ§Ø±ØªÙƒ.' : 'Scan your QR ticket at the gate to activate your visit.'}
          />
          <StepCard
            step={3}
            title={isRTL ? 'Ù‚Ø§Ø¨Ù„ Ø±ÙˆØ¨ÙˆØªÙƒ Ø§Ù„Ù…Ø±Ø´Ø¯' : 'Meet Your Robot Guide'}
            description={isRTL ? 'ØªÙƒÙˆÙ† ØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø¬Ø§Ù‡Ø²Ø© ÙÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŒ ÙˆÙŠØªÙ… Ø§Ù„Ø§Ù‚ØªØ±Ø§Ù† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù Ø¹Ø¨Ø± Ù…Ø³Ø­ Ø±Ù…Ø² QR Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ¨ÙˆØª.' : 'Your Horus-Bot Tour Ticket will be ready in the app. Robot Pairing happens at the museum by scanning the physical robot QR.'}
          />
          <StepCard
            step={4}
            title={isRTL ? 'Ø§Ø³ØªÙ…ØªØ¹ Ø¨Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø©' : 'Enjoy the Guided Tour'}
            description={isRTL ? 'ÙŠÙ‚ÙˆØ¯Ùƒ Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ø¨ÙŠÙ†Ù…Ø§ ÙŠØ¯Ø¹Ù…Ùƒ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ø§Ù„Ø®Ø±Ø§Ø¦Ø· ÙˆÙ…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª ÙˆØ§Ù„ØªÙØ§Ø¹Ù„ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±.' : 'The robot leads the way while the app supports you with maps, exhibit content, and live interaction.'}
          />
        </div>
      </section>

      {/* FOR MUSEUMS */}
      <section className="bg-sidebar/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="section-label mb-4">{isRTL ? 'Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª' : 'For Institutions'}</div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
              {isRTL ? 'Ù„Ù„Ù…ØªØ§Ø­Ù ÙˆØ§Ù„ÙØ¶Ø§Ø¡Ø§Øª Ø§Ù„Ø«Ù‚Ø§ÙÙŠØ©' : 'For Museums & Cultural Spaces'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isRTL
                ? 'ÙŠØ³Ø§Ø¹Ø¯ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ø§Ù„Ù…ØªØ§Ø­Ù Ø¹Ù„Ù‰ ØªÙ‚Ø¯ÙŠÙ… ØªØ¬Ø§Ø±Ø¨ Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø© Ø¹Ù„Ù‰ Ù†Ø·Ø§Ù‚ ÙˆØ§Ø³Ø¹ØŒ Ø®Ø¯Ù…Ø© Ø¹Ø¯Ø¯ Ø£ÙƒØ¨Ø± Ù…Ù† Ø§Ù„Ø²ÙˆØ§Ø± Ø¨Ø¶ØºØ· Ø£Ù‚Ù„ Ø¹Ù„Ù‰ Ø§Ù„ÙØ±ÙŠÙ‚ØŒ ÙˆØ®Ù„Ù‚ Ø±Ø­Ù„Ø© Ø£ÙƒØ«Ø± Ø³Ù„Ø§Ø³Ø© Ø¹Ø¨Ø± Ø§Ù„Ù…Ø³Ø§Ø­Ø§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©.'
                : 'Horus-Bot helps museums deliver guided experiences at scale, serve more visitors with less pressure on staff, and create a smoother journey across large spaces.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Users, en: 'Reduce pressure on human guides', ar: 'ØªØ®ÙÙŠÙ Ø§Ù„Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø±Ø´Ø¯ÙŠÙ† Ø§Ù„Ø¨Ø´Ø±ÙŠÙŠÙ†' },
              { icon: Building2, en: 'Serve more visitors at the same time', ar: 'Ø®Ø¯Ù…Ø© Ø¹Ø¯Ø¯ Ø£ÙƒØ¨Ø± Ù…Ù† Ø§Ù„Ø²ÙˆØ§Ø± ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø°Ø§ØªÙ‡' },
              { icon: CheckCircle2, en: 'Deliver consistent tour quality', ar: 'ØªÙ‚Ø¯ÙŠÙ… Ø¬ÙˆØ¯Ø© Ø¬ÙˆÙ„Ø© Ø«Ø§Ø¨ØªØ©' },
              { icon: Languages, en: 'Support multilingual audiences with ease', ar: 'Ø¯Ø¹Ù… Ø§Ù„Ø¬Ù…Ù‡ÙˆØ± Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ù„ØºØ§Øª Ø¨Ø³Ù‡ÙˆÙ„Ø©' },
              { icon: Route, en: 'Improve visitor flow across galleries', ar: 'ØªØ­Ø³ÙŠÙ† Ø§Ù†Ø³ÙŠØ§Ø¨ Ø§Ù„Ø²ÙˆØ§Ø± Ø¨ÙŠÙ† Ø§Ù„Ù‚Ø§Ø¹Ø§Øª' },
            ].map((item) => (
              <Card key={item.en} className="p-5">
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <p className="text-sm text-foreground/90 leading-snug">{isRTL ? item.ar : item.en}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT STATUS */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <div className="section-label mb-4 text-primary">{isRTL ? 'Ø¬Ø§Ù‡Ø²ÙŠØ© Ø§Ù„ØªØ¬Ø±Ø¨Ø©' : 'Product Readiness'}</div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {isRTL ? 'Ù†Ø¸Ø§Ù… Ø²ÙŠØ§Ø±Ø© Ù…ØªØµÙ„ Ù…Ù† Ø§Ù„Ø­Ø¬Ø² Ø­ØªÙ‰ Ø§Ù„Ø¬ÙˆÙ„Ø©' : 'A Connected Visit System from Booking to Tour'}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { en: 'Website booking and account management are connected', ar: 'Ø§Ù„Ø­Ø¬Ø² ÙˆØ¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø­Ø³Ø§Ø¨ Ù…ØªØµÙ„Ø§Ù† Ø¹Ø¨Ø± Ø§Ù„Ù…ÙˆÙ‚Ø¹' },
            { en: 'Tickets sync with the mobile app account', ar: 'Ø§Ù„ØªØ°Ø§ÙƒØ± Ù…ØªØ²Ø§Ù…Ù†Ø© Ù…Ø¹ Ø­Ø³Ø§Ø¨ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ' },
            { en: 'Museum Entry Ticket and Horus-Bot Tour Ticket stay separate', ar: 'ØªØ°ÙƒØ±Ø© Ø§Ù„Ø¯Ø®ÙˆÙ„ ÙˆØ¬ÙˆÙ„Ø© Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙˆØ§Ø¶Ø­ØªØ§Ù† ÙˆÙ…Ù†ÙØµÙ„ØªØ§Ù†' },
            { en: 'Robot Pairing starts later in the mobile app', ar: 'Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙŠØ¨Ø¯Ø£ Ù„Ø§Ø­Ù‚Ø§ Ø¯Ø§Ø®Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ' },
          ].map((item) => (
            <div key={item.en} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-5">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90 leading-relaxed">{isRTL ? item.ar : item.en}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground italic">
          {isRTL
            ? 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ù„ØªØ¬Ù‡ÙŠØ² Ø²ÙŠØ§Ø±ØªÙƒØŒ Ø«Ù… Ø§ÙØªØ­ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù Ù„Ù„ØªØ°Ø§ÙƒØ± ÙˆØ§Ù„Ø¬ÙˆÙ„Ø© ÙˆØ§Ù„Ø§Ù‚ØªØ±Ø§Ù† Ø¨Ø§Ù„Ø±ÙˆØ¨ÙˆØª.'
            : 'Use the website to prepare your visit, then use the mobile app at the museum for tickets, Robot Pairing, and the Live Tour.'}
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
          {isRTL ? 'Ø§Ø³ØªÙ…ØªØ¹ Ø¨Ù…Ø³ØªÙ‚Ø¨Ù„ Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØªØ§Ø­Ù' : 'Experience the Future of Museum Tours'}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {isRTL
            ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ ÙˆØ§Ø³ØªÙ…ØªØ¹ Ø¨Ø¬ÙˆÙ„Ø© Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø© ÙŠÙ‚ÙˆØ¯Ù‡Ø§ Ø±ÙˆØ¨ÙˆØª Ø°Ø§ØªÙŠ Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©ØŒ ÙŠØ¯Ø¹Ù…Ù‡Ø§ ØªØ·Ø¨ÙŠÙ‚ Ù…Ø±Ø§ÙÙ‚ Ø°ÙƒÙŠ Ù…Ù† Ø§Ù„Ù„Ø­Ø¸Ø© Ø§Ù„ØªÙŠ ØªØµÙ„ ÙÙŠÙ‡Ø§.'
            : 'Book your visit and enjoy a guided tour led by an autonomous robot, supported by a smart companion app from the moment you arrive.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg"><Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ' : 'Book Your Visit'}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app"><Compass className="h-4 w-4" /> {isRTL ? 'Ø§ÙƒØªØ´Ù Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'Explore the App'}</Link></Button>
        </div>
      </section>
    </>
  );
}
