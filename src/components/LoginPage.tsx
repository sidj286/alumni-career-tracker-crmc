import React, { useState } from 'react';
import { GraduationCap, User, Lock, Users, BarChart3, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onShowRegister: () => void;
}

export function LoginPage({ onLogin, onShowRegister }: LoginPageProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store auth data (in real app, this would be handled by backend)
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userRole', credentials.role);
    localStorage.setItem('userInfo', JSON.stringify({
      username: credentials.username,
      role: credentials.role,
      department: credentials.role === 'faculty' ? 'Computer Science' : undefined
    }));
    
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Enhanced Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>
        
        <div className="relative z-10 text-white">
          {/* Logo and Institution Name */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <img 
                src="/image copy.png" 
                alt="CRMC Logo" 
                className="h-20 w-20 rounded-full bg-white p-1 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <GraduationCap className="h-3 w-3 text-red-800" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CRMC AlumniTrack</h1>
              <p className="text-red-100 text-sm font-medium">Cebu Roosevelt Memorial Colleges</p>
              <p className="text-red-200 text-xs">Founded 1901 • Excellence in Education</p>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h2 className="text-4xl font-bold leading-tight">
              Empowering Alumni Success
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mt-2">
                Through Data-Driven Insights
              </span>
            </h2>
            
            <p className="text-xl text-red-100 max-w-lg leading-relaxed">
              Track career outcomes, analyze employment trends, and enhance academic programs 
              based on real alumni success stories at Roosevelt Memorial Colleges.
            </p>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 text-red-100 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold">Role-Based Access Control</span>
                <p className="text-sm text-red-200">Secure access for administrators, faculty, and alumni</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-red-100 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold">Advanced Analytics Dashboard</span>
                <p className="text-sm text-red-200">Comprehensive insights into alumni career progression</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-red-100 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold">AI-Powered Curriculum Enhancement</span>
                <p className="text-sm text-red-200">Data-driven recommendations for program improvement</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"></div>
      </div>

      {/* Right Panel - Enhanced Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img 
              src="/image copy.png" 
              alt="CRMC Logo" 
              className="h-12 w-12 rounded-full"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">CRMC AlumniTrack</h1>
              <p className="text-sm text-gray-600">Cebu Roosevelt Memorial Colleges</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your alumni dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={credentials.role}
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="admin">Administrator</option>
                  <option value="faculty">Faculty / Department Head</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In to CRMC Portal'
                )}
              </button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-800 mb-2">Demo Access</p>
                <p className="text-xs text-blue-600">
                  Use any username/password combination to access the system
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={onShowRegister}
                className="text-red-600 hover:text-red-700 font-medium transition-colors mb-4"
              >
                Need an account? Register here
              </button>
              <p className="text-xs text-gray-500">
                © 2024 Cebu Roosevelt Memorial Colleges. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}