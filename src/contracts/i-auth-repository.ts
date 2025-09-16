
import { LoginRequest, LoginResponse } from '@/entities';
import type { RegisterRequest, User } from '@/entities/User';

export interface IAuthRepository {
  signIn(request: LoginRequest): Promise<LoginResponse>;
  register(request: RegisterRequest): Promise<User>;
  logout(): Promise<{ message: string }>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}