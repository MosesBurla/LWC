import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Group Leader",
    content: "This community has been such a blessing in my life. The support and love I've received here has helped me grow closer to God and find my purpose in serving others.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    location: "Los Angeles, CA"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Youth Ministry Volunteer",
    content: "From addiction to freedom, God has completely transformed my life through this amazing community. The prayer support and biblical guidance changed everything for me.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    location: "San Francisco, CA"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Women's Ministry Coordinator",
    content: "The women's Bible study group has been instrumental in my spiritual growth. The deep friendships and accountability I've found here are truly God-sent.",
    image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    location: "Austin, TX"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Men's Ministry Leader",
    content: "Being part of this community has strengthened my faith and my family. The mentorship and brotherhood I've experienced here is beyond what I ever imagined.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    location: "Dallas, TX"
  }
];

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Life-Changing Testimonies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear how God is working in the lives of our community members
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            {/* Background Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-purple-600" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start items-center space-x-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-800 italic leading-relaxed mb-6">
                    "{currentTestimonial.content}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-purple-600 font-medium">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentTestimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;