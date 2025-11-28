import type { 
  IMatchRepository,
  IHttpClient
} from '@/contracts';
import type { 
  Match, 
  CreateMatchRequest 
} from '@/entities';

export class MatchRepositoryRest implements IMatchRepository {
  constructor(private httpClient: IHttpClient) {}

  async getAll(): Promise<Match[]> {
    return await this.httpClient.get<Match[]>('/api/matches');
  }

  async getById(id: string): Promise<Match> {
    return await this.httpClient.get<Match>(`/api/matches/${id}`);
  }

  async create(request: CreateMatchRequest): Promise<Match> {
    return await this.httpClient.post<Match>('/api/matches', request);
  }

  async update(id: string, data: Partial<Match>): Promise<Match> {
    return await this.httpClient.put<Match>(`/api/matches/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/api/matches/${id}`);
  }

  async joinMatch(matchId: string): Promise<Match> {
    return await this.httpClient.post<Match>(`/api/matches/${matchId}/join`);
  }

  async leaveMatch(matchId: string): Promise<Match> {
    return await this.httpClient.post<Match>(`/api/matches/${matchId}/leave`);
  }

  async getUpcomingMatches(): Promise<Match[]> {
    return await this.httpClient.get<Match[]>('/api/matches/upcoming');
  }

  async getMyMatches(): Promise<Match[]> {
    return await this.httpClient.get<Match[]>('/api/matches/my-matches');
  }

  async getMatchesByStatus(status: string): Promise<Match[]> {
    const queryParams = new URLSearchParams({ status });
    return await this.httpClient.get<Match[]>(`/api/matches/by-status?${queryParams.toString()}`);
  }

  async searchMatches(query: string): Promise<Match[]> {
    const queryParams = new URLSearchParams({ q: query });
    return await this.httpClient.get<Match[]>(`/api/matches/search?${queryParams.toString()}`);
  }
}