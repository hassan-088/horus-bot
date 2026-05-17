import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  createBooking as createBookingDocuments,
  type BookingSource,
  type CreateBookingInput as SharedCreateBookingInput,
  type TourType,
} from '@/lib/bookingContract';

export type TicketStatus =
  | 'active'
  | 'cancelled'
  | 'completed'
  | 'expired'
  | 'paired'
  | 'in_progress'
  | 'pending'
  | 'used';

export interface UserTicket {
  id: string;
  booking_id: string;
  booking_source: BookingSource;
  user_id: string;
  museum_ticket_id: string;
  robot_tour_ticket_id: string;
  museum_name: string;
  visit_date: string;
  visit_time?: string | null;
  ticket_types: Record<string, number>;
  total_tickets: number;
  visitor_count: number;
  museum_entry_total: number;
  robot_tour_price: number;
  total_price: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  status: TicketStatus;
  museum_status: TicketStatus;
  robot_status: TicketStatus;
  qr_value: string;
  created_at: string;
  tour_type?: TourType | null;
  tour_duration?: number | null;
  pace?: string | null;
  interests?: string[] | null;
  selected_exhibits?: string[] | null;
  accessibility?: string[] | null;
  preferred_language?: string | null;
  kids_mode?: boolean | null;
  photo_spots?: boolean | null;
  notes?: string | null;
  route_id?: string | null;
  route_title_en?: string | null;
  route_title_ar?: string | null;
  paired_robot_id?: string | null;
  session_id?: string | null;
}

export interface CreateBookingInput extends Omit<SharedCreateBookingInput, 'userId' | 'booking_source'> {
  booking_source?: BookingSource;
}

function tsToIso(v: unknown): string {
  if (!v) return new Date().toISOString();
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === 'object' && v && 'toDate' in v) return (v as Timestamp).toDate().toISOString();
  return String(v);
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function normalizeStatus(value: unknown): TicketStatus {
  const raw = String(value ?? '').trim().toLowerCase();
  switch (raw) {
    case 'cancelled':
    case 'completed':
    case 'expired':
    case 'paired':
    case 'in_progress':
    case 'pending':
    case 'used':
      return raw;
    default:
      return 'active';
  }
}

function isLegacyBookingId(value: unknown): boolean {
  return String(value ?? '').trim().toUpperCase().startsWith('ORD-');
}

function toUserTicket(
  bookingId: string,
  booking: Record<string, unknown>,
  museumTicket: Record<string, unknown>,
  robotTourTicket: Record<string, unknown>,
): UserTicket {
  const museumTicketId = (booking.museum_ticket_id as string) ?? (museumTicket?.ticketId as string) ?? '';
  const robotTourTicketId = (booking.robot_tour_ticket_id as string) ?? (robotTourTicket?.tourTicketId as string) ?? '';
  const museumTotal = (booking.museum_entry_total as number) ?? (museumTicket?.total_price as number) ?? 0;
  const robotTotal = (booking.robot_tour_price as number) ?? (robotTourTicket?.total_price as number) ?? 0;

  return {
    id: bookingId,
    booking_id: (booking.booking_id as string) ?? bookingId,
    booking_source: ((booking.booking_source as BookingSource) ?? 'website'),
    user_id: (booking.userId as string) ?? '',
    museum_ticket_id: museumTicketId,
    robot_tour_ticket_id: robotTourTicketId,
    museum_name: (booking.museum_name as string) ?? (museumTicket?.museum_name as string) ?? 'The Egyptian Museum',
    visit_date: (booking.visit_date as string) ?? (museumTicket?.visit_date as string) ?? '',
    visit_time: (booking.visit_time as string) ?? (museumTicket?.visit_time as string) ?? null,
    ticket_types: (booking.ticket_types as Record<string, number>) ?? (museumTicket?.ticket_types as Record<string, number>) ?? {},
    total_tickets: (museumTicket?.total_tickets as number) ?? (booking.visitor_count as number) ?? 0,
    visitor_count: (booking.visitor_count as number) ?? (museumTicket?.total_tickets as number) ?? 0,
    museum_entry_total: museumTotal,
    robot_tour_price: robotTotal,
    total_price: (booking.total_price as number) ?? museumTotal + robotTotal,
    currency: (booking.currency as string) ?? 'EGP',
    payment_method: (booking.payment_method as string) ?? 'cash',
    payment_status: (booking.payment_status as string) ?? 'pay_at_counter',
    status: normalizeStatus(booking.status),
    museum_status: normalizeStatus(museumTicket.status),
    robot_status: normalizeStatus(robotTourTicket.status),
    qr_value: (museumTicket?.qr_value as string) ?? '',
    created_at: tsToIso(booking.created_at ?? museumTicket?.created_at),
    tour_type: (robotTourTicket?.tour_type as TourType) ?? null,
    tour_duration: (robotTourTicket?.tour_duration_min as number) ?? null,
    pace: (robotTourTicket?.pace as string) ?? null,
    interests: asStringArray(robotTourTicket?.interests),
    selected_exhibits: asStringArray(robotTourTicket?.selected_exhibits),
    accessibility: asStringArray(robotTourTicket?.accessibility),
    preferred_language: (robotTourTicket?.preferred_language as string) ?? null,
    kids_mode: (robotTourTicket?.kids_mode as boolean) ?? null,
    photo_spots: (robotTourTicket?.photo_spots as boolean) ?? null,
    notes: (robotTourTicket?.notes as string) ?? null,
    route_id: (robotTourTicket?.route_id as string) ?? null,
    route_title_en: (robotTourTicket?.route_title_en as string) ?? null,
    route_title_ar: (robotTourTicket?.route_title_ar as string) ?? null,
    paired_robot_id: (robotTourTicket?.paired_robot_id as string | null) ?? null,
    session_id: (robotTourTicket?.session_id as string | null) ?? null,
  };
}

