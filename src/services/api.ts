/// <reference types="vite/client" />
import axios from 'axios';

const api = axios.create({
  // Points to the backend
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', 
  withCredentials: true, // Allows cookies/sessions across origins
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor: Catch 401s to force logout in the UI
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear RAM/State if session expires
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;