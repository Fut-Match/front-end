import { ArrowLeft, Calendar, Clock, MapPin, Plus, Users } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface MyMatchesScreenProps {
  onNavigate: (screen: Screen) => void
  onSelectMatch: (match: any) => void
}

const MyMatchesScreen: React.FC<MyMatchesScreenProps> = ({
  onNavigate,
  onSelectMatch,
}) => {
  const [inviteToken, setInviteToken] = useState('')

  // Mock data for matches
  const matches = [
    {
      id: 1,
      name: 'Pelada do Sábado',
      date: '2025-01-28',
      time: '15:00',
      location: 'Campo do Parque',
      status: 'aguardando',
      playersPerTeam: 5,
      confirmedPlayers: 8,
      totalSlots: 10,
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Racha da Galera',
      date: '2025-01-30',
      time: '18:30',
      location: 'Quadra da Vila',
      status: 'em_andamento',
      playersPerTeam: 4,
      confirmedPlayers: 6,
      totalSlots: 8,
      isAdmin: false,
    },
    {
      id: 3,
      name: 'Final do Campeonato',
      date: '2025-01-25',
      time: '16:00',
      location: 'Estádio Municipal',
      status: 'finalizada',
      playersPerTeam: 5,
      confirmedPlayers: 10,
      totalSlots: 10,
      isAdmin: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aguardando':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'em_andamento':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'finalizada':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aguardando':
        return 'Aguardando'
      case 'em_andamento':
        return 'Em andamento'
      case 'finalizada':
        return 'Finalizada'
      default:
        return 'Desconhecido'
    }
  }

  const handleMatchClick = (match: any) => {
    onSelectMatch(match)
    if (match.status === 'aguardando' && match.isAdmin) {
      onNavigate('matchControl')
    } else if (match.status === 'em_andamento') {
      onNavigate('liveMatch')
    } else if (match.status === 'finalizada') {
      onNavigate('matchSummary')
    }
  }

  const handleJoinByToken = () => {
    if (inviteToken.trim()) {
      // Simulate joining a match by token
      alert(`Entrando na partida com token: ${inviteToken}`)
      setInviteToken('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Page Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Create Match Button */}
      <div className="mb-6">
        <CustomButton
          onClick={() => onNavigate('createMatch')}
          variant="gradient"
          size="lg"
          fullWidth
        >
          <Plus className="h-5 w-5 mr-2" />
          Criar Partida
        </CustomButton>
      </div>

      {/* Join by Token */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">
          Entrar com Token/Link
        </h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inviteToken}
            onChange={(e) => setInviteToken(e.target.value)}
            placeholder="Cole o token ou link da partida"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
          />
          <CustomButton
            onClick={handleJoinByToken}
            variant="outline"
            size="md"
            disabled={!inviteToken.trim()}
          >
            Entrar
          </CustomButton>
        </div>
      </div>

      {/* Matches List */}
      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => handleMatchClick(match)}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Match Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{match.name}</h3>
                  {match.isAdmin && (
                    <span className="text-xs bg-[#F2442E] text-white px-2 py-1 rounded-full mt-1 inline-block">
                      Organizador
                    </span>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(match.status)}`}
                >
                  {getStatusText(match.status)}
                </span>
              </div>

              {/* Match Details */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(match.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {match.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 col-span-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {match.location}
                </div>
              </div>

              {/* Players Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {match.confirmedPlayers}/{match.totalSlots} confirmados
                </div>
                <div className="text-sm text-gray-600">
                  {match.playersPerTeam}v{match.playersPerTeam}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#F2442E] h-2 rounded-full"
                    style={{
                      width: `${(match.confirmedPlayers / match.totalSlots) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma partida encontrada
          </h3>
          <p className="text-gray-600 mb-6">
            Crie sua primeira partida ou participe de uma existente
          </p>

          <div className="space-y-3 max-w-xs mx-auto">
            <CustomButton
              onClick={() => onNavigate('createMatch')}
              variant="primary"
              size="md"
              fullWidth
            >
              Criar Partida
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyMatchesScreen
