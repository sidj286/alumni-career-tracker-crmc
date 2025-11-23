import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Lightbulb, 
  Settings, 
  FileText,
  X,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ activeView, setActiveView, isOpen, setIsOpen }: SidebarProps) {
  const userRole = localStorage.getItem('userRole');
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['admin', 'faculty', 'alumni'] },
    { id: 'alumni', label: 'Alumni Management', icon: Users, roles: ['admin', 'faculty'] },
    { id: 'analytics', label: 'Department Analytics', icon: BarChart3, roles: ['admin', 'faculty'] },
    { id: 'curriculum', label: 'Curriculum Suggestions', icon: Lightbulb, roles: ['admin', 'faculty'] },
    { id: 'users', label: 'User Management', icon: Settings, roles: ['admin'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['admin', 'faculty'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole || 'admin')
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img 
              src="/image copy.png" 
              alt="CRMC Logo" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CRMC Alumni
            </span>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      setIsOpen(false); // Close sidebar on mobile after selection
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {JSON.parse(localStorage.getItem('userInfo') || '{}').username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {JSON.parse(localStorage.getItem('userInfo') || '{}').username || 'User'}
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {userRole?.replace('_', ' ') || 'Admin'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}