import React from 'react';
import { Cross, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Life With Christ</h3>
                <p className="text-gray-400 text-sm">Community Platform</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Building a community where believers can grow together in faith, hope, and love. 
              Join us as we walk with Christ and serve others in His name.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/groups" className="text-gray-300 hover:text-white transition-colors">Small Groups</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="/devotionals" className="text-gray-300 hover:text-white transition-colors">Devotionals</a></li>
              <li><a href="/prayer-requests" className="text-gray-300 hover:text-white transition-colors">Prayer Requests</a></li>
              <li><a href="/posts" className="text-gray-300 hover:text-white transition-colors">Community Posts</a></li>
              <li><a href="/registration" className="text-gray-300 hover:text-white transition-colors">Join Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Faith Street</p>
                  <p className="text-gray-300">Hope City, HC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300">(555) 123-PRAY</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300">hello@lifewithchrist.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-semibold mb-2">Stay Connected</h4>
              <p className="text-gray-300">Get weekly devotionals, event updates, and prayer requests delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:ml-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[250px]"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Life With Christ Community Platform. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the Kingdom of God</span>
            </p>
            <p className="text-gray-600 text-xs mt-2">
              "For where two or three gather in my name, there am I with them." - Matthew 18:20
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;