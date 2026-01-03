import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Public API
export const publicAPI = {
  getAbout: () => api.get('/public/about'),
  getServices: () => api.get('/public/services'),
  getPages: () => api.get('/public/pages'),
  getPageBySlug: (slug) => api.get(`/public/pages/${slug}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Services
  getServices: () => api.get('/admin/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  
  // About
  getAbout: () => api.get('/admin/about'),
  updateAbout: (data) => api.put('/admin/about', data),
  
  // Pages
  getPages: () => api.get('/admin/pages'),
  createPage: (data) => api.post('/admin/pages', data),
  updatePage: (id, data) => api.put(`/admin/pages/${id}`, data),
  deletePage: (id) => api.delete(`/admin/pages/${id}`),
};

export default api;
