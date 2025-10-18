import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import NotFound from '@/pages/NotFound';

export const AppRouter = () => {
  return (
    <BrowserRouter 
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      <Routes>
        {publicRoutes}
        
        {privateRoutes}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// Re-exports específicos para componentes
export { ProtectedRoute } from './ProtectedRoute';