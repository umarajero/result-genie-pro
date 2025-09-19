@@ .. @@
 ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
 
+-- Drop existing policies if they exist
+DROP POLICY IF EXISTS "Users can create their own projects" ON projects;
+DROP POLICY IF EXISTS "Users can view their own projects" ON projects;
+DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
+DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;
+
 -- Create RLS policies for projects table
 CREATE POLICY "Users can create their own projects"
   ON projects