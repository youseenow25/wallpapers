"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import type { User } from "@/lib/types";
import {
  getToken,
  setToken,
  clearToken,
  getMe,
  login as apiLogin,
  register as apiRegister,
  googleLogin as apiGoogleLogin,
} from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  hasAccess: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user } = await getMe(token);
      setUser(user);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => { await refresh(); })();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user } = await apiLogin(email, password);
    setToken(token);
    setUser(user);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { token, user } = await apiRegister(email, password);
    setToken(token);
    setUser(user);
  }, []);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const { token, user } = await apiGoogleLogin(credential);
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        hasAccess: !!user?.hasAccess,
        login,
        register,
        loginWithGoogle,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
