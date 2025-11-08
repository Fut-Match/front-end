import type { IHttpClient } from "@/contracts/i-http-client";
import type { IRankingRepository } from "@/contracts/i-ranking-repository";
import type { GetRankingsRequest, RankingResponse } from "@/entities/ranking";

export class RankingRepositoryRest implements IRankingRepository {
  constructor(private httpClient: IHttpClient) {}

  async getRankings(params?: GetRankingsRequest): Promise<RankingResponse> {
    const queryParams = new URLSearchParams();

    if (params?.username) {
      queryParams.append("username", params.username);
    }
    if (params?.per_page) {
      queryParams.append("per_page", params.per_page.toString());
    }
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/api/rankings?${queryString}`
      : "/api/rankings";

    return this.httpClient.get(endpoint);
  }
}
