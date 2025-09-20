import { z } from "zod";

// Schema para posição do jogador
export const playerPositionSchema = z.enum(["GK", "DEF", "MID", "ATT"]);

// Schema para jogador
export const playerSchema = z.object({
  id: z.union([z.string(), z.number()]),
  user_id: z.number().optional(),
  name: z.string(),
  position: playerPositionSchema.optional(),
  rating: z.number().min(0).max(100).optional(),
  matchesPlayed: z.number().min(0).optional(),
  goals: z.number().min(0),
  assists: z.number().min(0),
  tackles: z.number().min(0).optional(),
  mvps: z.number().min(0).optional(),
  wins: z.number().min(0).optional(),
  matches: z.number().min(0).optional(),
  average_rating: z.union([z.string(), z.number()]).optional(),
  avatar: z.string().optional(),
  image: z.string().optional().nullable(),
  nickname: z.string().optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schema para criação de jogador
export const createPlayerRequestSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  position: playerPositionSchema,
  rating: z.number().min(0).max(100),
  matchesPlayed: z.number().min(0).default(0),
  goals: z.number().min(0).default(0),
  assists: z.number().min(0).default(0),
  avatar: z.string().optional(),
});

// Tipos inferidos dos schemas
export type PlayerPosition = z.infer<typeof playerPositionSchema>;
export type Player = z.infer<typeof playerSchema>;
export type CreatePlayerRequest = z.infer<typeof createPlayerRequestSchema>;
