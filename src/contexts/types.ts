// Tipos dos contextos da aplicação
import { User } from '@/entities/User';

export interface IAuthContext {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export interface IAppContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isOnline: boolean;
}