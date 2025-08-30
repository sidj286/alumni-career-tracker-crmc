import api from './api';

export interface Alumni {
  id?: number;
  name: string;
  email: string;
  department: string;
  graduation_year: number;
  current_position: string;
  company: string;
  is_in_field: boolean;
  salary?: number;
  location: string;
  updated_at?: string;
  created_at?: string;
}

export interface AlumniFilters {
  department?: string;
  graduation_year?: number;
  search?: string;
  is_in_field?: boolean;
  page?: number;
  limit?: number;
}

export const alumniService = {
  // Get all alumni with optional filters
  async getAlumni(filters: AlumniFilters = {}) {
    const response = await api.get('/alumni', { params: filters });
    return response.data;
  },

  // Get single alumni by ID
  async getAlumniById(id: number) {
    const response = await api.get(`/alumni/${id}`);
    return response.data;
  },

  // Create new alumni record
  async createAlumni(alumniData: Alumni) {
    const response = await api.post('/alumni', alumniData);
    return response.data;
  },

  // Update alumni record
  async updateAlumni(id: number, alumniData: Partial<Alumni>) {
    const response = await api.put(`/alumni/${id}`, alumniData);
    return response.data;
  },

  // Delete alumni record
  async deleteAlumni(id: number) {
    const response = await api.delete(`/alumni/${id}`);
    return response.data;
  },

  // Bulk upload alumni via CSV
  async uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('csv_file', file);
    
    const response = await api.post('/alumni/upload-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get department statistics
  async getDepartmentStats(department?: string) {
    const response = await api.get('/analytics/department-stats', {
      params: { department }
    });
    return response.data;
  },

  // Export alumni data
  async exportAlumni(filters: AlumniFilters = {}) {
    const response = await api.get('/alumni/export', {
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  }
};