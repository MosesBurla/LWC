import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, ArrowLeft, Calendar, Clock, MapPin, Users, Video, Filter, Search, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  meetLink?: string;
  image: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  isRsvped: boolean;
  isPast: boolean;
  tags: string[];
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Sunday Worship Service",
    description: "Join us for worship, prayer, and fellowship as we gather to praise God and hear His Word.",
    date: "2024-01-14",
    time: "10:00 AM",
    location: "Main Sanctuary",
    meetLink: "https://meet.google.com/abc-defg-hij",
    image: "https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Worship",
    attendees: 245,
    maxAttendees: 300,
    organizer: "Pastor David",
    isRsvped: false,
    isPast: false,
    tags: ["Worship", "Community", "Prayer"]
  },
  {
    id: 2,
    title: "Youth Group Game Night",
    description: "Fun games, snacks, and great fellowship for teens. Bring your friends!",
    date: "2024-01-16",
    time: "7:00 PM",
    location: "Fellowship Hall",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Youth",
    attendees: 35,
    maxAttendees: 50,
    organizer: "Pastor Jake",
    isRsvped: true,
    isPast: false,
    tags: ["Youth", "Games", "Fellowship"]
  },
  {
    id: 3,
    title: "Community Outreach",
    description: "Serving meals to those in need in our community. Come with a heart to serve!",
    date: "2024-01-18",
    time: "9:00 AM",
    location: "Downtown Food Bank",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Service",
    attendees: 50,
    organizer: "Sarah Johnson",
    isRsvped: false,
    isPast: false,
    tags: ["Service", "Community", "Outreach"]
  },
  {
    id: 4,
    title: "Women's Bible Study",
    description: "Studying the book of Philippians together. All women welcome!",
    date: "2024-01-19",
    time: "10:00 AM",
    location: "Room 201",
    meetLink: "https://meet.google.com/xyz-uvwx-rst",
    image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Study",
    attendees: 22,
    maxAttendees: 30,
    organizer: "Emily Rodriguez",
    isRsvped: false,
    isPast: false,
    tags: ["Women", "Bible Study", "Philippians"]
  },
  {
    id: 5,
    title: "Christmas Concert",
    description: "A beautiful evening of Christmas carols and worship music.",
    date: "2023-12-24",
    time: "7:00 PM",
    location: "Main Sanctuary",
    image: "https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Worship",
    attendees: 180,
    organizer: "Music Ministry",
    isRsvped: true,
    isPast: true,
    tags: ["Christmas", "Music", "Concert"]
  }
];

const categories = ["All", "Worship", "Study", "Youth", "Service", "Fellowship", "Conference"];
const locations = ["All Locations", "Main Sanctuary", "Fellowship Hall", "Room 201", "Youth Center", "Online"];

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || event.location === selectedLocation;
    const matchesTimeFilter = viewMode === 'upcoming' ? !event.isPast : event.isPast;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesTimeFilter;
  });

  const handleRsvp = (eventId: number) => {
    // Handle RSVP logic
    console.log(`RSVP for event ${eventId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Worship': return 'bg-blue-100 text-blue-800';
      case 'Youth': return 'bg-green-100 text-green-800';
      case 'Service': return 'bg-purple-100 text-purple-800';
      case 'Study': return 'bg-orange-100 text-orange-800';
      case 'Fellowship': return 'bg-pink-100 text-pink-800';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for worship, fellowship, and community service opportunities. Stay connected and grow together in faith.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setViewMode('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                viewMode === 'upcoming'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setViewMode('past')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                viewMode === 'past'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or tags..."
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

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} {viewMode} events
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLocation('All Locations');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  {event.isRsvped && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  {event.isPast && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        Past Event
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      <span>
                        {event.attendees} attending
                        {event.maxAttendees && ` (${event.maxAttendees} max)`}
                      </span>
                    </div>
                    {event.meetLink && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>Online meeting available</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    Organized by {event.organizer}
                  </div>

                  <div className="flex space-x-3">
                    {!event.isPast && (
                      <button
                        onClick={() => handleRsvp(event.id)}
                        className={`flex-1 ${
                          event.isRsvped
                            ? 'btn-secondary'
                            : 'btn-primary'
                        }`}
                      >
                        {event.isRsvped ? 'RSVP\'d ✓' : 'RSVP'}
                      </button>
                    )}
                    <button className="btn-secondary">
                      Details
                    </button>
                    {event.meetLink && (
                      <a
                        href={event.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center space-x-1"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to organize an event?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Have an idea for a community event, Bible study, or fellowship gathering? We'd love to help you make it happen!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Propose Event
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;