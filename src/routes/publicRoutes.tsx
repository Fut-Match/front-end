import { Route } from 'react-router-dom';

import { TermsOfService } from '@/pages/TermsOfService';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import LandingPage from '@/pages/LandingPage';
import { Register } from '@/pages/Register';
import Login from '@/pages/Login/index';
import Index from '@/pages/Index';

import { ProtectedRoute } from './ProtectedRoute';

export const publicRoutes = (
  <>
    <Route path="/landing" element={<LandingPage />} />
    
    <Route path="/" element={<Index />} />
    
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
    
    <Route path="/privacy-policy" element={<PrivacyPolicy standalone />} />
    <Route path="/terms-of-service" element={<TermsOfService standalone />} />
  </>
);