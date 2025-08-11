'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock API call - в реальном проекте это будет настоящий API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin@himalayansound.com' && password === 'admin123') {
        const userData: AdminUser = {
          id: 1,
          email: 'admin@himalayansound.com',
          name: 'Admin User',
          role: 'admin'
        };

        // Store in localStorage (в реальном проекте это будет httpOnly cookie)
        localStorage.setItem('adminToken', 'mock-jwt-token');
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
