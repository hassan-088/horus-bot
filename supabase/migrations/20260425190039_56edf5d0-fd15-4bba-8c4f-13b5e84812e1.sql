
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  museum_name TEXT NOT NULL DEFAULT 'The Egyptian Museum',
  visit_date DATE NOT NULL,
  ticket_types JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_tickets INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  qr_value TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_user_id ON public.tickets(user_id);
CREATE INDEX idx_tickets_visit_date ON public.tickets(visit_date);

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets"
ON public.tickets
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets"
ON public.tickets
FOR INSERT
WITH CHECK (auth.uid() = user_id);
