import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('API call failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Specific hooks for different data types
export const useCompanyInfo = () => useApi(apiService.getCompanyInfo);
export const useServices = () => useApi(apiService.getServices);
export const useTeamMembers = () => useApi(apiService.getTeamMembers);
export const useIndustries = () => useApi(apiService.getIndustries);
export const useCaseStudies = () => useApi(apiService.getCaseStudies);
export const useTestimonials = () => useApi(apiService.getTestimonials);
export const useJobOpenings = () => useApi(apiService.getJobOpenings);
export const useBlogPosts = () => useApi(apiService.getBlogPosts);