ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS visit_time text,
  ADD COLUMN IF NOT EXISTS tour_duration integer,
  ADD COLUMN IF NOT EXISTS visitor_type text,
  ADD COLUMN IF NOT EXISTS interests text[],
  ADD COLUMN IF NOT EXISTS accessibility text[],
  ADD COLUMN IF NOT EXISTS preferred_language text,
  ADD COLUMN IF NOT EXISTS notes text;