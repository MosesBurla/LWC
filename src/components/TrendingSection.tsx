import React from 'react';
import { Users, MessageCircle, Heart, ArrowRight, Star } from 'lucide-react';

const trendingItems = [
  {
    id: 1,
    type: 'group',
    title: 'Young Adults Bible Study',
    description: 'Weekly discussions on faith and life',
    members: 24,
    activity: 'Active today',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Most Active'
  },
  {
    id: 2,
    type: 'testimony',
    title: 'God\'s Healing Power',
    description: 'Sarah shares her miraculous recovery story',
    likes: 89,
    activity: '2 hours ago',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Trending'
  },
  {
    id: 3,
    type: 'group',
    title: 'Marriage & Family Ministry',
    description: 'Strengthening relationships through Christ',
    members: 18,
    activity: 'Meeting Sunday',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'New'
  },
  {
    id: 4,
    type: 'testimony',
    title: 'From Addiction to Freedom',
    description: 'Michael\'s journey of transformation',
    likes: 156,
    activity: '1 day ago',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Inspiring'
  },
  {
    id: 5,
    type: 'group',
    title: 'Women\'s Prayer Circle',
    description: 'Supporting each other through prayer',
    members: 32,
    activity: 'Praying now',
    image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Active'
  }
];

function TrendingSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
            <p className="text-gray-600">Popular groups and inspiring testimonies</p>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group">
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
          {trendingItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-80 card-hover p-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.badge === 'Most Active' ? 'bg-green-100 text-green-800' :
                    item.badge === 'Trending' ? 'bg-red-100 text-red-800' :
                    item.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                    item.badge === 'Inspiring' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  {item.type === 'group' ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                  ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {item.type === 'group' ? (
                      <>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{item.members} members</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes} likes</span>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{item.activity}</span>
                </div>
                
                <button className="w-full mt-4 btn-primary">
                  {item.type === 'group' ? 'Join Group' : 'Read Story'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;