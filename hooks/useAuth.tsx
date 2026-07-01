'use client';

import { AdminUser } from '@/lib/auth/admin-credentials';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/session');
        if (response.ok) {
        const data = await response.json();
        const nextUser = data.user as AdminUser;
        localStorage.setItem('adminUser', JSON.stringify(nextUser));
        setUser(nextUser);
        return;
      }
      } catch (error) {
        console.error('Auth check failed:', error);
      }

      localStorage.removeItem('adminUser');
      setUser(null);
      setIsLoading(false);
    };

    checkAuth().finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const nextUser = data.user as AdminUser;
      localStorage.setItem('adminUser', JSON.stringify(nextUser));
      setUser(nextUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
