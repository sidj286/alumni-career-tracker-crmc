import { useState, useEffect } from 'react';
import { alumniService, Alumni, AlumniFilters } from '../services/alumniService';

// Mock data for fallback when backend is not available
const mockAlumniData: Alumni[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    department: 'Computer Science',
    graduation_year: 2022,
    current_position: 'Software Engineer',
    company: 'TechCorp Inc',
    is_in_field: true,
    salary: 75000,
    location: 'San Francisco, CA',
    updated_at: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    department: 'Business Administration',
    graduation_year: 2021,
    current_position: 'Marketing Manager',
    company: 'Marketing Solutions LLC',
    is_in_field: true,
    salary: 65000,
    location: 'New York, NY',
    updated_at: '2024-01-14'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    department: 'Engineering',
    graduation_year: 2023,
    current_position: 'Civil Engineer',
    company: 'BuildRight Construction',
    is_in_field: true,
    salary: 68000,
    location: 'Chicago, IL',
    updated_at: '2024-01-13'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    department: 'Psychology',
    graduation_year: 2020,
    current_position: 'Sales Representative',
    company: 'SalesForce Pro',
    is_in_field: false,
    salary: 55000,
    location: 'Austin, TX',
    updated_at: '2024-01-12'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@email.com',
    department: 'Computer Science',
    graduation_year: 2022,
    current_position: 'Data Analyst',
    company: 'DataCorp Analytics',
    is_in_field: true,
    salary: 70000,
    location: 'Seattle, WA',
    updated_at: '2024-01-11'
  }
];

export function useAlumniData(filters: AlumniFilters = {}) {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });

  const fetchAlumni = async (newFilters: AlumniFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const response = await alumniService.getAlumni({ ...filters, ...newFilters });
        
        if (response.success) {
          setAlumni(response.data);
          setPagination(response.pagination);
        } else {
          throw new Error('API response not successful');
        }
      } catch (apiError) {
        console.warn('Backend not available, using mock data:', apiError);
        // Use mock data when backend is not available
        const filteredMockData = mockAlumniData.filter(alumnus => {
          const matchesSearch = !newFilters.search || 
            alumnus.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
            alumnus.email.toLowerCase().includes(newFilters.search.toLowerCase());
          const matchesDepartment = !newFilters.department || alumnus.department === newFilters.department;
          const matchesYear = !newFilters.graduation_year || alumnus.graduation_year === newFilters.graduation_year;
          
          return matchesSearch && matchesDepartment && matchesYear;
        });
        
        setAlumni(filteredMockData);
        setPagination({
          page: 1,
          limit: 50,
          total: filteredMockData.length,
          pages: Math.ceil(filteredMockData.length / 50)
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching alumni:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAlumni = async (alumniData: Alumni) => {
    try {
      try {
        const response = await alumniService.createAlumni(alumniData);
        if (response.success) {
          await fetchAlumni(); // Refresh the list
          return response;
        }
        throw new Error('Failed to create alumni record');
      } catch (apiError) {
        // Fallback: add to local state when backend is not available
        const newAlumni = { ...alumniData, id: Date.now() };
        setAlumni(prev => [newAlumni, ...prev]);
        return { success: true, message: 'Alumni added locally (backend unavailable)' };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add alumni');
      throw err;
    }
  };

  const updateAlumni = async (id: number, alumniData: Partial<Alumni>) => {
    try {
      const response = await alumniService.updateAlumni(id, alumniData);
      if (response.success) {
        await fetchAlumni(); // Refresh the list
        return response;
      }
      throw new Error('Failed to update alumni record');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update alumni');
      throw err;
    }
  };

  const deleteAlumni = async (id: number) => {
    try {
      const response = await alumniService.deleteAlumni(id);
      if (response.success) {
        await fetchAlumni(); // Refresh the list
        return response;
      }
      throw new Error('Failed to delete alumni record');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete alumni');
      throw err;
    }
  };

  const uploadCSV = async (file: File) => {
    try {
      setLoading(true);
      const response = await alumniService.uploadCSV(file);
      if (response.success) {
        await fetchAlumni(); // Refresh the list
        return response;
      }
      throw new Error('Failed to upload CSV');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload CSV');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return {
    alumni,
    loading,
    error,
    pagination,
    fetchAlumni,
    addAlumni,
    updateAlumni,
    deleteAlumni,
    uploadCSV,
    refetch: () => fetchAlumni()
  };
}