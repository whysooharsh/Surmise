import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://sumrise.onrender.com' : 'http://localhost:5000');

export const backendUrl = API_URL;
export const apiBaseUrl = `${API_URL}/api`;

export function getCoverUrl(cover) {
  if (!cover) return '';
  if (cover.startsWith('http://') || cover.startsWith('https://') || cover.startsWith('data:')) {
    return cover;
  }
  const cleanCover = cover.startsWith('/') ? cover : `/${cover}`;
  return `${backendUrl}${cleanCover}`;
}

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      const currentPath = window.location.pathname;
      const isProtected = currentPath.startsWith('/create') || currentPath.startsWith('/edit');
      
      if (isProtected && currentPath !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);