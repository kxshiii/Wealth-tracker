
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SignupData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export const authApi = {
  signup: (data: SignupData): Promise<AuthResponse> =>
    api.post('/signup', data).then((res) => res.data),
  
  login: (data: LoginData): Promise<AuthResponse> =>
    api.post('/login', data).then((res) => res.data),
  
  getDashboard: () =>
    api.get('/dashboard').then((res) => res.data),
};

export default api;