import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://sumrise.onrender.com' : 'http://localhost:5000');

export const backendUrl = API_URL;
export const apiBaseUrl = `${API_URL}/api`;

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

// Add request interceptor to include token in Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401
      localStorage.removeItem('token');
      
      // Only redirect to login if user is trying to access a protected route
      const currentPath = window.location.pathname;
      const isProtected = currentPath.startsWith('/create') || currentPath.startsWith('/edit');
      
      if (isProtected && currentPath !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);