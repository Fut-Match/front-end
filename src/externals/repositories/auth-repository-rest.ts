import type { 
  IAuthRepository,
  IHttpClient
} from '@/contracts';
import type { 
  LoginRequest, 
  LoginResponse,
  RegisterRequest, 
  User 
} from '@/entities';

export class AuthRepositoryRest implements IAuthRepository {
  constructor(private httpClient: IHttpClient) {}

  async signIn(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>(
      '/auth/login',
      request
    );
    
    // Salvar token no localStorage
    if (response.accessToken) {
      localStorage.setItem('auth_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  }

  async register(request: RegisterRequest): Promise<User> {
    const response = await this.httpClient.post<User>(
      '/auth/register',
      request
    );
    return response;
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await this.httpClient.post<{ message: string }>('/auth/logout');
      return response;
    } catch (error) {
      // Mesmo que o logout falhe no servidor, limpar dados locais
      console.warn('Erro ao fazer logout no servidor:', error);
      return { message: 'Logout realizado localmente' };
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // Primeiro tentar obter do localStorage
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        // Validar se o token ainda é válido fazendo uma requisição
        await this.httpClient.get('/auth/me');
        return user;
      }

      // Se não tiver no localStorage, buscar do servidor
      const user = await this.httpClient.get<User>('/auth/me');
      
      // Salvar no localStorage
      localStorage.setItem('user_data', JSON.stringify(user));
      
      return user;
    } catch (error) {
      // Token inválido ou expirado
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken }
    );
    
    // Salvar novos tokens
    localStorage.setItem('auth_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    
    return response;
  }
}