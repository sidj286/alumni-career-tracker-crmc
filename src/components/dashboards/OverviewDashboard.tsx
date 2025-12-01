import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function OverviewDashboard() {
  const userRole = localStorage.getItem('userRole');

  const stats = [
    {
      title: 'Total Alumni',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Employed In-Field',
      value: '68.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Recent Graduates',
      value: '482',
      change: '+8%',
      trend: 'up',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Career Growth Rate',
      value: '23.7%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const departmentStats = [
    { name: 'Computer Science', inField: 85, total: 324, growth: 12 },
    { name: 'Business Admin', inField: 72, total: 508, growth: 8 },
    { name: 'Engineering', inField: 78, total: 412, growth: 15 },
    { name: 'Psychology', inField: 52, total: 287, growth: -3 },
    { name: 'Hospitality', inField: 64, total: 195, growth: 6 }
  ];

  const recentActivities = [
    {
      action: 'New alumni data uploaded',
      details: '45 records added to Computer Science department',
      time: '2 hours ago',
      type: 'upload'
    },
    {
      action: 'Curriculum suggestion generated',
      details: 'AI recommends adding Data Science elective',
      time: '4 hours ago',
      type: 'suggestion'
    },
    {
      action: 'Department report exported',
      details: 'Business Administration Q4 2024 analytics',
      time: '6 hours ago',
      type: 'export'
    },
    {
      action: 'New user registered',
      details: 'Dr. Sarah Johnson joined as Dean',
      time: '1 day ago',
      type: 'user'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="/image copy.png" 
              alt="CRMC Logo" 
              className="h-16 w-16 rounded-full bg-white p-1"
            />
            <div>
              <h2 className="text-xl font-semibold text-blue-100">Cebu Roosevelt Memorial Colleges</h2>
              <p className="text-blue-200 text-sm">Alumni Tracking & Career Analytics</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {JSON.parse(localStorage.getItem('userInfo') || '{}').username}!
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with CRMC alumni tracking today
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Department Performance</h2>
            <span className="text-sm text-gray-600">In-Field Employment Rate</span>
          </div>
          
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.inField}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dept.inField}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{dept.total} alumni</span>
                    <span className={`text-xs font-medium ${
                      dept.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dept.growth >= 0 ? '+' : ''}{dept.growth}% growth
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'upload' ? 'bg-blue-500' :
                  activity.type === 'suggestion' ? 'bg-purple-500' :
                  activity.type === 'export' ? 'bg-green-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {userRole === 'admin' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900">Upload Alumni Data</p>
              <p className="text-xs text-gray-600">Bulk import via CSV</p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-purple-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors group">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900">Generate Report</p>
              <p className="text-xs text-gray-600">Export analytics</p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-teal-300 rounded-lg text-center hover:border-teal-500 hover:bg-teal-50 transition-colors group">
              <Briefcase className="h-8 w-8 text-teal-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900">Run AI Analysis</p>
              <p className="text-xs text-gray-600">Curriculum insights</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}