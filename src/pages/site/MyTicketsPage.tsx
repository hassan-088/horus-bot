import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Bot,
  Calendar,
  Clock,
  Info,
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
import {
  canCancelUserTicket,
  isWithinCancellationDeadline,
  useUserTickets,
  type TicketStatus,
  type UserTicket,
} from '@/hooks/useUserTickets';
import { productMessage } from '@/lib/productMessages';
import { toast } from 'sonner';

const ar = {
  heroLabel: '\u062a\u0630\u0627\u0643\u0631\u064a',
  heroTitle: '\u062d\u062c\u0648\u0632\u0627\u062a\u0643 \u0648\u062a\u0630\u0627\u0643\u0631\u0643',
  heroSubtitle: '\u0627\u0639\u0631\u0636 \u062d\u062c\u0648\u0632\u0627\u062a\u0643 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0648\u0627\u0644\u0633\u0627\u0628\u0642\u0629\u060c \u0648\u062a\u0630\u0627\u0643\u0631 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641\u060c \u0648\u062a\u0630\u0627\u0643\u0631 \u062c\u0648\u0644\u0627\u062a Horus-Bot.',
  signInTitle: '\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u0639\u0631\u0636 \u062a\u0630\u0627\u0643\u0631\u0643',
  signInBody: '\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u062d\u0633\u0627\u0628\u0643 \u0639\u0644\u0649 Horus-Bot \u0644\u0631\u0624\u064a\u0629 \u062d\u062c\u0648\u0632\u0627\u062a\u0643 \u0648\u062a\u0630\u0627\u0643\u0631\u0643 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629.',
  signInCta: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
  emptyTitle: '\u0644\u0627 \u062a\u0648\u062c\u062f \u062a\u0630\u0627\u0643\u0631 \u0628\u0639\u062f',
  emptyBody: '\u064a\u0645\u0643\u0646\u0643 \u062d\u062c\u0632 \u0632\u064a\u0627\u0631\u062a\u0643 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639\u060c \u0648\u0633\u062a\u0638\u0647\u0631 \u062a\u0630\u0627\u0643\u0631 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641 \u0648\u062c\u0648\u0644\u0629 Horus-Bot \u0647\u0646\u0627.',
  emptyCta: '\u0627\u062d\u062c\u0632 \u0632\u064a\u0627\u0631\u0629',
  loading: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u062a\u0630\u0627\u0643\u0631...',
  skippedTitle: '\u062a\u0639\u0630\u0631 \u0639\u0631\u0636 \u0628\u0639\u0636 \u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a \u0627\u0644\u0642\u062f\u064a\u0645\u0629.',
  skippedBody: '\u0644\u0627 \u062a\u0632\u0627\u0644 \u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u062a\u0638\u0647\u0631 \u0647\u0646\u0627 \u0628\u0634\u0643\u0644 \u0637\u0628\u064a\u0639\u064a.',
  activeBookings: '\u062d\u062c\u0648\u0632\u0627\u062a \u0646\u0634\u0637\u0629',
  bookingHistory: '\u0633\u062c\u0644 \u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a',
  cancelTitle: '\u0625\u0644\u063a\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062d\u062c\u0632\u061f',
  cancelBody: '\u0633\u064a\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u062a\u0630\u0643\u0631\u0629 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641 \u0648\u062a\u0630\u0643\u0631\u0629 \u062c\u0648\u0644\u0629 Horus-Bot \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0647\u0627.',
  keepBooking: '\u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0627\u0644\u062d\u062c\u0632',
  cancelBooking: '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632',
  cancelledSuccess: '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632.',
  summary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u062d\u062c\u0632',
  visitors: '\u0627\u0644\u0632\u0648\u0627\u0631',
  total: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
  paymentStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639',
  bookingStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u062d\u062c\u0632',
  payAtCounter: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0634\u0628\u0627\u0643',
  entryQr: '\u0631\u0645\u0632 \u0627\u0644\u062f\u062e\u0648\u0644',
  museumTicket: '\u062a\u0630\u0643\u0631\u0629 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641',
  tickets: '\u0627\u0644\u062a\u0630\u0627\u0643\u0631',
  price: '\u0627\u0644\u0633\u0639\u0631',
  entryQrBody: '\u064a\u0633\u062a\u062e\u062f\u0645 \u0631\u0645\u0632 QR \u0644\u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u062a\u062d\u0641 \u0639\u0646\u062f \u0627\u0644\u0628\u0648\u0627\u0628\u0629.',
  robotTicket: '\u062a\u0630\u0643\u0631\u0629 \u062c\u0648\u0644\u0629 Horus-Bot',
  route: '\u0627\u0644\u0645\u0633\u0627\u0631',
  tourType: '\u0646\u0648\u0639 \u0627\u0644\u062c\u0648\u0644\u0629',
  duration: '\u0627\u0644\u0645\u062f\u0629',
  selectedExhibits: '\u0627\u0644\u0642\u0637\u0639 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629',
  routeUnavailable: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0645\u0633\u0627\u0631 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u062a\u0630\u0643\u0631\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629.',
  pairingBody: '\u064a\u062d\u062f\u062b \u0627\u0642\u062a\u0631\u0627\u0646 \u0627\u0644\u0631\u0648\u0628\u0648\u062a \u0644\u0627\u062d\u0642\u0627\u064b \u062f\u0627\u062e\u0644 \u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0647\u0627\u062a\u0641 \u0639\u0646 \u0637\u0631\u064a\u0642 \u0645\u0633\u062d \u0631\u0645\u0632 QR \u0627\u0644\u0641\u0639\u0644\u064a \u0639\u0644\u0649 \u0627\u0644\u0631\u0648\u0628\u0648\u062a.',
  unavailableAfterPairing: '\u0644\u0627 \u064a\u062a\u0627\u062d \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632 \u0628\u0639\u062f \u0627\u0642\u062a\u0631\u0627\u0646 \u0627\u0644\u0631\u0648\u0628\u0648\u062a.',
  unavailableInProgress: '\u0644\u0627 \u064a\u062a\u0627\u062d \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632 \u0628\u0639\u062f \u0628\u062f\u0621 \u0627\u0644\u062c\u0648\u0644\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629.',
  unavailableCompleted: '\u0627\u0643\u062a\u0645\u0644\u062a \u0647\u0630\u0647 \u0627\u0644\u0632\u064a\u0627\u0631\u0629\u060c \u0648\u0644\u0645 \u064a\u0639\u062f \u0627\u0644\u0625\u0644\u063a\u0627\u0621 \u0645\u062a\u0627\u062d\u0627\u064b.',
  unavailableExpired: '\u0627\u0646\u062a\u0647\u0649 \u0645\u0648\u0639\u062f \u0647\u0630\u0627 \u0627\u0644\u062d\u062c\u0632\u060c \u0648\u0644\u0645 \u064a\u0639\u062f \u0627\u0644\u0625\u0644\u063a\u0627\u0621 \u0645\u062a\u0627\u062d\u0627\u064b.',
  unavailable24: '\u0644\u0627 \u064a\u062a\u0627\u062d \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632 \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0645\u0646 \u0645\u0648\u0639\u062f \u0627\u0644\u0632\u064a\u0627\u0631\u0629.',
  failureCancel: '\u062a\u0639\u0630\u0631 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
  statuses: {
    active: '\u0646\u0634\u0637',
    cancelled: '\u0645\u0644\u063a\u0649',
    completed: '\u0645\u0643\u062a\u0645\u0644',
    expired: '\u0645\u0646\u062a\u0647\u064a',
    paired: '\u0645\u0642\u062a\u0631\u0646',
    inProgress: '\u062c\u0627\u0631\u064a \u0627\u0644\u062c\u0648\u0644\u0629',
    preparing: '\u0642\u064a\u062f \u0627\u0644\u062a\u062c\u0647\u064a\u0632',
    used: '\u0645\u0633\u062a\u062e\u062f\u0645',
  },
};

