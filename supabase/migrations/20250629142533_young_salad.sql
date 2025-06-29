/*
  # Initial Schema for Life With Christ Community Platform

  1. New Tables
    - `users` - User profiles and authentication data
    - `groups` - Community groups and small groups
    - `group_members` - Group membership relationships
    - `posts` - Community posts and testimonies
    - `post_reactions` - Reactions to posts (amen, pray, heart)
    - `comments` - Comments on posts
    - `events` - Community events and gatherings
    - `event_rsvps` - Event RSVP responses
    - `prayer_requests` - Prayer requests from community
    - `prayer_responses` - Responses to prayer requests
    - `prayer_updates` - Updates on prayer requests
    - `devotionals` - Daily devotionals content
    - `devotional_reactions` - Reactions to devotionals
    - `notifications` - User notifications
    - `content_reports` - Content moderation reports

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies where needed
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  location text,
  bio text,
  avatar_url text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'leader', 'admin')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  reason_for_joining text,
  faith_journey text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now()
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  privacy text NOT NULL DEFAULT 'public' CHECK (privacy IN ('public', 'private', 'invite_only')),
  leader_id uuid REFERENCES users(id) ON DELETE SET NULL,
  image_url text,
  meeting_schedule jsonb,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'leader', 'co_leader')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  type text NOT NULL DEFAULT 'general' CHECK (type IN ('testimony', 'prayer', 'announcement', 'general')),
  media_urls text[],
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'groups', 'leaders')),
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  tags text[],
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'deleted')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('amen', 'pray', 'heart')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id, type)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location jsonb,
  online_meeting jsonb,
  organizer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category text NOT NULL,
  max_attendees integer,
  image_url text,
  tags text[],
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event RSVPs table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('attending', 'maybe', 'not_attending')),
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Prayer requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'needs_prayer' CHECK (status IN ('needs_prayer', 'ongoing', 'answered')),
  urgency text NOT NULL DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent', 'time_sensitive')),
  is_anonymous boolean DEFAULT false,
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'groups', 'private')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prayer responses table
CREATE TABLE IF NOT EXISTS prayer_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_request_id uuid REFERENCES prayer_requests(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('prayed', 'encouraged')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(prayer_request_id, user_id, type)
);

-- Prayer updates table
CREATE TABLE IF NOT EXISTS prayer_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_request_id uuid REFERENCES prayer_requests(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Devotionals table
CREATE TABLE IF NOT EXISTS devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL UNIQUE,
  scripture jsonb NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  tags text[],
  reading_time integer DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Devotional reactions table
CREATE TABLE IF NOT EXISTS devotional_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  devotional_id uuid REFERENCES devotionals(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('love', 'bookmark', 'share')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(devotional_id, user_id, type)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  action_url text,
  is_read boolean DEFAULT false,
  actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  context jsonb,
  created_at timestamptz DEFAULT now()
);

-- Content reports table
CREATE TABLE IF NOT EXISTS content_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL CHECK (content_type IN ('post', 'comment', 'user')),
  content_id uuid NOT NULL,
  reporter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reason text NOT NULL,
  details text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  resolution text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotional_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

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
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Groups policies
CREATE POLICY "Anyone can read public groups"
  ON groups FOR SELECT
  TO authenticated
  USING (privacy = 'public' OR id IN (
    SELECT group_id FROM group_members 
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Group leaders can update their groups"
  ON groups FOR UPDATE
  TO authenticated
  USING (leader_id = auth.uid());

CREATE POLICY "Admins can manage all groups"
  ON groups FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Group members policies
CREATE POLICY "Users can read group memberships"
  ON group_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join/leave groups"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave groups"
  ON group_members FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Posts policies
CREATE POLICY "Users can read published posts"
  ON posts FOR SELECT
  TO authenticated
  USING (
    status = 'published' AND (
      visibility = 'public' OR
      (visibility = 'groups' AND group_id IN (
        SELECT group_id FROM group_members 
        WHERE user_id = auth.uid() AND status = 'active'
      )) OR
      (visibility = 'leaders' AND EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('leader', 'admin')
      ))
    )
  );

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

-- Post reactions policies
CREATE POLICY "Users can read reactions"
  ON post_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own reactions"
  ON post_reactions FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Comments policies
CREATE POLICY "Users can read comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

-- Events policies
CREATE POLICY "Users can read events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Leaders can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('leader', 'admin')
    )
  );

CREATE POLICY "Event organizers can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (organizer_id = auth.uid());

-- Event RSVPs policies
CREATE POLICY "Users can read RSVPs"
  ON event_rsvps FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own RSVPs"
  ON event_rsvps FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Prayer requests policies
CREATE POLICY "Users can read prayer requests"
  ON prayer_requests FOR SELECT
  TO authenticated
  USING (
    visibility = 'public' OR
    (visibility = 'groups' AND author_id IN (
      SELECT user_id FROM group_members gm1
      WHERE gm1.group_id IN (
        SELECT group_id FROM group_members gm2
        WHERE gm2.user_id = auth.uid() AND gm2.status = 'active'
      )
    )) OR
    author_id = auth.uid()
  );

CREATE POLICY "Users can create prayer requests"
  ON prayer_requests FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own prayer requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

-- Prayer responses policies
CREATE POLICY "Users can read prayer responses"
  ON prayer_responses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own prayer responses"
  ON prayer_responses FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Prayer updates policies
CREATE POLICY "Users can read prayer updates"
  ON prayer_updates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Prayer request authors can add updates"
  ON prayer_updates FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prayer_requests 
      WHERE id = prayer_request_id AND author_id = auth.uid()
    )
  );

-- Devotionals policies
CREATE POLICY "Anyone can read devotionals"
  ON devotionals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage devotionals"
  ON devotionals FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Devotional reactions policies
CREATE POLICY "Users can read devotional reactions"
  ON devotional_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own devotional reactions"
  ON devotional_reactions FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Content reports policies
CREATE POLICY "Users can create reports"
  ON content_reports FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Admins can manage reports"
  ON content_reports FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type_created ON posts(type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_group_members_user_group ON group_members(user_id, group_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_devotionals_date ON devotionals(date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_rsvps_updated_at BEFORE UPDATE ON event_rsvps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON prayer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devotionals_updated_at BEFORE UPDATE ON devotionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_reports_updated_at BEFORE UPDATE ON content_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();