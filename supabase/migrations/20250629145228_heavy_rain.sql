/*
  # Sample Data Migration

  1. Sample Data
    - Groups with correct column names
    - Events with proper structure
    - Devotionals with sample content
    - Posts for community engagement
    - Prayer requests for community support

  2. Notes
    - Uses existing table structure from schema
    - Provides realistic sample data for testing
    - All data is safe for production use
*/

-- Sample groups (using correct column names from schema)
INSERT INTO groups (id, name, description, category, privacy, leader_id, image_url, meeting_schedule, tags) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Young Adults Fellowship', 'A vibrant community for young adults (18-30) to grow in faith together through Bible study, fellowship, and service.', 'Fellowship', 'public', NULL, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', '{"day": "Wednesday", "time": "7:00 PM", "location": "Community Center Room A"}', ARRAY['Young Adults', 'Fellowship', 'Bible Study']),
  ('550e8400-e29b-41d4-a716-446655440002', 'Married Couples Study', 'Bible study and fellowship for married couples focusing on building Christ-centered marriages.', 'Bible Study', 'public', NULL, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400', '{"day": "Friday", "time": "7:30 PM", "location": "Church Sanctuary"}', ARRAY['Marriage', 'Couples', 'Bible Study']),
  ('550e8400-e29b-41d4-a716-446655440003', 'Prayer Warriors', 'Dedicated prayer group meeting weekly to intercede for our community and world.', 'Prayer', 'public', NULL, 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400', '{"day": "Tuesday", "time": "6:00 AM", "location": "Prayer Chapel"}', ARRAY['Prayer', 'Intercession', 'Early Morning']),
  ('550e8400-e29b-41d4-a716-446655440004', 'Seniors Fellowship', 'Fellowship and Bible study for our beloved senior members of the community.', 'Fellowship', 'public', NULL, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', '{"day": "Thursday", "time": "2:00 PM", "location": "Fellowship Hall"}', ARRAY['Seniors', 'Fellowship', 'Afternoon']);

-- Sample events (using correct column names from schema)
INSERT INTO events (id, title, description, start_time, end_time, location, online_meeting, organizer_id, category, max_attendees, image_url, tags) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Community Worship Night', 'Join us for an evening of worship, prayer, and fellowship as we come together to praise God.', (CURRENT_DATE + INTERVAL '7 days')::timestamp + TIME '19:00:00', (CURRENT_DATE + INTERVAL '7 days')::timestamp + TIME '21:00:00', '{"name": "Main Sanctuary", "address": "123 Church Street"}', NULL, NULL, 'Worship', 200, 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Worship', 'Community', 'Evening']),
  ('660e8400-e29b-41d4-a716-446655440002', 'Bible Study: Book of Romans', 'Deep dive into Paul''s letter to the Romans. All are welcome to join this enriching study.', (CURRENT_DATE + INTERVAL '3 days')::timestamp + TIME '19:30:00', (CURRENT_DATE + INTERVAL '3 days')::timestamp + TIME '21:00:00', '{"name": "Conference Room B", "address": "123 Church Street"}', NULL, NULL, 'Study', 40, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Bible Study', 'Romans', 'Teaching']),
  ('660e8400-e29b-41d4-a716-446655440003', 'Community Service Day', 'Serve our local community by volunteering at the food bank and homeless shelter.', (CURRENT_DATE + INTERVAL '10 days')::timestamp + TIME '09:00:00', (CURRENT_DATE + INTERVAL '10 days')::timestamp + TIME '15:00:00', '{"name": "Downtown Food Bank", "address": "456 Service Avenue"}', NULL, NULL, 'Service', 50, 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Service', 'Community', 'Outreach']),
  ('660e8400-e29b-41d4-a716-446655440004', 'Online Prayer Meeting', 'Weekly online prayer meeting for those who cannot attend in person.', (CURRENT_DATE + INTERVAL '2 days')::timestamp + TIME '20:00:00', (CURRENT_DATE + INTERVAL '2 days')::timestamp + TIME '21:00:00', NULL, '{"platform": "Zoom", "url": "https://zoom.us/j/123456789", "meeting_id": "123-456-789"}', NULL, 'Prayer', 100, NULL, ARRAY['Prayer', 'Online', 'Evening']);

-- Sample devotionals (using correct column names from schema)
INSERT INTO devotionals (id, title, date, scripture, content, author_id, tags, reading_time) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Walking in Faith', CURRENT_DATE, '{"verse": "Now faith is confidence in what we hope for and assurance about what we do not see.", "reference": "Hebrews 11:1", "version": "NIV"}', 'Faith is not about having all the answers, but about trusting God even when we don''t understand His ways. Today, let us remember that our faith grows stronger not in the absence of doubt, but in choosing to trust God despite our uncertainties. When we walk by faith and not by sight, we discover that God''s grace is sufficient for every step of our journey.', NULL, ARRAY['Faith', 'Trust', 'Journey'], 5),
  ('770e8400-e29b-41d4-a716-446655440002', 'God''s Unfailing Love', CURRENT_DATE - INTERVAL '1 day', '{"verse": "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.", "reference": "Romans 8:38-39", "version": "NIV"}', 'In a world that often feels uncertain and chaotic, we can find peace in knowing that God''s love for us never changes. His love is not based on our performance or our circumstances. It is steadfast, unchanging, and eternal. Today, rest in the assurance that you are deeply loved by the Creator of the universe.', NULL, ARRAY['Love', 'Peace', 'Assurance'], 4),
  ('770e8400-e29b-41d4-a716-446655440003', 'The Power of Prayer', CURRENT_DATE - INTERVAL '2 days', '{"verse": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", "reference": "Philippians 4:6-7", "version": "NIV"}', 'Prayer is not just a religious duty; it''s a powerful conversation with our Heavenly Father. Through prayer, we can find peace in troubled times, wisdom for difficult decisions, and strength for daily challenges. Don''t underestimate the power of bringing everything to God in prayer.', NULL, ARRAY['Prayer', 'Peace', 'Wisdom'], 6);

-- Sample posts (using correct column names from schema)
INSERT INTO posts (id, author_id, content, type, media_urls, visibility, group_id, tags, status) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', NULL, 'We are so excited to have you join our Life with Christ community! This is a place where we can grow together in faith, support one another through prayer, and celebrate God''s goodness in our lives. Feel free to introduce yourself and share what brought you here.', 'announcement', NULL, 'public', NULL, ARRAY['Welcome', 'Community', 'Introduction'], 'published'),
  ('880e8400-e29b-41d4-a716-446655440002', NULL, 'I wanted to share how God has been faithful in providing for my family during a difficult financial season. When my husband lost his job three months ago, we were worried about how we would make ends meet. But through the prayers and support of this community, and God''s amazing provision, he found an even better job last week! God is so good!', 'testimony', NULL, 'public', NULL, ARRAY['Testimony', 'Provision', 'Faithfulness'], 'published'),
  ('880e8400-e29b-41d4-a716-446655440003', NULL, 'We have several opportunities to serve our local community coming up:

• Food bank volunteer day - Saturday 9 AM
• Homeless shelter meal prep - Sunday 2 PM  
• Community garden cleanup - Next Saturday 10 AM

Who''s interested in joining? Let''s show God''s love through action!', 'announcement', NULL, 'public', NULL, ARRAY['Service', 'Community', 'Volunteer'], 'published');

-- Sample prayer requests (using correct column names from schema)
INSERT INTO prayer_requests (id, author_id, title, content, category, status, urgency, is_anonymous, visibility) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', NULL, 'Healing for My Mother', 'Please pray for my mother who was recently diagnosed with cancer. We are trusting God for complete healing and peace during this difficult time.', 'Health', 'needs_prayer', 'normal', false, 'public'),
  ('990e8400-e29b-41d4-a716-446655440002', NULL, 'Job Search Guidance', 'I have been looking for a new job for several months. Please pray for God''s guidance and that the right opportunity would open up soon.', 'Career', 'needs_prayer', 'normal', true, 'public'),
  ('990e8400-e29b-41d4-a716-446655440003', NULL, 'Marriage Restoration', 'My spouse and I are going through a difficult time in our marriage. Please pray for healing, forgiveness, and restoration in our relationship.', 'Relationships', 'ongoing', 'normal', true, 'public'),
  ('990e8400-e29b-41d4-a716-446655440004', NULL, 'Praise Report: New Baby!', 'Thank you all for praying for a safe delivery. Our baby girl was born healthy and beautiful! God is so good!', 'Family', 'answered', 'normal', false, 'public');