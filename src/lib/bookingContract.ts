import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
  type Firestore,
} from 'firebase/firestore';
import { MAX_VISITORS_PER_BOOKING } from '@/lib/pricing';
import { normalizeTourNarrationLanguage } from '@/lib/tourLanguages';

export type BookingSource = 'website' | 'mobile_app';
export type TourType = 'standard' | 'personalized';

export interface CreateBookingInput {
  booking_source: BookingSource;
  userId: string;
  museum_name?: string;
  visit_date: string;
  visit_time?: string;
  ticket_types: Record<string, number>;
  visitor_count: number;
  museum_entry_total: number;
  robot_tour_price: number;
  tour_type?: TourType;
  tour_duration_min?: number;
  preferred_language?: string;
  preferred_language_other?: string;
  pace?: string;
  interests?: string[];
  selected_exhibits?: string[];
  accessibility?: string[];
  photo_spots?: boolean;
  notes?: string;
  route_id?: string;
  route_title_en?: string;
  route_title_ar?: string;
}

export function maxExhibitsForDuration(durationMin: number | null | undefined): number {
  const duration = Number(durationMin ?? 45);
  if (duration <= 30) return 4;
  if (duration <= 45) return 6;
  if (duration <= 50) return 7;
  if (duration <= 60) return 8;
  return 12;
}

export interface CreatedBookingRefs {
  bookingId: string;
  museumTicketId: string;
  robotTourTicketId: string;
  qrValue: string;
  totalPrice: number;
}

export function makeBookingQrValue(bookingId: string) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HRSB-${bookingId.slice(-6).toUpperCase()}-${rand}`;
}

export function visitStartsAt(visitDate: string, visitTime?: string | null): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(visitDate.trim());
  if (!dateMatch) return null;
  const parsedTime = parseTimeSlot(visitTime ?? '');
  if (!parsedTime) return null;
  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    parsedTime.hour,
    parsedTime.minute,
  );
}

export function isFutureVisitTime(visitDate: string, visitTime?: string | null, now = new Date()): boolean {
  const startsAt = visitStartsAt(visitDate, visitTime);
  return startsAt !== null && startsAt.getTime() > now.getTime();
}

function parseTimeSlot(value: string): { hour: number; minute: number } | null {
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

export async function createBooking(db: Firestore, input: CreateBookingInput): Promise<CreatedBookingRefs> {
  if (input.visitor_count < 1 || input.visitor_count > MAX_VISITORS_PER_BOOKING) {
    throw new Error(`visitor-count-must-be-1-to-${MAX_VISITORS_PER_BOOKING}`);
  }
  if (!isFutureVisitTime(input.visit_date, input.visit_time)) {
    throw new Error('visit-time-must-be-future');
  }
  if ((input.tour_type ?? 'standard') === 'standard') {
    if (!input.route_id?.trim() || !input.selected_exhibits?.length) {
      throw new Error('standard-route-required');
    }
  }
  if (input.tour_type === 'personalized') {
    if (!input.selected_exhibits?.length) {
      throw new Error('personalized-exhibit-required');
    }
  }
  const narrationLanguage = normalizeTourNarrationLanguage(input.preferred_language);
  if (!narrationLanguage) {
    throw new Error('unsupported-tour-language');
  }
  if (narrationLanguage === 'other' && !input.preferred_language_other?.trim()) {
    throw new Error('custom-tour-language-required');
  }
  const selectedExhibitCount = input.selected_exhibits?.length ?? 0;
  const maxSelectedExhibits = maxExhibitsForDuration(input.tour_duration_min);
  if (selectedExhibitCount > maxSelectedExhibits) {
    throw new Error(`too-many-exhibits-for-duration-${maxSelectedExhibits}`);
  }

  const bookingRef = doc(collection(db, 'bookings'));
  const museumRef = doc(collection(db, 'museumTickets'));
  const robotRef = doc(collection(db, 'robotTourTickets'));
  const bookingId = bookingRef.id;
  const museumTicketId = museumRef.id;
  const robotTourTicketId = robotRef.id;
  const qrValue = makeBookingQrValue(bookingId);
  const museumName = input.museum_name ?? 'The Egyptian Museum';
  const totalPrice = input.museum_entry_total + input.robot_tour_price;
  const now = serverTimestamp();

  const batch = writeBatch(db);
  batch.set(bookingRef, {
    booking_id: bookingId,
    booking_source: input.booking_source,
    userId: input.userId,
    museum_ticket_id: museumTicketId,
    robot_tour_ticket_id: robotTourTicketId,
    museum_name: museumName,
    visit_date: input.visit_date,
    visit_time: input.visit_time ?? null,
    visitor_count: input.visitor_count,
    ticket_types: input.ticket_types,
    museum_entry_total: input.museum_entry_total,
    robot_tour_price: input.robot_tour_price,
    total_price: totalPrice,
    currency: 'EGP',
    payment_method: 'cash',
    payment_status: 'pay_at_counter',
    status: 'active',
    created_at: now,
    updated_at: now,
    cancelled_at: null,
  });

  batch.set(museumRef, {
    ticketId: museumTicketId,
    userId: input.userId,
    booking_id: bookingId,
    booking_source: input.booking_source,
    robot_tour_ticket_id: robotTourTicketId,
    museum_name: museumName,
    visit_date: input.visit_date,
    visit_time: input.visit_time ?? null,
    ticket_types: input.ticket_types,
    total_tickets: input.visitor_count,
    total_price: input.museum_entry_total,
    currency: 'EGP',
    payment_method: 'cash',
    payment_status: 'pay_at_counter',
    status: 'active',
    qr_value: qrValue,
    created_at: now,
    updated_at: now,
    cancelled_at: null,
  });

  batch.set(robotRef, {
    tourTicketId: robotTourTicketId,
    userId: input.userId,
    booking_id: bookingId,
    booking_source: input.booking_source,
    museum_ticket_id: museumTicketId,
    tour_type: input.tour_type ?? 'standard',
    visit_date: input.visit_date,
    visit_time: input.visit_time ?? null,
    tour_duration_min: input.tour_duration_min ?? null,
    preferred_language: narrationLanguage,
    preferred_language_other: narrationLanguage === 'other' ? input.preferred_language_other?.trim() ?? null : null,
    pace: input.pace ?? null,
    interests: input.interests ?? [],
    selected_exhibits: input.selected_exhibits ?? [],
    accessibility: input.accessibility ?? [],
    photo_spots: input.photo_spots ?? false,
    notes: input.notes ?? null,
    route_id: input.route_id ?? null,
    route_title_en: input.route_title_en ?? null,
    route_title_ar: input.route_title_ar ?? null,
    total_price: input.robot_tour_price,
    currency: 'EGP',
    payment_method: 'cash',
    payment_status: 'pay_at_counter',
    status: 'active',
    paired_robot_id: null,
    session_id: null,
    created_at: now,
    updated_at: now,
    cancelled_at: null,
  });

  await batch.commit();

  return {
    bookingId,
    museumTicketId,
    robotTourTicketId,
    qrValue,
    totalPrice,
  };
}
