-- Insert sample users (passwords will be set through Supabase Auth)
INSERT INTO users (id, email, full_name, phone, location, bio, role, status, reason_for_joining, faith_journey) VALUES
  ('4c3064e2-2ab1-4838-8530-b11390721d43', 'admin@lifewithchrist.org', 'System Administrator', '+1 (555) 000-0000', 'Los Angeles, CA', 'Platform administrator committed to building a thriving faith community.', 'admin', 'approved', 'System Administration', 'Serving God through technology and community building.'),
  ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'pastor.david@lifewithchrist.org', 'Pastor David Thompson', '+1 (555) 123-4567', 'Los Angeles, CA', 'Senior pastor passionate about discipleship and community growth.', 'leader', 'approved', 'Ministry Leadership', 'Called to shepherd God''s people and build His kingdom.'),
  ('b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'sarah.johnson@email.com', 'Sarah Johnson', '+1 (555) 234-5678', 'Los Angeles, CA', 'Small group leader who loves connecting with others and growing in faith together.', 'leader', 'approved', 'Spiritual Growth', 'Growing in faith through community and service.'),
  ('c3d4e5f6-a7b8-9012-3456-789012cdef01', 'michael.chen@email.com', 'Michael Chen', '+1 (555) 345-6789', 'San Francisco, CA', 'Youth pastor dedicated to helping young people discover their purpose in Christ.', 'leader', 'approved', 'Youth Ministry', 'Passionate about reaching the next generation for Christ.'),
  ('d4e5f6a7-b8c9-0123-4567-890123def012', 'emily.rodriguez@email.com', 'Emily Rodriguez', '+1 (555) 456-7890', 'San Diego, CA', 'Women''s ministry coordinator who believes in the power of prayer and fellowship.', 'leader', 'approved', 'Community Fellowship', 'Building sisterhood and supporting women in their faith journey.'),
  ('e5f6a7b8-c9d0-1234-5678-901234ef0123', 'james.wilson@email.com', 'James Wilson', '+1 (555) 567-8901', 'Los Angeles, CA', 'New believer excited to learn and grow in faith with others.', 'member', 'approved', 'New to Faith', 'Recently accepted Christ and eager to learn more about following Him.'),
  ('f6a7b8c9-d0e1-2345-6789-012345f01234', 'lisa.martinez@email.com', 'Lisa Martinez', '+1 (555) 678-9012', 'Orange County, CA', 'Mother of three who finds strength and community in her faith.', 'member', 'approved', 'Family Ministry', 'Raising children in faith and finding support in Christian community.');

-- Insert sample groups
INSERT INTO groups (id, name, description, category, privacy, leader_id, meeting_schedule, tags) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Young Adults Bible Study', 'A vibrant community of young adults exploring God''s Word together through interactive discussions and fellowship.', 'Bible Study', 'public', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', '{"day": "Sunday", "time": "6:00 PM", "location": "Fellowship Hall"}', ARRAY['Young Adults', 'Bible Study', 'Fellowship']),
  ('10000000-0000-0000-0000-000000000002', 'Men''s Discipleship Group', 'Men growing together in faith, accountability, and Christian brotherhood through study and service.', 'Discipleship', 'public', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '{"day": "Friday", "time": "6:30 AM", "location": "Conference Room"}', ARRAY['Men', 'Discipleship', 'Accountability']),
  ('10000000-0000-0000-0000-000000000003', 'Women''s Prayer Circle', 'A supportive community of women coming together in prayer, worship, and spiritual encouragement.', 'Prayer', 'public', 'd4e5f6a7-b8c9-0123-4567-890123def012', '{"day": "Wednesday", "time": "7:00 PM", "location": "Prayer Room"}', ARRAY['Women', 'Prayer', 'Worship']),
  ('10000000-0000-0000-0000-000000000004', 'Youth Ministry (13-18)', 'High energy youth group focused on building faith, friendships, and fun in a Christ-centered environment.', 'Youth', 'public', 'c3d4e5f6-a7b8-9012-3456-789012cdef01', '{"day": "Sunday", "time": "4:00 PM", "location": "Youth Center"}', ARRAY['Youth', 'Teens', 'Games']),
  ('10000000-0000-0000-0000-000000000005', 'Marriage & Family Ministry', 'Strengthening marriages and families through biblical principles, prayer, and mutual support.', 'Family', 'public', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '{"day": "Saturday", "time": "10:00 AM", "location": "Room 201"}', ARRAY['Marriage', 'Family', 'Relationships']);

