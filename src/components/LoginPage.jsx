import React, { useState } from 'react';
import { GraduationCap, User, Lock, Users, BarChart3 } from 'lucide-react';

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'admin'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store auth data (in real app, this would be handled by backend)
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userRole', credentials.role);
    localStorage.setItem('userInfo', JSON.stringify({
      username: credentials.username,
      role: credentials.role,
      department: credentials.role === 'faculty' ? 'Computer Science' : undefined
    }));
    
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AlumniTrack</h1>
              <p className="text-blue-100">Career Analytics Platform</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Empowering Education Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Alumni Insights
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-lg">
              Track career outcomes, analyze employment trends, and optimize curriculum 
              based on real alumni success data.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-12">
              <div className="flex items-center gap-3 text-blue-100">
                <Users className="h-5 w-5" />
                <span>Role-based Access Control</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <BarChart3 className="h-5 w-5" />
                <span>Advanced Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <GraduationCap className="h-5 w-5" />
                <span>AI-Powered Curriculum Suggestions</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AlumniTrack</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={credentials.role}
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="admin">Administrator</option>
                  <option value="faculty">Faculty / Department Head</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo credentials: Any username/password combination
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginPage };