import type { IAuthRepository, IHttpClient } from "@/contracts";
import type {
  LoginRequest,
  LoginResponse,
  LoginSuccessResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "@/entities";

export class AuthRepositoryRest implements IAuthRepository {
  constructor(private httpClient: IHttpClient) {}

  async signIn(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>(
      "/api/login",
      request
    );

    // Se o login foi bem-sucedido, salvar dados do usuário e token no localStorage
    if (response.success && "data" in response) {
      const successResponse = response as LoginSuccessResponse;
      localStorage.setItem(
        "user_data",
        JSON.stringify(successResponse.data.user)
      );
      localStorage.setItem("access_token", successResponse.data.token);
      localStorage.setItem("token_type", successResponse.data.token_type);
      localStorage.setItem("email_verified", "true");
    }

    return response;
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.httpClient.post<RegisterResponse>(
      "/api/register",
      request
    );

    return response;
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await this.httpClient.post<{ message: string }>(
        "/api/logout",
        {}
      );

      // Limpar dados locais
      this.clearLocalAuthData();

      return response;
    } catch (error) {
      // Mesmo que o logout falhe no servidor, limpar dados locais
      console.warn("Erro ao fazer logout no servidor:", error);
      this.clearLocalAuthData();
      return { message: "Logout realizado localmente" };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // Primeiro tentar obter do localStorage
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData);

        // Validar se o token ainda é válido fazendo uma requisição
        try {
          await this.httpClient.get("/api/me");
          return user;
        } catch (error) {
          // Token inválido, limpar dados e continuar para buscar do servidor
          this.clearLocalAuthData();
        }
      }

      // Se não tiver no localStorage ou token inválido, buscar do servidor
      const user = await this.httpClient.get<User>("/api/me");

      // Salvar no localStorage
      localStorage.setItem("user_data", JSON.stringify(user));

      return user;
    } catch (error) {
      // Token inválido ou expirado
      this.clearLocalAuthData();
      return null;
    }
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.httpClient.post<{
      accessToken: string;
      refreshToken: string;
    }>("/api/refresh", { refreshToken });

    return response;
  }

  private clearLocalAuthData(): void {
    localStorage.removeItem("user_data");
    localStorage.removeItem("email_verified");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
}
