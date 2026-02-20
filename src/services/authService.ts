import api from './api';

export interface UserResponse {
  userId: number;
  userName: string;
  userRole: string;
  isAdmin: boolean;
  userSalt: string; 
}

export const authService = {
  login: async (credentials: any): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/api/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.get('/api/auth/logout');
    } finally {
      localStorage.removeItem('user_metadata');
    }
  },

  checkStatus: async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/api/auth/status');
    return response.data;
  }
};