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
  const [showNotify, setShowNotify] = useState(false);

  const reset = () => {
    setEmail('');
    setShowNotify(false);
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(
      isRTL
        ? 'شكراً. سنُعلمك فور إتاحة تطبيق Horus-Bot.'
        : "Thank you. We'll notify you when the Horus-Bot app is available.",
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
            {isRTL ? 'معاينة التطبيق متاحة' : 'App Preview Available'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'لم يُنشر تطبيق Horus-Bot على المتاجر بعد. يمكنك الانضمام لقائمة الوصول المبكر لتجربته خلال جولتك.'
              : 'The Horus-Bot app is not published on stores yet. For now, you can join the early access list and use the app during the demo experience.'}
          </DialogDescription>
        </DialogHeader>

        {!showNotify ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => setShowNotify(true)}>
              {isRTL ? 'انضم للوصول المبكر' : 'Join early access'}
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
          <form onSubmit={handleNotify} className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {isRTL
                ? 'أدخل بريدك الإلكتروني ليصلك تنبيه فور إتاحة التطبيق.'
                : 'Enter your email to be notified when the app is available.'}
            </p>
            <Input
              type="email"
              placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowNotify(false)}>
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button type="submit" className="flex-1">
                {isRTL ? 'أبلغني' : 'Notify me'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
