import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { api } from '../services/api'

// Tipos para autenticação
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  message?: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ApiError {
  message: string
  statusCode?: number
}

// Tipos para Health Check
export interface HealthStatus {
  status: 'active' | 'inactive' | 'error'
  timestamp: string
}

// ===============================
// HOOKS PARA HEALTH CHECK
// ===============================

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const healthUrl =
        import.meta.env.VITE_HEALTH_CHECK_URL ||
        'https://back-end-production-c28b.up.railway.app/health'
      const response = await fetch(healthUrl)

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }

      const data: HealthStatus = await response.json()
      return data
    },
    refetchInterval: 30000, // Verificar a cada 30 segundos
    retry: 3,
    retryDelay: 5000, // Esperar 5 segundos entre tentativas
  })
}

// ===============================
// HOOKS PARA AUTENTICAÇÃO
// ===============================

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<LoginResponse>('/auth/login', credentials)
      return response.data
    },
    onSuccess: (data) => {
      console.log('Login realizado com sucesso!', data.user)
      // Token é automaticamente armazenado como httpOnly cookie pelo backend
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error(
        'Erro no login:',
        error.response?.data?.message || error.message
      )
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await api.post<LoginResponse>('/auth/register', userData)
      return response.data
    },
    onSuccess: (data) => {
      console.log('Cadastro realizado com sucesso!', data.user)
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error(
        'Erro no cadastro:',
        error.response?.data?.message || error.message
      )
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
    },
    onSuccess: () => {
      // Cookie httpOnly é removido automaticamente pelo backend
      queryClient.clear() // Limpar todo o cache
      console.log('Logout realizado com sucesso!')
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error(
        'Erro no logout:',
        error.response?.data?.message || error.message
      )
    },
  })
}

export const useVerifyAuth = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get<{ user: User }>('/auth/me')
      return response.data
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error(
        'Token inválido ou expirado:',
        error.response?.data?.message || error.message
      )
    },
  })
}