export default function MyTicketsPage() {
  const { isRTL } = useApp();
  const { user } = useAuth();
  const { tickets, loading, error, skippedBookingCount, refresh, cancelTicket } = useUserTickets();
  const { exhibits } = useExhibits();
  const [confirmTk, setConfirmTk] = useState<UserTicket | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const active = tickets.filter((t) => t.status === 'active');
  const past = tickets.filter((t) => t.status !== 'active');

  const handleCancel = async () => {
    if (!confirmTk || cancellingId) return;
    setCancellingId(confirmTk.id);
    const { error } = await cancelTicket(confirmTk.id);
    setCancellingId(null);
    if (error) {
      toast.error(cancellationFailureMessage(error, isRTL));
      return;
    }
    toast.success(isRTL ? ar.cancelledSuccess : 'Booking cancelled.');
    setConfirmTk(null);
  };

  return (
    <>
      <SectionHero
        label={isRTL ? ar.heroLabel : 'My Tickets'}
        title={isRTL ? ar.heroTitle : 'Your Bookings and Tickets'}
        subtitle={
          isRTL
            ? ar.heroSubtitle
            : 'View your existing bookings, Museum Entry Tickets, and Horus-Bot Tour Tickets.'
        }
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-6 space-y-8">
        {!user && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? ar.signInTitle : 'Sign in to view your tickets'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              {isRTL
                ? ar.signInBody
                : 'Log in with your Horus-Bot account to see your saved bookings and tickets.'}
            </p>
            <Button asChild>
              <Link to="/auth">{isRTL ? ar.signInCta : 'Log in'}</Link>
            </Button>
          </Card>
        )}

        {user && loading && tickets.length === 0 && <TicketsLoadingState isRTL={isRTL} />}

        {user && loading && tickets.length > 0 && <InlineLoadingNotice isRTL={isRTL} />}

        {user && !loading && error && (
          <TicketsErrorState error={error} isRTL={isRTL} onRetry={refresh} />
        )}

        {user && !loading && !error && skippedBookingCount > 0 && (
          <SkippedBookingsNotice count={skippedBookingCount} isRTL={isRTL} />
        )}

        {user && !loading && !error && tickets.length === 0 && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? ar.emptyTitle : 'No tickets yet'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              {isRTL
                ? ar.emptyBody
                : 'Book your museum visit from the website, then your Museum Entry Ticket and Horus-Bot Tour Ticket will appear here.'}
            </p>
            <Button asChild>
              <Link to="/book">{isRTL ? ar.emptyCta : 'Book a visit'}</Link>
            </Button>
          </Card>
        )}

        {user && active.length > 0 && (
          <TicketSection
            title={isRTL ? ar.activeBookings : 'Active bookings'}
            tickets={active}
            isRTL={isRTL}
            exhibits={exhibits}
            onCancel={setConfirmTk}
            cancellingId={cancellingId}
          />
        )}

        {user && past.length > 0 && (
          <TicketSection
            title={isRTL ? ar.bookingHistory : 'Booking history'}
            tickets={past}
            isRTL={isRTL}
            exhibits={exhibits}
            cancellingId={cancellingId}
          />
        )}
      </section>

      <Dialog open={!!confirmTk} onOpenChange={(open) => !open && !cancellingId && setConfirmTk(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>{isRTL ? ar.cancelTitle : 'Cancel this booking?'}</DialogTitle>
            <DialogDescription>
              {isRTL
                ? ar.cancelBody
                : 'This will cancel your Museum Entry Ticket and linked Horus-Bot Tour Ticket.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmTk(null)} disabled={!!cancellingId}>
              {isRTL ? ar.keepBooking : 'Keep booking'}
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={!!cancellingId}>
              {cancellingId ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRTL ? ar.cancelBooking : 'Cancel booking')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TicketsLoadingState({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>{isRTL ? ar.loading : 'Loading tickets...'}</span>
        </div>
      </Card>
      {[0, 1].map((item) => (
        <Card key={item} className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
              <div className="h-6 w-44 rounded bg-muted animate-pulse" />
              <div className="h-4 w-64 max-w-full rounded bg-muted animate-pulse" />
            </div>
            <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[0, 1, 2].map((box) => (
              <div key={box} className="h-16 rounded-xl bg-muted/70 animate-pulse" />
            ))}
          </div>
          <div className="h-20 rounded-xl border border-dashed border-border bg-muted/40 animate-pulse" />
        </Card>
      ))}
    </div>
  );
}

function InlineLoadingNotice({ isRTL }: { isRTL: boolean }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>{isRTL ? ar.loading : 'Loading tickets...'}</span>
      </div>
    </Card>
  );
}

function TicketsErrorState({ error, isRTL, onRetry }: { error: string; isRTL: boolean; onRetry: () => void }) {
  const isNetwork = error === productMessage('network');
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
        <div className="flex-1">
          <h2 className="font-serif text-xl mb-1">{productMessage('tickets', isRTL)}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {isNetwork ? productMessage('network', isRTL) : productMessage('generic', isRTL)}
          </p>
          <Button onClick={onRetry} variant="outline">{productMessage('tryAgain', isRTL)}</Button>
        </div>
      </div>
    </Card>
  );
}

