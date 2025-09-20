import type { Player, CreatePlayerRequest } from "@/entities/Player";

export interface IPlayerRepository {
  getAll(): Promise<Player[]>;
  getById(id: string): Promise<Player>;
  getMe(): Promise<Player>;
  create(request: CreatePlayerRequest): Promise<Player>;
  update(id: string, data: Partial<Player>): Promise<Player>;
  delete(id: string): Promise<void>;
  searchByName(name: string): Promise<Player[]>;
  getByPosition(position: string): Promise<Player[]>;
  getTopPlayers(limit?: number): Promise<Player[]>;
}
