import { z } from 'zod';

// Schema para requisição de login
export const loginRequestSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Schema para resposta de login - sucesso
export const loginSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
    token: z.string(),
    token_type: z.string(),
    email_verified: z.literal(true),
  }),
});

// Schema para resposta de login - email não verificado
export const loginEmailNotVerifiedResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  email_verified: z.literal(false),
});

// Schema para resposta de login - credenciais inválidas
export const loginInvalidCredentialsResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

// Schema unificado para resposta de login
export const loginResponseSchema = z.union([
  loginSuccessResponseSchema,
  loginEmailNotVerifiedResponseSchema,
  loginInvalidCredentialsResponseSchema,
]);

// Schema para requisição de registro
export const registerRequestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Senhas não coincidem",
  path: ["password_confirmation"],
});

// Schema para resposta de registro
export const registerResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    email_verified: z.literal(false),
  }),
});

// Schema para refresh token
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});

// Schema para logout
export const logoutResponseSchema = z.object({
  message: z.string(),
});

// Tipos inferidos dos schemas
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LoginSuccessResponse = z.infer<typeof loginSuccessResponseSchema>;
export type LoginEmailNotVerifiedResponse = z.infer<typeof loginEmailNotVerifiedResponseSchema>;
export type LoginInvalidCredentialsResponse = z.infer<typeof loginInvalidCredentialsResponseSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;