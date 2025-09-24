import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queries/queryKeys";
import { clearAuthUser } from "@/utils/auth";
import type {
  LoginRequest,
  LoginResponse,
  LoginSuccessResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/entities";
import { DC } from "@/externals/dependency-container";

export const useLogin = (options?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository("public");

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      authRepository.signIn(credentials),
    onSuccess: (data: LoginResponse) => {
      const successData = data as LoginSuccessResponse;

      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.setQueryData(queryKeys.auth.user, successData.data.user);

      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};

export const useRegister = (options?: {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const authRepository = DC.repositories.authRepository("public");

  return useMutation({
    mutationFn: (userData: RegisterRequest) =>
      authRepository.register(userData),
    onSuccess: (data: RegisterResponse) => {
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};

// Hook para logout
export const useLogout = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository("auth");

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      // Limpar dados do usuário
      clearAuthUser();

      // Limpar todas as queries do cache
      queryClient.clear();

      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      // Mesmo com erro, limpar os dados locais
      clearAuthUser();

      // Mesmo com erro, limpar o cache local
      queryClient.clear();

      options?.onError?.(error);
    },
  });
};

// Hook para refresh token
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository("auth");

  return useMutation({
    mutationFn: (refreshToken: string) =>
      authRepository.refreshToken(refreshToken),
    onError: () => {
      // Em caso de erro no refresh, fazer logout
      queryClient.clear();
    },
  });
};
