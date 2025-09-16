import { z } from 'zod';

// Schema para usuário
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Schema para requisição de registro
export const registerRequestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

// Tipos inferidos dos schemas
export type User = z.infer<typeof userSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;