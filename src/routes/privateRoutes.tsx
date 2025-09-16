import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Achievements from '@/pages/Achievements';
import { Matches } from '@/pages/Matches';
import { Ranking } from '@/pages/Ranking';
import { Settings } from '@/pages/Settings';

export const privateRoutes = (
  <>
    {/* Rotas que requerem autenticação */}
    <Route 
      path="/achievements" 
      element={
        <ProtectedRoute>
          <Achievements />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/matches" 
      element={
        <ProtectedRoute>
          <Matches />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/ranking" 
      element={
        <ProtectedRoute>
          <Ranking />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/settings" 
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } 
    />
  </>
);