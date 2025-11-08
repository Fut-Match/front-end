import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";

export const achievementRaritySchema = z.enum(["facil", "medio", "dificil"]);

export const achievementProgressTypeSchema = z.enum([
  "goals",
  "assists",
  "wins",
  "mvps",
  "matches",
  "tackles",
]);

export const achievementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  rarity: achievementRaritySchema,
  progress_target: z.number(),
  progress_type: achievementProgressTypeSchema,
  is_enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const playerAchievementSchema = z.object({
  id: z.number(),
  player_id: z.number(),
  achievement_id: z.number(),
  progress_current: z.number(),
  unlocked_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  achievement: achievementSchema.optional(),
});

export const achievementsResponseSchema =
  paginatedResponseSchema(achievementSchema);
export const playerAchievementsResponseSchema = paginatedResponseSchema(
  playerAchievementSchema
);

export const getAchievementsRequestSchema = z.object({
  rarity: achievementRaritySchema.optional(),
  per_page: z.number().optional(),
  page: z.number().optional(),
});

export type AchievementRarity = z.infer<typeof achievementRaritySchema>;
export type AchievementProgressType = z.infer<
  typeof achievementProgressTypeSchema
>;
export type Achievement = z.infer<typeof achievementSchema>;
export type PlayerAchievement = z.infer<typeof playerAchievementSchema>;
export type AchievementsResponse = z.infer<typeof achievementsResponseSchema>;
export type PlayerAchievementsResponse = z.infer<
  typeof playerAchievementsResponseSchema
>;
export type GetAchievementsRequest = z.infer<
  typeof getAchievementsRequestSchema
>;
