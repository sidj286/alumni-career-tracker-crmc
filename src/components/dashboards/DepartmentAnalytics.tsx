import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw
} from 'lucide-react';

export function DepartmentAnalytics() {
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science');
  const [timeRange, setTimeRange] = useState('1year');

  const departments = [
    'Computer Science',
    'Business Administration', 
    'Engineering',
    'Psychology',
    'Hospitality Management'
  ];

  const analytics = {
    'Computer Science': {
      totalAlumni: 324,
      inFieldRate: 85.2,
      avgSalary: '$75,000',
      employmentRate: 92.1,
      topJobTitles: [
        { title: 'Software Engineer', count: 89, percentage: 27.5 },
        { title: 'Data Analyst', count: 45, percentage: 13.9 },
        { title: 'System Administrator', count: 34, percentage: 10.5 },
        { title: 'Web Developer', count: 28, percentage: 8.6 },
        { title: 'DevOps Engineer', count: 22, percentage: 6.8 }
      ],
      trends: {
        inFieldGrowth: 12.3,
        salaryGrowth: 8.7,
        employmentGrowth: 5.2
      },
      companies: [
        { name: 'TechCorp Inc', employees: 23 },
        { name: 'DataSoft Solutions', employees: 18 },
        { name: 'WebFlow Systems', employees: 15 },
        { name: 'CloudTech Ltd', employees: 12 },
        { name: 'StartupXYZ', employees: 10 }
      ]
    }
  };

  const currentAnalytics = analytics[selectedDepartment as keyof typeof analytics] || analytics['Computer Science'];

  const metrics = [
    {
      title: 'Total Alumni',
      value: currentAnalytics.totalAlumni.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'In-Field Employment',
      value: `${currentAnalytics.inFieldRate}%`,
      change: `+${currentAnalytics.trends.inFieldGrowth}%`,
      trend: 'up',
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Employment Rate',
      value: `${currentAnalytics.employmentRate}%`,
      change: `+${currentAnalytics.trends.employmentGrowth}%`,
      trend: 'up',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg. Starting Salary',
      value: currentAnalytics.avgSalary,
      change: `+${currentAnalytics.trends.salaryGrowth}%`,
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Analytics</h1>
          <p className="text-gray-600">In-depth analysis of alumni career outcomes</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="2years">Last 2 Years</option>
            <option value="all">All Time</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Job Titles */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Job Titles</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {currentAnalytics.topJobTitles.map((job, index) => (
              <div key={job.title} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.count} alumni</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{job.percentage}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${job.percentage * 4}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Employers */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Employers</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {currentAnalytics.companies.map((company, index) => (
              <div key={company.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-600">{company.employees} employees</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Progression Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Career Progression Timeline</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            Export Chart
          </button>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Career progression visualization would be implemented here</p>
            <p className="text-sm text-gray-500 mt-2">Shows salary growth and position changes over time</p>
          </div>
        </div>
      </div>

      {/* Department Comparison */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Department Comparison</h2>
          <p className="text-sm text-gray-600">In-Field Employment Rate vs. Institution Average</p>
        </div>
        
        <div className="space-y-4">
          {departments.map((dept, index) => {
            const rate = [85.2, 72.1, 78.4, 52.3, 64.7][index];
            const isSelected = dept === selectedDepartment;
            
            return (
              <div key={dept} className={`p-4 rounded-lg border-2 transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                    {dept}
                  </span>
                  <span className={`text-sm font-semibold ${
                    rate >= 70 ? 'text-green-600' : rate >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${
                      rate >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      rate >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${rate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}