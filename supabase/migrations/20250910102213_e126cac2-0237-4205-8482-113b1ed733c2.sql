-- Fix security definer view issue
-- Drop and recreate the view with explicit SECURITY INVOKER to ensure it runs with the permissions of the querying user

DROP VIEW IF EXISTS public.experts_public;

CREATE VIEW public.experts_public 
WITH (security_invoker = true) AS
SELECT 
    id,
    hourly_rate,
    rating,
    total_reviews,
    experience,
    education,
    certifications,
    bio,
    availability,
    full_name,
    location,
    specialization,
    created_at
FROM public.experts
WHERE status = 'approved';

-- Re-grant permissions to the view
GRANT SELECT ON public.experts_public TO anon;
GRANT SELECT ON public.experts_public TO authenticated;