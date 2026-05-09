import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserTicket {
  id: string;
  user_id: string;
  museum_name: string;
  visit_date: string;
  visit_time?: string | null;
  ticket_types: Record<string, number>;
  total_tickets: number;
  total_price: number;
  currency: string;
  payment_method: string;
  status: string;
  qr_value: string;
  created_at: string;
  tour_duration?: number | null;
  visitor_type?: string | null;
  interests?: string[] | null;
  accessibility?: string[] | null;
  preferred_language?: string | null;
  notes?: string | null;
  robot_tour_ticket_id?: string | null;
}

export interface NewTicketInput {
  museum_name?: string;
  visit_date: string;
  visit_time?: string;
  ticket_types: Record<string, number>;
  total_tickets: number;
  total_price: number;
  currency?: string;
  payment_method: string;
  tour_duration?: number;
  visitor_type?: string;
  interests?: string[];
  accessibility?: string[];
  preferred_language?: string;
  notes?: string;
}

function makeQrValue() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const time = Date.now().toString(36).toUpperCase().slice(-4);
  return `HRSB-${time}-${rand}`;
}

function tsToIso(v: unknown): string {
  if (!v) return new Date().toISOString();
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === 'object' && v && 'toDate' in v) return (v as Timestamp).toDate().toISOString();
  return String(v);
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
      const q = query(
        collection(db, 'museumTickets'),
        where('userId', '==', user.id),
        orderBy('visit_date', 'asc'),
      );
      const snap = await getDocs(q);
      const rows: UserTicket[] = snap.docs.map((d) => {
        const x = d.data() as Record<string, unknown>;
        return {
          id: d.id,
          user_id: (x.userId as string) ?? user.id,
          museum_name: (x.museum_name as string) ?? 'The Egyptian Museum',
          visit_date: (x.visit_date as string) ?? '',
          visit_time: (x.visit_time as string) ?? null,
          ticket_types: (x.ticket_types as Record<string, number>) ?? {},
          total_tickets: (x.total_tickets as number) ?? 0,
          total_price: (x.total_price as number) ?? 0,
          currency: (x.currency as string) ?? 'EGP',
          payment_method: (x.payment_method as string) ?? '',
          status: (x.status as string) ?? 'active',
          qr_value: (x.qr_value as string) ?? '',
          created_at: tsToIso(x.created_at),
          tour_duration: (x.tour_duration as number) ?? null,
          visitor_type: (x.visitor_type as string) ?? null,
          interests: (x.interests as string[]) ?? null,
          accessibility: (x.accessibility as string[]) ?? null,
          preferred_language: (x.preferred_language as string) ?? null,
          notes: (x.notes as string) ?? null,
          robot_tour_ticket_id: (x.robot_tour_ticket_id as string) ?? null,
        };
      });
      setTickets(rows);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTicket = useCallback(
    async (input: NewTicketInput): Promise<{ ticket: UserTicket | null; error: string | null }> => {
      if (!user) return { ticket: null, error: 'not-authenticated' };
      const qr = makeQrValue();
      try {
        // 1) Robot tour ticket (created first so we can reference it).
        const robotDoc = await addDoc(collection(db, 'robotTourTickets'), {
          userId: user.id,
          tour_duration: input.tour_duration ?? null,
          visitor_type: input.visitor_type ?? null,
          interests: input.interests ?? [],
          accessibility: input.accessibility ?? [],
          preferred_language: input.preferred_language ?? null,
          notes: input.notes ?? null,
          status: 'pending', // becomes "active" once robot QR is paired in-museum
          visit_date: input.visit_date,
          visit_time: input.visit_time ?? null,
          created_at: serverTimestamp(),
        });

        // 2) Museum entry ticket (the one shown in "My Tickets" lists).
        const museumDoc = await addDoc(collection(db, 'museumTickets'), {
          userId: user.id,
          museum_name: input.museum_name ?? 'The Egyptian Museum',
          visit_date: input.visit_date,
          visit_time: input.visit_time ?? null,
          ticket_types: input.ticket_types,
          total_tickets: input.total_tickets,
          total_price: input.total_price,
          currency: input.currency ?? 'EGP',
          payment_method: input.payment_method,
          status: 'active',
          qr_value: qr,
          // Denormalised tour fields so a single doc can render the full card.
          tour_duration: input.tour_duration ?? null,
          visitor_type: input.visitor_type ?? null,
          interests: input.interests ?? null,
          accessibility: input.accessibility ?? null,
          preferred_language: input.preferred_language ?? null,
          notes: input.notes ?? null,
          robot_tour_ticket_id: robotDoc.id,
          created_at: serverTimestamp(),
        });

        const created: UserTicket = {
          id: museumDoc.id,
          user_id: user.id,
          museum_name: input.museum_name ?? 'The Egyptian Museum',
          visit_date: input.visit_date,
          visit_time: input.visit_time ?? null,
          ticket_types: input.ticket_types,
          total_tickets: input.total_tickets,
          total_price: input.total_price,
          currency: input.currency ?? 'EGP',
          payment_method: input.payment_method,
          status: 'active',
          qr_value: qr,
          created_at: new Date().toISOString(),
          tour_duration: input.tour_duration ?? null,
          visitor_type: input.visitor_type ?? null,
          interests: input.interests ?? null,
          accessibility: input.accessibility ?? null,
          preferred_language: input.preferred_language ?? null,
          notes: input.notes ?? null,
          robot_tour_ticket_id: robotDoc.id,
        };
        setTickets((prev) => [...prev, created]);
        return { ticket: created, error: null };
      } catch (e) {
        return { ticket: null, error: (e as Error).message };
      }
    },
    [user],
  );

  return { tickets, loading, error, refresh, createTicket };
}
