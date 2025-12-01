import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'admin' | 'alumni' | 'dean';
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role: 'admin' | 'dean' | 'alumni';
  department?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'alumni' | 'dean';
  department?: string;
  created_at: string;
  last_login?: string;
}

export const authService = {
  // Login user
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store auth data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userInfo', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register new user
  async register(userData: RegisterData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Profile error:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userData: Partial<User>) {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
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
    return localStorage.getItem('userRole') as 'admin' | 'faculty' | 'alumni' | 'dean' | null;
  },

  // Get current user info
  getCurrentUser() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};