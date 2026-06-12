import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type DocumentData,
  type FirestoreError,
} from 'firebase/firestore';
import { CheckCircle2, Loader2, LogOut, Search, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';

const PENDING_PAYMENT_STATUSES = new Set([
  'pay_at_counter',
  'pending',
  'unpaid',
  'awaiting_payment',
]);

const CONFIRMED_PAYMENT_STATUSES = new Set(['confirmed', 'paid']);

const CLOSED_STATUSES = new Set([
  'cancelled',
  'canceled',
  'expired',
  'completed',
  'rejected',
  'declined',
  'archived',
  'inactive',
  'disabled',
  'used',
]);

type Primitive = string | number;

type PendingBooking = {
  id: string;
  booking_doc_id: string;
  booking_id: string;
  sources: string[];
  visitor_name: string;
  visitor_email: string;
  userId: string;
  visit_date: string;
  visit_time: string;
  museum_ticket_id: string;
  robot_tour_ticket_id: string;
  visitor_count: Primitive;
  total_tickets: Primitive;
  museum_entry_total: Primitive;
  robot_tour_price: Primitive;
  total_price: Primitive;
  currency: string;
  payment_method: string;
  payment_status: string;
  status: string;
  qr_value: string;
};

type RowDoc = {
  id: string;
  data: DocumentData;
};

function normalize(value: unknown) {
  return String(value ?? '').trim().toLowerCase().replace(/-/g, '_');
}

function text(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function textAny(data: DocumentData | undefined, keys: string[], fallback = '') {
  if (!data) return fallback;
  for (const key of keys) {
    const value = text(data[key]);
    if (value) return value;
  }
  return fallback;
}

function numberAny(data: DocumentData | undefined, keys: string[]) {
  if (!data) return undefined;
  for (const key of keys) {
    const value = data[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function amount(value: unknown): Primitive {
  return typeof value === 'number' && Number.isFinite(value) ? value : text(value, '-');
}

function amountAny(data: DocumentData | undefined, keys: string[], fallback: Primitive = '-') {
  const numeric = numberAny(data, keys);
  if (numeric !== undefined) return numeric;
  return amount(textAny(data, keys, String(fallback)));
}

function paymentStatus(data: DocumentData | undefined) {
  return normalize(data?.payment_status ?? data?.paymentStatus ?? data?.payment?.status);
}

function recordStatus(data: DocumentData | undefined) {
  return normalize(data?.status ?? data?.booking_status ?? data?.ticket_status);
}

function isPendingCounterPayment(data: DocumentData | undefined) {
  return PENDING_PAYMENT_STATUSES.has(paymentStatus(data));
}

function isClosedRecord(data: DocumentData | undefined) {
  const status = recordStatus(data);
  return !!status && CLOSED_STATUSES.has(status);
}

function isConfirmedPayment(data: DocumentData | undefined) {
  return CONFIRMED_PAYMENT_STATUSES.has(paymentStatus(data));
}

function shouldShowRecord(data: DocumentData | undefined) {
  return isPendingCounterPayment(data) && !isClosedRecord(data) && !isConfirmedPayment(data);
}

function bookingKey(row: RowDoc) {
  return textAny(row.data, ['booking_id', 'bookingId'], row.id);
}

function ticketId(row: RowDoc | undefined, keys: string[]) {
  if (!row) return '';
  return textAny(row.data, keys, row.id);
}

function sourceLabel(row: RowDoc | undefined, label: string) {
  return row ? label : '';
}

function firstValue(values: Array<unknown>, fallback = '') {
  for (const value of values) {
    const result = text(value);
    if (result) return result;
  }
  return fallback;
}

function buildPendingRows(
  bookingDocs: RowDoc[],
  museumDocs: RowDoc[],
  robotDocs: RowDoc[],
): PendingBooking[] {
  const bookingsById = new Map<string, RowDoc>();
  const museumById = new Map<string, RowDoc>();
  const museumByBooking = new Map<string, RowDoc>();
  const robotById = new Map<string, RowDoc>();
  const robotByBooking = new Map<string, RowDoc>();
  const keys = new Set<string>();

  bookingDocs.forEach((row) => {
    const key = bookingKey(row);
    bookingsById.set(key, row);
    bookingsById.set(row.id, row);
    if (shouldShowRecord(row.data)) keys.add(key);
  });

  museumDocs.forEach((row) => {
    const key = textAny(row.data, ['booking_id', 'bookingId']);
    const id = ticketId(row, ['ticketId', 'museum_ticket_id', 'museumTicketId']);
    museumById.set(id, row);
    museumById.set(row.id, row);
    if (key) museumByBooking.set(key, row);
    if (shouldShowRecord(row.data)) keys.add(key || row.id);
  });

  robotDocs.forEach((row) => {
    const key = textAny(row.data, ['booking_id', 'bookingId']);
    const id = ticketId(row, ['tourTicketId', 'robot_tour_ticket_id', 'robotTourTicketId']);
    robotById.set(id, row);
    robotById.set(row.id, row);
    if (key) robotByBooking.set(key, row);
    if (shouldShowRecord(row.data)) keys.add(key || row.id);
  });

  const rows = Array.from(keys).map((key) => {
    const booking = bookingsById.get(key);
    const bookingData = booking?.data;
    const museumIdFromBooking = textAny(bookingData, ['museum_ticket_id', 'museumTicketId']);
    const robotIdFromBooking = textAny(bookingData, ['robot_tour_ticket_id', 'robotTourTicketId']);
    const museum = (museumIdFromBooking ? museumById.get(museumIdFromBooking) : undefined) ?? museumByBooking.get(key);
    const robot = (robotIdFromBooking ? robotById.get(robotIdFromBooking) : undefined) ?? robotByBooking.get(key);
    const museumData = museum?.data;
    const robotData = robot?.data;

    const museumTotal = amountAny(bookingData, ['museum_entry_total', 'museumEntryTotal']);
    const robotTotal = amountAny(bookingData, ['robot_tour_price', 'robotTourPrice']);
    const fallbackTotal =
      typeof museumTotal === 'number' && typeof robotTotal === 'number'
        ? museumTotal + robotTotal
        : '-';

    const sources = [
      sourceLabel(booking, 'booking'),
      sourceLabel(museum, 'museum ticket'),
      sourceLabel(robot, 'robot ticket'),
    ].filter(Boolean);

    return {
      id: booking?.id ?? key,
      booking_doc_id: booking?.id ?? '',
      booking_id: firstValue([bookingData?.booking_id, bookingData?.bookingId, key], key),
      sources,
      visitor_name: firstValue([
        bookingData?.visitor_name,
        bookingData?.full_name,
        bookingData?.display_name,
        museumData?.visitor_name,
        robotData?.visitor_name,
      ], '-'),
      visitor_email: firstValue([
        bookingData?.visitor_email,
        bookingData?.email,
        bookingData?.user_email,
        museumData?.visitor_email,
        robotData?.visitor_email,
      ], '-'),
      userId: firstValue([bookingData?.userId, bookingData?.user_id, museumData?.userId, robotData?.userId]),
      visit_date: firstValue([bookingData?.visit_date, bookingData?.visitDate, museumData?.visit_date, robotData?.visit_date], '-'),
      visit_time: firstValue([bookingData?.visit_time, bookingData?.visitTime, museumData?.visit_time, robotData?.visit_time], '-'),
      museum_ticket_id: firstValue([
        bookingData?.museum_ticket_id,
        bookingData?.museumTicketId,
        museumData?.ticketId,
        museum?.id,
      ]),
      robot_tour_ticket_id: firstValue([
        bookingData?.robot_tour_ticket_id,
        bookingData?.robotTourTicketId,
        robotData?.tourTicketId,
        robot?.id,
      ]),
      visitor_count: amountAny(bookingData, ['visitor_count', 'visitorCount'], amountAny(museumData, ['total_tickets', 'visitor_count'])),
      total_tickets: amountAny(museumData, ['total_tickets'], amountAny(bookingData, ['total_tickets', 'visitor_count'])),
      museum_entry_total: museumTotal === '-' ? amountAny(museumData, ['total_price', 'museum_entry_total']) : museumTotal,
      robot_tour_price: robotTotal === '-' ? amountAny(robotData, ['total_price', 'robot_tour_price']) : robotTotal,
      total_price: amountAny(bookingData, ['total_price', 'totalPrice'], fallbackTotal),
      currency: firstValue([bookingData?.currency, museumData?.currency, robotData?.currency], 'EGP'),
      payment_method: firstValue([bookingData?.payment_method, bookingData?.paymentMethod, museumData?.payment_method, robotData?.payment_method], '-'),
      payment_status: firstValue([bookingData?.payment_status, bookingData?.paymentStatus, museumData?.payment_status, robotData?.payment_status], '-'),
      status: firstValue([bookingData?.status, museumData?.status, robotData?.status], '-'),
      qr_value: firstValue([bookingData?.qr_value, museumData?.qr_value, robotData?.qr_value]),
    };
  });

  return rows
    .filter((row) => !CONFIRMED_PAYMENT_STATUSES.has(normalize(row.payment_status)))
    .sort((a, b) => a.visit_date.localeCompare(b.visit_date) || a.visit_time.localeCompare(b.visit_time));
}

function canAccess(role: unknown) {
  const normalized = String(role ?? '').trim().toLowerCase();
  return normalized === 'admin' || normalized === 'cashier';
}

function logAdminPaymentError(
  queryAttempted: string,
  err: FirestoreError,
  user: { id: string; email: string | null },
  role: unknown,
) {
  const message = err.message ?? '';
  console.error('[Horus-Bot] Admin payment load failed', {
    adminUid: user.id,
    adminEmail: user.email,
    loadedRole: role,
    queryAttempted,
    code: err.code,
    message,
    permissionDenied: err.code === 'permission-denied',
    missingIndex: message.toLowerCase().includes('index'),
  });
}

export default function AdminPaymentsPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<PendingBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const allowed = canAccess(profile?.role);

  useEffect(() => {
    if (!user || !allowed) {
      setBookings([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError(null);
    console.info('[Horus-Bot] Admin payment loader start', {
      adminUid: user.id,
      adminEmail: user.email,
      loadedRole: profile?.role,
      queriesAttempted: [
        'bookings collection scan',
        'museumTickets collection scan',
        'robotTourTickets collection scan',
      ],
    });

    const state = {
      bookings: [] as RowDoc[],
      museumTickets: [] as RowDoc[],
      robotTourTickets: [] as RowDoc[],
    };
    const loaded = {
      bookings: false,
      museumTickets: false,
      robotTourTickets: false,
    };

    const recompute = () => {
      setBookings(buildPendingRows(state.bookings, state.museumTickets, state.robotTourTickets));
      if (loaded.bookings && loaded.museumTickets && loaded.robotTourTickets) {
        setLoading(false);
      }
    };

    const fail = (queryAttempted: string, err: FirestoreError) => {
      logAdminPaymentError(queryAttempted, err, user, profile?.role);
      setError('Unable to load pending payments. Please check admin permissions or Firestore index.');
      setLoading(false);
    };

    const unsubBookings = onSnapshot(
      collection(db, 'bookings'),
      (snapshot) => {
        state.bookings = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
        loaded.bookings = true;
        recompute();
      },
      (err) => fail('bookings collection scan', err),
    );

    const unsubMuseum = onSnapshot(
      collection(db, 'museumTickets'),
      (snapshot) => {
        state.museumTickets = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
        loaded.museumTickets = true;
        recompute();
      },
      (err) => fail('museumTickets collection scan', err),
    );

    const unsubRobot = onSnapshot(
      collection(db, 'robotTourTickets'),
      (snapshot) => {
        state.robotTourTickets = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
        loaded.robotTourTickets = true;
        recompute();
      },
      (err) => fail('robotTourTickets collection scan', err),
    );

    return () => {
      unsubBookings();
      unsubMuseum();
      unsubRobot();
    };
  }, [allowed, profile?.role, user]);

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return bookings;
    return bookings.filter((booking) =>
      [
        booking.id,
        booking.booking_id,
        booking.visitor_email,
        booking.userId,
        booking.museum_ticket_id,
        booking.robot_tour_ticket_id,
        booking.qr_value,
      ].some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [bookings, search]);

  const confirmPayment = async (booking: PendingBooking) => {
    if (!user || confirmingId) return;
    if (!booking.booking_doc_id && !booking.museum_ticket_id && !booking.robot_tour_ticket_id) {
      toast.error('This payment record has no linked booking or ticket documents.');
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
      if (booking.booking_doc_id) batch.update(doc(db, 'bookings', booking.booking_doc_id), update);
      if (booking.museum_ticket_id) batch.update(doc(db, 'museumTickets', booking.museum_ticket_id), update);
      if (booking.robot_tour_ticket_id) batch.update(doc(db, 'robotTourTickets', booking.robot_tour_ticket_id), update);
      await batch.commit();
      toast.success('Payment confirmed.');
    } catch (err) {
      console.error('[Horus-Bot] Confirm payment failed', {
        adminUid: user.id,
        adminEmail: user.email,
        bookingId: booking.booking_id,
        code: (err as { code?: unknown })?.code,
        message: (err as { message?: unknown })?.message,
      });
      toast.error('Unable to confirm payment. Please check admin permissions and linked ticket IDs.');
    } finally {
      setConfirmingId(null);
    }
  };

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('[Horus-Bot] Staff sign out failed', err);
      toast.error('Unable to sign out.');
    } finally {
      setSigningOut(false);
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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 border-0 bg-primary/10 text-primary">
            Horus-Bot Staff Cashier Portal
          </Badge>
          <h1 className="font-serif text-4xl">Counter Payment Confirmation</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Confirm visitor payments before QR and robot pairing become available.
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut} disabled={signingOut} className="shrink-0">
          {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
          Sign Out
        </Button>
      </div>

      <div className="mb-5 flex max-w-xl items-center gap-2 rounded-2xl border border-primary/15 bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search booking, email, user, ticket ID, or QR value"
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
            <Card key={`${booking.booking_id}-${booking.id}`} className="rounded-2xl border-primary/20 p-5 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="text-xs uppercase text-muted-foreground">Booking ID</div>
                  <div className="break-all font-mono text-sm font-semibold">{booking.booking_id}</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {booking.visitor_name} - {booking.visitor_email}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {booking.sources.map((source) => (
                      <Badge key={source} variant="secondary" className="border-0 bg-primary/10 text-primary">
                        {source}
                      </Badge>
                    ))}
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

function Info({ label, value, mono = false }: { label: string; value: Primitive | string; mono?: boolean }) {
  return (
    <div className="min-w-0 rounded-xl bg-muted/45 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={mono ? 'break-all font-mono text-xs font-semibold' : 'break-words font-semibold'}>
        {String(value || '-')}
      </div>
    </div>
  );
}
