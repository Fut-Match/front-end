import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { queryKeys } from "../queries";
import { DC } from "@/externals/dependency-container";
import { Match, CreateMatchRequest } from "@/entities"

// Hook para criar partida
export const useCreateMatch = () => {
    const queryClient = useQueryClient();
    const matchRepository = DC.repositories.matchRepository(
        import.meta.env.VITE_API_BASE_URL 
    );
    return useMutation({
        mutationFn: (matchData: CreateMatchRequest) =>
            matchRepository.create(matchData),
        onSuccess: (data: Match) => {
            toast.success(" Partida criada com sucesso!", {
                description: `Partida entre ${data.description} foi adicionada.`,
            });
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
        },
        onError: (error: Error) => {
            toast.error("Erro ao criar partida", {
                description: error.message,
            });
        },
    });
}

// Hook para atualizar partida
export const useUpdateMatch = () => {
    const queryClient = useQueryClient();
    const matchRepository = DC.repositories.matchRepository(
        import.meta.env.VITE_API_BASE_URL 
    );
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Match> }) =>
            matchRepository.update(id, data),
        onSuccess: (data: Match) => {
            toast.success(" Partida atualizada com sucesso!", {
                description: `Partida entre ${data.description} foi atualizada.`,
            });
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.detail(data.id) });
        },
        onError: (error: Error) => {
            toast.error("Erro ao atualizar partida", {
                description: error.message,
            });
        },
    });
}

// Hook para deletar partida
export const useDeleteMatch = () => {
    const queryClient = useQueryClient();
    const matchRepository = DC.repositories.matchRepository(
        import.meta.env.VITE_API_BASE_URL 
    );
    return useMutation({
        mutationFn: (id: string) => matchRepository.delete(id),
        onSuccess: () => {
            toast.success(" Partida deletada com sucesso!", {
                description: `A partida foi removida.`,
            });
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
        },
        onError: (error: Error) => {
            toast.error("Erro ao deletar partida", {
                description: error.message,
            });
        },
    });
}

