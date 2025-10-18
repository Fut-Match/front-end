import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

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

export const loginEmailNotVerifiedResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  email_verified: z.literal(false),
});

export const loginInvalidCredentialsResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export const loginResponseSchema = z.union([
  loginSuccessResponseSchema,
  loginEmailNotVerifiedResponseSchema,
  loginInvalidCredentialsResponseSchema,
]);

export const registerRequestSchema = z
  .object({
    firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Senhas não coincidem",
    path: ["password_confirmation"],
  });

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

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});

export const logoutResponseSchema = z.object({
  message: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LoginSuccessResponse = z.infer<typeof loginSuccessResponseSchema>;
export type LoginEmailNotVerifiedResponse = z.infer<
  typeof loginEmailNotVerifiedResponseSchema
>;
export type LoginInvalidCredentialsResponse = z.infer<
  typeof loginInvalidCredentialsResponseSchema
>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
