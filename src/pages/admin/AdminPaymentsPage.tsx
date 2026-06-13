import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  collection,
  doc,
  getDoc,
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
import { app, db } from '@/integrations/firebase/client';
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

const OPEN_PAYMENT_RECORD_STATUSES = new Set([
  'active',
  'valid',
  'confirmed',
  'pending',
]);

type Primitive = string | number;
type PaymentLifecycleFilter = 'pending' | 'confirmed' | 'cancelled' | 'completed';
type PendingRecordCategory = 'ready' | 'expired' | 'incomplete';

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
  source_debug: string;
  pending_category: PendingRecordCategory;
  is_entry_only: boolean;
};

type RowDoc = {
  id: string;
  data: DocumentData;
};

type AdminPaymentDiagnostics = {
  bookings: number;
  museumTickets: number;
  robotTourTickets: number;
  pendingLikeRecords: number;
  filteredPendingLikeRecords: number;
};

type AdminIdentityDiagnostics = {
  checked: boolean;
  userDocExists: boolean | null;
  roleValue: string;
  isAdminOrCashier: boolean;
  readError: string | null;
};

const emptyDiagnostics: AdminPaymentDiagnostics = {
  bookings: 0,
  museumTickets: 0,
  robotTourTickets: 0,
  pendingLikeRecords: 0,
  filteredPendingLikeRecords: 0,
};

const emptyIdentityDiagnostics: AdminIdentityDiagnostics = {
  checked: false,
  userDocExists: null,
  roleValue: '',
  isAdminOrCashier: false,
  readError: null,
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

function isOpenPaymentRecord(data: DocumentData | undefined) {
  const status = recordStatus(data);
  return !status || OPEN_PAYMENT_RECORD_STATUSES.has(status);
}

function isConfirmedPayment(data: DocumentData | undefined) {
  return CONFIRMED_PAYMENT_STATUSES.has(paymentStatus(data));
}

function visitDateIsPast(data: DocumentData | undefined) {
  const rawDate = textAny(data, ['visit_date', 'visitDate']);
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(rawDate);
  if (!match) return false;
  const visitDate = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return visitDate.getTime() < today.getTime();
}

function parseVisitStartsAt(visitDate: string, visitTime: string): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(visitDate);
  if (!dateMatch) return null;
  const timeMatch = /^(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(
    visitTime.trim().split(' - ')[0] ?? '',
  );
  let hour = 0;
  let minute = 0;
  if (timeMatch) {
    hour = Number(timeMatch[1]);
    minute = Number(timeMatch[2]);
    const period = timeMatch[3]?.toUpperCase();
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
  }
  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    hour,
    minute,
  );
}

function hasValue(value: unknown) {
  const textValue = String(value ?? '').trim();
  return textValue !== '' && textValue !== '-';
}

function isPendingPaymentValue(value: unknown) {
  return PENDING_PAYMENT_STATUSES.has(normalize(value));
}

function pendingCategoryForRow(row: PendingBooking): PendingRecordCategory {
  if (!isPendingPaymentValue(row.payment_status)) return 'ready';
  const hasVisitDate = hasValue(row.visit_date);
  const hasVisitTime = hasValue(row.visit_time);
  const hasBooking = hasValue(row.booking_doc_id);
  const hasMuseumTicket = hasValue(row.museum_ticket_id) && row.sources.includes('museum ticket');
  const hasRobotTicketId = hasValue(row.robot_tour_ticket_id);
  const robotRequired = !row.is_entry_only;
  const hasRobotTicket = !robotRequired || row.sources.includes('robot ticket');
  if (
    !hasVisitDate ||
    !hasVisitTime ||
    !hasBooking ||
    !hasMuseumTicket ||
    (robotRequired && (!hasRobotTicketId || !hasRobotTicket))
  ) {
    return 'incomplete';
  }
  const startsAt = parseVisitStartsAt(row.visit_date, row.visit_time);
  if (!startsAt) return 'incomplete';
  return startsAt.getTime() < Date.now() ? 'expired' : 'ready';
}

function sourceDebugLabel(sources: string[], category: PendingRecordCategory) {
  if (category === 'incomplete') return 'incomplete/legacy';
  if (sources.includes('booking')) return 'booking';
  if (sources.includes('museum ticket')) return 'museum ticket';
  if (sources.includes('robot ticket')) return 'robot ticket';
  return 'incomplete/legacy';
}

