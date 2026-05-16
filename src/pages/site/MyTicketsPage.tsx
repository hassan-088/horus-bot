import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Calendar,
  Clock,
  Languages,
  Loader2,
  LogIn,
  QrCode,
  Sparkles,
  Ticket,
  X as XIcon,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useExhibits, type WebsiteExhibit } from '@/hooks/useExhibits';
import { useUserTickets, type UserTicket } from '@/hooks/useUserTickets';
import { toast } from 'sonner';

export default function MyTicketsPage() {
  const { isRTL } = useApp();
  const { user } = useAuth();
  const { tickets, loading, cancelTicket } = useUserTickets();
  const { exhibits } = useExhibits();
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
      toast.error(isRTL ? 'تعذر إلغاء الحجز.' : 'Could not cancel the booking.');
      return;
    }
    toast.success(isRTL ? 'تم إلغاء الحجز.' : 'Booking cancelled.');
    setConfirmTk(null);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? 'تذاكري' : 'My Tickets'}
        title={isRTL ? 'حجوزاتك وتذاكرك' : 'Your Bookings and Tickets'}
        subtitle={
          isRTL
            ? 'اعرض حجوزاتك الحالية والسابقة، وتذاكر دخول المتحف، وتذاكر جولات Horus-Bot.'
            : 'View your existing bookings, museum entry tickets, and Horus-Bot robot tour tickets.'
        }
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-6 space-y-8">
        {!user && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? 'سجل الدخول لعرض تذاكرك' : 'Sign in to view your tickets'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              {isRTL
                ? 'سجل الدخول بحسابك على Horus-Bot لرؤية حجوزاتك وتذاكرك المحفوظة.'
                : 'Log in with your Horus-Bot account to see your saved bookings and tickets.'}
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
                ? 'احجز زيارة جديدة لتظهر تذاكرك هنا.'
                : 'Book a visit to see your tickets here.'}
            </p>
            <Button asChild>
              <Link to="/book">{isRTL ? 'احجز زيارة' : 'Book Visit'}</Link>
            </Button>
          </Card>
        )}

        {user && active.length > 0 && (
          <TicketSection
            title={isRTL ? 'حجوزات نشطة' : 'Active bookings'}
            tickets={active}
            isRTL={isRTL}
            exhibits={exhibits}
            onCancel={setConfirmTk}
          />
        )}

        {user && past.length > 0 && (
          <TicketSection
            title={isRTL ? 'سجل الحجوزات' : 'Booking history'}
            tickets={past}
            isRTL={isRTL}
            exhibits={exhibits}
          />
        )}
      </section>

      <Dialog open={!!confirmTk} onOpenChange={(open) => !open && setConfirmTk(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>{isRTL ? 'إلغاء هذا الحجز؟' : 'Cancel this booking?'}</DialogTitle>
            <DialogDescription>
              {isRTL
                ? 'سيتم إلغاء تذكرة دخول المتحف وحجز جولة Horus-Bot المرتبطة بها.'
                : 'This will cancel your museum entry ticket and linked Horus-Bot tour reservation.'}
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

function TicketSection({
  title,
  tickets,
  isRTL,
  exhibits,
  onCancel,
}: {
  title: string;
  tickets: UserTicket[];
  isRTL: boolean;
  exhibits: WebsiteExhibit[];
  onCancel?: (ticket: UserTicket) => void;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
        {title}
      </h3>
      <div className="grid gap-4">
        {tickets.map((tk) => (
          <TicketCard
            key={tk.id}
            tk={tk}
            isRTL={isRTL}
            exhibits={exhibits}
            onCancel={onCancel ? () => onCancel(tk) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function resolveExhibitNames(ids: string[], exhibits: WebsiteExhibit[], isRTL: boolean): string[] {
  const validIds = ids.filter((id) => /^artifact_\d{3}$/.test(id));
  if (validIds.length === 0) return [];
  const byId = new Map(exhibits.map((exhibit) => [exhibit.id, exhibit]));
  return validIds.flatMap((id) => {
    const exhibit = byId.get(id);
    if (!exhibit) return [];
    return [isRTL && exhibit.titleAr ? exhibit.titleAr : exhibit.titleEn];
  });
}

function paymentStatusLabel(isRTL: boolean) {
  return isRTL ? 'الدفع عند الشباك' : 'Pay at counter';
}

function TicketCard({
  tk,
  isRTL,
  exhibits,
  onCancel,
}: {
  tk: UserTicket;
  isRTL: boolean;
  exhibits: WebsiteExhibit[];
  onCancel?: () => void;
}) {
  const cancelled = tk.status !== 'active';
  const exhibitNames = resolveExhibitNames(tk.selected_exhibits ?? [], exhibits, isRTL);
  const routeTitle = isRTL
    ? tk.route_title_ar || tk.route_title_en
    : tk.route_title_en || tk.route_title_ar;

  return (
    <Card className={`p-6 space-y-4 ${cancelled ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {isRTL ? 'ملخص الحجز' : 'Booking summary'}
          </div>
          <h3 className="font-serif text-xl">{tk.museum_name}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{tk.visit_date}</span>
            {tk.visit_time && <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{tk.visit_time}</span>}
            <span className="flex items-center gap-1.5">
              {tk.tour_type === 'personalized' ? <Sparkles className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
              <span className="capitalize">{tk.tour_type ?? 'standard'}</span>
            </span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cancelled ? 'bg-muted text-muted-foreground border-0' : 'bg-primary/15 text-primary border-0'}
        >
          {cancelled ? (isRTL ? 'ملغاة' : 'Cancelled') : (isRTL ? 'نشطة' : 'Active')}
        </Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <InfoBox label={isRTL ? 'الزوار' : 'Visitors'} value={`${tk.total_tickets}`} />
        <InfoBox label={isRTL ? 'الإجمالي' : 'Total'} value={`${tk.total_price} ${tk.currency}`} />
        <InfoBox label={isRTL ? 'حالة الدفع' : 'Payment status'} value={paymentStatusLabel(isRTL)} />
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
              {tk.interests.map((interest) => (
                <span key={interest} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] capitalize">
                  {interest.replace('-', ' ')}
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
        <PassCard
          icon={<Ticket className="h-4 w-4 text-primary" />}
          title={isRTL ? 'تذكرة دخول المتحف' : 'Museum Entry Ticket'}
          status={tk.status}
        >
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <InfoBox label={isRTL ? 'التذاكر' : 'Tickets'} value={`${tk.total_tickets}`} />
            <InfoBox label={isRTL ? 'السعر' : 'Price'} value={`${tk.museum_entry_total} ${tk.currency}`} />
            <InfoBox label={isRTL ? 'حالة الدفع' : 'Payment status'} value={paymentStatusLabel(isRTL)} />
          </div>
          <p className="text-xs text-muted-foreground">
            {isRTL ? 'يستخدم رمز QR لدخول المتحف عند البوابة.' : 'Museum Entry QR is used at the museum gate.'}
          </p>
        </PassCard>

        <PassCard
          icon={<Bot className="h-4 w-4 text-primary" />}
          title={isRTL ? 'تذكرة جولة Horus-Bot' : 'Horus-Bot Robot Tour Ticket'}
          status={tk.status}
        >
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            {routeTitle && <InfoBox label={isRTL ? 'المسار' : 'Route'} value={routeTitle} />}
            <InfoBox label={isRTL ? 'نوع الجولة' : 'Tour type'} value={tk.tour_type ?? 'standard'} />
            <InfoBox label={isRTL ? 'المدة' : 'Duration'} value={`${tk.tour_duration ?? 45} min`} />
            <InfoBox label={isRTL ? 'السعر' : 'Price'} value={`${tk.robot_tour_price} ${tk.currency}`} />
            <InfoBox label={isRTL ? 'حالة الدفع' : 'Payment status'} value={paymentStatusLabel(isRTL)} />
          </div>
          {exhibitNames.length > 0 ? (
            <div className="space-y-1.5">
              <div className="text-[11px] text-muted-foreground">
                {isRTL ? 'القطع المختارة' : 'Selected exhibits'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exhibitNames.map((name) => (
                  <span key={name} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px]">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[11px] text-muted-foreground">
                {isRTL ? 'Selected exhibits' : 'Selected exhibits'}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'Route details unavailable for this older ticket.' : 'Route details unavailable for this older ticket.'}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {isRTL
              ? 'يحدث اقتران الروبوت لاحقا داخل تطبيق الهاتف عن طريق مسح رمز QR الفعلي على الروبوت.'
              : 'Robot pairing happens later inside the mobile app by scanning the physical robot QR.'}
          </p>
        </PassCard>
      </div>

      {!cancelled && onCancel && (
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onCancel}>
          <XIcon className="h-3.5 w-3.5" /> {isRTL ? 'إلغاء الحجز' : 'Cancel booking'}
        </Button>
      )}
    </Card>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 p-3 text-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold capitalize">{value}</div>
    </div>
  );
}

function PassCard({
  icon,
  title,
  status,
  children,
}: {
  icon: ReactNode;
  title: string;
  status: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-semibold">{title}</h4>
        </div>
        <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">{status}</Badge>
      </div>
      {children}
    </div>
  );
}
