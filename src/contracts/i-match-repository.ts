import type { Match, CreateMatchRequest } from "@/entities/match";

export interface IMatchRepository {
  getAll(): Promise<Match[]>;
  getById(id: string): Promise<Match>;
  create(request: CreateMatchRequest): Promise<Match>;
  update(id: string, data: Partial<Match>): Promise<Match>;
  delete(id: string): Promise<void>;
  joinMatch(matchId: string): Promise<Match>;
  leaveMatch(matchId: string): Promise<Match>;
  getUpcomingMatches(): Promise<Match[]>;
  getMyMatches(): Promise<Match[]>;
  getMatchesByStatus(status: string): Promise<Match[]>;
  searchMatches(query: string): Promise<Match[]>;
}
