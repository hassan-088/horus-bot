import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Calendar } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { ticketPrices } from '@/lib/data';


export default function TicketsScreen() {
  const navigate = useNavigate();
  const { language, addTickets } = useApp();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState({ adult: 0, student: 0, child: 0 });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalTickets = quantities.adult + quantities.student + quantities.child;
  const totalPrice = quantities.adult * ticketPrices.adult + quantities.student * ticketPrices.student + quantities.child * ticketPrices.child;

  const updateQuantity = (type: keyof typeof quantities, delta: number) => {
    setQuantities(q => ({ ...q, [type]: Math.max(0, q[type] + delta) }));
  };

  const handleCheckout = () => {
    if (totalTickets === 0) {
      toast({ description: t('selectTickets', language), variant: 'destructive' });
      return;
    }
    const tickets = Object.entries(quantities).filter(([, qty]) => qty > 0).map(([type, qty]) => ({
      id: Date.now().toString() + type,
      type: type as 'adult' | 'student' | 'child',
      quantity: qty,
      date,
      price: ticketPrices[type as keyof typeof ticketPrices] * qty,
    }));
    addTickets(tickets);
    setShowSuccess(true);
  };

  const ticketTypes = [
    { key: 'adult' as const, label: t('adult', language), price: ticketPrices.adult },
    { key: 'student' as const, label: t('student', language), price: ticketPrices.student },
    { key: 'child' as const, label: t('child', language), price: ticketPrices.child },
  ];

  return (
    <PageContainer>
      <AppBar title={t('buyTickets', language)} showBack showTickets />
      <div className="p-4 space-y-4">
        {ticketTypes.map(({ key, label, price }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-soft">
            <div>
              <h3 className="font-semibold">{label}</h3>
              <p className="text-sm text-muted-foreground">{price} EGP</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(key, -1)}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantities[key]}</span>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(key, 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        <div className="p-4 bg-card rounded-2xl shadow-soft">
          <label className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{t('selectDate', language)}</span>
          </label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-2 w-full p-2 rounded-xl bg-muted border-0" />
        </div>
        <div className="p-4 bg-primary/10 rounded-2xl space-y-2">
          <div className="flex justify-between"><span>{t('totalTickets', language)}</span><span className="font-semibold">{totalTickets}</span></div>
          <div className="flex justify-between"><span>{t('totalPrice', language)}</span><span className="font-bold text-lg">{totalPrice} EGP</span></div>
        </div>
        <Button onClick={handleCheckout} className="w-full h-14 rounded-2xl text-base font-semibold">{t('checkout', language)}</Button>
      </div>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader><DialogTitle className="text-2xl">🎉 {t('purchaseSuccess', language)}</DialogTitle></DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => { setShowSuccess(false); navigate('/my_tickets'); }}>{t('goToMyTickets', language)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

