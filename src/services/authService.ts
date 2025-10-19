/**
 * Serviço de autenticação - Orquestra operações relacionadas à autenticação
 */
import { DC } from "@/externals/dependency-container";
import type { LoginRequest, RegisterRequest, User } from "@/entities";

export class AuthService {
  private authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL
  );

  /**
   * Realiza login e armazena dados localmente
   */
  async login(credentials: LoginRequest) {
    try {
      const response = await this.authRepository.signIn(credentials);

      // Armazena dados no localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  /**
   * Realiza logout e limpa dados locais
   */
  async logout() {
    try {
      await this.authRepository.logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      // Sempre limpa dados locais
      this.clearLocalData();
    }
  }

  /**
   * Registra novo usuário
   */
  async register(userData: RegisterRequest) {
    try {
      const response = await this.authRepository.register(userData);
      return response;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  }

  /**
   * Obtém dados do usuário atual do localStorage
   */
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return null;
    }
  }

  /**
   * Obtém token de acesso do localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Atualiza dados do usuário no localStorage
   */
  updateUserData(userData: Partial<User>) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }

  /**
   * Limpa todos os dados de autenticação
   */
  private clearLocalData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  /**
   * Refresh do token (se necessário)
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Refresh token não encontrado");
      }

      const response = await this.authRepository.refreshToken(refreshToken);

      // Atualiza tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      return response.accessToken;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      this.clearLocalData();
      return null;
    }
  }
}

// Instância singleton do serviço
export const authService = new AuthService();
