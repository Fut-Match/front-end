import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Achievements from '@/pages/Achievements';
import { Matches } from '@/pages/Matches';
import { Ranking } from '@/pages/Ranking';
import { Settings } from '@/pages/Settings';
import { Home } from '@/pages/Home/index';
import { PrivateLayout } from './PrivateLayout';

export const privateRoutes = (
  <>
    {/* Rotas que requerem autenticação, todas dentro do PrivateLayout */}
    <Route
      element={
        <ProtectedRoute>
          <PrivateLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<Home />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </>
);