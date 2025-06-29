import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, BookOpen, Calendar, Heart, Share2, Bookmark, Search, Filter, ChevronLeft, ChevronRight, Tag, Clock, User, MessageCircle } from 'lucide-react';

interface Devotional {
  id: number;
  title: string;
  date: string;
  verse: string;
  verseReference: string;
  content: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  readTime: number;
  likes: number;
  shares: number;
  isBookmarked: boolean;
  isLiked: boolean;
}

const mockDevotionals: Devotional[] = [
  {
    id: 1,
    title: "Walking in Faith, Not Fear",
    date: "2024-01-13",
    verse: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    verseReference: "Joshua 1:9",
    content: "Fear is one of the most common emotions we face as humans. It can paralyze us, prevent us from taking steps of faith, and keep us from experiencing the fullness of God's plan for our lives. But God's word to Joshua—and to us—is clear: 'Be strong and courageous.'\n\nThis isn't just positive thinking or self-help advice. This is a divine command backed by an eternal promise: God will be with us wherever we go. When we face uncertainty, when the path ahead seems unclear, when our circumstances feel overwhelming, we can choose faith over fear because we serve a God who never leaves us nor forsakes us.\n\nToday, whatever challenge you're facing, remember that you don't face it alone. The same God who parted the Red Sea, who brought down the walls of Jericho, who raised Jesus from the dead, is with you right now. Let His presence give you courage to take the next step.",
    author: "Pastor David Thompson",
    authorAvatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
    tags: ["Faith", "Courage", "Trust", "God's Presence"],
    readTime: 3,
    likes: 89,
    shares: 23,
    isBookmarked: false,
    isLiked: true
  },
  {
    id: 2,
    title: "The Power of Gratitude",
    date: "2024-01-12",
    verse: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    verseReference: "1 Thessalonians 5:18",
    content: "Gratitude isn't just a nice sentiment—it's a powerful spiritual discipline that transforms our hearts and minds. When Paul writes to 'give thanks in all circumstances,' he's not asking us to be thankful for everything that happens, but to find something to be grateful for in every situation.\n\nGratitude shifts our focus from what we lack to what we have, from our problems to God's provisions, from our fears to His faithfulness. It's a choice we make daily, sometimes moment by moment, to acknowledge God's goodness even when life is difficult.\n\nStart today by naming three things you're grateful for. Watch how this simple practice begins to change your perspective and draw you closer to the heart of God.",
    author: "Sarah Johnson",
    authorAvatar: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
    tags: ["Gratitude", "Thanksgiving", "Perspective", "Joy"],
    readTime: 2,
    likes: 67,
    shares: 18,
    isBookmarked: true,
    isLiked: false
  },
  {
    id: 3,
    title: "Love in Action",
    date: "2024-01-11",
    verse: "Dear children, let us not love with words or speech but with actions and in truth.",
    verseReference: "1 John 3:18",
    content: "Love is more than a feeling—it's a choice, an action, a way of life. John reminds us that true love isn't just something we say, but something we do. It's easy to say 'I love you' or 'God loves you,' but the real test of love is how we treat others when it's inconvenient, costly, or difficult.\n\nJesus demonstrated this perfectly. He didn't just tell us about God's love; He showed us by laying down His life. He fed the hungry, healed the sick, comforted the broken, and welcomed the outcast. His love was tangible, practical, and transformative.\n\nHow can you show love in action today? Perhaps it's helping a neighbor, encouraging a friend, serving at a local charity, or simply listening to someone who needs to be heard. Let your love be more than words—let it be a reflection of Christ's love in action.",
    author: "Emily Rodriguez",
    authorAvatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100",
    tags: ["Love", "Service", "Action", "Christ-like"],
    readTime: 4,
    likes: 94,
    shares: 31,
    isBookmarked: false,
    isLiked: true
  }
];

const devotionalTags = ["All", "Faith", "Love", "Hope", "Prayer", "Gratitude", "Service", "Trust", "Joy", "Peace"];

