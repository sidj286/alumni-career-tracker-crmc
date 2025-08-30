import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'admin' | 'faculty' | 'alumni';
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'faculty' | 'alumni';
  department?: string;
  created_at: string;
  last_login?: string;
}

export const authService = {
  // Login user
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Store auth data
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userInfo', JSON.stringify(user));
    
    return { token, user };
  },

  // Register new user (admin only)
  async register(userData: Omit<User, 'id' | 'created_at' | 'last_login'> & { password: string }) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  async updateProfile(userData: Partial<User>) {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInfo');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  // Get current user role
  getCurrentRole() {
    return localStorage.getItem('userRole') as 'admin' | 'faculty' | 'alumni' | null;
  },

  // Get current user info
  getCurrentUser() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};