-- Insert group memberships
INSERT INTO group_members (group_id, user_id, role, status) VALUES
  ('10000000-0000-0000-0000-000000000001', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'leader', 'active'),
  ('10000000-0000-0000-0000-000000000001', 'e5f6a7b8-c9d0-1234-5678-901234ef0123', 'member', 'active'),
  ('10000000-0000-0000-0000-000000000001', 'f6a7b8c9-d0e1-2345-6789-012345f01234', 'member', 'active'),
  ('10000000-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'leader', 'active'),
  ('10000000-0000-0000-0000-000000000002', 'e5f6a7b8-c9d0-1234-5678-901234ef0123', 'member', 'active'),
  ('10000000-0000-0000-0000-000000000003', 'd4e5f6a7-b8c9-0123-4567-890123def012', 'leader', 'active'),
  ('10000000-0000-0000-0000-000000000003', 'f6a7b8c9-d0e1-2345-6789-012345f01234', 'member', 'active'),
  ('10000000-0000-0000-0000-000000000004', 'c3d4e5f6-a7b8-9012-3456-789012cdef01', 'leader', 'active'),
  ('10000000-0000-0000-0000-000000000005', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'leader', 'active');

-- Insert sample events
INSERT INTO events (id, title, description, start_time, end_time, location, organizer_id, category, tags) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Sunday Worship Service', 'Join us for worship, prayer, and fellowship as we gather to praise God and hear His Word.', '2024-01-14 10:00:00-08', '2024-01-14 11:30:00-08', '{"name": "Main Sanctuary", "address": "123 Faith Street, Los Angeles, CA"}', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Worship', ARRAY['Worship', 'Community', 'Prayer']),
  ('20000000-0000-0000-0000-000000000002', 'Youth Group Game Night', 'Fun games, snacks, and great fellowship for teens. Bring your friends!', '2024-01-16 19:00:00-08', '2024-01-16 21:00:00-08', '{"name": "Fellowship Hall", "address": "123 Faith Street, Los Angeles, CA"}', 'c3d4e5f6-a7b8-9012-3456-789012cdef01', 'Youth', ARRAY['Youth', 'Games', 'Fellowship']),
  ('20000000-0000-0000-0000-000000000003', 'Community Outreach', 'Serving meals to those in need in our community. Come with a heart to serve!', '2024-01-18 09:00:00-08', '2024-01-18 13:00:00-08', '{"name": "Downtown Food Bank", "address": "456 Service Ave, Los Angeles, CA"}', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'Service', ARRAY['Service', 'Community', 'Outreach']),
  ('20000000-0000-0000-0000-000000000004', 'Women''s Bible Study', 'Studying the book of Philippians together. All women welcome!', '2024-01-19 10:00:00-08', '2024-01-19 11:30:00-08', '{"name": "Room 201", "address": "123 Faith Street, Los Angeles, CA"}', 'd4e5f6a7-b8c9-0123-4567-890123def012', 'Study', ARRAY['Women', 'Bible Study', 'Philippians']);

