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
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid input');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success(isRTL ? 'تم استلام رسالتك. سنرد خلال يوم عمل واحد.' : 'Message received. We reply within one business day.');
      setForm({ name: '', email: '', subject: 'support', message: '' });
      setSubmitting(false);
    }, 600);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? 'تواصل' : 'Contact'}
        title={isRTL ? 'تواصل مع الفريق المناسب' : 'Reach the Right Team'}
        subtitle={isRTL ? 'فريقنا هنا لمساعدتك قبل زيارتك وأثناءها وبعدها.' : 'Our team is here to help before, during, and after your visit.'}
      />

      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Card className="p-6">
              <Mail className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'دعم الزوار' : 'Visitor Support'}</h3>
              <p className="text-sm text-muted-foreground">support@horus-bot.com</p>
              <p className="text-xs text-primary/80 mt-2">{isRTL ? 'الردود عادةً خلال ساعات قليلة.' : 'Typically replies within a few hours.'}</p>
            </Card>
            <Card className="p-6">
              <Briefcase className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'شراكات المتاحف' : 'Museum Partnerships'}</h3>
              <p className="text-sm text-muted-foreground">museums@horus-bot.com</p>
              <p className="text-xs text-muted-foreground mt-2">{isRTL ? 'للمتاحف الراغبة في إدخال حورس-بوت إلى تجربة الزائر.' : 'For museums interested in bringing Horus-Bot into their visitor experience.'}</p>
            </Card>
            <Card className="p-6">
              <MapPin className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-serif text-base mb-1">{isRTL ? 'المقر' : 'Office'}</h3>
              <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
            </Card>
          </div>

          <Card className="p-7 lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">{isRTL ? 'الاسم' : 'Name'}</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" placeholder={isRTL ? 'اسمك الكامل' : 'Your full name'} required />
                </div>
                <div>
                  <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">{isRTL ? 'الموضوع' : 'Subject'}</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v as Subject })}>
                  <SelectTrigger id="subject" className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">{isRTL ? 'دعم زائر' : 'Visitor support'}</SelectItem>
                    <SelectItem value="booking">{isRTL ? 'مشكلة في الحجز' : 'Booking issue'}</SelectItem>
                    <SelectItem value="technical">{isRTL ? 'مشكلة تقنية' : 'Technical issue'}</SelectItem>
                    <SelectItem value="partnership">{isRTL ? 'طلب شراكة' : 'Partnership request'}</SelectItem>
                    <SelectItem value="press">{isRTL ? 'استفسار صحفي' : 'Press inquiry'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">{isRTL ? 'الرسالة' : 'Message'}</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 min-h-32"
                  placeholder={isRTL ? 'أخبرنا بما تحتاجه — دعم في الحجز، مساعدة في الزيارة، أو تفاصيل شراكة.' : 'Tell us what you need — booking support, visit help, or partnership details.'}
                  required
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                <Send className="h-4 w-4" /> {submitting ? (isRTL ? 'يتم الإرسال...' : 'Sending...') : (isRTL ? 'إرسال الرسالة' : 'Send message')}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            {isRTL ? 'تفضّل بداية أسرع؟' : 'Prefer a Faster Start?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isRTL ? 'احجز زيارتك واختبر حورس-بوت بنفسك.' : 'Book your visit and experience Horus-Bot firsthand.'}
          </p>
          <Button asChild size="lg">
            <Link to="/tickets-info"><Ticket className="h-4 w-4" /> {isRTL ? 'احجز زيارتك' : 'Book your visit'}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
