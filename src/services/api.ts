import axios from 'axios'

// Configuração base do Axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante: permite envio de cookies httpOnly
})

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Token expirado ou inválido - redirecionar para login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
