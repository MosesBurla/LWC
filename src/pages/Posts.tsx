import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Image, Video, Smile, Send, Flag, Edit, Trash2, Users, Calendar, MapPin } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  role: string;
  content: string;
  image?: string;
  video?: string;
  timestamp: string;
  likes: number;
  prayers: number;
  amens: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isPrayed: boolean;
  isAmened: boolean;
  isBookmarked: boolean;
  category: string;
  group?: string;
  event?: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
    role: "Small Group Leader",
    content: "Praise God! After months of prayer, I finally got the job I've been hoping for. His timing is always perfect. Thank you to everyone who has been praying with me on this journey. 'Trust in the Lord with all your heart and lean not on your own understanding.' - Proverbs 3:5 🙏✨",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    timestamp: "2 hours ago",
    likes: 45,
    prayers: 23,
    amens: 18,
    comments: 12,
    shares: 5,
    isLiked: true,
    isPrayed: false,
    isAmened: true,
    isBookmarked: false,
    category: "Testimony",
    group: "Young Adults Bible Study"
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
    role: "Youth Pastor",
    content: "Incredible turnout at our youth service last night! 15 young people gave their hearts to Jesus. The Kingdom of Heaven is growing! Please pray for these new believers as they begin their journey with Christ. Revival is happening in our generation! 🔥",
    timestamp: "5 hours ago",
    likes: 67,
    prayers: 34,
    amens: 28,
    comments: 19,
    shares: 8,
    isLiked: false,
    isPrayed: true,
    isAmened: true,
    isBookmarked: true,
    category: "Ministry Update",
    event: "Youth Revival Night"
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100",
    role: "Women's Ministry Coordinator",
    content: "Our community outreach at the food bank was amazing today! We served over 200 families and shared God's love through action. 'Faith without works is dead' - James 2:26. Thank you to all the volunteers who showed up with servant hearts! ❤️",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
    timestamp: "1 day ago",
    likes: 52,
    prayers: 15,
    amens: 31,
    comments: 16,
    shares: 12,
    isLiked: true,
    isPrayed: false,
    isAmened: false,
    isBookmarked: false,
    category: "Service",
    event: "Community Outreach"
  },
  {
    id: 4,
    author: "David Thompson",
    avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
    role: "Men's Ministry Leader",
    content: "Brothers, let's remember that our strength comes from the Lord. In times of struggle, we don't walk alone. 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' - Joshua 1:9. Who needs prayer today?",
    timestamp: "2 days ago",
    likes: 38,
    prayers: 42,
    amens: 25,
    comments: 14,
    shares: 6,
    isLiked: false,
    isPrayed: true,
    isAmened: true,
    isBookmarked: true,
    category: "Encouragement",
    group: "Men's Discipleship Group"
  }
];

const mockComments: { [key: number]: Comment[] } = {
  1: [
    {
      id: 1,
      author: "Lisa Martinez",
      avatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "So happy for you Sarah! God's timing is indeed perfect. Congratulations! 🎉",
      timestamp: "1 hour ago",
      likes: 5
    },
    {
      id: 2,
      author: "James Wilson",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Praise the Lord! This is such an encouragement to all of us waiting on God's timing.",
      timestamp: "45 minutes ago",
      likes: 3
    }
  ]
};

function Posts() {
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isAdmin] = useState(false); // This would come from user context

  const categories = ['All', 'Testimony', 'Prayer Request', 'Ministry Update', 'Encouragement', 'Service', 'Question'];

  const filteredPosts = selectedCategory === 'All' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  const handleReaction = (postId: number, reactionType: 'like' | 'pray' | 'amen' | 'bookmark') => {
    // Handle reaction logic
    console.log(`${reactionType} post ${postId}`);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      // Handle post submission
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  const handleCommentSubmit = (postId: number, e: React.FormEvent) => {
    e.preventDefault();
    const comment = newComment[postId];
    if (comment?.trim()) {
      // Handle comment submission
      console.log(`Comment on post ${postId}:`, comment);
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const formatTimestamp = (timestamp: string) => {
    // Simple timestamp formatting - in real app, use a library like date-fns
    return timestamp;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Posts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share testimonies, prayer requests, and stay connected with your faith community
          </p>
        </div>

        {/* Create New Post */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your testimony, prayer request, or encouragement with the community..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Image className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-sm text-blue-600">{post.role}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <span>{formatTimestamp(post.timestamp)}</span>
                        {post.group && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{post.group}</span>
                            </div>
                          </>
                        )}
                        {post.event && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.event}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.category === 'Testimony' ? 'bg-green-100 text-green-800' :
                      post.category === 'Prayer Request' ? 'bg-purple-100 text-purple-800' :
                      post.category === 'Ministry Update' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'Encouragement' ? 'bg-yellow-100 text-yellow-800' :
                      post.category === 'Service' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.category}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Post Media */}
              {post.image && (
                <div className="px-6 pb-4">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="w-full rounded-lg object-cover max-h-96"
                  />
                </div>
              )}

              {/* Reaction Counts */}
              <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{post.likes} likes</span>
                    <span>{post.prayers} prayers</span>
                    <span>{post.amens} amens</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="hover:text-gray-700"
                    >
                      {post.comments} comments
                    </button>
                    <span>{post.shares} shares</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleReaction(post.id, 'like')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.isLiked
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">Like</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'pray')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.isPrayed
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">🙏</span>
                      <span className="text-sm font-medium">Pray</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'amen')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.isAmened
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">✨</span>
                      <span className="text-sm font-medium">Amen</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'bookmark')}
                      className={`p-2 rounded-lg transition-colors ${
                        post.isBookmarked
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="border-t border-gray-100">
                  {/* Add Comment */}
                  <div className="p-6 border-b border-gray-100">
                    <form onSubmit={(e) => handleCommentSubmit(post.id, e)}>
                      <div className="flex space-x-3">
                        <img
                          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Write a comment..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!newComment[post.id]?.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="p-6 space-y-4">
                    {mockComments[post.id]?.map((comment) => (
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
                            <button className="hover:text-gray-700">Like ({comment.likes})</button>
                            <button className="hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              {isAdmin && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded-lg">
                      <Flag className="w-3 h-3" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;