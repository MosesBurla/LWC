import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, Heart, MessageCircle, Send, Filter, Search, CheckCircle, Clock, User, Flag, Edit, Trash2, Plus } from 'lucide-react';

interface PrayerRequest {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
  status: 'needs-prayer' | 'answered' | 'ongoing';
  prayers: number;
  comments: number;
  isPrayed: boolean;
  isOwner: boolean;
  category: string;
  isAnonymous: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const mockPrayerRequests: PrayerRequest[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "Healing for My Mother",
    content: "Please pray for my mother who was recently diagnosed with cancer. The doctors are optimistic, but we're trusting God for complete healing. She's starting treatment next week and could use all the prayers and encouragement she can get. Thank you for standing with our family during this difficult time.",
    timestamp: "2 hours ago",
    status: "needs-prayer",
    prayers: 45,
    comments: 12,
    isPrayed: true,
    isOwner: false,
    category: "Health",
    isAnonymous: false
  },
  {
    id: 2,
    author: "Anonymous",
    avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "Struggling with Addiction",
    content: "I've been battling addiction for years and recently relapsed. I feel so ashamed and defeated. Please pray for strength to overcome this and for God's forgiveness. I want to be free from this bondage and live the life God has planned for me.",
    timestamp: "5 hours ago",
    status: "ongoing",
    prayers: 67,
    comments: 8,
    isPrayed: false,
    isOwner: false,
    category: "Personal",
    isAnonymous: true
  },
  {
    id: 3,
    author: "Michael Chen",
    avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "Job Interview Success - ANSWERED!",
    content: "Thank you all for praying for my job interview last week. I'm thrilled to share that I got the position! God's timing is perfect, and I'm so grateful for this community's prayer support. Your prayers made all the difference!",
    timestamp: "1 day ago",
    status: "answered",
    prayers: 89,
    comments: 23,
    isPrayed: true,
    isOwner: false,
    category: "Career",
    isAnonymous: false
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "Marriage Restoration",
    content: "My husband and I are going through a very difficult time in our marriage. We're both committed to working things out, but we need God's wisdom and healing in our relationship. Please pray for reconciliation, understanding, and renewed love between us.",
    timestamp: "2 days ago",
    status: "ongoing",
    prayers: 34,
    comments: 15,
    isPrayed: false,
    isOwner: false,
    category: "Relationships",
    isAnonymous: false
  }
];

const mockComments: { [key: number]: Comment[] } = {
  1: [
    {
      id: 1,
      author: "Pastor David",
      avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Praying for complete healing and peace for your mother and family. God is faithful! 🙏",
      timestamp: "1 hour ago"
    },
    {
      id: 2,
      author: "Lisa Martinez",
      avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Lifting your mother up in prayer. May God's healing power be upon her.",
      timestamp: "30 minutes ago"
    }
  ]
};

const categories = ["All", "Health", "Personal", "Career", "Relationships", "Family", "Financial", "Spiritual"];
const statusFilters = ["All", "Needs Prayer", "Ongoing", "Answered"];

function PrayerRequests() {
  const [newRequest, setNewRequest] = useState('');
  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestCategory, setNewRequestCategory] = useState('Personal');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isAdmin] = useState(false);

  const filteredRequests = mockPrayerRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || request.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Needs Prayer' && request.status === 'needs-prayer') ||
                         (selectedStatus === 'Ongoing' && request.status === 'ongoing') ||
                         (selectedStatus === 'Answered' && request.status === 'answered');
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRequestTitle.trim() && newRequest.trim()) {
      console.log('New prayer request:', {
        title: newRequestTitle,
        content: newRequest,
        category: newRequestCategory,
        isAnonymous
      });
      setNewRequestTitle('');
      setNewRequest('');
      setNewRequestCategory('Personal');
      setIsAnonymous(false);
    }
  };

  const handlePray = (requestId: number) => {
    console.log(`Praying for request ${requestId}`);
  };

  const handleStatusChange = (requestId: number, newStatus: string) => {
    console.log(`Changing status of request ${requestId} to ${newStatus}`);
  };

  const toggleComments = (requestId: number) => {
    setShowComments(prev => ({ ...prev, [requestId]: !prev[requestId] }));
  };

  const handleCommentSubmit = (requestId: number, e: React.FormEvent) => {
    e.preventDefault();
    const comment = newComment[requestId];
    if (comment?.trim()) {
      console.log(`Comment on request ${requestId}:`, comment);
      setNewComment(prev => ({ ...prev, [requestId]: '' }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needs-prayer': return 'bg-red-100 text-red-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'answered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'needs-prayer': return 'Needs Prayer';
      case 'ongoing': return 'Ongoing';
      case 'answered': return 'Answered';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health': return 'bg-blue-100 text-blue-800';
      case 'Personal': return 'bg-purple-100 text-purple-800';
      case 'Career': return 'bg-green-100 text-green-800';
      case 'Relationships': return 'bg-pink-100 text-pink-800';
      case 'Family': return 'bg-orange-100 text-orange-800';
      case 'Financial': return 'bg-yellow-100 text-yellow-800';
      case 'Spiritual': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prayer Requests</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your burdens and celebrate answered prayers with our faith community
          </p>
        </div>

        {/* Submit New Prayer Request */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Submit Prayer Request</h2>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <input
                type="text"
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
                placeholder="Prayer request title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            
            <div>
              <textarea
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="Share your prayer request with the community..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                rows={4}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={newRequestCategory}
                onChange={(e) => setNewRequestCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>

              <button
                type="submit"
                disabled={!newRequestTitle.trim() || !newRequest.trim()}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search prayer requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {statusFilters.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prayer Requests List */}
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Request Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.avatar}
                      alt={request.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.isAnonymous ? 'Anonymous' : request.author}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{request.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(request.category)}`}>
                      {request.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">{request.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{request.content}</p>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handlePray(request.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        request.isPrayed
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${request.isPrayed ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">Pray ({request.prayers})</span>
                    </button>
                    
                    <button
                      onClick={() => toggleComments(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Comments ({request.comments})</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {request.isOwner && (
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                        className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="needs-prayer">Needs Prayer</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="answered">Answered</option>
                      </select>
                    )}
                    
                    {isAdmin && (
                      <div className="flex items-center space-x-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-orange-600 rounded-lg hover:bg-orange-50">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {showComments[request.id] && (
                <div className="border-t border-gray-100">
                  {/* Add Comment */}
                  <div className="p-6 border-b border-gray-100">
                    <form onSubmit={(e) => handleCommentSubmit(request.id, e)}>
                      <div className="flex space-x-3">
                        <img
                          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={newComment[request.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [request.id]: e.target.value }))}
                            placeholder="Share encouragement or support..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!newComment[request.id]?.trim()}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="p-6 space-y-4">
                    {mockComments[request.id]?.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-medium text-gray-900 text-sm">{comment.author}</h4>
                            <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{comment.timestamp}</span>
                            <button className="hover:text-gray-700">Like</button>
                            <button className="hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Power of Prayer
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              "Therefore confess your sins to each other and pray for each other so that you may be healed. 
              The prayer of a righteous person is powerful and effective." - James 5:16
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Submit Prayer Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrayerRequests;