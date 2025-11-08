import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";
import type { GetAchievementsRequest } from "@/entities/achievement";

export const useGetAchievements = (params?: GetAchievementsRequest) => {
  const achievementRepository = DC.repositories.achievementRepository("auth");

  return useQuery({
    queryKey: queryKeys.achievements.list(params),
    queryFn: () => achievementRepository.getAchievements(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useGetPlayerAchievements = () => {
  const achievementRepository = DC.repositories.achievementRepository("auth");

  return useQuery({
    queryKey: queryKeys.achievements.player,
    queryFn: () => achievementRepository.getPlayerAchievements(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};
