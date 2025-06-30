/*
  # Fix Users Table RLS Policies

  1. Security Updates
    - Drop existing problematic policies
    - Create new policies that properly handle upsert operations
    - Ensure authenticated users can manage their own profiles
    - Allow service role full access for admin operations

  2. Policy Changes
    - Enable proper INSERT policy for authenticated users
    - Enable proper UPDATE policy for authenticated users  
    - Enable proper SELECT policy for authenticated users
    - Maintain existing public read access for approved users
*/

-- Drop existing policies that might be causing conflicts
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;

-- Create new policies that work with upsert operations
CREATE POLICY "Enable insert for authenticated users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for authenticated users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read for authenticated users"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Ensure the existing public read policy for approved users remains
-- (This should already exist based on the schema, but we'll recreate it to be safe)
DROP POLICY IF EXISTS "Public can read approved users" ON users;
CREATE POLICY "Public can read approved users"
  ON users
  FOR SELECT
  TO public
  USING (status = 'approved'::user_status);

-- Ensure service role has full access (should already exist)
-- This is important for admin operations
CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);