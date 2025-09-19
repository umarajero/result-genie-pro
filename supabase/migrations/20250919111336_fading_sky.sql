/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `user_id` (uuid, foreign key to auth.users)
      - `school_info` (jsonb, default empty object)
      - `student_data` (jsonb, default empty array)
      - `uploaded_file_name` (text, optional)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage their own data
    - Users can only access projects they own

  3. Performance
    - Index on user_id for efficient queries
    - Trigger for auto-updating updated_at timestamp
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_info jsonb DEFAULT '{}'::jsonb,
  student_data jsonb DEFAULT '[]'::jsonb,
  uploaded_file_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at_on_projects
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();