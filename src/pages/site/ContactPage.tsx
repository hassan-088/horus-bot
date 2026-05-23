import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send, Briefcase, Ticket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { z } from 'zod';

const SUBJECTS = ['support', 'booking', 'technical', 'partnership', 'press'] as const;
const CONTACT_EMAIL = 'tourguiderobot@gmail.com';
type Subject = (typeof SUBJECTS)[number];

const schema = z.object({
  name: z.string().trim().min(2, 'Too short').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  subject: z.enum(SUBJECTS),
  message: z.string().trim().min(10, 'Too short').max(1000),
});

export default function ContactPage() {
  const { isRTL } = useApp();
  const [form, setForm] = useState<{ name: string; email: string; subject: Subject; message: string }>({
    name: '',
    email: '',
    subject: 'support',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(isRTL ? '???? ?????? ?????? ??????? ??? ???????.' : 'Please review the form before sending.');
      return;
    }
    setSubmitting(true);
    const subject = encodeURIComponent(`[Horus-Bot] ${form.subject}`);
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Subject: ${form.subject}`,
      '',
      form.message,
    ].join('\n'));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success(isRTL ? '???? ??? ????? ?????? ?????? ??????.' : 'Your email app will open to send the message.');
    setSubmitting(false);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? 'ØªÙˆØ§ØµÙ„' : 'Contact'}
        title={isRTL ? 'ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø§Ù„ÙØ±ÙŠÙ‚ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨' : 'Reach the Right Team'}
        subtitle={isRTL ? 'ÙØ±ÙŠÙ‚Ù†Ø§ Ù‡Ù†Ø§ Ù„Ù…Ø³Ø§Ø¹Ø¯ØªÙƒ Ù‚Ø¨Ù„ Ø²ÙŠØ§Ø±ØªÙƒ ÙˆØ£Ø«Ù†Ø§Ø¡Ù‡Ø§ ÙˆØ¨Ø¹Ø¯Ù‡Ø§.' : 'Our team is here to help before, during, and after your visit.'}
      />

      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Card className="p-6">
              <Mail className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'Ø¯Ø¹Ù… Ø§Ù„Ø²ÙˆØ§Ø±' : 'Visitor Support'}</h3>
              <p className="text-sm text-muted-foreground">tourguiderobot@gmail.com</p>
              <p className="text-xs text-primary/90 mt-2">{isRTL ? 'Ø§Ù„Ø±Ø¯ÙˆØ¯ Ø¹Ø§Ø¯Ø©Ù‹ Ø®Ù„Ø§Ù„ Ø³Ø§Ø¹Ø§Øª Ù‚Ù„ÙŠÙ„Ø©.' : 'Typically replies within a few hours.'}</p>
            </Card>
            <Card className="p-6">
              <Briefcase className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ù…ØªØ§Ø­Ù' : 'Museum Partnerships'}</h3>
              <p className="text-sm text-muted-foreground">museums@horus-bot.com</p>
              <p className="text-xs text-muted-foreground mt-2">{isRTL ? 'Ù„Ù„Ù…ØªØ§Ø­Ù Ø§Ù„Ø±Ø§ØºØ¨Ø© ÙÙŠ Ø¥Ø¯Ø®Ø§Ù„ Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ø¥Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø²Ø§Ø¦Ø±.' : 'For museums interested in bringing Horus-Bot into their visitor experience.'}</p>
            </Card>
            <Card className="p-6">
              <MapPin className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'Ø§Ù„Ù…Ù‚Ø±' : 'Office'}</h3>
              <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
            </Card>
          </div>

          <Card className="p-7 lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">{isRTL ? 'Ø§Ù„Ø§Ø³Ù…' : 'Name'}</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" placeholder={isRTL ? 'Ø§Ø³Ù…Ùƒ Ø§Ù„ÙƒØ§Ù…Ù„' : 'Your full name'} required />
                </div>
                <div>
                  <Label htmlFor="email">{isRTL ? 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' : 'Email'}</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">{isRTL ? 'Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹' : 'Subject'}</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v as Subject })}>
                  <SelectTrigger id="subject" className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">{isRTL ? 'Ø¯Ø¹Ù… Ø²Ø§Ø¦Ø±' : 'Visitor support'}</SelectItem>
                    <SelectItem value="booking">{isRTL ? 'Ù…Ø´ÙƒÙ„Ø© ÙÙŠ Ø§Ù„Ø­Ø¬Ø²' : 'Booking issue'}</SelectItem>
                    <SelectItem value="technical">{isRTL ? 'Ù…Ø´ÙƒÙ„Ø© ØªÙ‚Ù†ÙŠØ©' : 'Technical issue'}</SelectItem>
                    <SelectItem value="partnership">{isRTL ? 'Ø·Ù„Ø¨ Ø´Ø±Ø§ÙƒØ©' : 'Partnership request'}</SelectItem>
                    <SelectItem value="press">{isRTL ? 'Ø§Ø³ØªÙØ³Ø§Ø± ØµØ­ÙÙŠ' : 'Press inquiry'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">{isRTL ? 'Ø§Ù„Ø±Ø³Ø§Ù„Ø©' : 'Message'}</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 min-h-32"
                  placeholder={isRTL ? 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø¨Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ â€” Ø¯Ø¹Ù… ÙÙŠ Ø§Ù„Ø­Ø¬Ø²ØŒ Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„Ø²ÙŠØ§Ø±Ø©ØŒ Ø£Ùˆ ØªÙØ§ØµÙŠÙ„ Ø´Ø±Ø§ÙƒØ©.' : 'Tell us what you need â€” booking support, visit help, or partnership details.'}
                  required
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                <Send className="h-4 w-4" /> {submitting ? (isRTL ? 'ÙŠØªÙ… Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...' : 'Sending...') : (isRTL ? 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©' : 'Send message')}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-28 md:px-8">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            {isRTL ? 'ØªÙØ¶Ù‘Ù„ Ø¨Ø¯Ø§ÙŠØ© Ø£Ø³Ø±Ø¹ØŸ' : 'Prefer a Faster Start?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ ÙˆØ§Ø®ØªØ¨Ø± Ø­ÙˆØ±Ø³-Ø¨ÙˆØª Ø¨Ù†ÙØ³Ùƒ.' : 'Book a visit and experience Horus-Bot firsthand.'}
          </p>
          <Button asChild size="lg">
            <Link to="/book"><Ticket className="h-4 w-4" /> {isRTL ? 'Ø§Ø­Ø¬Ø² Ø²ÙŠØ§Ø±ØªÙƒ' : 'Book Visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
