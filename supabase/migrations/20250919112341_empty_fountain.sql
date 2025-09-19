/*
  # Create certificates table for ResultGenie

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `project_id` (uuid) - reference to project
      - `student_name` (text) - student name
      - `student_class` (text) - student class
      - `certificate_type` (text) - type of certificate
      - `template_id` (text) - template used
      - `certificate_data` (jsonb) - certificate content
      - `file_url` (text) - generated certificate URL
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `certificates` table
    - Add policies for certificate management
*/

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  student_class text,
  certificate_type text DEFAULT 'achievement' CHECK (certificate_type IN ('achievement', 'completion', 'excellence', 'participation')),
  template_id text,
  certificate_data jsonb DEFAULT '{}',
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can read certificates from own projects" ON certificates;
CREATE POLICY "Users can read certificates from own projects"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create certificates for own projects" ON certificates;
CREATE POLICY "Users can create certificates for own projects"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update certificates from own projects" ON certificates;
CREATE POLICY "Users can update certificates from own projects"
  ON certificates
  FOR UPDATE
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete certificates from own projects" ON certificates;
CREATE POLICY "Users can delete certificates from own projects"
  ON certificates
  FOR DELETE
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_certificates_project_id ON certificates(project_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student_name ON certificates(student_name);
CREATE INDEX IF NOT EXISTS idx_certificates_type ON certificates(certificate_type);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at);

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();