export function useUserTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setTickets([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'bookings'), where('userId', '==', user.id));
      const snap = await getDocs(q);
      const rows = await Promise.all(snap.docs.map(async (bookingDoc) => {
        const booking = bookingDoc.data() as Record<string, unknown>;
        const bookingId = (booking.booking_id as string | undefined) ?? bookingDoc.id;
        if (isLegacyBookingId(bookingId)) return null;
        const museumTicketId = booking.museum_ticket_id as string | undefined;
        const robotTourTicketId = booking.robot_tour_ticket_id as string | undefined;
        if (!museumTicketId || !robotTourTicketId) return null;
        const [museumSnap, robotSnap] = await Promise.all([
          getDoc(doc(db, 'museumTickets', museumTicketId)),
          getDoc(doc(db, 'robotTourTickets', robotTourTicketId)),
        ]);
        if (!museumSnap.exists() || !robotSnap.exists()) return null;
        return toUserTicket(
          bookingDoc.id,
          booking,
          museumSnap.data() as Record<string, unknown>,
          robotSnap.data() as Record<string, unknown>,
        );
      }));
      const completeRows = rows.filter((row): row is UserTicket => row !== null);
      completeRows.sort((a, b) => (a.visit_date || '').localeCompare(b.visit_date || ''));
      setTickets(completeRows);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createBooking = useCallback(
    async (input: CreateBookingInput): Promise<{ ticket: UserTicket | null; error: string | null }> => {
      if (!user) return { ticket: null, error: 'not-authenticated' };

      const museumName = input.museum_name ?? 'The Egyptian Museum';
      const museumEntryTotal = input.museum_entry_total;
      const robotTourPrice = input.robot_tour_price;
      const totalPrice = museumEntryTotal + robotTourPrice;
      const source: BookingSource = input.booking_source ?? 'website';

      try {
        const createdRefs = await createBookingDocuments(db, {
          ...input,
          booking_source: source,
          userId: user.id,
          museum_name: museumName,
        });

        const created = toUserTicket(
          createdRefs.bookingId,
          {
            booking_id: createdRefs.bookingId,
            booking_source: source,
            userId: user.id,
            museum_ticket_id: createdRefs.museumTicketId,
            robot_tour_ticket_id: createdRefs.robotTourTicketId,
            museum_name: museumName,
            visit_date: input.visit_date,
            visit_time: input.visit_time ?? null,
            visitor_count: input.visitor_count,
            ticket_types: input.ticket_types,
            museum_entry_total: museumEntryTotal,
            robot_tour_price: robotTourPrice,
            total_price: totalPrice,
            currency: 'EGP',
            payment_method: 'cash',
            payment_status: 'pay_at_counter',
            status: 'active',
            museum_status: 'active',
            robot_status: 'active',
            created_at: new Date().toISOString(),
          },
          {
            ticketId: createdRefs.museumTicketId,
            total_tickets: input.visitor_count,
            total_price: museumEntryTotal,
            qr_value: createdRefs.qrValue,
            status: 'active',
          },
          {
            tourTicketId: createdRefs.robotTourTicketId,
            tour_type: input.tour_type ?? 'standard',
            tour_duration_min: input.tour_duration_min ?? null,
            preferred_language: input.preferred_language ?? null,
            pace: input.pace ?? null,
            interests: input.interests ?? [],
            selected_exhibits: input.selected_exhibits ?? [],
            accessibility: input.accessibility ?? [],
            kids_mode: input.kids_mode ?? false,
            photo_spots: input.photo_spots ?? false,
            notes: input.notes ?? null,
            route_id: input.route_id ?? null,
            route_title_en: input.route_title_en ?? null,
            route_title_ar: input.route_title_ar ?? null,
            paired_robot_id: null,
            session_id: null,
            total_price: robotTourPrice,
            status: 'active',
          },
        );
        setTickets((prev) => [...prev, created]);
        return { ticket: created, error: null };
      } catch (e) {
        return { ticket: null, error: (e as Error).message };
      }
    },
    [user],
  );

  const cancelTicket = useCallback(
    async (bookingId: string): Promise<{ error: string | null }> => {
      if (!user) return { error: 'not-authenticated' };
      try {
        const tk = tickets.find((t) => t.booking_id === bookingId || t.id === bookingId);
        if (!tk) return { error: 'booking-not-found' };
        if (!canCancelUserTicket(tk)) {
          return {
            error: isWithinCancellationDeadline(tk)
              ? 'Cancellation is available up to 24 hours before your visit.'
              : 'booking-not-cancellable',
          };
        }
        const batch = writeBatch(db);
        const update = {
          status: 'cancelled',
          updated_at: serverTimestamp(),
          cancelled_at: serverTimestamp(),
        };
        batch.update(doc(db, 'bookings', tk.booking_id), update);
        batch.update(doc(db, 'museumTickets', tk.museum_ticket_id), update);
        batch.update(doc(db, 'robotTourTickets', tk.robot_tour_ticket_id), update);
        await batch.commit();
        setTickets((prev) =>
          prev.map((t) => (t.booking_id === tk.booking_id
            ? { ...t, status: 'cancelled', museum_status: 'cancelled', robot_status: 'cancelled' }
            : t)),
        );
        return { error: null };
      } catch (e) {
        return { error: (e as Error).message };
      }
    },
    [user, tickets],
  );

  return { tickets, loading, error, refresh, createBooking, cancelTicket };
}

