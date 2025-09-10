import api from '@/lib/api';

// Tipos para as respostas da API
export interface HealthResponse {
  status: string;
  timestamp: string;
}

// Serviços da API
export const apiService = {
  // Teste de conectividade com o servidor
  checkHealth: async (): Promise<HealthResponse> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Exemplo de outros endpoints que você pode adicionar
  // auth: {
  //   login: async (credentials: LoginCredentials) => {
  //     const response = await api.post('/auth/login', credentials);
  //     return response.data;
  //   },
  //   register: async (userData: RegisterData) => {
  //     const response = await api.post('/auth/register', userData);
  //     return response.data;
  //   }
  // },

  // matches: {
  //   getAll: async () => {
  //     const response = await api.get('/matches');
  //     return response.data;
  //   },
  //   create: async (matchData: CreateMatchData) => {
  //     const response = await api.post('/matches', matchData);
  //     return response.data;
  //   }
  // }
};

export default apiService;
