import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import Login from '@/pages/Login/index';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfService } from '@/pages/TermsOfService';

export const publicRoutes = (
  <>
    {/* Landing Page - página de apresentação */}
    <Route path="/landing" element={<LandingPage />} />
    
    {/* App principal - com sidebar quando autenticado */}
    <Route path="/" element={<Index />} />
    
    {/* Páginas de autenticação - redireciona se já estiver logado */}
    <Route 
      path="/login" 
      element={
        <ProtectedRoute requireAuth={false} redirectTo="/home">
          <Login />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/register" 
      element={
        <ProtectedRoute requireAuth={false} redirectTo="/home">
          <Register />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/forgot-password" 
      element={
        <ProtectedRoute requireAuth={false} redirectTo="/home">
          <ForgotPassword />
        </ProtectedRoute>
      } 
    />
    
  {/* /home será tratado como rota privada dentro do PrivateLayout */}
    
    {/* Páginas legais - acessível para todos */}
    <Route path="/privacy-policy" element={<PrivacyPolicy standalone />} />
    <Route path="/terms-of-service" element={<TermsOfService standalone />} />
  </>
);