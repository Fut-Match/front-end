import type { 
  IPlayerRepository,
  IHttpClient
} from '@/contracts';
import type { 
  Player, 
  CreatePlayerRequest 
} from '@/entities';

export class PlayerRepositoryRest implements IPlayerRepository {
  constructor(private httpClient: IHttpClient) {}

  async getAll(): Promise<Player[]> {
    return await this.httpClient.get<Player[]>('/players');
  }

  async getById(id: string): Promise<Player> {
    return await this.httpClient.get<Player>(`/players/${id}`);
  }

  async create(request: CreatePlayerRequest): Promise<Player> {
    return await this.httpClient.post<Player>('/players', request);
  }

  async update(id: string, data: Partial<Player>): Promise<Player> {
    return await this.httpClient.put<Player>(`/players/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/players/${id}`);
  }

  async searchByName(name: string): Promise<Player[]> {
    const queryParams = new URLSearchParams({ name });
    return await this.httpClient.get<Player[]>(`/players/search?${queryParams.toString()}`);
  }

  async getByPosition(position: string): Promise<Player[]> {
    const queryParams = new URLSearchParams({ position });
    return await this.httpClient.get<Player[]>(`/players/by-position?${queryParams.toString()}`);
  }

  async getTopPlayers(limit: number = 10): Promise<Player[]> {
    const queryParams = new URLSearchParams({ limit: limit.toString() });
    return await this.httpClient.get<Player[]>(`/players/top?${queryParams.toString()}`);
  }
}