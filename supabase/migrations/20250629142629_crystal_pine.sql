/*
  # Sample Data for Life With Christ Community Platform

  1. Sample Data
    - Admin user
    - Sample devotionals
    - Sample groups
    - Sample events
    - Sample posts

  Note: This is for development/demo purposes only
*/

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- INSERT INTO users (id, email, full_name, role, status) VALUES 
-- ('your-admin-user-id', 'admin@lifewithchrist.org', 'Admin User', 'admin', 'approved');

-- Insert sample devotionals
INSERT INTO devotionals (title, date, scripture, content, author_id, tags, reading_time) VALUES 
(
  'Walking in Faith, Not Fear',
  CURRENT_DATE,
  '{"verse": "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", "reference": "Joshua 1:9", "version": "NIV"}',
  'Fear is one of the most common emotions we face as humans. It can paralyze us, prevent us from taking steps of faith, and keep us from experiencing the fullness of God''s plan for our lives. But God''s word to Joshua—and to us—is clear: "Be strong and courageous."

This isn''t just positive thinking or self-help advice. This is a divine command backed by an eternal promise: God will be with us wherever we go. When we face uncertainty, when the path ahead seems unclear, when our circumstances feel overwhelming, we can choose faith over fear because we serve a God who never leaves us nor forsakes us.

Today, whatever challenge you''re facing, remember that you don''t face it alone. The same God who parted the Red Sea, who brought down the walls of Jericho, who raised Jesus from the dead, is with you right now. Let His presence give you courage to take the next step.',
  NULL,
  ARRAY['Faith', 'Courage', 'Trust', 'Gods Presence'],
  3
),
(
  'The Power of Gratitude',
  CURRENT_DATE - INTERVAL '1 day',
  '{"verse": "Give thanks in all circumstances; for this is God''s will for you in Christ Jesus.", "reference": "1 Thessalonians 5:18", "version": "NIV"}',
  'Gratitude isn''t just a nice sentiment—it''s a powerful spiritual discipline that transforms our hearts and minds. When Paul writes to "give thanks in all circumstances," he''s not asking us to be thankful for everything that happens, but to find something to be grateful for in every situation.

Gratitude shifts our focus from what we lack to what we have, from our problems to God''s provisions, from our fears to His faithfulness. It''s a choice we make daily, sometimes moment by moment, to acknowledge God''s goodness even when life is difficult.

Start today by naming three things you''re grateful for. Watch how this simple practice begins to change your perspective and draw you closer to the heart of God.',
  NULL,
  ARRAY['Gratitude', 'Thanksgiving', 'Perspective', 'Joy'],
  2
);

-- Insert sample groups
INSERT INTO groups (name, description, category, leader_id, meeting_schedule, tags) VALUES 
(
  'Young Adults Bible Study',
  'A vibrant community of young adults exploring God''s Word together through interactive discussions and fellowship.',
  'Bible Study',
  NULL,
  '{"day": "Sunday", "time": "18:00", "location": "Fellowship Hall"}',
  ARRAY['Young Adults', 'Bible Study', 'Fellowship']
),
(
  'Women''s Prayer Circle',
  'A supportive community of women coming together in prayer, worship, and spiritual encouragement.',
  'Prayer',
  NULL,
  '{"day": "Wednesday", "time": "19:00", "location": "Prayer Room"}',
  ARRAY['Women', 'Prayer', 'Worship']
),
(
  'Men''s Discipleship Group',
  'Men growing together in faith, accountability, and Christian brotherhood through study and service.',
  'Discipleship',
  NULL,
  '{"day": "Friday", "time": "06:30", "location": "Conference Room"}',
  ARRAY['Men', 'Discipleship', 'Accountability']
);

-- Insert sample events
INSERT INTO events (title, description, start_time, end_time, location, organizer_id, category, tags) VALUES 
(
  'Sunday Worship Service',
  'Join us for worship, prayer, and fellowship as we gather to praise God and hear His Word.',
  CURRENT_DATE + INTERVAL '3 days' + TIME '10:00',
  CURRENT_DATE + INTERVAL '3 days' + TIME '11:30',
  '{"name": "Main Sanctuary", "address": "123 Faith Street, Los Angeles, CA"}',
  NULL,
  'Worship',
  ARRAY['Worship', 'Community', 'Prayer']
),
(
  'Community Service Day',
  'Serving meals to those in need in our community. Come with a heart to serve!',
  CURRENT_DATE + INTERVAL '5 days' + TIME '09:00',
  CURRENT_DATE + INTERVAL '5 days' + TIME '15:00',
  '{"name": "Downtown Food Bank", "address": "456 Service Ave, Los Angeles, CA"}',
  NULL,
  'Service',
  ARRAY['Service', 'Community', 'Outreach']
);