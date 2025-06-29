import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  location?: string
  bio?: string
  avatar_url?: string
  role: 'member' | 'leader' | 'admin'
  status: 'pending' | 'approved' | 'suspended'
  reason_for_joining?: string
  faith_journey?: string
  created_at: string
  updated_at: string
  last_activity?: string
}

export interface Post {
  id: string
  author_id: string
  content: string
  type: 'testimony' | 'prayer' | 'announcement' | 'general'
  media_urls?: string[]
  visibility: 'public' | 'groups' | 'leaders'
  group_id?: string
  tags?: string[]
  status: 'published' | 'hidden' | 'deleted'
  created_at: string
  updated_at: string
  author?: User
  reactions?: PostReaction[]
  comments?: Comment[]
  _count?: {
    reactions: number
    comments: number
  }
}

export interface PostReaction {
  id: string
  post_id: string
  user_id: string
  type: 'amen' | 'pray' | 'heart'
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_id?: string
  created_at: string
  author?: User
  replies?: Comment[]
}

export interface Group {
  id: string
  name: string
  description: string
  category: string
  privacy: 'public' | 'private' | 'invite_only'
  leader_id: string
  image_url?: string
  meeting_schedule?: {
    day: string
    time: string
    location: string
  }
  tags?: string[]
  created_at: string
  updated_at: string
  leader?: User
  members?: GroupMember[]
  _count?: {
    members: number
  }
}

export interface GroupMember {
  id: string
  group_id: string
  user_id: string
  role: 'member' | 'leader' | 'co_leader'
  status: 'active' | 'pending' | 'inactive'
  joined_at: string
  user?: User
}

export interface Event {
  id: string
  title: string
  description: string
  start_time: string
  end_time: string
  location?: {
    name: string
    address: string
    coordinates?: { lat: number; lng: number }
  }
  online_meeting?: {
    platform: string
    url: string
    meeting_id: string
  }
  organizer_id: string
  category: string
  max_attendees?: number
  image_url?: string
  tags?: string[]
  group_id?: string
  created_at: string
  updated_at: string
  organizer?: User
  rsvps?: EventRSVP[]
  _count?: {
    rsvps: number
  }
}

export interface EventRSVP {
  id: string
  event_id: string
  user_id: string
  status: 'attending' | 'maybe' | 'not_attending'
  note?: string
  created_at: string
  user?: User
}

export interface PrayerRequest {
  id: string
  author_id: string
  title: string
  content: string
  category: string
  status: 'needs_prayer' | 'ongoing' | 'answered'
  urgency: 'normal' | 'urgent' | 'time_sensitive'
  is_anonymous: boolean
  visibility: 'public' | 'groups' | 'private'
  created_at: string
  updated_at: string
  author?: User
  prayers?: PrayerResponse[]
  updates?: PrayerUpdate[]
  _count?: {
    prayers: number
    comments: number
  }
}

export interface PrayerResponse {
  id: string
  prayer_request_id: string
  user_id: string
  type: 'prayed' | 'encouraged'
  created_at: string
  user?: User
}

export interface PrayerUpdate {
  id: string
  prayer_request_id: string
  content: string
  created_at: string
}

export interface Devotional {
  id: string
  title: string
  date: string
  scripture: {
    verse: string
    reference: string
    version: string
  }
  content: string
  author_id: string
  tags?: string[]
  reading_time: number
  created_at: string
  updated_at: string
  author?: User
  reactions?: DevotionalReaction[]
  _count?: {
    reactions: number
    comments: number
  }
}

export interface DevotionalReaction {
  id: string
  devotional_id: string
  user_id: string
  type: 'love' | 'bookmark' | 'share'
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  action_url?: string
  is_read: boolean
  actor_id?: string
  context?: Record<string, any>
  created_at: string
  actor?: User
}