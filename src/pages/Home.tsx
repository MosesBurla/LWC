import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import TrendingSection from '../components/TrendingSection';
import LocationSelector from '../components/LocationSelector';
import TopPicks from '../components/TopPicks';
import UpcomingEvents from '../components/UpcomingEvents';
import DailyVerse from '../components/DailyVerse';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import GetInvolved from '../components/GetInvolved';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding gradient-bg">
          <div className="container-max">
            <HeroCarousel />
          </div>
        </section>

        {/* Location & Trending Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-1">
                <LocationSelector />
              </div>
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Your Faith Journey</h3>
                  <p className="text-gray-600 mb-6">
                    Discover a community where faith comes alive through meaningful connections, 
                    spiritual growth, and service to others. Whether you're new to faith or have 
                    been walking with Christ for years, there's a place for you here.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600">Active Members</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">25+</div>
                      <div className="text-sm text-gray-600">Small Groups</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrendingSection />
        <TopPicks />
        <UpcomingEvents />
        <DailyVerse />
        <TestimonialsCarousel />
        <GetInvolved />
      </main>

      <Footer />
    </div>
  );
}

export default Home;