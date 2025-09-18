import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryKeys } from '../queries/queryKeys';
import type { Player, CreatePlayerRequest } from '@/entities';
import { DC } from '@/externals/dependency-container';

// Hook para criar player
export const useCreatePlayer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: (playerData: CreatePlayerRequest) => 
      playerRepository.create(playerData),
    onSuccess: (data) => {
      toast({
        title: "✅ Jogador criado com sucesso!",
        description: `${data.name} foi adicionado à lista de jogadores.`,
      });
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar jogador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para atualizar player
export const useUpdatePlayer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) => 
      playerRepository.update(id, data),
    onSuccess: (data) => {
      toast({
        title: "Jogador atualizado com sucesso!",
        description: `${data.name} foi atualizado.`,
      });
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.players.detail(data.id) });
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Erro ao atualizar jogador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para deletar player
export const useDeletePlayer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: (id: string) => playerRepository.delete(id),
    onSuccess: () => {
      toast({
        title: "Jogador removido com sucesso!",
        description: "O jogador foi removido da lista.",
      });
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao remover jogador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};