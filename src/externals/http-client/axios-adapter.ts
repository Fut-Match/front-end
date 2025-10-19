import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import type { IHttpClient } from "@/contracts/i-http-client";

export interface ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;
  backendMessage?: string;
}

export class AxiosAdapter implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Para incluir cookies automaticamente
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor para requisições
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Adicionar token de autorização se existir
        const token = localStorage.getItem("access_token");
        const tokenType = localStorage.getItem("token_type");

        if (token && tokenType) {
          config.headers.Authorization = `${tokenType} ${token}`;
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

  private handleError(error: AxiosError): ApiError {
    if (error.response?.status === 401) {
      this.clearAuthData();
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    const errorData = error.response?.data as
      | {
          message?: string;
          errors?: Record<string, string[]>;
        }
      | undefined;

    const genericMessage = "Erro, não foi possível realizar ação desejada";

    const customError = new Error(genericMessage) as ApiError;

    customError.status = error.response?.status;
    customError.errors = errorData?.errors;
    customError.backendMessage = errorData?.message;

    return customError;
  }

  async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config
    );
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config
    );
    return response.data;
  }

  public clearAuthData(): void {
    localStorage.removeItem("user_data");
    localStorage.removeItem("email_verified");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
}
