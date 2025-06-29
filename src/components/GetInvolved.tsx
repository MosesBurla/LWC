import React from 'react';
import { Users, Heart, BookOpen, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const involvementOptions = [
  {
    id: 1,
    title: "Join a Small Group",
    description: "Connect with others in intimate Bible study and fellowship",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    action: "Find Groups",
    benefits: ["Weekly Bible Study", "Close Friendships", "Prayer Support"]
  },
  {
    id: 2,
    title: "Volunteer & Serve",
    description: "Use your gifts to serve God and bless our community",
    icon: Heart,
    color: "from-red-500 to-red-600",
    bgColor: "from-red-50 to-red-100",
    action: "Start Serving",
    benefits: ["Community Impact", "Skill Development", "Team Fellowship"]
  },
  {
    id: 3,
    title: "Lead & Mentor",
    description: "Guide others in their faith journey and spiritual growth",
    icon: BookOpen,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
    action: "Become Leader",
    benefits: ["Leadership Training", "Mentorship Skills", "Spiritual Growth"]
  },
  {
    id: 4,
    title: "Attend Events",
    description: "Participate in worship services, conferences, and gatherings",
    icon: Calendar,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    action: "View Events",
    benefits: ["Worship Together", "Learn & Grow", "Build Community"]
  }
];

function GetInvolved() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover meaningful ways to connect, grow, and make a difference in our faith community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {involvementOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div key={option.id} className="group">
                <div className={`bg-gradient-to-br ${option.bgColor} rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${option.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {option.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${option.color} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group`}>
                    <span>{option.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Take the Next Step?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of believers who are growing in faith, building relationships, and making a difference in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Join Our Community
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;