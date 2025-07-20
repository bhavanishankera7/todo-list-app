import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/api/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
  
  getProfile: () => api.get('/api/auth/profile'),
};

// Todo API
export const todoAPI = {
  getAllTodos: () => api.get('/api/todos'),
  
  getTodoById: (id: number) => api.get(`/api/todos/${id}`),
  
  createTodo: (data: {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    due_date?: string;
  }) => api.post('/api/todos', data),
  
  updateTodo: (id: number, data: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    due_date?: string;
  }) => api.put(`/api/todos/${id}`, data),
  
  updateTodoStatus: (id: number, status: 'pending' | 'in_progress' | 'completed') =>
    api.patch(`/api/todos/${id}/status`, { status }),
  
  deleteTodo: (id: number) => api.delete(`/api/todos/${id}`),
};

export default api; 