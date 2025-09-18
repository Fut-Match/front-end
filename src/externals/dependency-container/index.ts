import type { IAuthRepository } from '@/contracts/i-auth-repository';
import type { IPlayerRepository } from '@/contracts/i-player-repository';
import type { IMatchRepository } from '@/contracts/i-match-repository';
import type { IHttpClient } from '@/contracts/i-http-client';
import { AuthRepositoryRest } from '@/externals/repositories/auth-repository-rest';
import { PlayerRepositoryRest } from '@/externals/repositories/player-repository-rest';
import { MatchRepositoryRest } from '@/externals/repositories/match-repository-rest';
import { AxiosAdapter } from '@/externals/http-client/axios-adapter';

export type BaseUrl = string;
export type Repository<T> = (baseUrl: BaseUrl) => T;
export type AuthContext = 'auth' | 'public';

export interface IDependencyContainer {
  repositories: {
    authRepository: (context: AuthContext) => IAuthRepository;
    playerRepository: Repository<IPlayerRepository>;
    matchRepository: Repository<IMatchRepository>;
  };
  httpClient: Repository<AxiosAdapter>;
}

const getBaseUrl = (context: AuthContext): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  return baseUrl;
};

const httpClient = (baseURL: BaseUrl) => new AxiosAdapter(baseURL);

function createServiceInstance<T>(ServiceClass: new (client: IHttpClient) => T): Repository<T> {
  return (baseUrl: BaseUrl) => new ServiceClass(httpClient(baseUrl));
}

function createAuthServiceInstance(): (context: AuthContext) => IAuthRepository {
  return (context: AuthContext) => {
    const baseUrl = getBaseUrl(context);
    return new AuthRepositoryRest(httpClient(baseUrl));
  };
}

export const DC: IDependencyContainer = {
  repositories: {
    authRepository: createAuthServiceInstance(),
    playerRepository: createServiceInstance(PlayerRepositoryRest),
    matchRepository: createServiceInstance(MatchRepositoryRest),
  },
  httpClient,
};