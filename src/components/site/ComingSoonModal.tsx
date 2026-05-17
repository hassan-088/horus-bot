import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function ComingSoonModal({ open, onOpenChange }: Props) {
  const { isRTL } = useApp();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isRTL ? 'استخدم التطبيق داخل المتحف' : 'Use the App at the Museum'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'بعد الحجز، تظهر تذاكرك في حسابك. داخل المتحف، استخدم تطبيق Horus-Bot لعرض التذاكر، واقتران الروبوت، ومتابعة الجولة.'
              : 'After booking, your tickets appear in your account. At the museum, use the Horus-Bot app for tickets, robot pairing, and the live tour.'}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => onOpenChange(false)}>
          {isRTL ? 'حسنا' : 'Got it'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
