import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function ComingSoonModal({ open, onOpenChange }: Props) {
  const { isRTL } = useApp();
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const reset = () => {
    setEmail('');
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(
      isRTL
        ? 'تم تسجيلك في الوصول المبكر. سنُعلمك فور الإتاحة.'
        : "You're on the early-access list. We'll notify you as soon as it's available.",
    );
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isRTL ? 'الوصول المبكر إلى تطبيق Horus-Bot' : 'Early Access to the Horus-Bot App'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'تطبيق Horus-Bot متاح حالياً ضمن الوصول المبكر. انضم لتجربته أثناء العرض التوضيحي.'
              : 'The Horus-Bot app is currently available in early access. Join to experience it during the demo.'}
          </DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => setShowForm(true)}>
              {isRTL ? 'طلب الوصول' : 'Request Access'}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              {isRTL ? 'إغلاق' : 'Close'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {isRTL
                ? 'أدخل بريدك الإلكتروني لإرسال دعوة الوصول المبكر إليك.'
                : "Enter your email and we'll send your early-access invitation."}
            </p>
            <Input
              type="email"
              placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button type="submit" className="flex-1">
                {isRTL ? 'إرسال الطلب' : 'Submit request'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
