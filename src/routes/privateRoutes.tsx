import { Route, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Achievements from '@/pages/Achievements';
import { Matches } from '@/pages/Matchs/index';
import { Ranking } from '@/pages/Ranking';
import { Settings } from '@/pages/Settings';
import { Home } from '@/pages/Home/index';
import { PrivateLayout } from './PrivateLayout';
import { CreateMatch } from '@/pages/CreateMatch';

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
      {/* Create match page - wrapper provides onBack navigation to /matches */}
      <Route path="/matches/create" element={<CreateMatchWrapper />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </>
);

function CreateMatchWrapper() {
  const navigate = useNavigate();
  return <CreateMatch onBack={() => navigate('/matches')} />;
}