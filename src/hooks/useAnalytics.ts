import { useState, useEffect } from 'react';
import { analyticsService, DepartmentAnalytics, OverviewStats } from '../services/analyticsService';

export function useOverviewAnalytics() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await analyticsService.getOverviewStats();
      
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to fetch overview statistics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching overview stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}

export function useDepartmentAnalytics(department: string) {
  const [analytics, setAnalytics] = useState<DepartmentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await analyticsService.getDepartmentAnalytics(department);
      
      if (response.success) {
        setAnalytics(response.data);
      } else {
        setError('Failed to fetch department analytics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching department analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (department) {
      fetchAnalytics();
    }
  }, [department]);

  return { analytics, loading, error, refetch: fetchAnalytics };
}