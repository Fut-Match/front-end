import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";

export const usePlayers = () => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.all,
    queryFn: () => playerRepository.getAll(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const usePlayer = (id: string) => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playerRepository.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePlayerMe = () => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.me,
    queryFn: () => playerRepository.getMe(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useSearchPlayers = (searchQuery: string) => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.search(searchQuery),
    queryFn: () => playerRepository.searchByName(searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};

export const usePlayersByPosition = (position: string) => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.byPosition(position),
    queryFn: () => playerRepository.getByPosition(position),
    enabled: !!position,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTopPlayers = (limit: number = 10) => {
  const playerRepository = DC.repositories.playerRepository("auth");

  return useQuery({
    queryKey: queryKeys.players.top(limit),
    queryFn: () => playerRepository.getTopPlayers(limit),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
