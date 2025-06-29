import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, Search, Filter, Users, Calendar, MapPin, ArrowRight, Star, Heart, MessageCircle, ArrowLeft } from 'lucide-react';

interface Group {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  members: number;
  isPublic: boolean;
  location: string;
  meetingTime: string;
  rating: number;
  tags: string[];
  leader: string;
  nextMeeting: string;
}

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Young Adults Bible Study",
    description: "A vibrant community of young adults exploring God's Word together through interactive discussions and fellowship.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Bible Study",
    members: 24,
    isPublic: true,
    location: "Fellowship Hall",
    meetingTime: "Sundays 6:00 PM",
    rating: 4.8,
    tags: ["Young Adults", "Bible Study", "Fellowship"],
    leader: "Sarah Johnson",
    nextMeeting: "This Sunday"
  },
  {
    id: 2,
    name: "Marriage & Family Ministry",
    description: "Strengthening marriages and families through biblical principles, prayer, and mutual support.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Family",
    members: 18,
    isPublic: true,
    location: "Room 201",
    meetingTime: "Saturdays 10:00 AM",
    rating: 4.9,
    tags: ["Marriage", "Family", "Relationships"],
    leader: "David & Lisa Thompson",
    nextMeeting: "Saturday"
  },
  {
    id: 3,
    name: "Women's Prayer Circle",
    description: "A supportive community of women coming together in prayer, worship, and spiritual encouragement.",
    image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Prayer",
    members: 32,
    isPublic: true,
    location: "Prayer Room",
    meetingTime: "Wednesdays 7:00 PM",
    rating: 4.7,
    tags: ["Women", "Prayer", "Worship"],
    leader: "Emily Rodriguez",
    nextMeeting: "Tomorrow"
  },
  {
    id: 4,
    name: "Men's Discipleship Group",
    description: "Men growing together in faith, accountability, and Christian brotherhood through study and service.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Discipleship",
    members: 15,
    isPublic: true,
    location: "Conference Room",
    meetingTime: "Fridays 6:30 AM",
    rating: 4.6,
    tags: ["Men", "Discipleship", "Accountability"],
    leader: "Michael Chen",
    nextMeeting: "Friday"
  },
  {
    id: 5,
    name: "Youth Ministry (13-18)",
    description: "High energy youth group focused on building faith, friendships, and fun in a Christ-centered environment.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Youth",
    members: 45,
    isPublic: true,
    location: "Youth Center",
    meetingTime: "Sundays 4:00 PM",
    rating: 4.9,
    tags: ["Youth", "Teens", "Games"],
    leader: "Pastor Jake",
    nextMeeting: "This Sunday"
  },
  {
    id: 6,
    name: "Senior Saints Fellowship",
    description: "A warm community for seniors to share wisdom, prayer, and fellowship while growing in faith together.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fellowship",
    members: 28,
    isPublic: true,
    location: "Senior Center",
    meetingTime: "Thursdays 2:00 PM",
    rating: 4.8,
    tags: ["Seniors", "Fellowship", "Wisdom"],
    leader: "Dorothy Williams",
    nextMeeting: "Thursday"
  }
];

const categories = ["All", "Bible Study", "Prayer", "Fellowship", "Youth", "Family", "Discipleship", "Service"];
const sortOptions = ["Most Popular", "Newest", "Alphabetical", "Most Members"];

function Groups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case 'Most Popular':
        return b.rating - a.rating;
      case 'Most Members':
        return b.members - a.members;
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      case 'Newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

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
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Small Groups</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your community and grow together in faith. Join a small group that matches your interests and schedule.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedGroups.length} of {mockGroups.length} groups
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Groups Grid/List */}
        {sortedGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {sortedGroups.map((group) => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                className={`block group ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img
                      src={group.image}
                      alt={group.name}
                      className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {group.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{group.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {group.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{group.meetingTime}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{group.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Led by {group.leader}
                      </div>
                      <div className="flex items-center space-x-2 text-blue-600 font-medium group-hover:text-blue-700">
                        <span>Join Group</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see a group that fits?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We'd love to help you start a new small group or connect you with others who share your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Start a New Group
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;