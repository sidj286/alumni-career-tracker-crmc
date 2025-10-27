import { useState, useEffect } from 'react';

// Mock data for when backend is not available
const mockAlumniData = [
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

export function useAlumniData(filters = {}) {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });

  const fetchAlumni = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use mock data and apply filters
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
    } catch (err) {
      setError('Failed to load alumni data');
      console.error('Error fetching alumni:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAlumni = async (alumniData) => {
    try {
      // Simulate adding to local state
      const newAlumni = { 
        ...alumniData, 
        id: Date.now(),
        updated_at: new Date().toISOString().split('T')[0]
      };
      setAlumni(prev => [newAlumni, ...prev]);
      return { success: true, message: 'Alumni added successfully' };
    } catch (err) {
      setError('Failed to add alumni');
      throw err;
    }
  };

  const updateAlumni = async (id, alumniData) => {
    try {
      setAlumni(prev => prev.map(a => 
        a.id === id ? { ...a, ...alumniData, updated_at: new Date().toISOString().split('T')[0] } : a
      ));
      return { success: true, message: 'Alumni updated successfully' };
    } catch (err) {
      setError('Failed to update alumni');
      throw err;
    }
  };

  const deleteAlumni = async (id) => {
    try {
      setAlumni(prev => prev.filter(a => a.id !== id));
      return { success: true, message: 'Alumni deleted successfully' };
    } catch (err) {
      setError('Failed to delete alumni');
      throw err;
    }
  };

  const uploadCSV = async (file) => {
    try {
      setLoading(true);
      // Simulate CSV upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'CSV uploaded successfully (demo mode)' };
    } catch (err) {
      setError('Failed to upload CSV');
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