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
            {isRTL ? 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­Ù' : 'Use the App at the Museum'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'Ø¨Ø¹Ø¯ Ø§Ù„Ø­Ø¬Ø²ØŒ ØªØ¸Ù‡Ø± ØªØ°Ø§ÙƒØ±Ùƒ ÙÙŠ Ø­Ø³Ø§Ø¨Ùƒ. Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ØªØ­ÙØŒ Ø§Ø³ØªØ®Ø¯Ù… ØªØ·Ø¨ÙŠÙ‚ Horus-Bot Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªØ°Ø§ÙƒØ±ØŒ ÙˆØ§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØªØŒ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¬ÙˆÙ„Ø©.'
              : 'After booking, your tickets appear in your account. At the museum, use the Horus-Bot app for tickets, Robot Pairing, and the Live Tour.'}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => onOpenChange(false)}>
          {isRTL ? 'Ø­Ø³Ù†Ø§' : 'Got it'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