function Devotionals() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDevotional, setCurrentDevotional] = useState(0);
  const [showArchive, setShowArchive] = useState(false);

  const filteredDevotionals = mockDevotionals.filter(devotional => {
    const matchesSearch = devotional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devotional.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devotional.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === 'All' || devotional.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const todaysDevotional = filteredDevotionals[currentDevotional] || mockDevotionals[0];

  const handleReaction = (devotionalId: number, reactionType: 'like' | 'bookmark' | 'share') => {
    console.log(`${reactionType} devotional ${devotionalId}`);
  };

  const nextDevotional = () => {
    setCurrentDevotional((prev) => (prev + 1) % filteredDevotionals.length);
  };

  const prevDevotional = () => {
    setCurrentDevotional((prev) => (prev - 1 + filteredDevotionals.length) % filteredDevotionals.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Devotionals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start each day with God's Word and grow deeper in your faith journey
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setShowArchive(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                !showArchive
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Today's Devotional
            </button>
            <button
              onClick={() => setShowArchive(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                showArchive
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Archive
            </button>
          </div>
        </div>

        {!showArchive ? (
          /* Today's Devotional */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              {/* Devotional Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 mb-2">{formatDate(todaysDevotional.date)}</p>
                    <h2 className="text-3xl font-bold mb-2">{todaysDevotional.title}</h2>
                    <div className="flex items-center space-x-4 text-green-100">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{todaysDevotional.readTime} min read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{todaysDevotional.author}</span>
                      </div>
                    </div>
                  </div>
                  <img
                    src={todaysDevotional.authorAvatar}
                    alt={todaysDevotional.author}
                    className="w-16 h-16 rounded-full border-4 border-white/20"
                  />
                </div>
              </div>

              {/* Bible Verse */}
              <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50">
                <blockquote className="text-xl md:text-2xl font-light text-gray-800 italic leading-relaxed mb-4 text-center">
                  "{todaysDevotional.verse}"
                </blockquote>
                <cite className="block text-center text-lg font-semibold text-green-600">
                  - {todaysDevotional.verseReference}
                </cite>
              </div>

              {/* Devotional Content */}
              <div className="px-8 py-8">
                <div className="prose prose-lg max-w-none">
                  {todaysDevotional.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 mb-6">
                  {todaysDevotional.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleReaction(todaysDevotional.id, 'like')}
                      className={`flex items-center space-x-2 transition-colors ${
                        todaysDevotional.isLiked
                          ? 'text-red-600'
                          : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${todaysDevotional.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{todaysDevotional.likes}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(todaysDevotional.id, 'share')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">{todaysDevotional.shares}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(todaysDevotional.id, 'bookmark')}
                      className={`flex items-center space-x-2 transition-colors ${
                        todaysDevotional.isBookmarked
                          ? 'text-yellow-600'
                          : 'text-gray-600 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${todaysDevotional.isBookmarked ? 'fill-current' : ''}`} />
                      <span className="font-medium">Bookmark</span>
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevDevotional}
                      className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-500">
                      {currentDevotional + 1} of {filteredDevotionals.length}
                    </span>
                    <button
                      onClick={nextDevotional}
                      className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Archive View */
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search devotionals by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {devotionalTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Devotionals Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDevotionals.map((devotional) => (
                <div key={devotional.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{formatDate(devotional.date)}</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{devotional.readTime} min</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{devotional.title}</h3>
                    
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <p className="text-green-800 italic text-sm leading-relaxed">
                        "{devotional.verse.substring(0, 100)}..."
                      </p>
                      <p className="text-green-600 font-medium text-xs mt-2">
                        - {devotional.verseReference}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {devotional.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {devotional.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{devotional.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-4 h-4" />
                          <span>{devotional.shares}</span>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Never Miss a Devotional
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to receive daily devotionals in your email and stay connected with God's Word every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button className="btn-primary px-8 py-3">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devotionals;