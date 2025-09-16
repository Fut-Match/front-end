import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { DC } from '@/externals/dependency-container';

// Hook para obter usuário atual
export const useCurrentUser = () => {
  const authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authRepository.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: false, // Não tentar novamente em caso de erro 401
  });
};