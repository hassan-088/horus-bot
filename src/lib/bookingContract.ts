import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
  type Firestore,
} from 'firebase/firestore';

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
  pace?: string;
  interests?: string[];
  selected_exhibits?: string[];
  accessibility?: string[];
  kids_mode?: boolean;
  photo_spots?: boolean;
  notes?: string;
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

export async function createBooking(db: Firestore, input: CreateBookingInput): Promise<CreatedBookingRefs> {
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
    preferred_language: input.preferred_language ?? null,
    pace: input.pace ?? null,
    interests: input.interests ?? [],
    selected_exhibits: input.selected_exhibits ?? [],
    accessibility: input.accessibility ?? [],
    kids_mode: input.kids_mode ?? false,
    photo_spots: input.photo_spots ?? false,
    notes: input.notes ?? null,
    total_price: input.robot_tour_price,
    currency: 'EGP',
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
