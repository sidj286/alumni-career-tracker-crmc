import { useState, useEffect } from 'react';
import { alumniService, Alumni, AlumniFilters } from '../services/alumniService';

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
      
      const response = await alumniService.getAlumni({ ...filters, ...newFilters });
      
      if (response.success) {
        setAlumni(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to fetch alumni data');
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
      const response = await alumniService.createAlumni(alumniData);
      if (response.success) {
        await fetchAlumni(); // Refresh the list
        return response;
      }
      throw new Error('Failed to create alumni record');
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