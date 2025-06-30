import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, Menu, X, ChevronDown, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container-max">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Life With Christ</span>
              <div className="text-xs text-gray-500 -mt-1">Community Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/groups" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Groups
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </Link>
            <Link to="/devotionals" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Devotionals
            </Link>
            <Link to="/prayer-requests" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Prayer
            </Link>
            
            {/* Admin Link - Show for all users, let the page handle access control */}
            <Link 
              to="/admin" 
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors font-medium bg-red-50 px-3 py-1 rounded-lg"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>
            
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link to="/posts" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                    Community Posts
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                    My Profile
                  </Link>
                  <Link to="/admin-setup" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                    Admin Setup
                  </Link>
                </div>
              )}
            </div>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Welcome, {user.full_name}</span>
                <button 
                  onClick={() => useAuthStore.getState().signOut()}
                  className="btn-secondary text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link to="/registration" className="btn-primary">
                  Join Community
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link to="/groups" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Groups
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Events
              </Link>
              <Link to="/devotionals" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Devotionals
              </Link>
              <Link to="/prayer-requests" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Prayer Requests
              </Link>
              <Link to="/posts" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Community Posts
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                My Profile
              </Link>
              <Link to="/admin" className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors font-medium py-2">
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
              <Link to="/admin-setup" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                Admin Setup
              </Link>
              {user ? (
                <button 
                  onClick={() => useAuthStore.getState().signOut()}
                  className="btn-secondary mt-4 text-left"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link to="/login" className="btn-secondary">
                    Sign In
                  </Link>
                  <Link to="/registration" className="btn-primary">
                    Join Community
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;