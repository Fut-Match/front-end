import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { authService } from '@/services/authService';

// Mapeia pathname -> aba ativa do Layout
const pathToTab = (pathname: string): string => {
  // Normaliza removendo trailing slash
  const path = pathname.replace(/\/$/, '');
  if (path.startsWith('/matches')) return 'matches';
  if (path.startsWith('/ranking')) return 'ranking';
  if (path.startsWith('/achievements')) return 'achievements';
  if (path.startsWith('/settings')) return 'settings';
  return 'home';
};

// Mapeia aba -> rota
const tabToPath = (tab: string): string => {
  switch (tab) {
    case 'matches':
      return '/matches';
    case 'ranking':
      return '/ranking';
    case 'achievements':
      return '/achievements';
    case 'settings':
      return '/settings';
    case 'home':
    default:
      return '/home';
  }
};

export const PrivateLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = pathToTab(location.pathname);

  const handleTabChange = (tab: string) => {
    const to = tabToPath(tab);
    if (to !== location.pathname) {
      navigate(to);
    }
  };

  const handleLogout = async () => {
    try {
      // Tenta efetuar logout pelo serviço (tokens e user atuais)
      await authService.logout();
    } catch (_) {
      // ignore
    } finally {
      // Limpa chaves legadas usadas pelo AuthProvider atual
      try {
        localStorage.removeItem('user_data');
        localStorage.removeItem('email_verified');
      } catch (_) {
        // ignore
      }
    }
    // Navega para login e força recarga para sincronizar contexto
    navigate('/login', { replace: true });
    // Força reavaliação do AuthProvider (simples e objetivo)
    window.location.reload();
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onLogout={handleLogout}
    >
      <Outlet />
    </Layout>
  );
};

export default PrivateLayout;
