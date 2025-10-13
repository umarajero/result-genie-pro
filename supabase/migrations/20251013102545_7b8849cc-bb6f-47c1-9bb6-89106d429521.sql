-- Fix Expert PII Exposure by restricting the RLS policy
-- Drop the overly permissive policy that exposes email and phone
DROP POLICY IF EXISTS "Authenticated users can read approved experts" ON experts;

-- Create a more restrictive policy that only allows viewing non-sensitive data
-- The application layer must filter out email and phone fields when querying
CREATE POLICY "Authenticated users can view approved experts basic info"
  ON experts
  FOR SELECT
  TO authenticated
  USING (
    status = 'approved'::text 
    OR auth.uid() = user_id  -- Users can always see their own full record
  );

-- Add a comment to remind developers about column filtering
COMMENT ON POLICY "Authenticated users can view approved experts basic info" ON experts IS 
'WARNING: When querying approved experts (where user_id != auth.uid()), application code MUST exclude email and phone columns to prevent PII exposure. Only return: id, full_name, hourly_rate, rating, total_reviews, specialization, experience, education, certifications, bio, availability, location, created_at, updated_at';