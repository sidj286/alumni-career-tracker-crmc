import api from './api';

export interface DepartmentAnalytics {
  department: string;
  total_alumni: number;
  in_field_count: number;
  in_field_percentage: number;
  avg_salary: number;
  employment_rate: number;
  top_job_titles: Array<{
    title: string;
    count: number;
    percentage: number;
  }>;
  top_companies: Array<{
    name: string;
    employee_count: number;
  }>;
  graduation_year_trends: Array<{
    year: number;
    count: number;
    in_field_rate: number;
  }>;
}

export interface OverviewStats {
  total_alumni: number;
  overall_in_field_rate: number;
  overall_employment_rate: number;
  avg_time_to_employment: number;
  recent_graduates_count: number;
  department_comparison: Array<{
    department: string;
    in_field_rate: number;
    total_count: number;
    growth_rate: number;
  }>;
}

export const analyticsService = {
  // Get overview statistics
  async getOverviewStats(): Promise<OverviewStats> {
    const response = await api.get('/analytics/overview');
    return response.data;
  },

  // Get department-specific analytics
  async getDepartmentAnalytics(department: string): Promise<DepartmentAnalytics> {
    const response = await api.get(`/analytics/department/${encodeURIComponent(department)}`);
    return response.data;
  },

  // Get all departments comparison
  async getDepartmentComparison() {
    const response = await api.get('/analytics/department-comparison');
    return response.data;
  },

  // Get employment trends over time
  async getEmploymentTrends(department?: string, timeRange?: string) {
    const response = await api.get('/analytics/employment-trends', {
      params: { department, time_range: timeRange }
    });
    return response.data;
  },

  // Get salary analysis
  async getSalaryAnalysis(department?: string) {
    const response = await api.get('/analytics/salary-analysis', {
      params: { department }
    });
    return response.data;
  },

  // Get job market insights
  async getJobMarketInsights(department?: string) {
    const response = await api.get('/analytics/job-market', {
      params: { department }
    });
    return response.data;
  }
};