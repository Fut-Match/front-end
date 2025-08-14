import type React from 'react'
import type { Screen } from '../../App'
import { useHealthCheck } from '../../hooks/useApi'

interface StatusPageProps {
  onNavigate: (screen: Screen) => void
}

const StatusPage: React.FC<StatusPageProps> = ({ onNavigate }) => {
  const { data: healthData, isLoading, error, refetch } = useHealthCheck()

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-red-600 bg-red-100'
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active':
        return '✅'
      case 'inactive':
        return '⚠️'
      default:
        return '❌'
    }
  }

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'N/A'

    try {
      const date = new Date(timestamp)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      }).format(date)
    } catch {
      return timestamp
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Status da API</h1>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Monitore o status do back-end em tempo real
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Status Atual
            </h2>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              {isLoading ? 'Verificando...' : '🔄 Atualizar'}
            </button>
          </div>

          {isLoading && !healthData ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Verificando status...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">❌</span>
                <div>
                  <h3 className="font-semibold text-red-800">
                    Erro de Conexão
                  </h3>
                  <p className="text-red-600 text-sm mt-1">
                    Não foi possível conectar com o back-end
                  </p>
                  <p className="text-red-500 text-xs mt-2">
                    {error instanceof Error
                      ? error.message
                      : 'Erro desconhecido'}
                  </p>
                </div>
              </div>
            </div>
          ) : healthData ? (
            <div
              className={`border rounded-lg p-4 ${
                healthData.status === 'active'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {getStatusIcon(healthData.status)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">
                      Back-end Railway
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        healthData.status
                      )}`}
                    >
                      {healthData.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    Última verificação: {formatTimestamp(healthData.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* API Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Informações da API
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">URL Base:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                {import.meta.env.VITE_API_URL ||
                  'https://back-end-production-c28b.up.railway.app/api'}
              </code>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Health Check:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                {import.meta.env.VITE_HEALTH_CHECK_URL ||
                  'https://back-end-production-c28b.up.railway.app/health'}
              </code>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Ambiente:</span>
              <span className="text-sm font-medium text-blue-600">
                {import.meta.env.VITE_ENV || 'production'}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Atualização Automática:</span>
              <span className="text-sm text-green-600 font-medium">
                A cada 30 segundos
              </span>
            </div>
          </div>
        </div>

        {/* Response Details */}
        {healthData && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resposta da API
            </h2>
            <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
              {JSON.stringify(healthData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusPage
