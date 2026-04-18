import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2, 'Too short').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  message: z.string().trim().min(10, 'Too short').max(1000),
});

export default function ContactPage() {
  const { isRTL } = useApp();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid input');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success(isRTL ? 'تم إرسال رسالتك!' : 'Message sent!');
      setForm({ name: '', email: '', message: '' });
      setSubmitting(false);
    }, 600);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? 'تواصل' : 'Contact'}
        title={isRTL ? 'نحن هنا لمساعدتك' : "We're here to help"}
        subtitle={isRTL ? 'راسلنا أو اتصل بنا في أي وقت.' : 'Reach out anytime.'}
      />

      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Card className="p-6">
              <Mail className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">hello@horus-bot.com</p>
            </Card>
            <Card className="p-6">
              <Phone className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'الهاتف' : 'Phone'}</h3>
              <p className="text-sm text-muted-foreground">+20 100 000 0000</p>
            </Card>
            <Card className="p-6">
              <MapPin className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'الموقع' : 'Location'}</h3>
              <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
            </Card>
          </div>

          <Card className="p-7 lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">{isRTL ? 'الاسم' : 'Name'}</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" placeholder={isRTL ? 'اسمك' : 'Your name'} required />
              </div>
              <div>
                <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="message">{isRTL ? 'الرسالة' : 'Message'}</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 min-h-32" placeholder={isRTL ? 'كيف يمكننا المساعدة؟' : 'How can we help?'} required />
              </div>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                <Send className="h-4 w-4" /> {submitting ? (isRTL ? 'يتم الإرسال...' : 'Sending...') : (isRTL ? 'إرسال' : 'Send message')}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
