import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Home } from '@/pages/Home';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfService } from '@/pages/TermsOfService';

export const publicRoutes = (
  <>
    {/* Landing Page - página de apresentação */}
    <Route path="/landing" element={<LandingPage />} />
    
    {/* App principal - com sidebar quando autenticado */}
    <Route path="/" element={<Index />} />
    
    {/* Páginas de autenticação */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    
    {/* Home - redirecionada para app quando autenticado */}
    <Route path="/home" element={<Home />} />
    
    {/* Páginas legais - acessível para todos */}
    <Route path="/privacy-policy" element={<PrivacyPolicy standalone />} />
    <Route path="/terms-of-service" element={<TermsOfService standalone />} />
  </>
);