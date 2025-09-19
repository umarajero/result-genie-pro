/*
  # Add foreign key constraints and update users table

  1. Updates
    - Add foreign key constraint from users.school_id to schools.id
    - Update users table structure

  2. Security
    - Update policies to work with new relationships
*/

-- Add foreign key constraint to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'users_school_id_fkey'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_school_id_fkey 
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Update users policies to include school-based access
DROP POLICY IF EXISTS "School admins can read school users" ON users;
CREATE POLICY "School admins can read school users"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT id FROM schools WHERE created_by = auth.uid()
    )
  );

-- Create index for the foreign key
CREATE INDEX IF NOT EXISTS idx_users_school_id_fkey ON users(school_id);