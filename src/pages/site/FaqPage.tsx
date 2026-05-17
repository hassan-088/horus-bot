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
          q: 'Ù…Ø§ Ù‡Ùˆ Horus-BotØŸ',
          a: 'Horus-Bot Ø±ÙˆØ¨ÙˆØª Ø¥Ø±Ø´Ø§Ø¯ Ø°Ø§ØªÙŠ ÙŠÙ‚ÙˆØ¯ Ø§Ù„Ø¬ÙˆÙ„Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­ÙØŒ Ø¨ÙŠÙ†Ù…Ø§ ÙŠØ¯Ø¹Ù…Ùƒ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ Ø¨Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ ÙˆØ§Ù„Ø®Ø±Ø§Ø¦Ø·ØŒ ÙˆÙ…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø§ØªØŒ ÙˆØ§Ù„ØªÙØ§Ø¹Ù„ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø²ÙŠØ§Ø±Ø©.',
        },
        {
          q: 'Ù‡Ù„ Ø£Ø­ØªØ§Ø¬ Ø¥Ù„Ù‰ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŸ',
          a: 'Ù†Ø¹Ù…ØŒ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù‡Ùˆ Ø§Ù„Ù…ÙƒØ§Ù† Ø§Ù„Ø°ÙŠ ØªØ³ØªØ®Ø¯Ù… ÙÙŠÙ‡ ØªØ°Ø§ÙƒØ±Ùƒ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù ÙˆØªÙ‚Ø±Ù† ØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø¨Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ø§Ù„ÙØ¹Ù„ÙŠ Ø¹Ù†Ø¯ Ø§Ù„ÙˆØµÙˆÙ„.',
        },
        {
          q: 'Ø£ÙŠÙ† Ø£Ø­Ø¬Ø² Ø§Ù„ØªØ°Ø§ÙƒØ±ØŸ',
          a: 'ÙŠÙ…ÙƒÙ†Ùƒ Ø­Ø¬Ø² ØªØ°ÙƒØ±Ø© Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù ÙˆØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Horus-Bot Ù…Ù† Ø§Ù„Ù…ÙˆÙ‚Ø¹. Ø¨Ø¹Ø¯ Ø§Ù„Ø­Ø¬Ø² Ø³ØªØ¸Ù‡Ø± Ø§Ù„ØªØ°Ø§ÙƒØ± ÙÙŠ Ø­Ø³Ø§Ø¨Ùƒ Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆÙÙŠ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ.',
        },
        {
          q: 'Ù‡Ù„ Ø±Ù…Ø² Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù Ù‡Ùˆ Ù†ÙØ³Ù‡ Ø±Ù…Ø² Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØªØŸ',
          a: 'Ù„Ø§. Ø±Ù…Ø² ØªØ°ÙƒØ±Ø© Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù ÙŠØ³ØªØ®Ø¯Ù… Ø¹Ù†Ø¯ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ù…ØªØ­Ù. Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙŠØ­Ø¯Ø« Ù„Ø§Ø­Ù‚Ø§ Ø¯Ø§Ø®Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ Ø¹Ù† Ø·Ø±ÙŠÙ‚ Ù…Ø³Ø­ Ø±Ù…Ø² QR Ø§Ù„ÙØ¹Ù„ÙŠ Ø§Ù„Ù…ÙˆØ¬ÙˆØ¯ Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ¨ÙˆØª.',
        },
        {
          q: 'Ù…Ø§ Ø·Ø±Ù‚ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…ØªØ§Ø­Ø©ØŸ',
          a: 'Ø§Ù„Ø­Ø¬Ø² Ø§Ù„Ø­Ø§Ù„ÙŠ ÙŠØ³ØªØ®Ø¯Ù… Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù†Ù‚Ø¯ÙŠ Ø¹Ù†Ø¯ Ø´Ø¨Ø§Ùƒ Ø§Ù„Ù…ØªØ­Ù. Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙØ¹ ØªØ¸Ù‡Ø± ÙƒØªØ³Ø¯ÙŠØ¯ Ø¹Ù†Ø¯ Ø§Ù„Ø´Ø¨Ø§ÙƒØŒ ÙˆÙ„Ø§ ÙŠÙˆØ¬Ø¯ Ø¯ÙØ¹ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø£Ùˆ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø­Ø§Ù„ÙŠØ§.',
        },
        {
          q: 'Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø¥Ù„ØºØ§Ø¡ Ø§Ù„Ø­Ø¬Ø²ØŸ',
          a: 'Ù†Ø¹Ù…ØŒ ÙŠÙ…ÙƒÙ† Ø¥Ù„ØºØ§Ø¡ Ø§Ù„Ø­Ø¬Ø² Ù…Ù† ØµÙØ­Ø© ØªØ°Ø§ÙƒØ±ÙŠ Ø­ØªÙ‰ 24 Ø³Ø§Ø¹Ø© Ù‚Ø¨Ù„ Ù…ÙˆØ¹Ø¯ Ø§Ù„Ø²ÙŠØ§Ø±Ø© Ø¥Ø°Ø§ Ù„Ù… ØªÙƒÙ† Ø§Ù„ØªØ°Ø§ÙƒØ± Ù…Ø³ØªØ®Ø¯Ù…Ø© Ø£Ùˆ Ù…Ù†ØªÙ‡ÙŠØ© Ø£Ùˆ Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø¬ÙˆÙ„Ø© Ø±ÙˆØ¨ÙˆØª Ø¨Ø¯Ø£Øª Ø¨Ø§Ù„ÙØ¹Ù„.',
        },
        {
          q: 'Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ ØªØºÙŠÙŠØ± Ø§Ù„Ù…ÙˆØ¹Ø¯ØŸ',
          a: 'ØªØºÙŠÙŠØ± Ø§Ù„Ù…ÙˆØ¹Ø¯ ØºÙŠØ± Ù…ØªØ§Ø­ Ø­Ø§Ù„ÙŠØ§. Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ø­Ø¬Ø² Ù…Ø¤Ù‡Ù„Ø§ Ù„Ù„Ø¥Ù„ØºØ§Ø¡ØŒ ÙŠÙ…ÙƒÙ†Ùƒ Ø¥Ù„ØºØ§Ø¡Ù‡ Ø«Ù… Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø¬Ø² Ø¬Ø¯ÙŠØ¯ Ø¨Ø§Ù„Ù…ÙˆØ¹Ø¯ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.',
        },
        {
          q: 'Ù…Ø§ Ø§Ù„Ù„ØºØ§Øª Ø§Ù„Ù…Ø¯Ø¹ÙˆÙ…Ø©ØŸ',
          a: 'ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚ ØªØ¯Ø¹Ù… Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© ÙˆØ§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©. Ù„ØºØ© Ø³Ø±Ø¯ Ø¬ÙˆÙ„Ø© Ø§Ù„Ø±ÙˆØ¨ÙˆØª ÙŠØªÙ… Ø§Ø®ØªÙŠØ§Ø±Ù‡Ø§ Ø¶Ù…Ù† Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª ØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Horus-Bot.',
        },
        {
          q: 'Ù‡Ù„ Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ø°ÙˆÙŠ Ø§Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ø®Ø§ØµØ©ØŸ',
          a: 'ØªØ¯Ø¹Ù… Ø®Ø·Ø· Ø§Ù„Ø¬ÙˆÙ„Ø© ØªÙØ¶ÙŠÙ„Ø§Øª Ø§Ù„ÙˆØµÙˆÙ„ Ù…Ø«Ù„ Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„Ø£Ø³Ù‡Ù„ ÙˆØ§Ù„ÙˆØµÙ Ø§Ù„ØµÙˆØªÙŠØŒ ÙˆØªØ¸Ù‡Ø± Ù‡Ø°Ù‡ Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§Øª Ø¶Ù…Ù† Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¬ÙˆÙ„Ø© ÙÙŠ ØªØ°ÙƒØ±ØªÙƒ.',
        },
      ]
    : [
        {
          q: 'What is Horus-Bot?',
          a: 'Horus-Bot is an autonomous robot guide for the museum visit. The mobile app supports the same account, tickets, maps, exhibit content, and in-visit interaction.',
        },
        {
          q: 'Do I need the mobile app?',
          a: 'Yes. The website is for pre-visit booking and account management. Robot Pairing and the Live Tour happen later inside the mobile app.',
        },
        {
          q: 'Where do I book tickets?',
          a: 'You can book the Museum Entry Ticket and Horus-Bot Tour Ticket on the website. The same tickets appear in your account on both website and mobile app.',
        },
        {
          q: 'Is the museum entry QR the same as the robot pairing QR?',
          a: 'No. The Museum Entry QR is used at the museum gate. Robot Pairing happens later in the mobile app by scanning the physical QR code on the robot.',
        },
        {
          q: 'Which payment methods are supported?',
          a: 'Bookings currently use cash payment at the museum counter. Payment status is shown as Pay at Counter; there is no online payment gateway in the current product.',
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes. Eligible active bookings can be cancelled from My Tickets up to 24 hours before the visit, as long as the tickets have not been used, expired, or started as a robot tour.',
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
        label={isRTL ? 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©' : 'FAQ'}
        title={isRTL ? 'Ø¥Ø¬Ø§Ø¨Ø§Øª ÙˆØ§Ø¶Ø­Ø© Ù‚Ø¨Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø©' : 'Clear answers before you book'}
        subtitle={
          isRTL
            ? 'Ø§Ø¹Ø±Ù Ø£ÙŠÙ† ØªØ­Ø¬Ø²ØŒ ÙˆÙƒÙŠÙ ØªØ³ØªØ®Ø¯Ù… Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ ÙˆÙ…ØªÙ‰ ÙŠØ¨Ø¯Ø£ Ø¯ÙˆØ± ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ.'
            : 'Understand booking, tickets, payment, cancellation, and the handoff to the mobile app.'
        }
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
            {isRTL ? 'Ù‡Ù„ ØªØ±ÙŠØ¯ ØªØ¬Ù‡ÙŠØ² Ø²ÙŠØ§Ø±ØªÙƒØŸ' : 'Ready to plan your visit?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'Ø§Ø­Ø¬Ø² ØªØ°ÙƒØ±ØªÙƒ Ø§Ù„Ø¢Ù† ÙˆØ³ØªØ¸Ù‡Ø± ÙÙŠ Ø­Ø³Ø§Ø¨Ùƒ Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚.' : 'Book now and your tickets will appear in both the website and mobile app.'}
          </p>
          <Button asChild size="lg">
            <Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ' : 'Book your visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
