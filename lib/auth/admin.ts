// Admin authentication utilities
const ADMIN_CREDENTIALS = {
  username: 'demo123',
  password: 'demo123',
};

const ADMIN_TOKEN_KEY = 'adminToken';
const ADMIN_USER_KEY = 'adminUser';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin';
}

export const adminAuth = {
  // Validate credentials
  validateCredentials: (username: string, password: string): boolean => {
    return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
  },

  // Create session
  createSession: (username: string): AdminUser => {
    const user: AdminUser = {
      id: '1',
      username,
      name: 'Admin User',
      role: 'admin',
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_TOKEN_KEY, 'admin-token-' + Date.now());
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    }
    
    return user;
  },

  // Get current session
  getSession: (): AdminUser | null => {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const userStr = localStorage.getItem(ADMIN_USER_KEY);
    
    if (!token || !userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  // Logout
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    }
  },
};
