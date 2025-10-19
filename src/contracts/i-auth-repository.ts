import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/entities";
import type { User } from "@/entities/user";

export interface IAuthRepository {
  signIn(request: LoginRequest): Promise<LoginResponse>;
  register(request: RegisterRequest): Promise<RegisterResponse>;
  logout(): Promise<{ message: string }>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
