-- Create saved_works table for storing user's work
CREATE TABLE public.saved_works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.saved_works ENABLE ROW LEVEL SECURITY;

-- Create policies for users to manage their own saved works
CREATE POLICY "Users can view their own saved works"
  ON public.saved_works
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved works"
  ON public.saved_works
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved works"
  ON public.saved_works
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved works"
  ON public.saved_works
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for automatic updated_at timestamps
CREATE TRIGGER set_updated_at_on_saved_works
  BEFORE UPDATE ON public.saved_works
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_saved_works_user_id ON public.saved_works(user_id);