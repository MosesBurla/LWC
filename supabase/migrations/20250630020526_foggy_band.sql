/*
  # Complete Database Schema for Life With Christ Community Platform

  1. New Tables
    - `users` - User profiles and authentication data
    - `groups` - Small groups and communities
    - `group_members` - Group membership relationships
    - `events` - Community events and gatherings
    - `event_rsvps` - Event attendance tracking
    - `posts` - Community posts and testimonies
    - `post_reactions` - Likes, amens, prayers on posts
    - `comments` - Comments on posts
    - `prayer_requests` - Prayer requests from community
    - `prayer_responses` - Prayers and encouragement responses
    - `prayer_updates` - Updates on prayer requests
    - `devotionals` - Daily devotionals and content
    - `devotional_reactions` - Reactions to devotionals
    - `notifications` - User notifications system

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Create admin and user role-based access

  3. Functions
    - Auto-update timestamps
    - Notification triggers
    - User management functions
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('member', 'leader', 'admin');
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'suspended');
CREATE TYPE group_privacy AS ENUM ('public', 'private', 'invite_only');
CREATE TYPE member_role AS ENUM ('member', 'leader', 'co_leader');
CREATE TYPE member_status AS ENUM ('active', 'pending', 'inactive');
CREATE TYPE rsvp_status AS ENUM ('attending', 'maybe', 'not_attending');
CREATE TYPE post_type AS ENUM ('testimony', 'prayer', 'announcement', 'general');
CREATE TYPE post_visibility AS ENUM ('public', 'groups', 'leaders');
CREATE TYPE post_status AS ENUM ('published', 'hidden', 'deleted');
CREATE TYPE reaction_type AS ENUM ('amen', 'pray', 'heart', 'love', 'bookmark', 'share');
CREATE TYPE prayer_status AS ENUM ('needs_prayer', 'ongoing', 'answered');
CREATE TYPE prayer_urgency AS ENUM ('normal', 'urgent', 'time_sensitive');
CREATE TYPE prayer_visibility AS ENUM ('public', 'groups', 'private');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  location text,
  bio text,
  avatar_url text,
  role user_role DEFAULT 'member',
  status user_status DEFAULT 'pending',
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
  privacy group_privacy DEFAULT 'public',
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
  role member_role DEFAULT 'member',
  status member_status DEFAULT 'active',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
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
  organizer_id uuid REFERENCES users(id) ON DELETE SET NULL,
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
  status rsvp_status NOT NULL,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  content text NOT NULL,
  type post_type DEFAULT 'general',
  media_urls text[],
  visibility post_visibility DEFAULT 'public',
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  tags text[],
  status post_status DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type reaction_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id, type)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prayer requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  status prayer_status DEFAULT 'needs_prayer',
  urgency prayer_urgency DEFAULT 'normal',
  is_anonymous boolean DEFAULT false,
  visibility prayer_visibility DEFAULT 'public',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prayer responses table
CREATE TABLE IF NOT EXISTS prayer_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_request_id uuid REFERENCES prayer_requests(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type reaction_type NOT NULL,
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
  date date NOT NULL,
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
  type reaction_type NOT NULL,
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_devotionals_date ON devotionals(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Enable Row Level Security
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

-- RLS Policies for users table
CREATE POLICY "Users can read approved users" ON users
  FOR SELECT USING (status = 'approved' OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for groups table
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

CREATE POLICY "Admins can manage all groups" ON groups
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for group_members table
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

CREATE POLICY "Group leaders can manage members" ON group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM groups 
      WHERE id = group_members.group_id AND leader_id = auth.uid()
    )
  );

-- RLS Policies for events table
CREATE POLICY "Anyone can read events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Organizers can manage their events" ON events
  FOR ALL USING (organizer_id = auth.uid());

CREATE POLICY "Admins can manage all events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for event_rsvps table
CREATE POLICY "Users can manage their RSVPs" ON event_rsvps
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Event organizers can read RSVPs" ON event_rsvps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE id = event_rsvps.event_id AND organizer_id = auth.uid()
    )
  );

-- RLS Policies for posts table
CREATE POLICY "Anyone can read public posts" ON posts
  FOR SELECT USING (visibility = 'public' AND status = 'published');

CREATE POLICY "Group members can read group posts" ON posts
  FOR SELECT USING (
    visibility = 'groups' AND status = 'published' AND
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = posts.group_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authors can manage their posts" ON posts
  FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for post_reactions table
CREATE POLICY "Users can manage their reactions" ON post_reactions
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Anyone can read reactions" ON post_reactions
  FOR SELECT USING (true);

-- RLS Policies for comments table
CREATE POLICY "Anyone can read comments on visible posts" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE id = comments.post_id AND status = 'published'
    )
  );

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can manage their comments" ON comments
  FOR ALL USING (author_id = auth.uid());

-- RLS Policies for prayer_requests table
CREATE POLICY "Anyone can read public prayer requests" ON prayer_requests
  FOR SELECT USING (visibility = 'public');

CREATE POLICY "Authenticated users can create prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can manage their prayer requests" ON prayer_requests
  FOR ALL USING (author_id = auth.uid());

-- RLS Policies for prayer_responses table
CREATE POLICY "Users can manage their prayer responses" ON prayer_responses
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Anyone can read prayer responses" ON prayer_responses
  FOR SELECT USING (true);

-- RLS Policies for prayer_updates table
CREATE POLICY "Anyone can read prayer updates" ON prayer_updates
  FOR SELECT USING (true);

CREATE POLICY "Prayer request authors can add updates" ON prayer_updates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM prayer_requests 
      WHERE id = prayer_updates.prayer_request_id AND author_id = auth.uid()
    )
  );

-- RLS Policies for devotionals table
CREATE POLICY "Anyone can read devotionals" ON devotionals
  FOR SELECT USING (true);

CREATE POLICY "Authors and admins can manage devotionals" ON devotionals
  FOR ALL USING (
    author_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for devotional_reactions table
CREATE POLICY "Users can manage their devotional reactions" ON devotional_reactions
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Anyone can read devotional reactions" ON devotional_reactions
  FOR SELECT USING (true);

-- RLS Policies for notifications table
CREATE POLICY "Users can read their notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_rsvps_updated_at BEFORE UPDATE ON event_rsvps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON prayer_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devotionals_updated_at BEFORE UPDATE ON devotionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_action_url text DEFAULT NULL,
  p_actor_id uuid DEFAULT NULL,
  p_context jsonb DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, type, title, message, action_url, actor_id, context)
  VALUES (p_user_id, p_type, p_title, p_message, p_action_url, p_actor_id, p_context)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;