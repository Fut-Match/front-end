import type { GetRankingsRequest, RankingResponse } from "@/entities/ranking";

export interface IRankingRepository {
  getRankings(params?: GetRankingsRequest): Promise<RankingResponse>;
}
