import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { queryKeys } from "../queries/queryKeys";
import type { Player, CreatePlayerRequest } from "@/entities";
import { DC } from "@/externals/dependency-container";

// Hook para criar player
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
  );

  return useMutation({
    mutationFn: (playerData: CreatePlayerRequest) =>
      playerRepository.create(playerData),
    onSuccess: (data) => {
      toast.success("✅ Jogador criado com sucesso!", {
        description: `${data.name} foi adicionado à lista de jogadores.`,
      });

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar jogador", {
        description: error.message,
      });
    },
  });
};

// Hook para atualizar player
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
  );

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playerRepository.update(id, data),
    onSuccess: (data) => {
      toast.success("Jogador atualizado com sucesso!", {
        description: `${data.name} foi atualizado.`,
      });

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.players.detail(data.id),
      });
    },
    onError: (error: Error) => {
      toast.error("❌ Erro ao atualizar jogador", {
        description: error.message,
      });
    },
  });
};

// Hook para deletar player
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
  );

  return useMutation({
    mutationFn: (id: string) => playerRepository.delete(id),
    onSuccess: () => {
      toast.success("Jogador removido com sucesso!", {
        description: "O jogador foi removido da lista.",
      });

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
    onError: (error: Error) => {
      toast.error("Erro ao remover jogador", {
        description: error.message,
      });
    },
  });
};
