import { Link } from 'react-router-dom';
import { MessageSquare, Bell, Map, BookOpen, Smartphone, Compass, Award, Sparkles, Ticket, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';
import gemMapImage from '@/assets/gem-complex-map.png';

export default function AppPage() {
  const { isRTL } = useApp();

  const screens = [
    { icon: Ticket, label: isRTL ? 'ØªØ°Ø§ÙƒØ±ÙŠ' : 'My Tickets' },
    { icon: QrCode, label: isRTL ? 'Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØª' : 'Robot Pairing' },
    { icon: Map, label: isRTL ? 'Ø§Ù„Ù…Ù„Ø§Ø­Ø© Ø§Ù„Ø­ÙŠØ©' : 'Live navigation' },
    { icon: BookOpen, label: isRTL ? 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª' : 'Exhibit details' },
    { icon: MessageSquare, label: isRTL ? 'Ø§Ø³Ø£Ù„ Ø§Ù„Ù…Ø±Ø´Ø¯' : 'Ask the guide' },
  ];

  const actions = (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button asChild size="lg">
        <Link to="/book">
          <Ticket className="h-4 w-4" /> {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ' : 'Book your visit'}
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link to="/tickets-mine">
          <Smartphone className="h-4 w-4" /> {isRTL ? 'Ø¹Ø±Ø¶ ØªØ°Ø§ÙƒØ±ÙŠ' : 'View my tickets'}
        </Link>
      </Button>
    </div>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù…Ø±Ø§ÙÙ‚' : 'The Companion App'}
        title={isRTL ? 'ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…ØªØ­Ù ÙÙŠ ÙŠØ¯Ùƒ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Your Museum Visit, Ready in Your Hand'}
        subtitle={
          isRTL
            ? 'Ø§Ø­Ø¬Ø² Ù…Ù† Ø§Ù„Ù…ÙˆÙ‚Ø¹ØŒ Ø«Ù… Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ ÙˆØ§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØªØŒ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„Ø­ÙŠØ©.'
            : 'Book on the website, then use the mobile app inside the museum for tickets, Robot Pairing, and the Live Tour.'
        }
        actions={actions}
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 -mt-6 mb-4 text-center space-y-2">
        <p className="text-sm text-foreground/85">
          {isRTL ? 'Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙŠØ¬Ù‡Ø² Ø§Ù„Ø²ÙŠØ§Ø±Ø©ØŒ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚ ÙŠÙƒÙ…Ù„Ù‡Ø§ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù.' : 'The website prepares the visit; the app carries it through inside the museum.'}
        </p>
        <p className="text-sm text-primary/90">
          {isRTL
            ? 'ØªØ°ÙƒØ±Ø© Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù ØªØ³ØªØ®Ø¯Ù… Ø¹Ù†Ø¯ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø©. Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙŠØªÙ… Ù„Ø§Ø­Ù‚Ø§ ÙÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ù…Ø³Ø­ Ø±Ù…Ø² QR Ø§Ù„ÙØ¹Ù„ÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ¨ÙˆØª.'
            : 'The museum entry QR is used at the gate. Robot Pairing happens later in the app by scanning the physical QR on the robot.'}
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="section-label mb-4">{isRTL ? 'Ù…ØµÙ…Ù… Ø­ÙˆÙ„ Ø²ÙŠØ§Ø±ØªÙƒ' : 'Designed Around Your Visit'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'ÙƒÙ„ Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù' : 'Everything You Need Inside the Museum'}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Compass}
            title={isRTL ? 'Ù…Ø³Ø§Ø±Ùƒ ÙˆØ§Ø¶Ø­' : 'Your Route Stays Clear'}
            description={isRTL ? 'ØªØ§Ø¨Ø¹ Ù…ÙˆÙ‚Ø¹ÙƒØŒ Ù…Ø­Ø·ØªÙƒ Ø§Ù„ØªØ§Ù„ÙŠØ©ØŒ ÙˆØªÙ‚Ø¯Ù… Ø§Ù„Ø¬ÙˆÙ„Ø© Ù…Ù† Ø´Ø§Ø´Ø© ÙˆØ§Ø­Ø¯Ø©.' : 'Follow your location, next stop, and tour progress from one place.'}
          />
          <FeatureCard
            icon={BookOpen}
            title={isRTL ? 'Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª' : 'Exhibit Content'}
            description={isRTL ? 'Ø§Ù‚Ø±Ø£ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª ÙˆØ§Ø³ØªÙ…Ø¹ Ø¥Ù„Ù‰ Ø§Ù„Ø³Ø±Ø¯ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ Ù„Ø¬ÙˆÙ„ØªÙƒ.' : 'Read exhibit details and follow narration selected for your tour.'}
          />
          <FeatureCard
            icon={MessageSquare}
            title={isRTL ? 'Ø£Ø³Ø¦Ù„Ø© Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¬ÙˆÙ„Ø©' : 'Questions During the Tour'}
            description={isRTL ? 'Ø§Ø·Ø±Ø­ Ø£Ø³Ø¦Ù„ØªÙƒ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø²ÙŠØ§Ø±Ø© ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¥Ø¬Ø§Ø¨Ø§Øª Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª ÙˆØ§Ù„Ø¬ÙˆÙ„Ø©.' : 'Ask during the visit and receive answers connected to exhibits and your tour.'}
          />
          <FeatureCard
            icon={Bell}
            title={isRTL ? 'ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Visit Updates'}
            description={isRTL ? 'ØªØ§Ø¨Ø¹ Ø­Ø§Ù„Ø© Ø§Ù„Ø¬ÙˆÙ„Ø©ØŒ Ø§Ù„ØªÙ‚Ø¯Ù…ØŒ ÙˆØ£ÙŠ Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ù…Ø±ØªØ¨Ø·Ø© Ø¨ØªØ¬Ø±Ø¨ØªÙƒ.' : 'Keep track of tour state, progress, and guidance tied to your visit.'}
          />
        </div>
      </section>

      <section className="relative bg-sidebar/15 overflow-hidden">
        <img
          src={gemMapImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="section-label mb-4">{isRTL ? 'Ø´Ø§Ø´Ø§Øª Ø£Ø³Ø§Ø³ÙŠØ©' : 'Core Screens'}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{isRTL ? 'Ù…Ø§ Ø³ØªØ³ØªØ®Ø¯Ù…Ù‡ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù' : 'What You Use at the Museum'}</h2>
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-5">
            {screens.map((s) => (
              <div key={s.label} className="space-y-3">
                <Card className="aspect-[9/16] bg-gradient-to-br from-card via-card to-primary/10 p-4 flex flex-col ring-1 ring-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-1.5 w-10 rounded-full bg-primary/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex-1 rounded-xl bg-background/50 ring-1 ring-border/40 flex flex-col items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center ring-1 ring-primary/30">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium px-2 text-center">{s.label}</p>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 rounded-full bg-muted" />
                    <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                  </div>
                </Card>
                <p className="text-xs text-center text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{isRTL ? 'Ø§Ø¨Ø¯Ø£ Ù…Ù† Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ£ÙƒÙ…Ù„ Ø¯Ø§Ø®Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'Start on the Website, Continue in the App'}</h2>
        <p className="text-lg text-muted-foreground mb-10">
          {isRTL
            ? 'Ø¨Ø¹Ø¯ Ø§Ù„Ø­Ø¬Ø²ØŒ ØªØ¸Ù‡Ø± ØªØ°Ø§ÙƒØ±Ùƒ ÙÙŠ Ø­Ø³Ø§Ø¨Ùƒ. Ø¹Ù†Ø¯ ÙˆØµÙˆÙ„ÙƒØŒ Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù„Ù„Ø¯Ø®ÙˆÙ„ØŒ ÙˆØ§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØªØŒ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¬ÙˆÙ„Ø©.'
            : 'After booking, your tickets stay in your account. When you arrive, use the app for entry, Robot Pairing, and the Live Tour.'}
        </p>
        {actions}
      </section>
    </>
  );
}
