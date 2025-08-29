import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Filter,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Eye,
  Share
} from 'lucide-react';

export function Reports() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('1year');
  const [department, setDepartment] = useState('all');

  const reportTypes = [
    {
      id: 'overview',
      title: 'Institutional Overview',
      description: 'Complete alumni employment analysis across all departments',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'department',
      title: 'Department Performance',
      description: 'Detailed analysis of specific department outcomes',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'employment',
      title: 'Employment Trends',
      description: 'Job market analysis and career progression patterns',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'curriculum',
      title: 'Curriculum Impact',
      description: 'Analysis of curriculum effectiveness and suggestions',
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Q4 2024 Alumni Employment Report',
      type: 'Institutional Overview',
      department: 'All Departments',
      generatedBy: 'Dr. John Smith',
      generatedAt: '2024-01-15',
      downloads: 23,
      status: 'published'
    },
    {
      id: 2,
      title: 'Computer Science Department Analysis',
      type: 'Department Performance',
      department: 'Computer Science',
      generatedBy: 'Prof. Sarah Johnson',
      generatedAt: '2024-01-12',
      downloads: 15,
      status: 'draft'
    },
    {
      id: 3,
      title: 'Business Administration Career Trends',
      type: 'Employment Trends',
      department: 'Business Administration',
      generatedBy: 'Dr. Michael Chen',
      generatedAt: '2024-01-10',
      downloads: 31,
      status: 'published'
    },
    {
      id: 4,
      title: 'AI-Generated Curriculum Suggestions Summary',
      type: 'Curriculum Impact',
      department: 'All Departments',
      generatedBy: 'AI Analysis',
      generatedAt: '2024-01-08',
      downloads: 18,
      status: 'published'
    }
  ];

  const departments = [
    'Computer Science',
    'Business Administration', 
    'Engineering',
    'Psychology',
    'Hospitality Management'
  ];

  const generateReport = () => {
    // In a real application, this would trigger report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.title} report...`);
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and manage alumni tracking reports</p>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReport === report.id;
            
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${report.color} w-fit mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`font-semibold mb-2 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
              <option value="2years">Last 2 Years</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateReport}
              className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Calendar className="h-4 w-4" />
              Date Range
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {report.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {report.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </span>
                    <span>By {report.generatedBy}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Download className="h-4 w-4" />
                    {report.downloads} downloads
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Report Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer">
            <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-900">Alumni Dashboard</p>
            <p className="text-xs text-gray-600">Executive summary template</p>
          </div>
          
          <div className="p-4 border-2 border-dashed border-green-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors group cursor-pointer">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-900">Performance Analysis</p>
            <p className="text-xs text-gray-600">Department comparison template</p>
          </div>
          
          <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors group cursor-pointer">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-900">Custom Report</p>
            <p className="text-xs text-gray-600">Create your own template</p>
          </div>
        </div>
      </div>
    </div>
  );
}