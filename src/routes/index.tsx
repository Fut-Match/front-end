import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import NotFound from '@/pages/NotFound';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes}
        
        {/* Rotas privadas */}
        {privateRoutes}
        
        {/* Catch-all route deve sempre ficar por último */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// Re-exports específicos para componentes
export { ProtectedRoute } from './ProtectedRoute';