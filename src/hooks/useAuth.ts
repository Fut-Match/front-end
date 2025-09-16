import { useContext } from 'react';
import { authContext } from '../contexts/auth-context';
import { IAuthContext } from '../contexts/types';

export const useAuth = (): IAuthContext => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};