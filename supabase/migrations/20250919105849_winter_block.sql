/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `school_info` (jsonb, default empty object)
      - `student_data` (jsonb, default empty array)
      - `uploaded_file_name` (text, optional)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage their own projects

  3. Performance
    - Add index on user_id for faster queries
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  description text,
  school_info jsonb DEFAULT '{}'::jsonb,
  student_data jsonb DEFAULT '[]'::jsonb,
  uploaded_file_name text,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own projects"
ON public.projects FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
ON public.projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
ON public.projects FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
ON public.projects FOR DELETE
USING (auth.uid() = user_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS set_updated_at_on_projects ON public.projects;
CREATE TRIGGER set_updated_at_on_projects
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();