import { z } from "zod";
import { userSchema } from "./user";
import { playerSchema } from "./player";

export const matchStatusSchema = z.enum([
  "open",
  "full",
  "ongoing",
  "finished",
]);

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

export const createMatchRequestSchema = z.object({
  name: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  location: z.string().min(2, "Local deve ter pelo menos 2 caracteres"),
  maxPlayers: z.number().min(2).max(22),
  match_date: z.string(),
  match_time: z.string(),
  playersPerTeam: z.enum(["3", "5", "6" ]),
  end_mode: z.enum(["goals", "time", "both"]),
  goal_limit: z.number().min(1).optional(),
  time_limit: z.number().min(5).optional(),
});

export type MatchStatus = z.infer<typeof matchStatusSchema>;
export type Match = z.infer<typeof matchSchema>;
export type CreateMatchRequest = z.infer<typeof createMatchRequestSchema>;
