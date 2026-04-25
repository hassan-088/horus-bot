import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showNotify, setShowNotify] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(isRTL ? 'سنُعلمك فور إطلاق التطبيق.' : "We'll let you know when it launches.");
    setEmail('');
    setShowNotify(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isRTL ? 'إطلاق التطبيق قريباً' : 'App launch coming soon'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'لم يُنشر تطبيق Horus-Bot بعد. يمكنك الآن استكشاف النسخة التجريبية المباشرة.'
              : 'The Horus-Bot app is not published yet. For now, you can explore the live app demo.'}
          </DialogDescription>
        </DialogHeader>

        {!showNotify ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                navigate('/launch');
              }}
            >
              {isRTL ? 'افتح النسخة التجريبية' : 'Open App Demo'}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowNotify(true)}>
              {isRTL ? 'أبلغني عند الإتاحة' : 'Notify Me When Available'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleNotify} className="space-y-3">
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