function SkippedBookingsNotice({ count, isRTL }: { count: number; isRTL: boolean }) {
  return (
    <Card className="p-4 border-primary/30 bg-primary/5">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium">
            {isRTL ? ar.skippedTitle : 'Some older bookings could not be displayed.'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isRTL ? ar.skippedBody : count === 1 ? 'Your available bookings are still shown below.' : 'Your available bookings are still shown below.'}
          </p>
        </div>
      </div>
    </Card>
  );
}

function TicketSection({
  title,
  tickets,
  isRTL,
  exhibits,
  onCancel,
  cancellingId,
}: {
  title: string;
  tickets: UserTicket[];
  isRTL: boolean;
  exhibits: WebsiteExhibit[];
  onCancel?: (ticket: UserTicket) => void;
  cancellingId: string | null;
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
            isCancelling={cancellingId === tk.id}
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
  return isRTL ? ar.payAtCounter : 'Pay at Counter';
}

function TicketCard({
  tk,
  isRTL,
  exhibits,
  onCancel,
  isCancelling = false,
}: {
  tk: UserTicket;
  isRTL: boolean;
  exhibits: WebsiteExhibit[];
  onCancel?: () => void;
  isCancelling?: boolean;
}) {
  const inactive = tk.status !== 'active';
  const canCancel = canCancelUserTicket(tk);
  const cancellationReason = cancellationBlockedMessage(tk, isRTL);
  const exhibitNames = resolveExhibitNames(tk.selected_exhibits ?? [], exhibits, isRTL);
  const routeTitle = isRTL
    ? tk.route_title_ar || tk.route_title_en
    : tk.route_title_en || tk.route_title_ar;

  return (
    <Card className={'p-6 space-y-4 ' + (inactive ? 'opacity-70' : '')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {isRTL ? ar.summary : 'Booking summary'}
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
          className={inactive ? 'bg-muted text-muted-foreground border-0' : 'bg-primary/15 text-primary border-0'}
        >
          {statusLabel(tk.status, isRTL)}
        </Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <InfoBox label={isRTL ? ar.visitors : 'Visitors'} value={`${tk.total_tickets}`} />
        <InfoBox label={isRTL ? ar.total : 'Total'} value={`${tk.total_price} ${tk.currency}`} />
        <InfoBox label={isRTL ? ar.paymentStatus : 'Payment status'} value={paymentStatusLabel(isRTL)} />
        <InfoBox label={isRTL ? ar.bookingStatus : 'Booking status'} value={statusLabel(tk.status, isRTL)} />
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
            {isRTL ? ar.entryQr : 'Entry QR'}
          </p>
          <p className="font-mono text-sm truncate">{tk.qr_value}</p>
        </div>
      </div>

      <div className="grid gap-3">
        <PassCard
          icon={<Ticket className="h-4 w-4 text-primary" />}
          title={isRTL ? ar.museumTicket : 'Museum Entry Ticket'}
          status={statusLabel(tk.museum_status, isRTL)}
        >
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <InfoBox label={isRTL ? ar.tickets : 'Tickets'} value={`${tk.total_tickets}`} />
            <InfoBox label={isRTL ? ar.price : 'Price'} value={`${tk.museum_entry_total} ${tk.currency}`} />
            <InfoBox label={isRTL ? ar.paymentStatus : 'Payment status'} value={paymentStatusLabel(isRTL)} />
          </div>
          <p className="text-xs text-muted-foreground">
            {isRTL ? ar.entryQrBody : 'Museum Entry QR is used at the museum gate.'}
          </p>
        </PassCard>

        <PassCard
          icon={<Bot className="h-4 w-4 text-primary" />}
          title={isRTL ? ar.robotTicket : 'Horus-Bot Tour Ticket'}
          status={statusLabel(tk.robot_status, isRTL)}
        >
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            {routeTitle && <InfoBox label={isRTL ? ar.route : 'Route'} value={routeTitle} />}
            <InfoBox label={isRTL ? ar.tourType : 'Tour type'} value={tk.tour_type ?? 'standard'} />
            <InfoBox label={isRTL ? ar.duration : 'Duration'} value={`${tk.tour_duration ?? 45} min`} />
            <InfoBox label={isRTL ? ar.price : 'Price'} value={`${tk.robot_tour_price} ${tk.currency}`} />
            <InfoBox label={isRTL ? ar.paymentStatus : 'Payment status'} value={paymentStatusLabel(isRTL)} />
          </div>
          {exhibitNames.length > 0 ? (
            <div className="space-y-1.5">
              <div className="text-[11px] text-muted-foreground">
                {isRTL ? ar.selectedExhibits : 'Selected exhibits'}
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
                {isRTL ? ar.selectedExhibits : 'Selected exhibits'}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? ar.routeUnavailable : 'Route details are not available for this older ticket.'}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {isRTL
              ? ar.pairingBody
              : 'Robot Pairing happens later inside the mobile app by scanning the physical robot QR.'}
          </p>
        </PassCard>
      </div>

      {canCancel && onCancel && (
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onCancel} disabled={isCancelling}>
          {isCancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XIcon className="h-3.5 w-3.5" />}
          {isRTL ? ar.cancelBooking : 'Cancel booking'}
        </Button>
      )}
      {!canCancel && cancellationReason && (
        <p className="text-xs text-muted-foreground">{cancellationReason}</p>
      )}
    </Card>
  );
}

function statusLabel(status: TicketStatus, isRTL: boolean) {
  const labels: Record<TicketStatus, { en: string; ar: string }> = {
    active: { en: 'Active', ar: ar.statuses.active },
    cancelled: { en: 'Cancelled', ar: ar.statuses.cancelled },
    completed: { en: 'Completed', ar: ar.statuses.completed },
    expired: { en: 'Expired', ar: ar.statuses.expired },
    paired: { en: 'Paired', ar: ar.statuses.paired },
    in_progress: { en: 'In Progress', ar: ar.statuses.inProgress },
    pending: { en: 'Preparing', ar: ar.statuses.preparing },
    used: { en: 'Used', ar: ar.statuses.used },
  };
  return isRTL ? labels[status].ar : labels[status].en;
}

function cancellationDeadlineMessage(isRTL: boolean) {
  return isRTL
    ? ar.unavailable24
    : 'Cancellation is unavailable within 24 hours of your visit.';
}

function cancellationBlockedMessage(ticket: UserTicket, isRTL: boolean): string | null {
  if (ticket.robot_status === 'paired') {
    return isRTL ? ar.unavailableAfterPairing : 'Cancellation is unavailable after Robot Pairing.';
  }
  if (ticket.robot_status === 'in_progress') {
    return isRTL ? ar.unavailableInProgress : 'Cancellation is unavailable after the Live Tour has started.';
  }
  if (ticket.robot_status === 'completed' || ticket.status === 'completed') {
    return isRTL ? ar.unavailableCompleted : 'This visit is complete, so cancellation is no longer available.';
  }
  if (ticket.status === 'expired' || ticket.museum_status === 'expired' || ticket.robot_status === 'expired') {
    return isRTL ? ar.unavailableExpired : 'This booking date has passed, so cancellation is no longer available.';
  }
  if (ticket.status === 'active' && isWithinCancellationDeadline(ticket)) {
    return cancellationDeadlineMessage(isRTL);
  }
  return null;
}

function cancellationFailureMessage(error: string, isRTL: boolean) {
  if (error.includes('24 hours')) return cancellationDeadlineMessage(isRTL);
  if (error === productMessage('network')) return productMessage('network', isRTL);
  return isRTL ? ar.failureCancel : 'We could not cancel this booking. Please try again.';
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