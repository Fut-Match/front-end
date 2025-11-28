import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";
import type { GetRankingsRequest } from "@/entities/ranking";

export const useGetRankings = (params?: GetRankingsRequest) => {
  const rankingRepository = DC.repositories.rankingRepository("auth");

  return useQuery({
    queryKey: queryKeys.rankings.list(params),
    queryFn: () => rankingRepository.getRankings(params),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};
