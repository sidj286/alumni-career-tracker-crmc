import React from 'react';
import { Menu, Bell, LogOut, Search } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  toggleSidebar: () => void;
}

export function Header({ onLogout, toggleSidebar }: HeaderProps) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/image copy.png" 
                alt="CRMC Logo" 
                className="h-8 w-8 rounded-full"
              />
              <span className="text-lg font-semibold text-gray-800">CRMC Alumni System</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search CRMC alumni, departments..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {userInfo.username || 'User'}
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {userInfo.role?.replace('_', ' ') || 'Admin'}
              </p>
            </div>
            
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userInfo.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}