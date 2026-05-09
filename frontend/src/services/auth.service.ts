import api, { post } from './api';
import type { User, LoginInput, RegisterInput } from '../types';

interface AuthResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export const authService = {
  // Register new user
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await post<AuthResponse>('/auth/register', data);
    // Store auth data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  // Login user
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await post<AuthResponse>('/auth/login', data);
    // Store auth data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    return await post<User>('/auth/profile');
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return await patch<User>('/auth/profile', data);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    return await post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get current user from storage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN';
  },
};

// Import patch for profile update
import { patch } from './api';

export default authService;
