import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryKeys } from '../queries/queryKeys';
import type { 
  LoginRequest, 
  LoginResponse, 
  LoginSuccessResponse,
  RegisterRequest,
  RegisterResponse 
} from '@/entities';
import { DC } from '@/externals/dependency-container';

export const useLogin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository('public');

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authRepository.signIn(credentials),
    onSuccess: (data: LoginResponse) => {
      if (data.success && 'data' in data) {
        const successData = data as LoginSuccessResponse;
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${successData.data.user.name}!`,
        });
        
        // Invalidar queries relacionadas à autenticação
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        queryClient.setQueryData(queryKeys.auth.user, successData.data.user);
      } else {
        // Tratar casos de falha (email não verificado, credenciais inválidas)
        const errorData = data as { success: false; message: string };
        throw new Error(errorData.message);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const { toast } = useToast();
  const authRepository = DC.repositories.authRepository('public');

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authRepository.register(userData),
    onSuccess: (data: RegisterResponse) => {
      toast({
        title: "Conta criada com sucesso!",
        description: `${data.message}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository('auth');

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      toast({
        title: "Logout realizado com sucesso!",
        description: "Até logo!",
      });
      
      // Limpar todas as queries do cache
      queryClient.clear();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no logout",
        description: error.message,
        variant: "destructive",
      });
      
      // Mesmo com erro, limpar o cache local
      queryClient.clear();
    },
  });
};

// Hook para refresh token
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository('auth');

  return useMutation({
    mutationFn: (refreshToken: string) => authRepository.refreshToken(refreshToken),
    onError: () => {
      // Em caso de erro no refresh, fazer logout
      queryClient.clear();
    },
  });
};