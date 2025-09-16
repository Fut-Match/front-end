import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/auth'
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Enquanto carrega, pode mostrar um loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se requer autenticação mas não está autenticado
  if (requireAuth && !isAuthenticated) {
    // Salva a rota atual para redirecionar após login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Se não requer autenticação mas está autenticado (ex: página de login)
  if (!requireAuth && isAuthenticated) {
    // Redireciona para onde estava tentando ir ou para home
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};