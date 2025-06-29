import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: '2024-01-14',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    attendees: 245,
    rsvpCount: 189,
    description: 'Join us for worship, prayer, and fellowship',
    image: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Worship',
    isRsvped: false
  },
  {
    id: 2,
    title: 'Youth Group Game Night',
    date: '2024-01-16',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    attendees: 35,
    rsvpCount: 28,
    description: 'Fun games, snacks, and great fellowship for teens',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Youth',
    isRsvped: true
  },
  {
    id: 3,
    title: 'Community Outreach',
    date: '2024-01-18',
    time: '9:00 AM',
    location: 'Downtown Food Bank',
    attendees: 50,
    rsvpCount: 42,
    description: 'Serving meals to those in need in our community',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Service',
    isRsvped: false
  },
  {
    id: 4,
    title: 'Women\'s Bible Study',
    date: '2024-01-19',
    time: '10:00 AM',
    location: 'Room 201',
    attendees: 22,
    rsvpCount: 18,
    description: 'Studying the book of Philippians together',
    image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Study',
    isRsvped: false
  }
];

function UpcomingEvents() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Worship': return 'bg-blue-100 text-blue-800';
      case 'Youth': return 'bg-green-100 text-green-800';
      case 'Service': return 'bg-purple-100 text-purple-800';
      case 'Study': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRsvp = (eventId: number) => {
    // Handle RSVP logic here
    console.log(`RSVP for event ${eventId}`);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and community service opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="card-hover p-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                {event.isRsvped && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{event.rsvpCount} of {event.attendees} attending</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
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
                  <button className="btn-secondary">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;