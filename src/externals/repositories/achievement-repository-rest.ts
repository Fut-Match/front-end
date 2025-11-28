import type { IHttpClient } from "@/contracts/i-http-client";
import type { IAchievementRepository } from "@/contracts/i-achievement-repository";
import type {
  GetAchievementsRequest,
  AchievementsResponse,
  PlayerAchievementsResponse,
} from "@/entities/achievement";

export class AchievementRepositoryRest implements IAchievementRepository {
  constructor(private httpClient: IHttpClient) {}

  async getAchievements(
    params?: GetAchievementsRequest
  ): Promise<AchievementsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.rarity) {
      queryParams.append("rarity", params.rarity);
    }
    if (params?.per_page) {
      queryParams.append("per_page", params.per_page.toString());
    }
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/api/achievements?${queryString}`
      : "/api/achievements";

    return this.httpClient.get(endpoint);
  }

  async getPlayerAchievements(): Promise<PlayerAchievementsResponse> {
    return this.httpClient.get("/api/players/me/achievements");
  }
}