-- Insert sample devotionals
INSERT INTO devotionals (id, title, date, scripture, content, author_id, tags, reading_time) VALUES
  ('30000000-0000-0000-0000-000000000001', 'Walking in Faith, Not Fear', '2024-01-13', '{"verse": "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", "reference": "Joshua 1:9", "version": "NIV"}', 'Fear is one of the most common emotions we face as humans. It can paralyze us, prevent us from taking steps of faith, and keep us from experiencing the fullness of God''s plan for our lives. But God''s word to Joshua—and to us—is clear: "Be strong and courageous."

This isn''t just positive thinking or self-help advice. This is a divine command backed by an eternal promise: God will be with us wherever we go. When we face uncertainty, when the path ahead seems unclear, when our circumstances feel overwhelming, we can choose faith over fear because we serve a God who never leaves us nor forsakes us.

Today, whatever challenge you''re facing, remember that you don''t face it alone. The same God who parted the Red Sea, who brought down the walls of Jericho, who raised Jesus from the dead, is with you right now. Let His presence give you courage to take the next step.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', ARRAY['Faith', 'Courage', 'Trust', 'God''s Presence'], 3),
  ('30000000-0000-0000-0000-000000000002', 'The Power of Gratitude', '2024-01-12', '{"verse": "Give thanks in all circumstances; for this is God''s will for you in Christ Jesus.", "reference": "1 Thessalonians 5:18", "version": "NIV"}', 'Gratitude isn''t just a nice sentiment—it''s a powerful spiritual discipline that transforms our hearts and minds. When Paul writes to "give thanks in all circumstances," he''s not asking us to be thankful for everything that happens, but to find something to be grateful for in every situation.

Gratitude shifts our focus from what we lack to what we have, from our problems to God''s provisions, from our fears to His faithfulness. It''s a choice we make daily, sometimes moment by moment, to acknowledge God''s goodness even when life is difficult.

Start today by naming three things you''re grateful for. Watch how this simple practice begins to change your perspective and draw you closer to the heart of God.', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', ARRAY['Gratitude', 'Thanksgiving', 'Perspective', 'Joy'], 2);

-- Insert sample prayer requests
INSERT INTO prayer_requests (id, author_id, title, content, category, status, urgency, is_anonymous, visibility) VALUES
  ('40000000-0000-0000-0000-000000000001', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'Healing for My Mother', 'Please pray for my mother who was recently diagnosed with cancer. The doctors are optimistic, but we''re trusting God for complete healing. She''s starting treatment next week and could use all the prayers and encouragement she can get. Thank you for standing with our family during this difficult time.', 'Health', 'needs_prayer', 'urgent', false, 'public'),
  ('40000000-0000-0000-0000-000000000002', 'e5f6a7b8-c9d0-1234-5678-901234ef0123', 'Job Interview Success', 'I have an important job interview next week that could really change my family''s situation. Please pray for wisdom, confidence, and that God''s will be done. I''ve been unemployed for several months and this opportunity feels like an answer to prayer.', 'Career', 'needs_prayer', 'normal', false, 'public'),
  ('40000000-0000-0000-0000-000000000003', NULL, 'Struggling with Addiction', 'I''ve been battling addiction for years and recently relapsed. I feel so ashamed and defeated. Please pray for strength to overcome this and for God''s forgiveness. I want to be free from this bondage and live the life God has planned for me.', 'Personal', 'ongoing', 'urgent', true, 'public');

-- Insert sample posts
INSERT INTO posts (id, author_id, content, type, visibility, tags, status) VALUES
  ('50000000-0000-0000-0000-000000000001', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'Praise God! After months of prayer, I finally got the job I''ve been hoping for. His timing is always perfect. Thank you to everyone who has been praying with me on this journey. "Trust in the Lord with all your heart and lean not on your own understanding." - Proverbs 3:5 🙏✨', 'testimony', 'public', ARRAY['Testimony', 'Answered Prayer', 'Job'], 'published'),
  ('50000000-0000-0000-0000-000000000002', 'c3d4e5f6-a7b8-9012-3456-789012cdef01', 'Incredible turnout at our youth service last night! 15 young people gave their hearts to Jesus. The Kingdom of Heaven is growing! Please pray for these new believers as they begin their journey with Christ. Revival is happening in our generation! 🔥', 'announcement', 'public', ARRAY['Youth Ministry', 'Salvation', 'Revival'], 'published'),
  ('50000000-0000-0000-0000-000000000003', 'd4e5f6a7-b8c9-0123-4567-890123def012', 'Our community outreach at the food bank was amazing today! We served over 200 families and shared God''s love through action. "Faith without works is dead" - James 2:26. Thank you to all the volunteers who showed up with servant hearts! ❤️', 'general', 'public', ARRAY['Community Service', 'Outreach', 'Love in Action'], 'published');

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, actor_id) VALUES
  ('b2c3d4e5-f6a7-8901-2345-678901bcdef0', 'welcome', 'Welcome to Life With Christ!', 'Your account has been approved. Welcome to our faith community!', '4c3064e2-2ab1-4838-8530-b11390721d43'),
  ('e5f6a7b8-c9d0-1234-5678-901234ef0123', 'group_invite', 'You''ve been invited to join Young Adults Bible Study', 'Sarah Johnson has invited you to join the Young Adults Bible Study group.', 'b2c3d4e5-f6a7-8901-2345-678901bcdef0'),
  ('f6a7b8c9-d0e1-2345-6789-012345f01234', 'event_reminder', 'Upcoming Event: Sunday Worship Service', 'Don''t forget about Sunday Worship Service tomorrow at 10:00 AM.', NULL);