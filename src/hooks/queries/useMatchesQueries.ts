import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";
import type { Match } from "@/entities/match";

export const useMatches = () => {
    const matchRepository = DC.repositories.matchRepository("auth");

    return useQuery<Match[]>({
        queryKey: queryKeys.matches.all,
        queryFn: () => matchRepository.getAll(),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};

// Query para exibir detalhes de uma partida específica
export const useMatchDetail = (matchId: string) => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.detail(matchId),
        queryFn: () => matchRepository.getById(matchId),
        enabled: !!matchId,
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    });
}



