import { createContext, useContext, useState, type ReactNode } from 'react';
import * as api from '../lib/api';

interface AuthCtx {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    api.setToken(res.data.accessToken);
    setToken(res.data.accessToken);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.register(name, email, password);
    api.setToken(res.data.accessToken);
    setToken(res.data.accessToken);
  };

  const logout = () => {
    api.setToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
