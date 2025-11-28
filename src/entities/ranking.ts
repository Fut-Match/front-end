import { z } from "zod";
import { playerSchema } from "./player";
import { paginatedResponseSchema } from "./pagination";

export const rankingItemSchema = z.object({
  id: z.number(),
  player_id: z.number(),
  position: z.number(),
  image_url: z.string().nullable(),
  username: z.string(),
  score: z.number(),
  wins: z.number(),
  total_matches: z.number(),
  win_percentage: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  player: playerSchema,
});

export const rankingResponseSchema = paginatedResponseSchema(rankingItemSchema);

export const getRankingsRequestSchema = z.object({
  username: z.string().optional(),
  per_page: z.number().optional(),
  page: z.number().optional(),
});

export type RankingItem = z.infer<typeof rankingItemSchema>;
export type RankingResponse = z.infer<typeof rankingResponseSchema>;
export type GetRankingsRequest = z.infer<typeof getRankingsRequestSchema>;
