import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to EVERY request
api.interceptors.request.use(
  (config) => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (expired token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: newRefreshToken } = response.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed - redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token - redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string, company: string, role: string) => {
    const response = await api.post('/auth/signup', { email, password, company, role });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },
};

// Jobs API
export const jobsAPI = {
  getAll: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};

// Candidates API
export const candidatesAPI = {
  getByJob: async (jobId: string) => {
    const response = await api.get(`/candidates/job/${jobId}`);
    return response.data;
  },

  create: async (jobId: string, data: any) => {
    const response = await api.post(`/candidates/${jobId}`, data);
    return response.data;
  },

  update: async (candidateId: string, data: any) => {
    const response = await api.put(`/candidates/${candidateId}`, data);
    return response.data;
  },

  delete: async (candidateId: string) => {
    const response = await api.delete(`/candidates/${candidateId}`);
    return response.data;
  },
};

export default api;