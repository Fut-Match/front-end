import { z } from 'zod';

// Schema para posição do jogador
export const playerPositionSchema = z.enum(['GK', 'DEF', 'MID', 'ATT']);

// Schema para jogador
export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: playerPositionSchema,
  rating: z.number().min(0).max(100),
  matchesPlayed: z.number().min(0),
  goals: z.number().min(0),
  assists: z.number().min(0),
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Schema para criação de jogador
export const createPlayerRequestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
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