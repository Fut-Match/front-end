import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryKeys } from '../queries/queryKeys';
import type { LoginRequest, RegisterRequest } from '@/entities';
import { DC } from '@/externals/dependency-container';

// Hook para login
export const useLogin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authRepository.signIn(credentials),
    onSuccess: (data) => {
      toast({
        title: "✅ Login realizado com sucesso!",
        description: `Bem-vindo(a), ${data.user.name}!`,
      });
      
      // Invalidar queries relacionadas à autenticação
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.setQueryData(queryKeys.auth.user, data.user);
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Erro no login",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const { toast } = useToast();
  const authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authRepository.register(userData),
    onSuccess: (data) => {
      toast({
        title: "✅ Conta criada com sucesso!",
        description: `Bem-vindo(a), ${data.name}! Agora você pode fazer login.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Erro no cadastro",
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
  const authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      toast({
        title: "✅ Logout realizado com sucesso!",
        description: "Até logo!",
      });
      
      // Limpar todas as queries do cache
      queryClient.clear();
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Erro no logout",
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
  const authRepository = DC.repositories.authRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );

  return useMutation({
    mutationFn: (refreshToken: string) => authRepository.refreshToken(refreshToken),
    onError: () => {
      // Em caso de erro no refresh, fazer logout
      queryClient.clear();
    },
  });
};