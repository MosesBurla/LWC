import React from 'react';
import { Star, Calendar, BookOpen, Users, ArrowRight } from 'lucide-react';

const topPicks = [
  {
    id: 1,
    type: 'group',
    title: 'New Believers Welcome',
    description: 'Perfect for those starting their faith journey',
    rating: 4.9,
    participants: 45,
    nextMeeting: 'This Sunday',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Small Group'
  },
  {
    id: 2,
    type: 'event',
    title: 'Community Service Day',
    description: 'Serving our local food bank together',
    rating: 4.8,
    participants: 78,
    nextMeeting: 'Saturday 9 AM',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Service'
  },
  {
    id: 3,
    type: 'devotional',
    title: 'Walking with Jesus',
    description: '30-day devotional series on discipleship',
    rating: 4.9,
    participants: 234,
    nextMeeting: 'Daily',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Devotional'
  }
];

function TopPicks() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'group': return Users;
      case 'event': return Calendar;
      case 'devotional': return BookOpen;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Small Group': return 'bg-blue-100 text-blue-800';
      case 'Service': return 'bg-green-100 text-green-800';
      case 'Devotional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="section-padding gradient-bg">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Picks for You</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized recommendations based on your interests and location
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topPicks.map((pick) => {
            const IconComponent = getIcon(pick.type);
            return (
              <div key={pick.id} className="card-hover p-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={pick.image} 
                    alt={pick.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pick.category)}`}>
                      {pick.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <IconComponent className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{pick.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pick.title}</h3>
                  <p className="text-gray-600 mb-4">{pick.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{pick.participants} joined</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{pick.nextMeeting}</span>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary group">
                    <span>Join Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View More Recommendations
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopPicks;