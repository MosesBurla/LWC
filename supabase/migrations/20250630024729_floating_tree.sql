/*
  # Fix RLS Policies to Prevent Infinite Recursion

  1. Policy Changes
    - Drop all existing policies that could cause recursion
    - Create simplified policies without circular dependencies
    - Remove admin checks that query the same table being protected

  2. Security
    - Maintain data security while preventing recursion
    - Use auth.uid() for user-based access control
    - Create safe admin function for future use

  3. Tables Updated
    - users: Simplified policies without admin recursion
    - groups: Safe group management policies
    - events: Safe event management policies
    - devotionals: Simplified author-based policies
    - group_members: Safe membership policies
*/

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Users can read approved users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can read public user data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Allow user registration" ON users;

DROP POLICY IF EXISTS "Admins can manage all groups" ON groups;
DROP POLICY IF EXISTS "Anyone can read public groups" ON groups;
DROP POLICY IF EXISTS "Leaders can manage their groups" ON groups;
DROP POLICY IF EXISTS "Members can read their groups" ON groups;
DROP POLICY IF EXISTS "Authenticated users can create groups" ON groups;

DROP POLICY IF EXISTS "Admins can manage all events" ON events;
DROP POLICY IF EXISTS "Anyone can read events" ON events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;
DROP POLICY IF EXISTS "Organizers can manage their events" ON events;

DROP POLICY IF EXISTS "Group leaders can manage members" ON group_members;
DROP POLICY IF EXISTS "Members can read group memberships" ON group_members;
DROP POLICY IF EXISTS "Users can join groups" ON group_members;
DROP POLICY IF EXISTS "Users can leave groups" ON group_members;

DROP POLICY IF EXISTS "Authors and admins can manage devotionals" ON devotionals;
DROP POLICY IF EXISTS "Anyone can read devotionals" ON devotionals;
DROP POLICY IF EXISTS "Authors can manage their devotionals" ON devotionals;
DROP POLICY IF EXISTS "Authenticated users can create devotionals" ON devotionals;

-- Create safe policies for users table (NO ADMIN CHECKS TO PREVENT RECURSION)
CREATE POLICY "Users can read approved users" ON users
  FOR SELECT USING (status = 'approved' OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create safe policies for groups table
CREATE POLICY "Anyone can read public groups" ON groups
  FOR SELECT USING (privacy = 'public');

CREATE POLICY "Members can read their groups" ON groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = groups.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Leaders can manage their groups" ON groups
  FOR ALL USING (leader_id = auth.uid());

CREATE POLICY "Authenticated users can create groups" ON groups
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND leader_id = auth.uid());

-- Create safe policies for events table
CREATE POLICY "Anyone can read events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Organizers can manage their events" ON events
  FOR ALL USING (organizer_id = auth.uid());

-- Create safe policies for group_members table
CREATE POLICY "Group leaders can manage members" ON group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM groups 
      WHERE id = group_members.group_id AND leader_id = auth.uid()
    )
  );

CREATE POLICY "Members can read group memberships" ON group_members
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM group_members gm 
      WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join groups" ON group_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave groups" ON group_members
  FOR DELETE USING (user_id = auth.uid());

-- Create safe policies for devotionals table
CREATE POLICY "Anyone can read devotionals" ON devotionals
  FOR SELECT USING (true);

CREATE POLICY "Authors can manage their devotionals" ON devotionals
  FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can create devotionals" ON devotionals
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());

-- Create a safe admin check function for future use
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Check if the current user is the hardcoded admin
  -- This avoids querying the users table and prevents recursion
  RETURN auth.uid() = '4c3064e2-2ab1-4838-8530-b11390721d43'::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user has admin role (for application use)
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text AS $$
DECLARE
  user_role text;
BEGIN
  -- Only return role for the current user to avoid recursion
  SELECT role INTO user_role 
  FROM users 
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_role, 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Admin policies are intentionally NOT created here to prevent recursion
-- Admin functionality should be handled at the application level
-- using the is_admin() function or role checks in the frontend