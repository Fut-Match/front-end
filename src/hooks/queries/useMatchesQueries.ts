import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";

// Queries related to matches

export const useMatches = () => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.all,
        queryFn: () => matchRepository.getAll(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
}

export const useMatch = (id: string) => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.detail(id),
        queryFn: () => matchRepository.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
}

export const useMyMatches = () => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.myMatches,
        queryFn: () => matchRepository.getMyMatches(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
}

export const useUpcomingMatches = () => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.upcoming,
        queryFn: () => matchRepository.getUpcomingMatches(),
        staleTime: 1 * 60 * 1000, // 1 minute
        gcTime: 3 * 60 * 1000, // 3 minutes
    });
}

export const useMatchesByStatus = (status: string) => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.byStatus(status),
        queryFn: () => matchRepository.getMatchesByStatus(status),
        enabled: !!status,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
}
export const useSearchMatches = (searchQuery: string) => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return useQuery({
        queryKey: queryKeys.matches.search(searchQuery),
        queryFn: () => matchRepository.searchMatches(searchQuery),
        enabled: searchQuery.length >= 2,
        staleTime: 1 * 60 * 1000, // 1 minute
        gcTime: 3 * 60 * 1000, // 3 minutes
    });
}

export const useCreateMatch = () => {
    const matchRepository = DC.repositories.matchRepository("auth");
    return matchRepository.create.bind(matchRepository);
}