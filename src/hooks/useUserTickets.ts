import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('visit_date', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setTickets((data ?? []) as unknown as UserTicket[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTicket = useCallback(
    async (input: NewTicketInput): Promise<{ ticket: UserTicket | null; error: string | null }> => {
      if (!user) return { ticket: null, error: 'not-authenticated' };
      const row = {
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
        qr_value: makeQrValue(),
        tour_duration: input.tour_duration ?? null,
        visitor_type: input.visitor_type ?? null,
        interests: input.interests ?? null,
        accessibility: input.accessibility ?? null,
        preferred_language: input.preferred_language ?? null,
        notes: input.notes ?? null,
      };
      const { data, error } = await supabase
        .from('tickets')
        .insert(row)
        .select()
        .single();
      if (error) return { ticket: null, error: error.message };
      const created = data as unknown as UserTicket;
      setTickets((prev) => [...prev, created]);
      return { ticket: created, error: null };
    },
    [user],
  );

  return { tickets, loading, error, refresh, createTicket };
}
