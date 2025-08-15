import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Company information
  async getCompanyInfo() {
    try {
      const response = await apiClient.get('/company');
      return response.data;
    } catch (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
  },

  // Services
  async getServices() {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Team members
  async getTeamMembers() {
    try {
      const response = await apiClient.get('/team');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },

  // Industries
  async getIndustries() {
    try {
      const response = await apiClient.get('/industries');
      return response.data;
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
  },

  // Case studies
  async getCaseStudies() {
    try {
      const response = await apiClient.get('/case-studies');
      return response.data;
    } catch (error) {
      console.error('Error fetching case studies:', error);
      throw error;
    }
  },

  // Testimonials
  async getTestimonials() {
    try {
      const response = await apiClient.get('/testimonials');
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Job openings
  async getJobOpenings() {
    try {
      const response = await apiClient.get('/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching job openings:', error);
      throw error;
    }
  },

  // Blog posts/insights
  async getBlogPosts() {
    try {
      const response = await apiClient.get('/insights');
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Submit contact form
  async submitContactForm(formData) {
    try {
      const response = await apiClient.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email) {
    try {
      const response = await apiClient.post('/newsletter', { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }
};

export default apiService;