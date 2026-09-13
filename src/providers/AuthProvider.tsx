"use client";

import { isTokenExpired } from "@/utils/is-token-expired";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type User = {
  email: string;
  userName: string;
  companyName?: string;
  rucNumber?: string;
  province?: string;
  municipality?: string;
  address?: string;
  isRequiredWizard?: boolean;
  isElectronicTransmitter?: boolean;
  permissions?: string[];
  companyLogoUrl?: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (token: string, user: User) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth-storage");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        const state = parsed.state || parsed;
        if (state.token && !isTokenExpired(state.token)) {
          setToken(state.token);
          setUser(state.user);
        } else {
          localStorage.removeItem("auth-storage");
        }
      } catch (error) {
        console.error("Failed to parse auth-storage", error);
      }
    }
    setIsHydrated(true);
  }, []);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth-storage", JSON.stringify({
      state: { token: newToken, user: newUser }
    }));
  }, []);

  const updateUser = useCallback((updatedUser: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedUser };
      localStorage.setItem("auth-storage", JSON.stringify({
        state: { token, user: newUser }
      }));
      return newUser;
    });
  }, [token]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth-storage");
  }, []);

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token,
    isHydrated,
    login,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
