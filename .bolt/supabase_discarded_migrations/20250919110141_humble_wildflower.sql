/*
  # Create Students Table

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `name` (text, required)
      - `email` (text, optional)
      - `parent_email` (text, optional)
      - `data` (jsonb, for flexible student data)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to manage students in their own projects

  3. Performance
    - Add index on project_id for faster queries
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  parent_email text,
  data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (students belong to projects, which belong to users)
CREATE POLICY "Users can view students in their own projects"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = students.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create students in their own projects"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = students.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update students in their own projects"
  ON students
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = students.project_id 
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = students.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete students in their own projects"
  ON students
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = students.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_students_project_id ON students(project_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();