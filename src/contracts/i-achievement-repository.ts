import type {
  GetAchievementsRequest,
  AchievementsResponse,
  PlayerAchievementsResponse,
} from "@/entities/achievement";

export interface IAchievementRepository {
  getAchievements(
    params?: GetAchievementsRequest
  ): Promise<AchievementsResponse>;
  getPlayerAchievements(): Promise<PlayerAchievementsResponse>;
}
