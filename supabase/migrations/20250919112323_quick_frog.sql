/*
  # Create schools table for ResultGenie

  1. New Tables
    - `schools`
      - `id` (uuid, primary key)
      - `name` (text) - school name
      - `address` (text) - school address
      - `contact_info` (jsonb) - phone, email, website
      - `logo_url` (text) - school logo URL
      - `settings` (jsonb) - school-specific settings
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid) - reference to user who created

  2. Security
    - Enable RLS on `schools` table
    - Add policies for school management
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  contact_info jsonb DEFAULT '{}',
  logo_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can read schools they belong to" ON schools;
CREATE POLICY "Users can read schools they belong to"
  ON schools
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    ) OR created_by = auth.uid()
  );

DROP POLICY IF EXISTS "School creators can manage schools" ON schools;
CREATE POLICY "School creators can manage schools"
  ON schools
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can create schools" ON schools;
CREATE POLICY "Users can create schools"
  ON schools
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_schools_created_by ON schools(created_by);
CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name);

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_schools_updated_at ON schools;
CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();