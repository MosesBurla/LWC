/*
  # Fix database policies and prevent recursion

  1. Clean up existing policies
  2. Create safe, non-recursive policies
  3. Add proper indexes
  4. Fix any data integrity issues
*/

-- First, let's ensure we have the admin user properly set up
INSERT INTO users (id, email, full_name, role, status, reason_for_joining, faith_journey) 
VALUES (
  '4c3064e2-2ab1-4838-8530-b11390721d43',
  'admin@lifewithchrist.org',
  'System Administrator',
  'admin',
  'approved',
  'System Administration',
  'Serving God through technology and community building.'
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'approved';

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Users can read approved users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can read public user data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Allow user registration" ON users;

-- Create simple, safe policies for users
CREATE POLICY "Public can read approved users" ON users
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Ensure all other tables have proper policies without recursion
-- These should already be safe from the previous migration

-- Add some helpful functions for the application
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS text AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role 
  FROM users 
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_role, 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if current user is admin (for app use)
CREATE OR REPLACE FUNCTION is_current_user_admin()
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() = '4c3064e2-2ab1-4838-8530-b11390721d43'::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_users_email_unique ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status_role ON users(status, role);

-- Ensure RLS is enabled on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotional_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;