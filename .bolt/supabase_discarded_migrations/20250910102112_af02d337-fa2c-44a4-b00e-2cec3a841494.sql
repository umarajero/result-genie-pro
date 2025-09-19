-- Fix security issue: Remove public access to sensitive expert information

-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can read approved experts" ON public.experts;

-- Create a view for public expert information that excludes sensitive data (email, phone)
CREATE OR REPLACE VIEW public.experts_public AS
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
    location, -- Location might be okay for public (city/state level)
    specialization,
    created_at
FROM public.experts
WHERE status = 'approved';

-- Create restrictive policies for the main experts table
-- Only allow authenticated users to read approved experts with full data
CREATE POLICY "Authenticated users can read approved experts" 
ON public.experts 
FOR SELECT 
TO authenticated
USING (status = 'approved'::text);

-- Allow experts to read their own full data regardless of status
CREATE POLICY "Experts can read their own data" 
ON public.experts 
FOR SELECT 
USING (auth.uid() = user_id);

-- Grant public access to the view (this is safe as it excludes sensitive data)
GRANT SELECT ON public.experts_public TO anon;
GRANT SELECT ON public.experts_public TO authenticated;