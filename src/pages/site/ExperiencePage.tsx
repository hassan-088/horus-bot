import { Ticket, Bot, Navigation, Award, Accessibility, Smartphone, QrCode, Headphones, MapPin, MessageSquare, Camera, Volume2, Type, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHero } from '@/components/site/SectionHero';
import { FeatureCard } from '@/components/site/FeatureCard';
import { useApp } from '@/contexts/AppContext';
import onboardingImage from '@/assets/onboarding.jpg';
import gemImage from '@/assets/gem.jpg';
import rosettaImage from '@/assets/exhibit-rosetta.jpg';
import maskImage from '@/assets/exhibit-golden-mask.jpg';

export default function ExperiencePage() {
  const { isRTL } = useApp();

  const Stage = ({ label, title, intro, items, image, imageAlt }: { label: string; title: string; intro?: string; items: { icon: any; title: string; desc: string }[]; image?: string; imageAlt?: string }) => (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
      {image && (
        <div className="relative mb-10 overflow-hidden rounded-2xl ring-1 ring-primary/15">
          <img src={image} alt={imageAlt || ''} loading="lazy" className="aspect-[21/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      )}
      <div className="section-label mb-4">{label}</div>
      <h2 className="font-serif text-3xl md:text-4xl mb-4">{title}</h2>
      {intro && <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">{intro}</p>}
      {!intro && <div className="mb-10" />}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => <FeatureCard key={it.title} icon={it.icon} title={it.title} description={it.desc} />)}
      </div>
    </section>
  );

  return (
    <>
      <SectionHero
        label={isRTL ? 'Ø§Ù„ØªØ¬Ø±Ø¨Ø©' : 'Experience'}
        title={isRTL ? 'Ù…Ø§ ÙŠØ­Ø¯Ø« Ø®Ù„Ø§Ù„ Ø²ÙŠØ§Ø±ØªÙƒ' : 'What Happens During Your Visit'}
        subtitle={isRTL ? 'Ø±Ø­Ù„Ø© Ø®Ø·ÙˆØ© Ø¨Ø®Ø·ÙˆØ© Ù…Ù† Ø§Ù„Ø­Ø¬Ø² ÙˆØ­ØªÙ‰ Ù†Ù‡Ø§ÙŠØ© Ø¬ÙˆÙ„ØªÙƒ Ø§Ù„Ù…ÙˆØ¬ÙŽÙ‘Ù‡Ø©.' : 'A step-by-step journey from booking to the end of your guided tour.'}
      />

      <Stage
        image={onboardingImage}
        imageAlt={isRTL ? 'ØªØ®Ø·ÙŠØ· Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Planning your visit'}
        label={isRTL ? 'Ù‚Ø¨Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Before Visit'}
        title={isRTL ? 'ØªØ¬Ù‡ÙŠØ² Ù‡Ø§Ø¯Ø¦ Ù…Ù† Ø§Ù„Ù…Ù†Ø²Ù„' : 'Prepare Calmly from Home'}
        items={[
          { icon: Ticket, title: isRTL ? 'Ø§Ø®ØªØ± ÙˆÙ‚Øª Ø²ÙŠØ§Ø±ØªÙƒ' : 'Choose Your Visit Time', desc: isRTL ? 'Ø§Ø­Ø¬Ø² Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„ØªÙŠ ØªÙ†Ø§Ø³Ø¨ Ù…Ø¬Ù…ÙˆØ¹ØªÙƒ ÙˆØ¬Ø¯ÙˆÙ„Ùƒ Ø§Ù„Ù…ÙØ¶Ù‘Ù„.' : 'Reserve the experience that fits your group and preferred schedule.' },
          { icon: Navigation, title: isRTL ? 'Ø­Ø¯Ù‘Ø¯ Ù…Ø¯Ø© Ø¬ÙˆÙ„ØªÙƒ' : 'Pick Your Tour Length', desc: isRTL ? 'Ø§Ø®ØªØ± Ø·ÙˆÙ„ Ø§Ù„Ø¬ÙˆÙ„Ø© Ø§Ù„Ø°ÙŠ ÙŠÙ†Ø§Ø³Ø¨ Ø²ÙŠØ§Ø±ØªÙƒ â€” Ù‚ØµÙŠØ±Ø©ØŒ Ø§Ø¹ØªÙŠØ§Ø¯ÙŠØ©ØŒ Ø£Ùˆ Ù…ÙˆØ³ÙŽÙ‘Ø¹Ø©.' : 'Choose the tour length that suits your visit â€” short, standard, or extended.' },
          { icon: Smartphone, title: isRTL ? 'Ø­Ù…Ù‘Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù‚Ø¨Ù„ Ø§Ù„ÙˆØµÙˆÙ„' : 'Install the App Before Arrival', desc: isRTL ? 'Ø¬Ù‡Ù‘Ø² ÙƒÙ„ Ø´ÙŠØ¡ Ù‚Ø¨Ù„ ÙˆØµÙˆÙ„Ùƒ Ù„ÙŠÙƒÙˆÙ† ÙƒÙ„ Ø´ÙŠØ¡ Ø¬Ø§Ù‡Ø²Ø§Ù‹ Ø¹Ù†Ø¯ Ø¯Ø®ÙˆÙ„Ùƒ.' : 'Get set up before you arrive so everything is ready when you walk in.' },
          { icon: QrCode, title: isRTL ? 'ØªØ°ÙƒØ±Ø© QR Ø¹Ù„Ù‰ Ù‡Ø§ØªÙÙƒ' : 'Your QR Ticket on Your Phone', desc: isRTL ? 'ØªØµÙ„Ùƒ ØªØ°ÙƒØ±ØªÙƒ Ù…Ø¨Ø§Ø´Ø±Ø©Ù‹ Ø¹Ù„Ù‰ Ù‡Ø§ØªÙÙƒ Ù„Ø¯Ø®ÙˆÙ„ Ø³Ø±ÙŠØ¹ ÙˆØ³Ù„Ø³.' : 'Receive your ticket instantly on your phone for fast, seamless entry.' },
        ]}
      />

      <div className="bg-sidebar/15">
        <Stage
          image={gemImage}
          imageAlt={isRTL ? 'Ù…Ø¯Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù Ø§Ù„Ù…ØµØ±ÙŠ Ø§Ù„ÙƒØ¨ÙŠØ±' : 'Grand Egyptian Museum entrance'}
          label={isRTL ? 'ÙÙŠ Ø§Ù„Ù…ØªØ­Ù' : 'At the Museum'}
          title={isRTL ? 'Ø§Ù„ÙˆØµÙˆÙ„ ÙˆØ¨Ø¯Ø¡ Ø¬ÙˆÙ„ØªÙƒ' : 'Arrive and Begin Your Tour'}
          items={[
            { icon: QrCode, title: isRTL ? 'Ø§Ù…Ø³Ø­ Ø¹Ù†Ø¯ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø©' : 'Scan at the Gate', desc: isRTL ? 'Ø§Ù…Ø³Ø­ Ø±Ù…Ø² QR Ù„ØªÙØ¹ÙŠÙ„ Ø²ÙŠØ§Ø±ØªÙƒ ÙÙˆØ±Ø§Ù‹.' : 'Scan your QR code to activate your visit instantly.' },
            { icon: Bot, title: isRTL ? 'Ø§Ù‚ØªØ±Ù† Ø¨Ø±ÙˆØ¨ÙˆØª Horus-Bot Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù' : 'Pair With Horus-Bot at the Museum', desc: isRTL ? 'ØªÙƒÙˆÙ† ØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø¬Ø§Ù‡Ø²Ø© ÙÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŒ ÙˆÙŠØªÙ… Ø§Ù„Ø§Ù‚ØªØ±Ø§Ù† Ø¹Ø¨Ø± Ù…Ø³Ø­ Ø±Ù…Ø² QR Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ¨ÙˆØª.' : 'Your Horus-Bot Tour Ticket will be ready in the app. Robot Pairing happens at the museum by scanning the physical robot QR.' },
            { icon: Headphones, title: isRTL ? 'ØªØ¬Ø±Ø¨Ø© ØµÙˆØªÙŠØ© Ø£ÙƒØ«Ø± Ø®ØµÙˆØµÙŠØ©' : 'A More Personal Audio Experience', desc: isRTL ? 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø³Ù…Ù‘Ø§Ø¹Ø§Øª Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© Ø§Ø³ØªÙ…Ø§Ø¹ Ø£ÙƒØ«Ø± ØªØ±ÙƒÙŠØ²Ø§Ù‹ ÙˆØ®ØµÙˆØµÙŠØ©.' : 'Use headphones for a more focused and personal listening experience.' },
          ]}
        />
      </div>

      <Stage
        image={rosettaImage}
        imageAlt={isRTL ? 'Ø­Ø¬Ø± Ø±Ø´ÙŠØ¯' : 'Rosetta Stone'}
        label={isRTL ? 'Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¬ÙˆÙ„Ø©' : 'During the Tour'}
        title={isRTL ? 'Ø¬ÙˆÙ„Ø© Ø·Ø¨ÙŠØ¹ÙŠØ© ØªØªÙƒÙŠÙ‘Ù Ù…Ø¹Ùƒ' : 'A Natural Tour That Adapts to You'}
        intro={isRTL
          ? 'ÙŠÙ‚ÙˆØ¯ Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ø²ÙˆØ§Ø± Ø¹Ø¨Ø± Ø§Ù„Ù…ØªØ­Ù Ø¨Ø¥ÙŠÙ‚Ø§Ø¹ Ù…Ø±ÙŠØ­ØŒ ÙÙŠØ³Ø§Ø¹Ø¯Ù‡Ù… Ø¹Ù„Ù‰ Ø§Ù„ØªØ±ÙƒÙŠØ² ÙÙŠ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ø¨Ø¯Ù„Ø§Ù‹ Ù…Ù† Ø§Ù„Ù‚Ù„Ù‚ Ø­ÙˆÙ„ Ø¥Ù„Ù‰ Ø£ÙŠÙ† ÙŠØ°Ù‡Ø¨ÙˆÙ† Ø¨Ø¹Ø¯ Ø°Ù„Ùƒ.'
          : 'The robot guides visitors through the museum at a comfortable pace, helping them focus on the exhibits instead of worrying about where to go next.'}
        items={[
          { icon: Bot, title: isRTL ? 'Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙŠÙ‚ÙˆØ¯ Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª' : 'The Robot Leads Between Exhibits', desc: isRTL ? 'ÙŠÙ‚ÙˆØ¯ Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ø²ÙˆØ§Ø± Ø¨Ø³Ù„Ø§Ø³Ø© Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ø¨Ø¥ÙŠÙ‚Ø§Ø¹ Ù…Ø±ÙŠØ­.' : 'The robot guides visitors smoothly between exhibits at a comfortable pace.' },
          { icon: Map, title: isRTL ? 'Ø®Ø±ÙŠØ·Ø© Ø­ÙŠØ© ÙˆØ§Ù„Ù…Ø­Ø·Ø© Ø§Ù„ØªØ§Ù„ÙŠØ©' : 'Live Map and Next Stop', desc: isRTL ? 'ØªØ§Ø¨Ø¹ Ù…ÙˆÙ‚Ø¹ÙƒØŒ Ø§Ù„Ù…Ø­Ø·Ø© Ø§Ù„ØªØ§Ù„ÙŠØ©ØŒ ÙˆØªÙ‚Ø¯Ù‘Ù… Ø§Ù„Ø¬ÙˆÙ„Ø© ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ.' : 'Track location, next stop, and tour progress in real time.' },
          { icon: MapPin, title: isRTL ? 'Ø§Ø³ØªÙƒØ´Ù Ø£ÙŠ Ù…Ø¹Ø±ÙˆØ¶Ø© Ø¨Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„ØªÙØ§ØµÙŠÙ„' : 'Explore Any Exhibit in More Detail', desc: isRTL ? 'Ø§ÙØªØ­ Ù…Ø­ØªÙˆÙ‰ Ù…ÙˆØ³ÙŽÙ‘Ø¹Ø§Ù‹ØŒ ØµÙˆØ±Ø§Ù‹ØŒ ÙˆØªØ¹Ù„ÙŠÙ‚Ø§Ù‹ ØµÙˆØªÙŠØ§Ù‹ Ù„Ø£ÙŠ Ù…Ø¹Ø±ÙˆØ¶Ø©.' : 'Open extended content, images, and audio for any exhibit.' },
          { icon: MessageSquare, title: isRTL ? 'Ø§Ø·Ø±Ø­ Ø£Ø³Ø¦Ù„ØªÙƒ Ø¨Ù„ØºØªÙƒ' : 'Ask Questions in Your Language', desc: isRTL ? 'Ø§Ø·Ø±Ø­ Ø£Ø³Ø¦Ù„ØªÙƒ ÙÙŠ Ø£ÙŠ ÙˆÙ‚Øª ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¥Ø¬Ø§Ø¨Ø§Øª Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©ØŒ Ø§Ù„Ø¹Ø§Ù…ÙŠØ© Ø§Ù„Ù…ØµØ±ÙŠØ©ØŒ Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©ØŒ Ø£Ùˆ Ù„ØºØ§Øª Ø£Ø®Ø±Ù‰ Ù…Ø¯Ø¹ÙˆÙ…Ø© ÙˆÙÙ‚Ø§Ù‹ Ù„Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…ØªØ­Ù.' : 'Ask questions at any time and receive answers in Arabic, Egyptian Arabic, English, or other supported languages depending on the museum setup.' },
        ]}
      />

      <div className="bg-sidebar/15">
        <Stage
          image={maskImage}
          imageAlt={isRTL ? 'Ù‚Ù†Ø§Ø¹ ØªÙˆØª Ø¹Ù†Ø® Ø¢Ù…ÙˆÙ†' : 'Mask of Tutankhamun'}
          label={isRTL ? 'Ø§Ù„ØªÙØ§Ø¹Ù„' : 'Engagement'}
          title={isRTL ? 'Ù„Ø­Ø¸Ø§Øª ØµØºÙŠØ±Ø© ØªØ¨Ù‚Ù‰ Ù…Ø¹Ùƒ' : 'Small Moments That Stay With You'}
          items={[
            { icon: Award, title: isRTL ? 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù‚ØµÙŠØ±Ø©' : 'Short Quizzes', desc: isRTL ? 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù‚ØµÙŠØ±Ø© ØªØ±Ø³Ù‘Ø® Ù…Ø§ Ø§Ø³ØªÙƒØ´ÙÙ‡ Ø§Ù„Ø²ÙˆØ§Ø± Ù„Ù„ØªÙˆ.' : 'Short quizzes reinforce what visitors just explored.' },
            { icon: Award, title: isRTL ? 'ØªÙ‚Ø¯ÙÙ‘Ù… Ù…Ø­ÙÙˆØ¸' : 'Saved Progress', desc: isRTL ? 'ÙŠØ¨Ù‚Ù‰ Ø§Ù„ØªÙ‚Ø¯Ù‘Ù… ÙˆØ§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ù…Ø­ÙÙˆØ¸ÙŽÙŠÙ† Ø¹Ø¨Ø± ÙƒÙ„ Ø²ÙŠØ§Ø±Ø§ØªÙƒ.' : 'Progress and achievements stay saved across visits.' },
            { icon: Camera, title: isRTL ? 'Ù†Ù‚Ø§Ø· ØªØµÙˆÙŠØ±' : 'Photo Points', desc: isRTL ? 'Ø§Ù„ØªÙ‚Ø· Ù„Ø­Ø¸Ø§Øª Ù„Ø§ ØªÙÙ†Ø³Ù‰ Ø¹Ù†Ø¯ Ù†Ù‚Ø§Ø· ØªØµÙˆÙŠØ± Ù…Ù†ØªÙ‚Ø§Ø© Ø¨Ø¹Ù†Ø§ÙŠØ© Ø¹Ù„Ù‰ Ø·ÙˆÙ„ Ø§Ù„Ø¬ÙˆÙ„Ø©.' : 'Capture memorable moments at curated photo spots throughout the tour.' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="section-label mb-4">{isRTL ? 'Ø¥Ù…ÙƒØ§Ù†ÙŠØ© Ø§Ù„ÙˆØµÙˆÙ„' : 'Accessibility'}</div>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">{isRTL ? 'ØªØ¬Ø±Ø¨Ø© Ù„ÙƒÙ„ Ø²Ø§Ø¦Ø±' : 'An Experience for Every Visitor'}</h2>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {isRTL ? 'ØµÙÙ…ÙÙ‘Ù…Øª Ù„ØªØ¬Ø¹Ù„ Ø²ÙŠØ§Ø±Ø© Ø§Ù„Ù…ØªØ­Ù Ø£ÙƒØ«Ø± Ø³Ù„Ø§Ø³Ø© ÙˆØ´Ù…ÙˆÙ„Ø§Ù‹ Ù„Ù…Ø®ØªÙ„Ù Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ø²ÙˆØ§Ø±.' : 'Created to make the museum experience smoother and more inclusive for different visitor needs.'}
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card className="p-7">
            <Accessibility className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'Ù…Ø³Ø§Ø±Ø§Øª Ø¨Ø¯ÙˆÙ† Ø¯Ø±Ø¬' : 'Step-Free Routes'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'ÙƒÙ„ Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª Ù…ØµÙ…ÙŽÙ‘Ù…Ø© Ù„ØªÙƒÙˆÙ† Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ù„ÙƒØ±Ø§Ø³ÙŠ Ø§Ù„Ù…ØªØ­Ø±ÙƒØ© ÙˆØ¹Ø±Ø¨Ø§Øª Ø§Ù„Ø£Ø·ÙØ§Ù„.' : 'All routes are designed to be wheelchair and stroller accessible.'}</p>
          </Card>
          <Card className="p-7">
            <Type className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'Ø­Ø¬Ù… Ù†Øµ Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªØ¹Ø¯ÙŠÙ„' : 'Adjustable Text Size'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'Ø¹Ø¯ÙÙ‘Ù„ Ø­Ø¬Ù… Ø§Ù„Ù†Øµ ÙˆÙØ¹Ù‘Ù„ ÙˆØ¶Ø¹ Ø§Ù„ØªØ¨Ø§ÙŠÙ† Ø§Ù„Ø¹Ø§Ù„ÙŠ Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©.' : 'Adjust text size and enable high-contrast mode when needed.'}</p>
          </Card>
          <Card className="p-7">
            <Volume2 className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-serif text-lg mb-2">{isRTL ? 'ÙˆØµÙ ØµÙˆØªÙŠ Ù…ÙˆØ³ÙŽÙ‘Ø¹' : 'Extended Audio Descriptions'}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{isRTL ? 'ÙˆØµÙ ØµÙˆØªÙŠ ØªÙØµÙŠÙ„ÙŠ ÙŠØ¯Ø¹Ù… Ø§Ù„Ø²ÙˆØ§Ø± Ø¶Ø¹Ø§Ù Ø§Ù„Ø¨ØµØ±.' : 'Detailed audio descriptions support visitors with low vision.'}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
