/*
  # Sample Data for Life With Christ Community Platform

  1. Sample Data
    - Sample admin user (will need to be created through auth)
    - Sample groups and events
    - Sample devotionals
    - Sample posts and prayer requests

  2. Notes
    - User data will be created when users register through the app
    - This provides initial content for development and testing
*/

-- Sample groups
INSERT INTO groups (id, name, description, type, category, location, meeting_day, meeting_time, max_members) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Young Adults Fellowship', 'A vibrant community for young adults (18-30) to grow in faith together through Bible study, fellowship, and service.', 'public', 'Fellowship', 'Community Center Room A', 'Wednesday', '19:00:00', 25),
  ('550e8400-e29b-41d4-a716-446655440002', 'Married Couples Study', 'Bible study and fellowship for married couples focusing on building Christ-centered marriages.', 'public', 'Bible Study', 'Church Sanctuary', 'Friday', '19:30:00', 20),
  ('550e8400-e29b-41d4-a716-446655440003', 'Prayer Warriors', 'Dedicated prayer group meeting weekly to intercede for our community and world.', 'public', 'Prayer', 'Prayer Chapel', 'Tuesday', '06:00:00', 15),
  ('550e8400-e29b-41d4-a716-446655440004', 'Seniors Fellowship', 'Fellowship and Bible study for our beloved senior members of the community.', 'public', 'Fellowship', 'Fellowship Hall', 'Thursday', '14:00:00', 30);

-- Sample events
INSERT INTO events (id, title, description, type, date, time, location, is_online, max_attendees) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Community Worship Night', 'Join us for an evening of worship, prayer, and fellowship as we come together to praise God.', 'worship', CURRENT_DATE + INTERVAL '7 days', '19:00:00', 'Main Sanctuary', false, 200),
  ('660e8400-e29b-41d4-a716-446655440002', 'Bible Study: Book of Romans', 'Deep dive into Paul''s letter to the Romans. All are welcome to join this enriching study.', 'study', CURRENT_DATE + INTERVAL '3 days', '19:30:00', 'Conference Room B', false, 40),
  ('660e8400-e29b-41d4-a716-446655440003', 'Community Service Day', 'Serve our local community by volunteering at the food bank and homeless shelter.', 'service', CURRENT_DATE + INTERVAL '10 days', '09:00:00', 'Downtown Food Bank', false, 50),
  ('660e8400-e29b-41d4-a716-446655440004', 'Online Prayer Meeting', 'Weekly online prayer meeting for those who cannot attend in person.', 'prayer', CURRENT_DATE + INTERVAL '2 days', '20:00:00', 'Online', true, 100);

-- Sample devotionals
INSERT INTO devotionals (id, title, content, scripture_reference, scripture_text, author, reading_time, date) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Walking in Faith', 'Faith is not about having all the answers, but about trusting God even when we don''t understand His ways. Today, let us remember that our faith grows stronger not in the absence of doubt, but in choosing to trust God despite our uncertainties. When we walk by faith and not by sight, we discover that God''s grace is sufficient for every step of our journey.', 'Hebrews 11:1', 'Now faith is confidence in what we hope for and assurance about what we do not see.', 'Pastor John Smith', 5, CURRENT_DATE),
  ('770e8400-e29b-41d4-a716-446655440002', 'God''s Unfailing Love', 'In a world that often feels uncertain and chaotic, we can find peace in knowing that God''s love for us never changes. His love is not based on our performance or our circumstances. It is steadfast, unchanging, and eternal. Today, rest in the assurance that you are deeply loved by the Creator of the universe.', 'Romans 8:38-39', 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.', 'Sarah Johnson', 4, CURRENT_DATE - INTERVAL '1 day'),
  ('770e8400-e29b-41d4-a716-446655440003', 'The Power of Prayer', 'Prayer is not just a religious duty; it''s a powerful conversation with our Heavenly Father. Through prayer, we can find peace in troubled times, wisdom for difficult decisions, and strength for daily challenges. Don''t underestimate the power of bringing everything to God in prayer.', 'Philippians 4:6-7', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'Michael Davis', 6, CURRENT_DATE - INTERVAL '2 days');

-- Sample posts
INSERT INTO posts (id, title, content, type, author_id) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', 'Welcome to Our Community!', 'We are so excited to have you join our Life with Christ community! This is a place where we can grow together in faith, support one another through prayer, and celebrate God''s goodness in our lives. Feel free to introduce yourself and share what brought you here.', 'announcement', NULL),
  ('880e8400-e29b-41d4-a716-446655440002', 'Testimony: God''s Provision', 'I wanted to share how God has been faithful in providing for my family during a difficult financial season. When my husband lost his job three months ago, we were worried about how we would make ends meet. But through the prayers and support of this community, and God''s amazing provision, he found an even better job last week! God is so good!', 'testimony', NULL),
  ('880e8400-e29b-41d4-a716-446655440003', 'Upcoming Community Service Opportunities', 'We have several opportunities to serve our local community coming up:\n\n• Food bank volunteer day - Saturday 9 AM\n• Homeless shelter meal prep - Sunday 2 PM\n• Community garden cleanup - Next Saturday 10 AM\n\nWho''s interested in joining? Let''s show God''s love through action!', 'announcement', NULL);

-- Sample prayer requests
INSERT INTO prayer_requests (id, title, description, category, status, is_anonymous, requester_id) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Healing for My Mother', 'Please pray for my mother who was recently diagnosed with cancer. We are trusting God for complete healing and peace during this difficult time.', 'health', 'needs_prayer', false, NULL),
  ('990e8400-e29b-41d4-a716-446655440002', 'Job Search Guidance', 'I have been looking for a new job for several months. Please pray for God''s guidance and that the right opportunity would open up soon.', 'work', 'needs_prayer', true, NULL),
  ('990e8400-e29b-41d4-a716-446655440003', 'Marriage Restoration', 'My spouse and I are going through a difficult time in our marriage. Please pray for healing, forgiveness, and restoration in our relationship.', 'family', 'ongoing', true, NULL),
  ('990e8400-e29b-41d4-a716-446655440004', 'Praise Report: New Baby!', 'Thank you all for praying for a safe delivery. Our baby girl was born healthy and beautiful! God is so good!', 'family', 'answered', false, NULL);