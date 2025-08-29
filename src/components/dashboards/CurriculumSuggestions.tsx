import React, { useState } from 'react';
import { 
  Lightbulb, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Clock,
  Plus,
  Filter,
  Download
} from 'lucide-react';

export function CurriculumSuggestions() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const suggestions = [
    {
      id: 1,
      title: 'Add Data Science Specialization Track',
      department: 'Computer Science',
      priority: 'High',
      status: 'pending',
      aiGenerated: true,
      description: 'Based on alumni career trends, 34% of CS graduates are working in data-related roles. Adding a specialized track would better prepare students.',
      rationale: 'Analysis shows high demand for data scientists and machine learning engineers among CS alumni employment data.',
      implementation: 'Add 3 new courses: Advanced Statistics, Machine Learning, and Big Data Analytics',
      impact: {
        expectedIncrease: 15,
        affectedStudents: 120,
        timeToImplement: '6 months'
      },
      createdAt: '2024-01-15',
      suggestedBy: 'AI Analysis'
    },
    {
      id: 2,
      title: 'Strengthen Cybersecurity Curriculum',
      department: 'Information Technology',
      priority: 'High',
      status: 'approved',
      aiGenerated: true,
      description: 'Alumni survey indicates 28% moved into cybersecurity roles within 2 years of graduation, but many lacked foundational security knowledge.',
      rationale: 'Industry demand for cybersecurity professionals is growing 15% annually, and our alumni are transitioning into these roles.',
      implementation: 'Enhance existing networking courses with security modules and add dedicated cybersecurity elective',
      impact: {
        expectedIncrease: 22,
        affectedStudents: 95,
        timeToImplement: '4 months'
      },
      createdAt: '2024-01-12',
      suggestedBy: 'AI Analysis'
    },
    {
      id: 3,
      title: 'Digital Marketing Module for Business Students',
      department: 'Business Administration',
      priority: 'Medium',
      status: 'pending',
      aiGenerated: true,
      description: 'Business alumni working in marketing roles report insufficient digital marketing knowledge despite high industry demand.',
      rationale: '42% of business alumni work in marketing-related roles, but only 18% feel adequately prepared for digital marketing challenges.',
      implementation: 'Add digital marketing modules to existing marketing courses covering SEO, social media, and analytics',
      impact: {
        expectedIncrease: 18,
        affectedStudents: 180,
        timeToImplement: '3 months'
      },
      createdAt: '2024-01-10',
      suggestedBy: 'AI Analysis'
    },
    {
      id: 4,
      title: 'Project Management Certification Integration',
      department: 'Engineering',
      priority: 'Medium',
      status: 'implemented',
      aiGenerated: false,
      description: 'Many engineering alumni advance to project management roles but lack formal PM training.',
      rationale: 'Alumni feedback survey indicated desire for project management skills during undergraduate program.',
      implementation: 'Partner with PMI to offer PMP preparation within capstone course',
      impact: {
        expectedIncrease: 12,
        affectedStudents: 75,
        timeToImplement: '8 months'
      },
      createdAt: '2024-01-08',
      suggestedBy: 'Dr. Sarah Mitchell'
    },
    {
      id: 5,
      title: 'Mental Health First Aid Training',
      department: 'Psychology',
      priority: 'Low',
      status: 'rejected',
      aiGenerated: false,
      description: 'Add practical mental health intervention skills to better prepare graduates for clinical and counseling roles.',
      rationale: 'Alumni working in mental health settings report needing more practical intervention training.',
      implementation: 'Add Mental Health First Aid certification to practicum requirements',
      impact: {
        expectedIncrease: 8,
        affectedStudents: 45,
        timeToImplement: '2 months'
      },
      createdAt: '2024-01-05',
      suggestedBy: 'Prof. Michael Chen'
    }
  ];

  const filteredSuggestions = suggestions.filter(suggestion => 
    filterStatus === 'all' || suggestion.status === filterStatus
  );

  const statusCounts = {
    all: suggestions.length,
    pending: suggestions.filter(s => s.status === 'pending').length,
    approved: suggestions.filter(s => s.status === 'approved').length,
    implemented: suggestions.filter(s => s.status === 'implemented').length,
    rejected: suggestions.filter(s => s.status === 'rejected').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'implemented': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'implemented': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Curriculum Suggestions</h1>
          <p className="text-gray-600">AI-powered and faculty-submitted curriculum improvements</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Brain className="h-4 w-4" />
            Run AI Analysis
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Suggestion
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`p-4 rounded-xl border-2 transition-all ${
              filterStatus === status
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-600 capitalize">
              {status === 'all' ? 'Total' : status}
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Suggestions</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="implemented">Implemented</option>
            <option value="rejected">Rejected</option>
          </select>

          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${suggestion.aiGenerated ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  {suggestion.aiGenerated ? (
                    <Brain className="h-6 w-6 text-purple-600" />
                  ) : (
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{suggestion.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(suggestion.status)}`}>
                      {getStatusIcon(suggestion.status)}
                      <span className="ml-1 capitalize">{suggestion.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>{suggestion.department}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority} Priority
                    </span>
                    <span>By {suggestion.suggestedBy}</span>
                    <span>{new Date(suggestion.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{suggestion.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Implementation Plan</h4>
                    <p className="text-sm text-gray-700">{suggestion.implementation}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        +{suggestion.impact.expectedIncrease}%
                      </div>
                      <div className="text-xs text-gray-600">Expected In-Field Rate Increase</div>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {suggestion.impact.affectedStudents}
                      </div>
                      <div className="text-xs text-gray-600">Students Affected Annually</div>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        {suggestion.impact.timeToImplement}
                      </div>
                      <div className="text-xs text-gray-600">Implementation Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {suggestion.status === 'pending' && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Request More Info
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No suggestions found matching your criteria</p>
        </div>
      )}
    </div>
  );
}