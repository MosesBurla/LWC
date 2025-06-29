import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, Users, MessageSquare, Calendar, BarChart3, Settings, Shield, CheckCircle, XCircle, Eye, Edit, Trash2, Flag, Send, Bell, UserCheck, UserX, TrendingUp, Activity } from 'lucide-react';

interface PendingUser {
  id: number;
  name: string;
  email: string;
  location: string;
  joinDate: string;
  reason: string;
  avatar: string;
}

interface ReportedContent {
  id: number;
  type: 'post' | 'comment' | 'user';
  content: string;
  author: string;
  reporter: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

interface ActivityMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const mockPendingUsers: PendingUser[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    location: "New York, NY",
    joinDate: "2024-01-13",
    reason: "Spiritual Growth",
    avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    location: "Miami, FL",
    joinDate: "2024-01-12",
    reason: "Community Fellowship",
    avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@email.com",
    location: "Chicago, IL",
    joinDate: "2024-01-11",
    reason: "Bible Study",
    avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

const mockReportedContent: ReportedContent[] = [
  {
    id: 1,
    type: 'post',
    content: "This post contains inappropriate language and doesn't align with our community values...",
    author: "Anonymous User",
    reporter: "Sarah Johnson",
    reason: "Inappropriate content",
    timestamp: "2 hours ago",
    status: 'pending'
  },
  {
    id: 2,
    type: 'comment',
    content: "Spam comment with external links...",
    author: "Spam Account",
    reporter: "Michael Chen",
    reason: "Spam",
    timestamp: "5 hours ago",
    status: 'pending'
  }
];

const activityMetrics: ActivityMetric[] = [
  {
    label: "Active Users",
    value: 1247,
    change: 12,
    icon: Users,
    color: "text-blue-600"
  },
  {
    label: "New Posts",
    value: 89,
    change: 8,
    icon: MessageSquare,
    color: "text-green-600"
  },
  {
    label: "Events This Month",
    value: 24,
    change: 15,
    icon: Calendar,
    color: "text-purple-600"
  },
  {
    label: "Prayer Requests",
    value: 156,
    change: -5,
    icon: Activity,
    color: "text-red-600"
  }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'groups' | 'notifications'>('overview');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleApproveUser = (userId: number) => {
    console.log(`Approving user ${userId}`);
  };

  const handleRejectUser = (userId: number) => {
    console.log(`Rejecting user ${userId}`);
  };

  const handleResolveReport = (reportId: number, action: 'resolve' | 'dismiss') => {
    console.log(`${action} report ${reportId}`);
  };

  const handleSendNotification = () => {
    if (notificationMessage.trim()) {
      console.log('Sending notification:', notificationMessage);
      setNotificationMessage('');
    }
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    console.log(`${action} users:`, selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
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
                <div className="text-xs text-gray-500 -mt-1">Admin Dashboard</div>
              </div>
            </Link>
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your community platform</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'users', label: 'User Management', icon: Users },
                { key: 'content', label: 'Content Moderation', icon: MessageSquare },
                { key: 'groups', label: 'Group Management', icon: Users },
                { key: 'notifications', label: 'Notifications', icon: Bell }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-red-500 text-red-600'
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
              <div className="space-y-8">
                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activityMetrics.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                          </div>
                          <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex items-center mt-4">
                          <TrendingUp className={`w-4 h-4 mr-1 ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                          <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change >= 0 ? '+' : ''}{metric.change}%
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{mockPendingUsers.length}</p>
                    <p className="text-blue-700 text-sm">New user registrations</p>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="mt-4 btn-primary"
                    >
                      Review Users
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Content Reports</h3>
                    <p className="text-3xl font-bold text-red-600 mb-2">{mockReportedContent.length}</p>
                    <p className="text-red-700 text-sm">Flagged content items</p>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Review Content
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Active Groups</h3>
                    <p className="text-3xl font-bold text-green-600 mb-2">25</p>
                    <p className="text-green-700 text-sm">Community groups</p>
                    <button
                      onClick={() => setActiveTab('groups')}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Manage Groups
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Pending User Approvals</h2>
                  {selectedUsers.length > 0 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBulkAction('approve')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Approve Selected ({selectedUsers.length})</span>
                      </button>
                      <button
                        onClick={() => handleBulkAction('reject')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <UserX className="w-4 h-4" />
                        <span>Reject Selected</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {mockPendingUsers.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(prev => [...prev, user.id]);
                            } else {
                              setSelectedUsers(prev => prev.filter(id => id !== user.id));
                            }
                          }}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span>📍 {user.location}</span>
                            <span>📅 Applied {new Date(user.joinDate).toLocaleDateString()}</span>
                            <span>💭 {user.reason}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveUser(user.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectUser(user.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Moderation Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Reported Content</h2>
                
                <div className="space-y-4">
                  {mockReportedContent.map((report) => (
                    <div key={report.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              report.type === 'post' ? 'bg-blue-100 text-blue-800' :
                              report.type === 'comment' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {report.type}
                            </span>
                            <span className="text-sm text-gray-500">{report.timestamp}</span>
                          </div>
                          <p className="text-gray-900 mb-2">{report.content}</p>
                          <div className="text-sm text-gray-600">
                            <p><strong>Author:</strong> {report.author}</p>
                            <p><strong>Reported by:</strong> {report.reporter}</p>
                            <p><strong>Reason:</strong> {report.reason}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleResolveReport(report.id, 'resolve')}
                            className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Resolve</span>
                          </button>
                          <button
                            onClick={() => handleResolveReport(report.id, 'dismiss')}
                            className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Dismiss</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Group Management Tab */}
            {activeTab === 'groups' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Management</h3>
                <p className="text-gray-600">Group management features coming soon...</p>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Send Community Notification</h2>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notification Message
                      </label>
                      <textarea
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        placeholder="Enter your message to the community..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>All Users</option>
                        <option>Group Leaders</option>
                        <option>Active Members</option>
                        <option>New Members</option>
                      </select>
                      
                      <button
                        onClick={handleSendNotification}
                        disabled={!notificationMessage.trim()}
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Notification</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">Welcome to our new members!</p>
                      <p className="text-sm text-gray-600">Sent to All Users • 2 days ago</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">Upcoming community service event</p>
                      <p className="text-sm text-gray-600">Sent to Active Members • 1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;