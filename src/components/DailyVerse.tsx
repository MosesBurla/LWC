import React from 'react';
import { BookOpen, Heart, Share2, Bookmark } from 'lucide-react';

function DailyVerse() {
  const todayVerse = {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    reflection: "Today's verse reminds us that true wisdom comes from trusting God completely, even when we don't understand His ways. When we surrender our plans to Him, He guides us on the right path.",
    author: "Pastor Michael",
    date: "January 13, 2024",
    likes: 127,
    shares: 34
  };

  return (
    <section className="section-padding bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Verse & Reflection</h2>
              <p className="text-gray-600">{todayVerse.date}</p>
            </div>

            <div className="text-center mb-8">
              <blockquote className="text-2xl md:text-3xl font-light text-gray-800 italic leading-relaxed mb-4">
                "{todayVerse.text}"
              </blockquote>
              <cite className="text-lg font-semibold text-blue-600">
                - {todayVerse.reference}
              </cite>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Reflection</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {todayVerse.reflection}
              </p>
              <p className="text-sm text-gray-600">
                - {todayVerse.author}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{todayVerse.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{todayVerse.shares}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors group">
                  <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Save</span>
                </button>
              </div>
              
              <button className="btn-primary">
                View All Devotionals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyVerse;