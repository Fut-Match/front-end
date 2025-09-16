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
    return await this.httpClient.get<Match[]>('/matches');
  }

  async getById(id: string): Promise<Match> {
    return await this.httpClient.get<Match>(`/matches/${id}`);
  }

  async create(request: CreateMatchRequest): Promise<Match> {
    return await this.httpClient.post<Match>('/matches', request);
  }

  async update(id: string, data: Partial<Match>): Promise<Match> {
    return await this.httpClient.put<Match>(`/matches/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/matches/${id}`);
  }

  async joinMatch(matchId: string): Promise<Match> {
    return await this.httpClient.post<Match>(`/matches/${matchId}/join`);
  }

  async leaveMatch(matchId: string): Promise<Match> {
    return await this.httpClient.post<Match>(`/matches/${matchId}/leave`);
  }

  async getUpcomingMatches(): Promise<Match[]> {
    return await this.httpClient.get<Match[]>('/matches/upcoming');
  }

  async getMyMatches(): Promise<Match[]> {
    return await this.httpClient.get<Match[]>('/matches/my-matches');
  }

  async getMatchesByStatus(status: string): Promise<Match[]> {
    const queryParams = new URLSearchParams({ status });
    return await this.httpClient.get<Match[]>(`/matches/by-status?${queryParams.toString()}`);
  }

  async searchMatches(query: string): Promise<Match[]> {
    const queryParams = new URLSearchParams({ q: query });
    return await this.httpClient.get<Match[]>(`/matches/search?${queryParams.toString()}`);
  }
}