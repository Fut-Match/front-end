import { ArrowLeft, Play, Settings, Shuffle, UserCheck } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { ImageWithFallback } from '../../../public/figma'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface MatchControlScreenProps {
  onNavigate: (screen: Screen) => void
  match: any
}

const MatchControlScreen: React.FC<MatchControlScreenProps> = ({
  onNavigate,
  match,
}) => {
  const [teams, setTeams] = useState<{ team1: any[]; team2: any[] }>({
    team1: [],
    team2: [],
  })
  const [isTeamsGenerated, setIsTeamsGenerated] = useState(false)

  // Mock confirmed players
  const confirmedPlayers = [
    {
      id: 1,
      name: 'João Silva',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Maria Santos',
      photo:
        'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 5,
      name: 'Carlos Lima',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 6,
      name: 'Lucia Ferreira',
      photo:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 7,
      name: 'Roberto Alves',
      photo:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 8,
      name: 'Fernanda Souza',
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    },
  ]

  const generateTeams = () => {
    const shuffled = [...confirmedPlayers].sort(() => Math.random() - 0.5)
    const playersPerTeam = parseInt(match?.playersPerTeam || '4')

    const team1 = shuffled.slice(0, playersPerTeam)
    const team2 = shuffled.slice(playersPerTeam, playersPerTeam * 2)

    setTeams({ team1, team2 })
    setIsTeamsGenerated(true)
  }

  const startMatch = () => {
    // Navigate to live match screen
    onNavigate('liveMatch')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Page Header */}
      <div className="text-center mb-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate('myMatches')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">Controle da Partida</h1>
          <p className="text-yellow-100">
            {match?.name || 'Organize os times e configure a partida'}
          </p>
        </div>
      </div>

      {/* Match Info */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Data:</span>
            <div className="font-medium">
              {match?.date
                ? new Date(match.date).toLocaleDateString('pt-BR')
                : 'Hoje'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Horário:</span>
            <div className="font-medium">{match?.time || '15:00'}</div>
          </div>
          <div>
            <span className="text-gray-500">Local:</span>
            <div className="font-medium">
              {match?.location || 'Campo do Parque'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Formato:</span>
            <div className="font-medium">
              {match?.playersPerTeam || 4}v{match?.playersPerTeam || 4}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Players */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-green-600" />
            Jogadores Confirmados ({confirmedPlayers.length})
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {confirmedPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
            >
              <ImageWithFallback
                src={player.photo}
                alt={player.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-900">
                {player.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Generator */}
      {!isTeamsGenerated ? (
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F2442E] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shuffle className="h-8 w-8 text-[#F2442E]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sortear Times</h3>
            <p className="text-gray-600 mb-6">
              Divida os jogadores em dois times automaticamente
            </p>

            <CustomButton
              onClick={generateTeams}
              variant="gradient"
              size="lg"
              fullWidth
            >
              <Shuffle className="h-5 w-5 mr-2" />
              Sortear Times
            </CustomButton>
          </div>
        </div>
      ) : (
        /* Teams Display */
        <div className="space-y-4 mb-6">
          {/* Team 1 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Time 1</h3>
              <span className="text-sm text-gray-500">
                {teams.team1.length} jogadores
              </span>
            </div>
            <div className="space-y-2">
              {teams.team1.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg"
                >
                  <ImageWithFallback
                    src={player.photo}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VS Divider */}
          <div className="text-center">
            <span className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
              VS
            </span>
          </div>

          {/* Team 2 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Time 2</h3>
              <span className="text-sm text-gray-500">
                {teams.team2.length} jogadores
              </span>
            </div>
            <div className="space-y-2">
              {teams.team2.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg"
                >
                  <ImageWithFallback
                    src={player.photo}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reshuffle Button */}
          <CustomButton
            onClick={generateTeams}
            variant="outline"
            size="md"
            fullWidth
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Sortear Novamente
          </CustomButton>
        </div>
      )}

      {/* Match Settings */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Configurações da Partida
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tempo por time:</span>
            <span className="font-medium">10 minutos</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Critério de fim:</span>
            <span className="font-medium">Tempo</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Jogadores por time:</span>
            <span className="font-medium">{match?.playersPerTeam || 4}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isTeamsGenerated && (
        <div className="space-y-3">
          <CustomButton
            onClick={startMatch}
            variant="gradient"
            size="lg"
            fullWidth
          >
            <Play className="h-5 w-5 mr-2" />
            Iniciar Partida
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default MatchControlScreen
