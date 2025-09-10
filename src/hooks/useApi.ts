import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, type HealthResponse } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Tipos para tratamento de erros
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Query Keys - centralizados para fácil gerenciamento
export const queryKeys = {
  health: ['health'] as const,
  matches: ['matches'] as const,
  players: ['players'] as const,
  rankings: ['rankings'] as const,
};

// Hook para verificar a saúde da API
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: apiService.checkHealth,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
  });
};

// Hook personalizado para testar conectividade
export const useTestConnection = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: apiService.checkHealth,
    onSuccess: (data: HealthResponse) => {
      toast({
        title: "✅ Conexão estabelecida!",
        description: `Status: ${data.status} - Timestamp: ${data.timestamp}`,
      });
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      toast({
        title: "❌ Erro de conexão",
        description: `Não foi possível conectar com o servidor: ${errorMessage}`,
        variant: "destructive",
      });
    },
  });
};

// Exemplos de outros hooks que você pode implementar:

// export const useMatches = () => {
//   return useQuery({
//     queryKey: queryKeys.matches,
//     queryFn: apiService.matches.getAll,
//     staleTime: 2 * 60 * 1000, // 2 minutos
//   });
// };

// export const useCreateMatch = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: apiService.matches.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.matches });
//       toast({
//         title: "Partida criada!",
//         description: "A partida foi criada com sucesso.",
//       });
//     },
//     onError: (error: any) => {
//       toast({
//         title: "Erro ao criar partida",
//         description: error.response?.data?.message || "Erro desconhecido",
//         variant: "destructive",
//       });
//     },
//   });
// };

export default {
  useHealthCheck,
  useTestConnection,
};
