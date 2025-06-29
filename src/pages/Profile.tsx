import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, User, Mail, Phone, MapPin, Calendar, Settings, Edit, Save, X, Heart, Bookmark, MessageCircle, Users, LogOut, Shield, Star, Award, Clock } from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
  membershipStatus: 'active' | 'inactive' | 'leader';
  role: string;
  groupsJoined: number;
  eventsAttended: number;
  postsShared: number;
  prayersOffered: number;
}

interface Activity {
  id: number;
  type: 'post' | 'event' | 'devotional' | 'prayer';
  title: string;
  date: string;
  status?: string;
}

const mockUser: UserProfile = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "Los Angeles, CA",
  joinDate: "2023-03-15",
  avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200",
  bio: "Passionate about growing in faith and serving others. Love connecting with fellow believers and sharing God's love through action.",
  membershipStatus: "active",
  role: "Small Group Leader",
  groupsJoined: 3,
  eventsAttended: 12,
  postsShared: 8,
  prayersOffered: 45
};

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'post',
    title: 'Shared testimony about answered prayer',
    date: '2024-01-12',
    status: 'published'
  },
  {
    id: 2,
    type: 'event',
    title: 'Youth Group Game Night',
    date: '2024-01-16',
    status: 'rsvped'
  },
  {
    id: 3,
    type: 'devotional',
    title: 'Walking in Faith, Not Fear',
    date: '2024-01-13',
    status: 'bookmarked'
  },
  {
    id: 4,
    type: 'prayer',
    title: 'Prayed for healing request',
    date: '2024-01-11',
    status: 'prayed'
  }
];

const mockGroups = [
  {
    id: 1,
    name: "Young Adults Bible Study",
    role: "Leader",
    joinDate: "2023-03-20",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 2,
    name: "Women's Prayer Circle",
    role: "Member",
    joinDate: "2023-06-10",
    image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 3,
    name: "Community Service Team",
    role: "Coordinator",
    joinDate: "2023-04-05",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'bookmarks' | 'events' | 'groups'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(mockUser);

  const handleSave = () => {
    // Handle save logic
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(mockUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return MessageCircle;
      case 'event': return Calendar;
      case 'devotional': return Bookmark;
      case 'prayer': return Heart;
      default: return MessageCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'post': return 'text-blue-600';
      case 'event': return 'text-green-600';
      case 'devotional': return 'text-purple-600';
      case 'prayer': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMembershipBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          <Shield className="w-3 h-3 mr-1" />
          Active Member
        </span>;
      case 'leader':
        return <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          <Star className="w-3 h-3 mr-1" />
          Community Leader
        </span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
          <User className="w-3 h-3 mr-1" />
          Member
        </span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
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
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="relative">
                <img
                  src={editedProfile.avatar}
                  alt={editedProfile.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent focus:outline-none"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-gray-900">{editedProfile.name}</h1>
                    )}
                    <p className="text-blue-600 font-medium">{editedProfile.role}</p>
                    <div className="mt-2">
                      {getMembershipBadge(editedProfile.membershipStatus)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedProfile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedProfile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedProfile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Joined {new Date(editedProfile.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{editedProfile.groupsJoined}</div>
                    <div className="text-sm text-gray-600">Groups Joined</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{editedProfile.eventsAttended}</div>
                    <div className="text-sm text-gray-600">Events Attended</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{editedProfile.postsShared}</div>
                    <div className="text-sm text-gray-600">Posts Shared</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{editedProfile.prayersOffered}</div>
                    <div className="text-sm text-gray-600">Prayers Offered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{editedProfile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: User },
                { key: 'posts', label: 'My Posts', icon: MessageCircle },
                { key: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
                { key: 'events', label: 'Events', icon: Calendar },
                { key: 'groups', label: 'Groups', icon: Users }
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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {mockActivities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`p-2 rounded-lg bg-white ${getActivityColor(activity.type)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{activity.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(activity.date).toLocaleDateString()}</span>
                              {activity.status && (
                                <>
                                  <span>•</span>
                                  <span className="capitalize">{activity.status}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Groups Tab */}
            {activeTab === 'groups' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">My Groups</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockGroups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{group.name}</h4>
                          <p className="text-sm text-blue-600">{group.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Joined {new Date(group.joinDate).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/groups/${group.id}`}
                        className="btn-primary w-full text-center"
                      >
                        View Group
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs would show filtered content */}
            {activeTab !== 'overview' && activeTab !== 'groups' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === 'posts' && 'No posts yet'}
                  {activeTab === 'bookmarks' && 'No bookmarks yet'}
                  {activeTab === 'events' && 'No events yet'}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'posts' && 'Start sharing your faith journey with the community'}
                  {activeTab === 'bookmarks' && 'Bookmark devotionals and posts to read later'}
                  {activeTab === 'events' && 'RSVP to events to see them here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;