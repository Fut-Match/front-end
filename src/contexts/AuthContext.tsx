import React, { useState, useEffect } from 'react';
import { authContext } from './auth-context';
import { IAuthContext } from './types';
import { User } from '@/entities/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Escutar mudanças no estado de autenticação
  useEffect(() => {
    const handleAuthUserChanged = (event: CustomEvent) => {
      setUser(event.detail);
    };

    const handleAuthLogout = () => {
      setUser(null);
    };

    window.addEventListener('authUserChanged', handleAuthUserChanged as EventListener);
    window.addEventListener('auth:logout', handleAuthLogout);

    return () => {
      window.removeEventListener('authUserChanged', handleAuthUserChanged as EventListener);
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);



  const value: IAuthContext = {
    user,
    isLoading,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};