function shouldShowRecord(data: DocumentData | undefined) {
  return (
    isPendingCounterPayment(data) &&
    isOpenPaymentRecord(data) &&
    !isClosedRecord(data) &&
    !isConfirmedPayment(data) &&
    !visitDateIsPast(data)
  );
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
    keys.add(key);
  });

  museumDocs.forEach((row) => {
    const key = textAny(row.data, ['booking_id', 'bookingId']);
    const id = ticketId(row, ['ticketId', 'museum_ticket_id', 'museumTicketId']);
    museumById.set(id, row);
    museumById.set(row.id, row);
    if (key) museumByBooking.set(key, row);
    keys.add(key || row.id);
  });

  robotDocs.forEach((row) => {
    const key = textAny(row.data, ['booking_id', 'bookingId']);
    const id = ticketId(row, ['tourTicketId', 'robot_tour_ticket_id', 'robotTourTicketId']);
    robotById.set(id, row);
    robotById.set(row.id, row);
    if (key) robotByBooking.set(key, row);
    keys.add(key || row.id);
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
    const robotTotalNumber = numberAny(bookingData, ['robot_tour_price', 'robotTourPrice']);
    const bookingKind = normalize(
      bookingData?.booking_type ??
      bookingData?.bookingType ??
      bookingData?.ticket_kind ??
      bookingData?.ticketKind,
    );
    const isEntryOnly =
      bookingKind === 'entry_only' ||
      bookingKind === 'museum_entry' ||
      bookingKind === 'museum_only' ||
      (!hasValue(robotIdFromBooking) && robotTotalNumber === 0);
    const fallbackTotal =
      typeof museumTotal === 'number' && typeof robotTotal === 'number'
        ? museumTotal + robotTotal
        : '-';

    const sources = [
      sourceLabel(booking, 'booking'),
      sourceLabel(museum, 'museum ticket'),
      sourceLabel(robot, 'robot ticket'),
    ].filter(Boolean);

    const row: PendingBooking = {
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
      source_debug: 'incomplete/legacy',
      pending_category: 'incomplete',
      is_entry_only: isEntryOnly,
    };
    const pendingCategory = pendingCategoryForRow(row);
    return {
      ...row,
      pending_category: pendingCategory,
      source_debug: sourceDebugLabel(sources, pendingCategory),
    };
  });

  return rows.sort((a, b) => a.visit_date.localeCompare(b.visit_date) || a.visit_time.localeCompare(b.visit_time));
}

function lifecycleFilterForRow(row: PendingBooking): PaymentLifecycleFilter {
  const status = normalize(row.status);
  const payment = normalize(row.payment_status);
  if (['cancelled', 'canceled', 'declined', 'rejected', 'archived', 'inactive', 'disabled'].includes(status)) {
    return 'cancelled';
  }
  if (['completed', 'used', 'expired'].includes(status)) {
    return 'completed';
  }
  if (CONFIRMED_PAYMENT_STATUSES.has(payment)) {
    return 'confirmed';
  }
  return 'pending';
}

const lifecycleFilterLabels: Record<PaymentLifecycleFilter, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

const pendingCategoryLabels: Record<PendingRecordCategory, string> = {
  ready: 'Ready to Confirm',
  expired: 'Expired / Past Visit',
  incomplete: 'Incomplete / Legacy',
};

