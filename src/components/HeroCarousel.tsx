import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, BookOpen } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Welcome to Life With Christ",
    subtitle: "Join our growing community of believers",
    verse: "\"For where two or three gather in my name, there am I with them.\"",
    reference: "Matthew 18:20",
    background: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600",
    icon: Heart
  },
  {
    id: 2,
    title: "Grow Together in Faith",
    subtitle: "Connect with small groups and Bible studies",
    verse: "\"As iron sharpens iron, so one person sharpens another.\"",
    reference: "Proverbs 27:17",
    background: "bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600",
    icon: Users
  },
  {
    id: 3,
    title: "Daily Spiritual Nourishment",
    subtitle: "Start each day with God's Word",
    verse: "\"Your word is a lamp for my feet, a light on my path.\"",
    reference: "Psalm 119:105",
    background: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
    icon: BookOpen
  }
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
      {slides.map((slide, index) => {
        const IconComponent = slide.icon;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`${slide.background} h-full flex items-center justify-center text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
              </div>
              
              <div className="text-center px-6 md:px-12 max-w-4xl relative z-10">
                <div className="mb-6">
                  <IconComponent className="w-16 h-16 mx-auto mb-4 opacity-90" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
                  {slide.subtitle}
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto animate-scale-in">
                  <p className="text-lg md:text-xl italic mb-2 font-light">
                    {slide.verse}
                  </p>
                  <p className="text-sm md:text-base opacity-80">
                    - {slide.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;