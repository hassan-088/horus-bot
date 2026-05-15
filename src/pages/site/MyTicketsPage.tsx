import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket, LogIn, Calendar, Clock, QrCode, Wallet, Languages, Sparkles, Zap, X as XIcon, Loader2, Bot,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets, type UserTicket } from '@/hooks/useUserTickets';
import { toast } from 'sonner';

export default function MyTicketsPage() {
  const { isRTL } = useApp();
  const { user } = useAuth();
  const { tickets, loading, cancelTicket } = useUserTickets();

  const [confirmTk, setConfirmTk] = useState<UserTicket | null>(null);
  const [busy, setBusy] = useState(false);

  const active = tickets.filter((t) => t.status === 'active');
  const past = tickets.filter((t) => t.status !== 'active');

  const handleCancel = async () => {
    if (!confirmTk) return;
    setBusy(true);
    const { error } = await cancelTicket(confirmTk.id);
    setBusy(false);
    if (error) {
      toast.error(isRTL ? 'تعذّر إلغاء الحجز.' : 'Could not cancel the booking.');
      return;
    }
    toast.success(isRTL ? 'تم إلغاء الحجز.' : 'Booking cancelled.');
    setConfirmTk(null);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? 'تذاكري' : 'My Tickets'}
        title={isRTL ? 'زياراتك القادمة' : 'Your Upcoming Visits'}
        subtitle={isRTL
          ? 'كل تذاكرك في مكان واحد — جاهزة على هاتفك وداخل تطبيق Horus-Bot.'
          : 'All your tickets in one place — ready on your phone and inside the Horus-Bot app.'}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-6 space-y-8">
        {!user && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? 'سجّل الدخول لعرض تذاكرك' : 'Sign in to view your tickets'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              {isRTL
                ? 'سجّل الدخول بحسابك على Horus-Bot لرؤية زياراتك القادمة وتذاكرك المحفوظة.'
                : 'Log in with your Horus-Bot account to see your upcoming visits and saved tickets.'}
            </p>
            <Button asChild>
              <Link to="/auth">{isRTL ? 'تسجيل الدخول' : 'Log in'}</Link>
            </Button>
          </Card>
        )}

        {user && !loading && tickets.length === 0 && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? 'لا توجد تذاكر بعد' : 'No tickets yet'}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isRTL
                ? 'احجز أول زيارة Horus-Bot لتبدأ.'
                : 'Book your first Horus-Bot visit to get started.'}
            </p>
            <Button asChild>
              <Link to="/book">{isRTL ? 'احجز زيارتك' : 'Book your visit'}</Link>
            </Button>
          </Card>
        )}

        {user && active.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              {isRTL ? 'حجوزات نشطة' : 'Active bookings'}
            </h3>
            <div className="grid gap-4">
              {active.map((tk) => (
                <TicketCard key={tk.id} tk={tk} isRTL={isRTL} onCancel={() => setConfirmTk(tk)} />
              ))}
            </div>
          </div>
        )}

        {user && past.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              {isRTL ? 'سجل الحجوزات' : 'Booking history'}
            </h3>
            <div className="grid gap-4">
              {past.map((tk) => (
                <TicketCard key={tk.id} tk={tk} isRTL={isRTL} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Dialog open={!!confirmTk} onOpenChange={(o) => !o && setConfirmTk(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>{isRTL ? 'إلغاء هذا الحجز؟' : 'Cancel this booking?'}</DialogTitle>
            <DialogDescription>
              {isRTL
                ? 'سيتم إلغاء تذكرة دخول المتحف وحجز جولة Horus-Bot المرتبطة بها.'
                : 'This will cancel your museum entry ticket and Horus-Bot tour reservation.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmTk(null)} disabled={busy}>
              {isRTL ? 'الاحتفاظ بالحجز' : 'Keep booking'}
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? 'إلغاء الحجز' : 'Cancel booking')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TicketCard({ tk, isRTL, onCancel }: { tk: UserTicket; isRTL: boolean; onCancel?: () => void }) {
  const cancelled = tk.status !== 'active';
  return (
    <Card className={`p-6 space-y-4 ${cancelled ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl">{tk.museum_name}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{tk.visit_date}</span>
            {tk.visit_time && (
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{tk.visit_time}</span>
            )}
            {tk.tour_type && (
              <span className="flex items-center gap-1.5">
                {tk.tour_type === 'personalized' ? <Sparkles className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
                <span className="capitalize">{tk.tour_type}</span>
              </span>
            )}
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cancelled ? 'bg-muted text-muted-foreground border-0' : 'bg-primary/15 text-primary border-0'}
        >
          {cancelled ? (isRTL ? 'ملغاة' : 'Cancelled') : (isRTL ? 'فعّالة' : 'Active')}
        </Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-muted/50 p-3 text-sm">
          <div className="text-xs text-muted-foreground">{isRTL ? 'عدد الزوار' : 'Visitors'}</div>
          <div className="font-semibold">{tk.total_tickets}</div>
        </div>
        {tk.tour_duration && (
          <div className="rounded-xl bg-muted/50 p-3 text-sm">
            <div className="text-xs text-muted-foreground">{isRTL ? 'مدة الجولة' : 'Duration'}</div>
            <div className="font-semibold">{tk.tour_duration} {isRTL ? 'دقيقة' : 'min'}</div>
          </div>
        )}
        <div className="rounded-xl bg-muted/50 p-3 text-sm">
          <div className="text-xs text-muted-foreground">{isRTL ? 'الإجمالي' : 'Total'}</div>
          <div className="font-semibold">{tk.total_price} {tk.currency}</div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/50 p-3 text-sm">
        <div className="text-xs text-muted-foreground">{isRTL ? 'Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙØ¹' : 'Payment status'}</div>
        <div className="font-semibold capitalize">{tk.payment_status.replaceAll('_', ' ')}</div>
      </div>

      {(tk.preferred_language || (tk.interests && tk.interests.length > 0)) && (
        <div className="space-y-2">
          {tk.preferred_language && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Languages className="h-3.5 w-3.5" />
              <span className="capitalize">{tk.preferred_language.replace('-', ' ')}</span>
            </div>
          )}
          {tk.interests && tk.interests.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {tk.interests.map((i) => (
                <span key={i} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] capitalize">
                  {i.replace('-', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl border-2 border-dashed border-border p-4 flex items-center gap-3">
        <QrCode className="h-12 w-12 text-foreground shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
            {isRTL ? 'رمز الدخول' : 'Entry QR'}
          </p>
          <p className="font-mono text-sm truncate">{tk.qr_value}</p>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="rounded-xl border border-border/60 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              <h4 className="font-semibold">{isRTL ? 'ØªØ°ÙƒØ±Ø© Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù' : 'Museum Entry Ticket'}</h4>
            </div>
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">{tk.status}</Badge>
          </div>
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø§Ù„ØªØ°Ø§ÙƒØ±' : 'Tickets'}</div>
              <div className="font-medium">{tk.total_tickets}</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø§Ù„Ø³Ø¹Ø±' : 'Price'}</div>
              <div className="font-medium">{tk.museum_entry_total} {tk.currency}</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø­Ø§Ù„Ø© Ø§Ù„ØªØ°ÙƒØ±Ø©' : 'Ticket status'}</div>
              <div className="font-medium capitalize">{tk.status}</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRTL ? 'ÙŠÙØ³ØªØ®Ø¯Ù… Ø±Ù…Ø² QR Ù„Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ØªØ­Ù Ø¹Ù†Ø¯ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø©.' : 'Museum Entry QR is used at the museum gate.'}
          </p>
        </div>

        <div className="rounded-xl border border-border/60 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h4 className="font-semibold">{isRTL ? 'ØªØ°ÙƒØ±Ø© Ø¬ÙˆÙ„Ø© Horus-Bot' : 'Horus-Bot Robot Tour Ticket'}</h4>
            </div>
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">{tk.status}</Badge>
          </div>
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø§Ù„Ù†ÙˆØ¹' : 'Tour type'}</div>
              <div className="font-medium capitalize">{tk.tour_type ?? 'standard'}</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø§Ù„Ù…Ø¯Ø©' : 'Duration'}</div>
              <div className="font-medium">{tk.tour_duration ?? 45} min</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">{isRTL ? 'Ø§Ù„Ø³Ø¹Ø±' : 'Price'}</div>
              <div className="font-medium">{tk.robot_tour_price} {tk.currency}</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRTL ? 'ÙŠØ­Ø¯Ø« Ø§Ù‚ØªØ±Ø§Ù† Ø§Ù„Ø±ÙˆØ¨ÙˆØª Ù„Ø§Ø­Ù‚Ø§Ù‹ Ø¯Ø§Ø®Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ Ø¹Ù† Ø·Ø±ÙŠÙ‚ Ù…Ø³Ø­ Ø±Ù…Ø² QR Ø§Ù„ÙØ¹Ù„ÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ¨ÙˆØª.' : 'Robot pairing happens later inside the mobile app by scanning the physical robot QR.'}
          </p>
        </div>
      </div>

      {!cancelled && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline" size="sm" className="flex-1 min-w-[10rem]"
            onClick={() => toast.info(isRTL ? 'بطاقة المحفظة قريباً' : 'Wallet pass coming soon')}
          >
            <Wallet className="h-3.5 w-3.5" /> {isRTL ? 'إضافة إلى المحفظة' : 'Add to Wallet'}
          </Button>
          {onCancel && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onCancel}>
              <XIcon className="h-3.5 w-3.5" /> {isRTL ? 'إلغاء الحجز' : 'Cancel booking'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
