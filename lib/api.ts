import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true, // sends httpOnly cookies (refresh token)
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Read from cookie (set by authStore)
    const match = document.cookie.match(/accessToken=([^;]+)/);
    if (match) {
      config.headers.Authorization = `Bearer ${match[1]}`;
    }
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        document.cookie = `accessToken=${newToken}; path=/; max-age=900`;
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        // Refresh failed — clear auth state
        document.cookie = 'accessToken=; path=/; max-age=0';
        document.cookie = 'userRole=; path=/; max-age=0';
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);
