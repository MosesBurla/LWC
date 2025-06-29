import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, Shield, User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

function AdminSetup() {
  const [formData, setFormData] = useState({
    email: 'admin@lifewithchrist.org',
    password: 'AdminLWC2024!',
    fullName: 'System Administrator'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // First, sign up the admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create admin profile with admin role
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.fullName,
            role: 'admin',
            status: 'approved',
            reason_for_joining: 'System Administrator',
            faith_journey: 'Platform Administrator'
          });

        if (profileError) {
          // If profile creation fails, try to update existing user
          const { error: updateError } = await supabase
            .from('users')
            .update({
              role: 'admin',
              status: 'approved'
            })
            .eq('id', authData.user.id);

          if (updateError) throw updateError;
        }

        setIsSuccess(true);
        toast.success('Admin user created successfully!');
      }
    } catch (error: any) {
      console.error('Admin creation error:', error);
      toast.error(error.message || 'Failed to create admin user');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin User Created!</h1>
            <p className="text-gray-600 mb-6">
              Your admin account has been created successfully. You can now log in with admin privileges.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Admin Credentials:</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {formData.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Password:</strong> {formData.password}
              </p>
            </div>
            <div className="space-y-3">
              <Link to="/login" className="block btn-primary w-full">
                Login as Admin
              </Link>
              <Link to="/" className="block btn-secondary w-full">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-6 text-white text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Setup</h1>
                <p className="text-red-100 text-sm">Life With Christ Platform</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Create Admin User</h2>
            <p className="text-red-100">Set up your administrator account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateAdmin} className="p-8 space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm font-medium">Development Setup</p>
                <p className="text-yellow-700 text-sm">This creates an admin user for testing purposes.</p>
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Admin Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">You can change this after creation</p>
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isCreating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isCreating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Admin...</span>
                </div>
              ) : (
                'Create Admin User'
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-100">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSetup;