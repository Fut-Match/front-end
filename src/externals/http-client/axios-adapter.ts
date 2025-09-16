import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { IHttpClient } from '@/contracts/i-http-client';

export class AxiosAdapter implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor para requisições
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Adicionar token de autenticação se existir
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Interceptor para respostas
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      // Redirecionar para login se necessário
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    const errorData = error.response?.data as { message?: string } | undefined;
    const message = errorData?.message || error.message || 'Erro de rede';
    return new Error(message);
  }

  async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  // Método para atualizar o token
  public setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Método para remover o token
  public removeAuthToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}