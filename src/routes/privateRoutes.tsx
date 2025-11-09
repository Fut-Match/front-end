import { Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { CreateMatchWrapper, MatchesLive } from './CreateMatchWrapper';
import { MatchesManage } from './CreateMatchWrapper';
import Achievements from '@/pages/Achievements';
import { PrivateLayout } from './PrivateLayout';
import { Matches } from '@/pages/Matchs/index';
import { Settings } from '@/pages/Settings';
import EditProfile from '@/pages/EditProfile';
import { Ranking } from '@/pages/Ranking';
import { Home } from '@/pages/Home/index';

export const privateRoutes = (
  <>
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
      <Route path="/matches/create" element={<CreateMatchWrapper />} />
      {/* Adicionando rota de manage  */}
      <Route path="/matches/:matchId/manage" element={<MatchesManage />} />
      <Route path="/matches/:id/live" element={<MatchesLive />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/edit-profile" element={<EditProfile />} />
    </Route>
  </>
);