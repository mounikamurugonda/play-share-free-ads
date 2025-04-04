
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    location: 'New York',
    bio: 'Father of two who loves trading toys!',
    rating: 4.8,
    role: 'user' as const,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    location: 'San Francisco',
    bio: 'Platform administrator',
    rating: 5.0,
    role: 'admin' as const,
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('toyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (foundUser) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(foundUser);
        localStorage.setItem('toyUser', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup functionality
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
      };
      
      setUser(newUser);
      localStorage.setItem('toyUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('toyUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