const pendingCategoryMessages: Record<Exclude<PendingRecordCategory, 'ready'>, string> = {
  expired: 'This visit date has passed. Payment confirmation is disabled.',
  incomplete: 'This record is missing required booking/ticket links and cannot be confirmed safely.',
};

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
  const [lifecycleFilter, setLifecycleFilter] = useState<PaymentLifecycleFilter>('pending');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [diagnostics, setDiagnostics] = useState<AdminPaymentDiagnostics>(emptyDiagnostics);
  const [identityDiagnostics, setIdentityDiagnostics] =
    useState<AdminIdentityDiagnostics>(emptyIdentityDiagnostics);
  const projectId = String(app.options.projectId ?? 'unknown');

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setDiagnostics(emptyDiagnostics);
      setIdentityDiagnostics(emptyIdentityDiagnostics);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError(null);
    setBookings([]);
    setDiagnostics(emptyDiagnostics);
    setIdentityDiagnostics(emptyIdentityDiagnostics);
    console.info('[Horus-Bot] Admin payment loader start', {
      adminUid: user.id,
      adminEmail: user.email,
      loadedRole: profile?.role,
      projectId,
      queriesAttempted: [
        `users/${user.id}`,
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

    let cancelled = false;
    let unsubBookings: (() => void) | undefined;
    let unsubMuseum: (() => void) | undefined;
    let unsubRobot: (() => void) | undefined;

    const recompute = () => {
      if (cancelled) return;
      const rows = buildPendingRows(state.bookings, state.museumTickets, state.robotTourTickets);
      const allRows = [...state.bookings, ...state.museumTickets, ...state.robotTourTickets];
      const pendingLikeRecords = allRows.filter((row) => isPendingCounterPayment(row.data)).length;
      const filteredPendingLikeRecords = allRows.filter(
        (row) => isPendingCounterPayment(row.data) && !shouldShowRecord(row.data),
      ).length;
      setDiagnostics({
        bookings: state.bookings.length,
        museumTickets: state.museumTickets.length,
        robotTourTickets: state.robotTourTickets.length,
        pendingLikeRecords,
        filteredPendingLikeRecords,
      });
      setBookings(rows);
      if (loaded.bookings && loaded.museumTickets && loaded.robotTourTickets) {
        setLoading(false);
      }
    };

    const fail = (queryAttempted: string, err: FirestoreError) => {
      if (cancelled) return;
      logAdminPaymentError(queryAttempted, err, user, profile?.role);
      setError(
        err.code === 'permission-denied'
          ? 'Firestore permission denied. Confirm this account has users/{uid}.role set to admin or cashier.'
          : 'Unable to load pending payments. Please check admin permissions or Firestore index.',
      );
      setLoading(false);
    };

    const startCollectionListeners = () => {
      unsubBookings = onSnapshot(
        collection(db, 'bookings'),
        (snapshot) => {
          state.bookings = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
          loaded.bookings = true;
          recompute();
        },
        (err) => fail('bookings collection scan', err),
      );

      unsubMuseum = onSnapshot(
        collection(db, 'museumTickets'),
        (snapshot) => {
          state.museumTickets = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
          loaded.museumTickets = true;
          recompute();
        },
        (err) => fail('museumTickets collection scan', err),
      );

      unsubRobot = onSnapshot(
        collection(db, 'robotTourTickets'),
        (snapshot) => {
          state.robotTourTickets = snapshot.docs.map((row) => ({ id: row.id, data: row.data() }));
          loaded.robotTourTickets = true;
          recompute();
        },
        (err) => fail('robotTourTickets collection scan', err),
      );
    };

    getDoc(doc(db, 'users', user.id))
      .then((snapshot) => {
        if (cancelled) return;
        const roleValue = snapshot.exists() ? String(snapshot.data().role ?? '') : '';
        const isAdminOrCashier = canAccess(roleValue);
        setIdentityDiagnostics({
          checked: true,
          userDocExists: snapshot.exists(),
          roleValue,
          isAdminOrCashier,
          readError: null,
        });
        if (!snapshot.exists()) {
          setError(`Admin user document is missing. Create users/${user.id} with role admin or cashier.`);
          setLoading(false);
          return;
        }
        if (!isAdminOrCashier) {
          setError(`Current role is: ${roleValue || 'missing'}. Required role: admin or cashier.`);
          setLoading(false);
          return;
        }
        startCollectionListeners();
      })
      .catch((err: FirestoreError) => {
        if (cancelled) return;
        logAdminPaymentError(`users/${user.id} preflight read`, err, user, profile?.role);
        setIdentityDiagnostics({
          checked: true,
          userDocExists: null,
          roleValue: '',
          isAdminOrCashier: false,
          readError:
            err.code === 'permission-denied'
              ? 'Permission denied while reading the current admin user document.'
              : 'Unable to read the current admin user document.',
        });
        setError(
          err.code === 'permission-denied'
            ? 'Firestore permission denied while reading users/{uid}. Confirm Firestore rules are deployed and this account can read its own user document.'
            : 'Unable to verify admin role. Please check connection and Firestore access.',
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
      unsubBookings?.();
      unsubMuseum?.();
      unsubRobot?.();
    };
  }, [profile?.role, projectId, user]);

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    const byLifecycle = bookings.filter((booking) => lifecycleFilterForRow(booking) === lifecycleFilter);
    if (!term) return byLifecycle;
    return byLifecycle.filter((booking) =>
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
  }, [bookings, lifecycleFilter, search]);

  const pendingSections = useMemo(() => {
    const sections: Record<PendingRecordCategory, PendingBooking[]> = {
      ready: [],
      expired: [],
      incomplete: [],
    };
    filteredBookings.forEach((booking) => {
      sections[booking.pending_category].push(booking);
    });
    return sections;
  }, [filteredBookings]);

  const confirmPayment = async (booking: PendingBooking) => {
    if (!user || confirmingId) return;
    if (booking.pending_category !== 'ready') {
      toast.error(
        booking.pending_category === 'expired'
          ? pendingCategoryMessages.expired
          : pendingCategoryMessages.incomplete,
      );
      return;
    }
    if (!hasValue(booking.booking_doc_id) && !hasValue(booking.museum_ticket_id) && !hasValue(booking.robot_tour_ticket_id)) {
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
      if (hasValue(booking.booking_doc_id)) batch.update(doc(db, 'bookings', booking.booking_doc_id), update);
      if (hasValue(booking.museum_ticket_id)) batch.update(doc(db, 'museumTickets', booking.museum_ticket_id), update);
      if (hasValue(booking.robot_tour_ticket_id)) batch.update(doc(db, 'robotTourTickets', booking.robot_tour_ticket_id), update);
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

  const renderPaymentCard = (booking: PendingBooking) => {
    const lifecycle = lifecycleFilterForRow(booking);
    const isPendingTab = lifecycleFilter === 'pending';
    const canConfirm = isPendingTab && booking.pending_category === 'ready';
    const disabledMessage =
      isPendingTab && booking.pending_category !== 'ready'
        ? pendingCategoryMessages[booking.pending_category]
        : null;

    return (
      <Card key={`${booking.booking_id}-${booking.id}`} className="rounded-2xl border-primary/20 p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="text-xs uppercase text-muted-foreground">Booking ID</div>
            <div className="break-all font-mono text-sm font-semibold">{booking.booking_id}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {booking.visitor_name} - {booking.visitor_email}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="border-0 bg-muted text-muted-foreground">
                source: {booking.source_debug}
              </Badge>
              {booking.sources.map((source) => (
                <Badge key={source} variant="secondary" className="border-0 bg-primary/10 text-primary">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
          {lifecycle === 'pending' ? (
            <Button
              onClick={() => confirmPayment(booking)}
              disabled={!canConfirm || confirmingId === booking.id}
              className="shrink-0"
            >
              {confirmingId === booking.id && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Payment
            </Button>
          ) : (
            <Badge variant="secondary" className="shrink-0 border-0 bg-muted text-muted-foreground">
              {lifecycleFilterLabels[lifecycle]}
            </Badge>
          )}
        </div>

        {disabledMessage && (
          <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-sm text-amber-700">
            {disabledMessage}
          </div>
        )}

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
    );
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

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 md:px-8">
        <Card className="rounded-2xl border-primary/20 p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="font-serif text-3xl">Access Denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in with an admin or cashier account to use counter payment confirmation.
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

      <AdminSetupDiagnosticsCard
        uid={user.id}
        email={user.email}
        profileRole={profile?.role ?? null}
        projectId={projectId}
        diagnostics={identityDiagnostics}
      />

      <div className="mb-5 flex max-w-xl items-center gap-2 rounded-2xl border border-primary/15 bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search booking, email, user, ticket ID, or QR value"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <Card className="mb-5 rounded-2xl border-primary/20 p-4 text-sm shadow-soft">
        <div className="font-semibold">Payment filter diagnostics</div>
        <p className="mt-1 text-muted-foreground">
          Accepted roles: admin, cashier. Pending payments: pay_at_counter, pending, unpaid,
          awaiting_payment. Open statuses: active, valid, confirmed, pending.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-5">
          <Info label="Bookings scanned" value={diagnostics.bookings} />
          <Info label="Museum tickets scanned" value={diagnostics.museumTickets} />
          <Info label="Robot tickets scanned" value={diagnostics.robotTourTickets} />
          <Info label="Pending-like records" value={diagnostics.pendingLikeRecords} />
          <Info label="Filtered pending-like" value={diagnostics.filteredPendingLikeRecords} />
        </div>
      </Card>

      <div className="mb-5 flex flex-wrap gap-2">
        {(Object.keys(lifecycleFilterLabels) as PaymentLifecycleFilter[]).map((value) => (
          <Button
            key={value}
            type="button"
            variant={lifecycleFilter === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLifecycleFilter(value)}
          >
            {lifecycleFilterLabels[value]}
          </Button>
        ))}
      </div>

      {loading && (
        <Card className="rounded-2xl border-primary/20 p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading payment records...
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
          <h2 className="font-serif text-2xl">
            No {lifecycleFilterLabels[lifecycleFilter].toLowerCase()} records found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Switch filters to review pending payment, confirmed, cancelled, or completed bookings.
          </p>
          {lifecycleFilter === 'pending' && diagnostics.filteredPendingLikeRecords > 0 && (
            <p className="mt-3 text-sm text-amber-600">
              Pending bookings exist but were filtered because of status, date, payment fields, or linked document shape.
              Check that payment_status is pay_at_counter/pending/unpaid/awaiting_payment,
              status is active/valid/confirmed/pending, and visit_date is not in the past.
            </p>
          )}
        </Card>
      )}

      {!loading && !error && filteredBookings.length > 0 && (
        <div className="space-y-4">
          {lifecycleFilter === 'pending' ? (
            (['ready', 'expired', 'incomplete'] as PendingRecordCategory[]).map((category) => (
              <PendingCategorySection
                key={category}
                title={`${pendingCategoryLabels[category]} (${pendingSections[category].length})`}
                rows={pendingSections[category]}
                renderRow={renderPaymentCard}
              />
            ))
          ) : (
            filteredBookings.map(renderPaymentCard)
          )}
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

function PendingCategorySection({
  title,
  rows,
  renderRow,
}: {
  title: string;
  rows: PendingBooking[];
  renderRow: (row: PendingBooking) => ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-2xl">{title}</h2>
        <div className="h-px flex-1 bg-primary/15" />
      </div>
      {rows.length > 0 ? (
        rows.map(renderRow)
      ) : (
        <Card className="rounded-2xl border-primary/10 p-4 text-sm text-muted-foreground">
          No records in this category.
        </Card>
      )}
    </section>
  );
}

function AdminSetupDiagnosticsCard({
  uid,
  email,
  profileRole,
  projectId,
  diagnostics,
}: {
  uid: string;
  email: string | null;
  profileRole: string | null;
  projectId: string;
  diagnostics: AdminIdentityDiagnostics;
}) {
  const roleValue = diagnostics.roleValue || 'missing';
  const docState = diagnostics.checked
    ? diagnostics.userDocExists === true
      ? 'exists'
      : diagnostics.userDocExists === false
        ? 'missing'
        : 'unknown'
    : 'checking';
  const roleMessage =
    diagnostics.checked && diagnostics.userDocExists === false
      ? `Admin user document is missing. Create users/${uid} with role admin or cashier.`
      : diagnostics.checked && !diagnostics.isAdminOrCashier
        ? `Current role is: ${roleValue}. Required role: admin or cashier.`
        : diagnostics.checked
          ? 'Role check passed. Collection scans can start.'
          : 'Checking users/{uid} before scanning payment collections.';

  return (
    <Card className="mb-5 rounded-2xl border-primary/20 p-4 text-sm shadow-soft">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="font-semibold">Admin account diagnostics</div>
          <p className="mt-1 text-muted-foreground">{roleMessage}</p>
          {diagnostics.readError && (
            <p className="mt-2 text-destructive">{diagnostics.readError}</p>
          )}
        </div>
        <Badge
          variant="secondary"
          className={
            diagnostics.isAdminOrCashier
              ? 'shrink-0 border-0 bg-primary/10 text-primary'
              : 'shrink-0 border-0 bg-destructive/10 text-destructive'
          }
        >
          {diagnostics.isAdminOrCashier ? 'admin/cashier verified' : 'admin/cashier not verified'}
        </Badge>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        <Info label="Firebase project ID" value={projectId} mono />
        <Info label="Current UID" value={uid} mono />
        <Info label="Current email" value={email ?? '-'} />
        <Info label="Auth profile role" value={profileRole ?? 'missing'} />
        <Info label={`users/${uid} document`} value={docState} />
        <Info label="users/{uid}.role" value={roleValue} />
        <Info label="Role accepted?" value={diagnostics.isAdminOrCashier ? 'yes' : 'no'} />
        <Info label="Rules deployment" value="deploy local rules if Console still denies reads" />
      </div>

      <div className="mt-4 rounded-xl bg-muted/45 p-3">
        <div className="text-xs font-semibold uppercase text-muted-foreground">Temporary admin setup note</div>
        <p className="mt-2 text-sm text-muted-foreground">
          To activate this admin account, create or update this document from Firebase Console or trusted admin tooling.
          Do not add an in-app self-service role assignment flow.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 text-xs">
{`users/${uid}
{
  role: "admin",
  email: "${email ?? ''}",
  uid: "${uid}"
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-xl bg-muted/45 p-3 text-sm text-muted-foreground">
        Local <span className="font-mono">firestore.rules</span> allow admin/cashier reads of
        <span className="font-mono"> bookings</span>, <span className="font-mono">museumTickets</span>, and
        <span className="font-mono"> robotTourTickets</span> through
        <span className="font-mono"> isAdminOrCashier()</span>, which checks
        <span className="font-mono"> users/{uid}.role in ["admin", "cashier"]</span>. If the Firebase Console rules
        are older than this local file, deploy with
        <span className="font-mono"> firebase deploy --only firestore:rules</span>.
      </div>
    </Card>
  );
}
