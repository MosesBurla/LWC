import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Cross, ArrowLeft, Users, Calendar, MapPin, Clock, Star, Heart, MessageCircle, Share2, Settings, UserPlus, UserMinus, Send, Image, Smile } from 'lucide-react';

interface GroupMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  joinedDate: string;
}

interface GroupPost {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

interface GroupEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
}

function GroupDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'members'>('posts');
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPost, setNewPost] = useState('');

  // Mock data - in real app, this would come from API based on group ID
  const group = {
    id: 1,
    name: "Young Adults Bible Study",
    description: "A vibrant community of young adults exploring God's Word together through interactive discussions and fellowship. We meet weekly to dive deep into Scripture, share our faith journeys, and support one another in our walk with Christ.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Bible Study",
    members: 24,
    location: "Fellowship Hall",
    meetingTime: "Sundays 6:00 PM",
    rating: 4.8,
    leader: "Sarah Johnson",
    leaderAvatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
    nextMeeting: "This Sunday",
    purpose: "To create a welcoming space where young adults can grow in their faith, build meaningful relationships, and discover God's purpose for their lives through studying His Word together.",
    guidelines: [
      "Respect all members and their perspectives",
      "Keep discussions centered on biblical truth",
      "Maintain confidentiality of personal shares",
      "Arrive on time and participate actively",
      "Support one another in prayer and encouragement"
    ]
  };

  const mockPosts: GroupPost[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Looking forward to our study on Philippians 4:13 this Sunday! 'I can do all things through Christ who strengthens me.' What does this verse mean to you in your current season of life?",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 8,
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Thank you all for your prayers during my job search. I'm excited to share that I got the position! God's timing is perfect. 🙏",
      timestamp: "1 day ago",
      likes: 18,
      comments: 15,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Reminder: We're collecting donations for the local food bank this week. Let's show God's love through action!",
      timestamp: "3 days ago",
      likes: 9,
      comments: 4,
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const mockEvents: GroupEvent[] = [
    {
      id: 1,
      title: "Weekly Bible Study - Philippians",
      date: "2024-01-14",
      time: "6:00 PM",
      location: "Fellowship Hall",
      description: "Continuing our study through the book of Philippians, focusing on joy in all circumstances.",
      attendees: 18
    },
    {
      id: 2,
      title: "Group Bowling Night",
      date: "2024-01-20",
      time: "7:00 PM",
      location: "Strike Zone Bowling",
      description: "Fun fellowship time with games, food, and great conversation!",
      attendees: 12
    }
  ];

  const mockMembers: GroupMember[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Group Leader",
      joinedDate: "Jan 2023"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Co-Leader",
      joinedDate: "Mar 2023"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Member",
      joinedDate: "Jun 2023"
    }
  ];

  const handleJoinGroup = () => {
    setIsMember(!isMember);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      // Handle post submission
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Life With Christ</span>
                <div className="text-xs text-gray-500 -mt-1">Community Platform</div>
              </div>
            </Link>
            <Link to="/groups" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Groups</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Group Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={group.image}
              alt={group.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  {group.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{group.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{group.name}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{group.meetingTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{group.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  src={group.leaderAvatar}
                  alt={group.leader}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Led by {group.leader}</p>
                  <p className="text-sm text-gray-500">Group Leader</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleJoinGroup}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isMember
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isMember ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isMember ? 'Leave Group' : 'Join Group'}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                
                {isAdmin && (
                  <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Manage</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Group</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <p className="text-gray-600">{group.purpose}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Guidelines</h3>
                <ul className="space-y-2">
                  {group.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'posts', label: 'Posts', icon: MessageCircle },
                { key: 'events', label: 'Events', icon: Calendar },
                { key: 'members', label: 'Members', icon: Users }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {isMember && (
                  <form onSubmit={handlePostSubmit} className="bg-gray-50 rounded-xl p-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share something with the group..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex space-x-2">
                        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200">
                          <Image className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200">
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={!newPost.trim()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                      </button>
                    </div>
                  </form>
                )}

                {mockPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post image"
                            className="w-full max-w-md rounded-lg mb-4"
                          />
                        )}
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                {mockEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="btn-primary">
                          RSVP
                        </button>
                        <button className="btn-secondary">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMembers.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-xl p-6 text-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                    <p className="text-xs text-gray-500">Joined {member.joinedDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;