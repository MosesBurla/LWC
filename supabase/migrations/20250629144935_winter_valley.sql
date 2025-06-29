/*
  # Initial Database Schema for Life With Christ Community Platform

  1. New Tables
    - `users` - User profiles and authentication data
    - `groups` - Small groups and communities
    - `group_members` - Group membership relationships
    - `events` - Community events and meetings
    - `event_rsvps` - Event RSVP responses
    - `posts` - Community posts and announcements
    - `post_reactions` - Post likes and reactions
    - `post_comments` - Comments on posts
    - `prayer_requests` - Prayer requests from community
    - `prayer_responses` - Responses to prayer requests
    - `devotionals` - Daily devotional content
    - `devotional_subscriptions` - Email subscription preferences
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies where appropriate

  3. Functions and Triggers
    - Auto-update timestamps
    - Notification triggers
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  location text,
  avatar_url text,
  bio text,
  reason_for_joining text,
  faith_journey text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'leader', 'admin')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'public' CHECK (type IN ('public', 'private', 'invite_only')),
  category text,
  location text,
  meeting_day text,
  meeting_time time,
  max_members integer,
  leader_id uuid REFERENCES users(id) ON DELETE SET NULL,
  co_leader_id uuid REFERENCES users(id) ON DELETE SET NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'leader', 'co_leader')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'worship', 'study', 'fellowship', 'service', 'prayer')),
  date date NOT NULL,
  time time NOT NULL,
  location text,
  is_online boolean DEFAULT false,
  meeting_url text,
  max_attendees integer,
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  organizer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event RSVPs table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'not_going')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  content text NOT NULL,
  type text NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'testimony', 'announcement', 'prayer', 'discussion')),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  image_url text,
  is_pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'like' CHECK (type IN ('like', 'love', 'pray', 'amen')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id, type)
);

-- Post comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  parent_id uuid REFERENCES post_comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prayer requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general' CHECK (category IN ('general', 'health', 'family', 'work', 'spiritual', 'financial')),
  status text NOT NULL DEFAULT 'needs_prayer' CHECK (status IN ('needs_prayer', 'ongoing', 'answered')),
  is_anonymous boolean DEFAULT false,
  requester_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prayer responses table
CREATE TABLE IF NOT EXISTS prayer_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_request_id uuid REFERENCES prayer_requests(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message text,
  type text NOT NULL DEFAULT 'praying' CHECK (type IN ('praying', 'encouragement', 'testimony')),
  created_at timestamptz DEFAULT now()
);

-- Devotionals table
CREATE TABLE IF NOT EXISTS devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  scripture_reference text,
  scripture_text text,
  author text NOT NULL,
  reading_time integer DEFAULT 5,
  date date NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Devotional subscriptions table
CREATE TABLE IF NOT EXISTS devotional_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  email text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('post', 'event', 'prayer', 'group', 'admin', 'devotional')),
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotional_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read approved user profiles"
  ON users FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin' 
      AND status = 'approved'
    )
  );

-- Groups policies
CREATE POLICY "Anyone can read public groups"
  ON groups FOR SELECT
  TO authenticated
  USING (type = 'public');

CREATE POLICY "Group members can read their groups"
  ON groups FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT group_id FROM group_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group leaders can update their groups"
  ON groups FOR UPDATE
  TO authenticated
  USING (leader_id = auth.uid() OR co_leader_id = auth.uid());

CREATE POLICY "Admins can manage all groups"
  ON groups FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin' 
      AND status = 'approved'
    )
  );

-- Group members policies
CREATE POLICY "Group members can read group membership"
  ON group_members FOR SELECT
  TO authenticated
  USING (
    group_id IN (
      SELECT group_id FROM group_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave groups"
  ON group_members FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Events policies
CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  TO authenticated;

CREATE POLICY "Group leaders can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    organizer_id = auth.uid() AND
    (group_id IS NULL OR 
     EXISTS (
       SELECT 1 FROM groups 
       WHERE id = group_id 
       AND (leader_id = auth.uid() OR co_leader_id = auth.uid())
     ))
  );

CREATE POLICY "Event organizers can update their events"
  ON events FOR UPDATE
  TO authenticated
  USING (organizer_id = auth.uid());

-- Event RSVPs policies
CREATE POLICY "Users can read event RSVPs"
  ON event_rsvps FOR SELECT
  TO authenticated;

CREATE POLICY "Users can manage their own RSVPs"
  ON event_rsvps FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Posts policies
CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  TO authenticated;

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their posts"
  ON posts FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- Post reactions policies
CREATE POLICY "Anyone can read post reactions"
  ON post_reactions FOR SELECT
  TO authenticated;

CREATE POLICY "Users can manage their own reactions"
  ON post_reactions FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Post comments policies
CREATE POLICY "Anyone can read post comments"
  ON post_comments FOR SELECT
  TO authenticated;

CREATE POLICY "Users can create comments"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their comments"
  ON post_comments FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their comments"
  ON post_comments FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- Prayer requests policies
CREATE POLICY "Anyone can read prayer requests"
  ON prayer_requests FOR SELECT
  TO authenticated;

CREATE POLICY "Users can create prayer requests"
  ON prayer_requests FOR INSERT
  TO authenticated
  WITH CHECK (requester_id = auth.uid());

CREATE POLICY "Requesters can update their prayer requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (requester_id = auth.uid());

-- Prayer responses policies
CREATE POLICY "Anyone can read prayer responses"
  ON prayer_responses FOR SELECT
  TO authenticated;

CREATE POLICY "Users can create prayer responses"
  ON prayer_responses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Devotionals policies
CREATE POLICY "Anyone can read devotionals"
  ON devotionals FOR SELECT
  TO authenticated;

CREATE POLICY "Admins can manage devotionals"
  ON devotionals FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin' 
      AND status = 'approved'
    )
  );

-- Devotional subscriptions policies
CREATE POLICY "Users can manage their own subscriptions"
  ON devotional_subscriptions FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can read their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_group_id ON events(group_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_group_id ON posts(group_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_category ON prayer_requests(category);
CREATE INDEX IF NOT EXISTS idx_devotionals_date ON devotionals(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_rsvps_updated_at BEFORE UPDATE ON event_rsvps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON prayer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devotionals_updated_at BEFORE UPDATE ON devotionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();