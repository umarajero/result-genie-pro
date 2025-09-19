/*
  # Create Certificates Table

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `student_id` (uuid, foreign key to students)
      - `template_type` (text, required)
      - `data` (jsonb, for certificate data)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `certificates` table
    - Add policies for authenticated users to manage certificates in their own projects

  3. Performance
    - Add indexes on project_id and student_id for faster queries
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  template_type text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (certificates belong to projects, which belong to users)
CREATE POLICY "Users can view certificates in their own projects"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = certificates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create certificates in their own projects"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = certificates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update certificates in their own projects"
  ON certificates
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = certificates.project_id 
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = certificates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete certificates in their own projects"
  ON certificates
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = certificates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_certificates_project_id ON certificates(project_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student_id ON certificates(student_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();