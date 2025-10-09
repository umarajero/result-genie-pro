/*
  # Create Email Notifications Table

  1. New Tables
    - `email_notifications`
      - `id` (uuid, primary key) - Unique identifier for each notification
      - `student_name` (text) - Name of the student
      - `student_email` (text) - Email address where notification was sent
      - `document_type` (text) - Type of document sent (certificate or statement)
      - `status` (text) - Status of the email (pending, sent, failed)
      - `error_message` (text, nullable) - Error message if sending failed
      - `sent_at` (timestamptz, nullable) - Timestamp when email was successfully sent
      - `created_at` (timestamptz) - Timestamp when record was created
      - `user_id` (uuid, nullable) - User who triggered the email
      
  2. Security
    - Enable RLS on `email_notifications` table
    - Add policy for authenticated users to view their own notifications
    - Add policy for authenticated users to insert notifications
*/

CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  student_email text NOT NULL,
  document_type text NOT NULL CHECK (document_type IN ('certificate', 'statement')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message text,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own email notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert email notifications"
  ON email_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE INDEX IF NOT EXISTS idx_email_notifications_user_id ON email_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_student_email ON email_notifications(student_email);
CREATE INDEX IF NOT EXISTS idx_email_notifications_created_at ON email_notifications(created_at DESC);