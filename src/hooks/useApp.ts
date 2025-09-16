import { useContext } from 'react';
import { appContext } from '../contexts/app-context';
import { IAppContext } from '../contexts/types';

export const useApp = (): IAppContext => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};