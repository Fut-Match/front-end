import { useNavigate, useParams } from 'react-router-dom';
import { CreateMatch } from '@/pages/CreateMatch';
import { ManageMatch } from '@/pages/ManageMatch';


export function CreateMatchWrapper() {
  const navigate = useNavigate();
  return <CreateMatch onBack={() => navigate('/matches')} />;
}

// Wrapper para gerenciar partida
export function MatchesManage() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  return <ManageMatch  onBack={() => navigate(`/matches/${matchId}`)} />;
}