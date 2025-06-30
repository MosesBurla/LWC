/*
  # Fix RLS policies for users table

  1. Security Updates
    - Update existing RLS policies to properly handle upsert operations
    - Add policy for authenticated users to insert their own profile
    - Ensure users can update their own profiles
    - Allow public read access for approved users

  2. Changes
    - Drop existing conflicting policies
    - Create comprehensive policies for all CRUD operations
    - Ensure upsert operations work correctly
*/

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow user registration" ON users;
DROP POLICY IF EXISTS "Public can read approved users" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Create comprehensive RLS policies for users table

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow public to read approved users (for community features)
CREATE POLICY "Public can read approved users"
  ON users
  FOR SELECT
  TO public
  USING (status = 'approved'::user_status);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role to manage all users (for admin operations)
CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anon users to insert during registration (temporary, will be updated by trigger)
CREATE POLICY "Allow registration"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);