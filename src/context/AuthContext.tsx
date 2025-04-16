
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - this would be replaced with real authentication
  const login = async (email: string, password: string) => {
    // For demo purposes, we're using a simple check
    if (email && password.length > 3) {
      // Mock user data - in a real app, this would come from an API
      const userData: User = {
        id: "user-001",
        email: email,
        name: email.split('@')[0],
        role: "admin",
      };
      
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return;
    }
    
    throw new Error("Invalid credentials");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
