import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Calendar, CreditCard, Wallet, Apple, Smartphone, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { toast as sonner } from 'sonner';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { t } from '@/lib/i18n';
import { ticketPrices } from '@/lib/data';
import { AccountGateModal } from '@/components/site/AccountGateModal';
import { cn } from '@/lib/utils';

type Step = 'cart' | 'payment';
type PayMethod = 'card' | 'apple_pay' | 'google_pay' | 'wallet';

export default function TicketsScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();
  const { user } = useAuth();
  const { createTicket } = useUserTickets();
  const { toast } = useToast();

  const [quantities, setQuantities] = useState({ adult: 0, student: 0, child: 0 });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [step, setStep] = useState<Step>('cart');
  const [pay, setPay] = useState<PayMethod>('card');
  const [showAuth, setShowAuth] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const totalTickets = quantities.adult + quantities.student + quantities.child;
  const totalPrice =
    quantities.adult * ticketPrices.adult +
    quantities.student * ticketPrices.student +
    quantities.child * ticketPrices.child;

  const updateQuantity = (k: keyof typeof quantities, d: number) =>
    setQuantities((q) => ({ ...q, [k]: Math.max(0, q[k] + d) }));

  const proceedToPayment = () => {
    if (totalTickets === 0) {
      toast({ description: t('selectTickets', language), variant: 'destructive' });
      return;
    }
    if (!user) {
      setShowAuth(true);
      return;
    }
    setStep('payment');
  };

  const onAuthSuccess = () => {
    // Cart is preserved (state lives here). Move forward.
    setStep('payment');
  };

  const confirmBooking = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setBusy(true);
    const { ticket, error } = await createTicket({
      visit_date: date,
      ticket_types: quantities,
      total_tickets: totalTickets,
      total_price: totalPrice,
      currency: 'EGP',
      payment_method: pay,
    });
    setBusy(false);
    if (error || !ticket) {
      sonner.error(
        isRTL
          ? 'تعذّر إتمام الدفع. جرّب طريقة دفع أخرى.'
          : 'Payment could not be completed. Please try another method.',
      );
      return;
    }
    setShowSuccess(true);
  };

  const ticketTypes = [
    { key: 'adult' as const, label: t('adult', language), price: ticketPrices.adult },
    { key: 'student' as const, label: t('student', language), price: ticketPrices.student },
    { key: 'child' as const, label: t('child', language), price: ticketPrices.child },
  ];

  const payOptions: { id: PayMethod; label: string; icon: typeof CreditCard }[] = [
    { id: 'card', label: isRTL ? 'بطاقة ائتمان / خصم' : 'Credit / Debit Card', icon: CreditCard },
    { id: 'apple_pay', label: 'Apple Pay', icon: Apple },
    { id: 'google_pay', label: 'Google Pay', icon: Smartphone },
    { id: 'wallet', label: isRTL ? 'رصيد المحفظة / كود ترويجي' : 'Wallet balance / Promo code', icon: Wallet },
  ];

  return (
    <PageContainer>
      <AppBar
        title={step === 'cart' ? t('buyTickets', language) : (isRTL ? 'الدفع' : 'Checkout')}
        showBack
        showTickets
      />

      {step === 'cart' && (
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full p-2 rounded-xl bg-muted border-0"
            />
          </div>

          <div className="p-4 bg-primary/10 rounded-2xl space-y-2">
            <div className="flex justify-between"><span>{t('totalTickets', language)}</span><span className="font-semibold">{totalTickets}</span></div>
            <div className="flex justify-between"><span>{t('totalPrice', language)}</span><span className="font-bold text-lg">{totalPrice} EGP</span></div>
          </div>

          {!user && (
            <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 text-sm">
              <p className="font-medium mb-1">
                {isRTL ? 'احفظ تذكرتك في حسابك على Horus-Bot' : 'Save your ticket to your Horus-Bot account'}
              </p>
              <p className="text-muted-foreground">
                {isRTL
                  ? 'أنشئ حساباً لتُحفظ تذاكرك وتظهر داخل التطبيق عند وصولك.'
                  : 'Create an account so your tickets are saved and ready inside the app when you arrive.'}
              </p>
            </div>
          )}

          {user && (
            <p className="text-xs text-center text-muted-foreground">
              {isRTL ? `مسجَّل الدخول باسم ${user.email}` : `Signed in as ${user.email}`}
            </p>
          )}

          <Button onClick={proceedToPayment} className="w-full h-14 rounded-2xl text-base font-semibold">
            {user ? (isRTL ? 'متابعة إلى الدفع' : 'Continue to payment') : t('checkout', language)}
          </Button>
        </div>
      )}

      {step === 'payment' && (
        <div className="p-4 space-y-4">
          <button
            type="button"
            onClick={() => setStep('cart')}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {isRTL ? 'رجوع' : 'Back'}
          </button>

          <div>
            <h2 className="font-serif text-2xl mb-1">{isRTL ? 'اختر طريقة الدفع' : 'Choose payment method'}</h2>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'دفع تجريبي — لن يتم خصم أي مبلغ حقيقي.' : 'Demo checkout — no real payment will be charged.'}
            </p>
          </div>

          <div className="space-y-2">
            {payOptions.map((opt) => {
              const Icon = opt.icon;
              const active = pay === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPay(opt.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-colors',
                    active
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50',
                  )}
                >
                  <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center', active ? 'bg-primary/15' : 'bg-muted')}>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium flex-1">{opt.label}</span>
                  <span
                    className={cn(
                      'h-4 w-4 rounded-full border-2',
                      active ? 'border-primary bg-primary' : 'border-muted-foreground/40',
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-primary/10 rounded-2xl space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('totalTickets', language)}</span><span>{totalTickets}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{isRTL ? 'تاريخ الزيارة' : 'Visit date'}</span><span>{date}</span></div>
            <div className="flex justify-between border-t border-border/50 pt-2 mt-2"><span>{t('totalPrice', language)}</span><span className="font-bold">{totalPrice} EGP</span></div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {isRTL ? 'ستُحفظ التذكرة في حسابك وتظهر في التطبيق.' : 'Your ticket will be saved to your account and appear in the app.'}
          </div>

          <Button onClick={confirmBooking} disabled={busy} className="w-full h-14 rounded-2xl text-base font-semibold">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? 'تأكيد الحجز' : 'Confirm booking')}
          </Button>
        </div>
      )}

      <AccountGateModal open={showAuth} onOpenChange={setShowAuth} onAuthSuccess={onAuthSuccess} />

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">🎉 {t('purchaseSuccess', language)}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'تذكرتك محفوظة في حسابك وجاهزة في التطبيق.' : 'Your ticket is saved to your account and ready in the app.'}
          </p>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => { setShowSuccess(false); navigate('/my_tickets'); }}>
              {t('goToMyTickets', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
