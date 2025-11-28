import { z } from "zod";
import { playerSchema } from "./player";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userWithPlayerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  email_verified_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  player: playerSchema.nullable(),
});

export const getCurrentUserResponseSchema = z.object({
  data: userWithPlayerSchema,
});

export const updateUserRequestSchema = z
  .object({
    first_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    last_name: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    nickname: z.string().optional(),
    image: z
      .string()
      .url("URL da imagem inválida")
      .optional()
      .or(z.literal("")),
    current_password: z.string().optional(),
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .optional()
      .or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      // Se password foi preenchido, current_password é obrigatório
      if (data.password && data.password.length > 0) {
        return data.current_password && data.current_password.length > 0;
      }
      return true;
    },
    {
      message: "Senha atual é obrigatória para alterar a senha",
      path: ["current_password"],
    }
  )
  .refine(
    (data) => {
      // Se password foi preenchido, password_confirmation deve ser igual
      if (data.password && data.password.length > 0) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Senhas não coincidem",
      path: ["password_confirmation"],
    }
  );

export const updateUserResponseSchema = z.object({
  data: userWithPlayerSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserWithPlayer = z.infer<typeof userWithPlayerSchema>;
export type GetCurrentUserResponse = z.infer<
  typeof getCurrentUserResponseSchema
>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
