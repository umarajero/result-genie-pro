-- Fix security issue: Remove public access to sensitive expert information

-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can read approved experts" ON public.experts;

-- Create a new policy that only allows public access to non-sensitive information
-- This policy will be used by creating a view or by limiting column access
CREATE POLICY "Public can read approved experts basic info only" 
ON public.experts 
FOR SELECT 
USING (status = 'approved'::text);

-- Create a view for public expert information that excludes sensitive data
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

-- Enable RLS on the view
ALTER VIEW public.experts_public SET (security_barrier = true);

-- Create a policy for the public view
CREATE POLICY "Anyone can read public expert view"
ON public.experts_public
FOR SELECT
USING (true);

-- Update the main experts table policy to be more restrictive for direct table access
DROP POLICY IF EXISTS "Public can read approved experts basic info only" ON public.experts;

-- Only allow direct table access to authenticated users and the expert themselves
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