export function canCancelUserTicket(ticket: UserTicket): boolean {
  if (ticket.status !== 'active') return false;
  if (['used', 'cancelled', 'expired'].includes(ticket.museum_status)) return false;
  if (['paired', 'in_progress', 'completed', 'cancelled', 'expired'].includes(ticket.robot_status)) {
    return false;
  }
  return !isWithinCancellationDeadline(ticket);
}

export function isWithinCancellationDeadline(ticket: UserTicket): boolean {
  const startsAt = visitStartsAt(ticket.visit_date, ticket.visit_time);
  if (!startsAt) return true;
  return startsAt.getTime() - Date.now() <= 24 * 60 * 60 * 1000;
}

function visitStartsAt(date: string, time?: string | null): Date | null {
  if (!date) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  if (!match) return null;
  const parsedTime = parseTime(time ?? '');
  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    parsedTime?.hour ?? 0,
    parsedTime?.minute ?? 0,
  );
}

function parseTime(value: string): { hour: number; minute: number } | null {
  const start = value.trim().split(' - ')[0]?.trim();
  if (!start) return null;
  const amPm = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(start);
  if (amPm) {
    let hour = Number(amPm[1]);
    const minute = Number(amPm[2]);
    const period = amPm[3].toUpperCase();
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return { hour, minute };
  }
  const match = /^(\d{1,2}):(\d{2})/.exec(start);
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}
