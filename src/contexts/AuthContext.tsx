import React, { useState, useEffect } from 'react';
import { authContext } from './auth-context';
import { IAuthContext } from './types';
import { User } from '@/entities/User';
import { RegisterRequest, LoginSuccessResponse } from '@/entities/auth';
import { useLogin, useRegister, useLogout } from '@/hooks/mutations';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Inicializar autenticação
  useEffect(() => {
    const savedUser = localStorage.getItem('user_data');
    const emailVerified = localStorage.getItem('email_verified');
    
    if (savedUser && emailVerified === 'true') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        localStorage.removeItem('user_data');
        localStorage.removeItem('email_verified');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await loginMutation.mutateAsync({ email, password });
      
      if (response.success && 'data' in response) {
        const successResponse = response as LoginSuccessResponse;
        setUser(successResponse.data.user);
        localStorage.setItem('user_data', JSON.stringify(successResponse.data.user));
        localStorage.setItem('email_verified', 'true');
      } else {
        // Caso de email não verificado ou credenciais inválidas
        const errorResponse = response as { success: false; message: string };
        throw new Error(errorResponse.message);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      await registerMutation.mutateAsync({ 
        name, 
        email, 
        password, 
        password_confirmation: password 
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('email_verified');
    
    logoutMutation.mutate();
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const value: IAuthContext = {
    user,
    token: null, // Com cookies httpOnly, não temos mais acesso ao token
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};