import { useNavigate } from 'react-router-dom';
import { CreateMatch } from '@/pages/CreateMatch';

export function CreateMatchWrapper() {
  const navigate = useNavigate();
  return <CreateMatch onBack={() => navigate('/matches')} />;
}
