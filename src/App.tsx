import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRouter } from '@/routes';
import { queryClient } from '@/lib/query-client';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Sonner />
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
