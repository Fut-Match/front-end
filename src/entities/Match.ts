import { z } from 'zod';
import { userSchema } from './User';
import { playerSchema } from './Player';

// Schema para status da partida
export const matchStatusSchema = z.enum(['open', 'full', 'ongoing', 'finished']);

// Schema para partida
export const matchSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  location: z.string(),
  maxPlayers: z.number().min(2).max(22),
  currentPlayers: z.number().min(0),
  status: matchStatusSchema,
  organizer: userSchema,
  players: z.array(playerSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Schema para criação de partida
export const createMatchRequestSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  date: z.string(),
  location: z.string().min(2, 'Local deve ter pelo menos 2 caracteres'),
  maxPlayers: z.number().min(2).max(22),
});

// Tipos inferidos dos schemas
export type MatchStatus = z.infer<typeof matchStatusSchema>;
export type Match = z.infer<typeof matchSchema>;
export type CreateMatchRequest = z.infer<typeof createMatchRequestSchema>;