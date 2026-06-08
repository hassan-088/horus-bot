import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
  type DocumentData,
} from 'firebase/firestore';
import { CheckCircle2, Loader2, Search, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';

const PENDING_PAYMENT_STATUSES = [
  'pay_at_counter',
  'pending',
  'unpaid',
  'awaiting_payment',
];

type PendingBooking = {
  id: string;
  booking_id: string;
  visitor_name: string;
  visitor_email: string;
  userId: string;
  visit_date: string;
  visit_time: string;
  museum_ticket_id: string;
  robot_tour_ticket_id: string;
  visitor_count: number | string;
  total_tickets: number | string;
  museum_entry_total: number | string;
  robot_tour_price: number | string;
  total_price: number | string;
  currency: string;
  payment_method: string;
  payment_status: string;
  status: string;
  qr_value: string;
};

function text(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function amount(value: unknown) {
  return typeof value === 'number' ? value : text(value, '-');
}

function toBooking(id: string, data: DocumentData): PendingBooking {
  return {
    id,
    booking_id: text(data.booking_id, id),
    visitor_name: text(data.visitor_name ?? data.full_name ?? data.display_name, '-'),
    visitor_email: text(data.visitor_email ?? data.email ?? data.user_email, '-'),
    userId: text(data.userId),
    visit_date: text(data.visit_date, '-'),
    visit_time: text(data.visit_time, '-'),
    museum_ticket_id: text(data.museum_ticket_id),
    robot_tour_ticket_id: text(data.robot_tour_ticket_id),
    visitor_count: amount(data.visitor_count),
    total_tickets: amount(data.total_tickets ?? data.visitor_count),
    museum_entry_total: amount(data.museum_entry_total),
    robot_tour_price: amount(data.robot_tour_price),
    total_price: amount(data.total_price),
    currency: text(data.currency, 'EGP'),
    payment_method: text(data.payment_method, '-'),
    payment_status: text(data.payment_status, '-'),
    status: text(data.status, '-'),
    qr_value: text(data.qr_value),
  };
}

function canAccess(role: unknown) {
  const normalized = String(role ?? '').trim().toLowerCase();
  return normalized === 'admin' || normalized === 'cashier';
}

export default function AdminPaymentsPage() {
  const { user, profile, isLoading } = useAuth();
  const [bookings, setBookings] = useState<PendingBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const allowed = canAccess(profile?.role);

  useEffect(() => {
    if (!user || !allowed) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const pendingQuery = query(
      collection(db, 'bookings'),
      where('payment_status', 'in', PENDING_PAYMENT_STATUSES),
    );
    return onSnapshot(
      pendingQuery,
      async (snapshot) => {
        const rows = await Promise.all(snapshot.docs
          .map(async (bookingDoc) => {
            const booking = toBooking(bookingDoc.id, bookingDoc.data());
            if (!booking.museum_ticket_id) return booking;
            const museumSnap = await getDoc(doc(db, 'museumTickets', booking.museum_ticket_id));
            if (!museumSnap.exists()) return booking;
            const museumTicket = museumSnap.data();
            return {
              ...booking,
              qr_value: booking.qr_value || text(museumTicket.qr_value),
              total_tickets: booking.total_tickets === '-' ? amount(museumTicket.total_tickets) : booking.total_tickets,
            };
          }));
        rows
          .sort((a, b) => a.visit_date.localeCompare(b.visit_date) || a.visit_time.localeCompare(b.visit_time));
        setBookings(rows);
        setLoading(false);
      },
      (err) => {
        console.error('[Horus-Bot] Admin payment load failed', err);
        setError('Unable to load pending counter payments.');
        setLoading(false);
      },
    );
  }, [allowed, user]);

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return bookings;
    return bookings.filter((booking) =>
      [
        booking.id,
        booking.booking_id,
        booking.visitor_email,
        booking.museum_ticket_id,
        booking.robot_tour_ticket_id,
        booking.qr_value,
      ].some((value) => value.toLowerCase().includes(term)),
    );
  }, [bookings, search]);

  const confirmPayment = async (booking: PendingBooking) => {
    if (!user || confirmingId) return;
    if (!booking.museum_ticket_id || !booking.robot_tour_ticket_id) {
      toast.error('This booking is missing linked ticket IDs.');
      return;
    }

    setConfirmingId(booking.id);
    try {
      const batch = writeBatch(db);
      const update = {
        payment_status: 'confirmed',
        payment_confirmed_at: serverTimestamp(),
        payment_confirmed_by: user.id,
        updated_at: serverTimestamp(),
      };
      batch.update(doc(db, 'bookings', booking.id), update);
      batch.update(doc(db, 'museumTickets', booking.museum_ticket_id), update);
      batch.update(doc(db, 'robotTourTickets', booking.robot_tour_ticket_id), update);
      await batch.commit();
      toast.success('Payment confirmed.');
    } catch (err) {
      console.error('[Horus-Bot] Confirm payment failed', err);
      toast.error('Unable to confirm payment.');
    } finally {
      setConfirmingId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <Card className="rounded-2xl border-primary/20 p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading admin access...
          </div>
        </Card>
      </section>
    );
  }

  if (!user || !allowed) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 md:px-8">
        <Card className="rounded-2xl border-primary/20 p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="font-serif text-3xl">Access Denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Counter payment confirmation is available only to admin and cashier accounts.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3 border-0 bg-primary/10 text-primary">
          Staff
        </Badge>
        <h1 className="font-serif text-4xl">Counter Payment Confirmation</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Confirm visitor payments before QR and robot pairing become available.
        </p>
      </div>

      <div className="mb-5 flex max-w-xl items-center gap-2 rounded-2xl border border-primary/15 bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search booking, email, ticket ID, or QR value"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      {loading && (
        <Card className="rounded-2xl border-primary/20 p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading pending payments...
          </div>
        </Card>
      )}

      {!loading && error && (
        <Card className="rounded-2xl border-destructive/20 p-6 text-sm text-destructive">
          {error}
        </Card>
      )}

      {!loading && !error && filteredBookings.length === 0 && (
        <Card className="rounded-2xl border-primary/20 p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h2 className="font-serif text-2xl">No pending counter payments</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New pay-at-counter bookings will appear here automatically.
          </p>
        </Card>
      )}

      {!loading && !error && filteredBookings.length > 0 && (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="rounded-2xl border-primary/20 p-5 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="text-xs uppercase text-muted-foreground">Booking ID</div>
                  <div className="break-all font-mono text-sm font-semibold">{booking.booking_id}</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {booking.visitor_name} · {booking.visitor_email}
                  </div>
                </div>
                <Button
                  onClick={() => confirmPayment(booking)}
                  disabled={confirmingId === booking.id}
                  className="shrink-0"
                >
                  {confirmingId === booking.id && <Loader2 className="h-4 w-4 animate-spin" />}
                  Confirm Payment
                </Button>
              </div>

              <div className="mt-5 grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-4">
                <Info label="Visit date" value={booking.visit_date} />
                <Info label="Visit time" value={booking.visit_time} />
                <Info label="Museum ticket id" value={booking.museum_ticket_id} mono />
                <Info label="Robot tour ticket id" value={booking.robot_tour_ticket_id} mono />
                <Info label="Visitors" value={`${booking.visitor_count} / ${booking.total_tickets}`} />
                <Info label="Museum entry total" value={`${booking.museum_entry_total} ${booking.currency}`} />
                <Info label="Robot tour price" value={`${booking.robot_tour_price} ${booking.currency}`} />
                <Info label="Total price" value={`${booking.total_price} ${booking.currency}`} />
                <Info label="Currency" value={booking.currency} />
                <Info label="Payment method" value={booking.payment_method} />
                <Info label="Payment status" value={booking.payment_status} />
                <Info label="Status" value={booking.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0 rounded-xl bg-muted/45 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={mono ? 'break-all font-mono text-xs font-semibold' : 'break-words font-semibold'}>
        {value || '-'}
      </div>
    </div>
  );
}
