import {
  ArrowLeft,
  Crown,
  Flame,
  Pause,
  Play,
  RefreshCw,
  Shield,
  Square,
  Target,
  Users,
} from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ImageWithFallback } from '../../../public/figma'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface LiveMatchScreenProps {
  onNavigate: (screen: Screen) => void
  match: any
}

const LiveMatchScreen: React.FC<LiveMatchScreenProps> = ({
  onNavigate,
  match,
}) => {
  const [isRunning, setIsRunning] = useState(false)

  // Timer settings - Default to 10 minutes (600 seconds), decreasing
  const initialTime = match?.gameTime ? parseInt(match.gameTime) * 60 : 600 // Convert minutes to seconds
  const [time, setTime] = useState(initialTime)

  const [score, setScore] = useState({ team1: 0, team2: 0 })
  const [playerStats, setPlayerStats] = useState<{
    [key: number]: { goals: number; assists: number; tackles: number }
  }>({})
  const [isLastMatch, setIsLastMatch] = useState(false)
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false)
  const [substitutionType, setSubstitutionType] = useState<
    'individual' | 'team' | null
  >(null)
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | null>(null)

  // Mock teams data
  const teams = {
    team1: [
      {
        id: 1,
        name: 'João Silva',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: true,
      },
      {
        id: 2,
        name: 'Pedro Costa',
        photo:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: true,
      },
      {
        id: 3,
        name: 'Carlos Lima',
        photo:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: true,
      },
      {
        id: 4,
        name: 'Roberto Alves',
        photo:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: true,
      },
      {
        id: 9,
        name: 'Marcos Souza',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: false,
      },
      {
        id: 10,
        name: 'Lucas Ferreira',
        photo:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        team: 1,
        isPlaying: false,
      },
    ],
    team2: [
      {
        id: 5,
        name: 'Maria Santos',
        photo:
          'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: true,
      },
      {
        id: 6,
        name: 'Ana Oliveira',
        photo:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: true,
      },
      {
        id: 7,
        name: 'Lucia Ferreira',
        photo:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: true,
      },
      {
        id: 8,
        name: 'Fernanda Souza',
        photo:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: true,
      },
      {
        id: 11,
        name: 'Carla Ribeiro',
        photo:
          'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: false,
      },
      {
        id: 12,
        name: 'Júlia Pereira',
        photo:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        team: 2,
        isPlaying: false,
      },
    ],
  }

  // Timer effect - Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false)
            // Auto end match when time reaches 0
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  // Check for victory condition in "Last Match" mode
  useEffect(() => {
    if (isLastMatch && (score.team1 >= 5 || score.team2 >= 5)) {
      setIsRunning(false)
      // Show victory message or end match
    }
  }, [score, isLastMatch])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addGoal = (playerId: number, team: number) => {
    // Update score
    if (team === 1) {
      setScore((prev) => ({ ...prev, team1: prev.team1 + 1 }))
    } else {
      setScore((prev) => ({ ...prev, team2: prev.team2 + 1 }))
    }

    // Update player stats
    setPlayerStats((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        goals: (prev[playerId]?.goals || 0) + 1,
        assists: prev[playerId]?.assists || 0,
        tackles: prev[playerId]?.tackles || 0,
      },
    }))
  }

  const addAssist = (playerId: number) => {
    setPlayerStats((prev) => ({
      ...prev,
      [playerId]: {
        goals: prev[playerId]?.goals || 0,
        assists: (prev[playerId]?.assists || 0) + 1,
        tackles: prev[playerId]?.tackles || 0,
      },
    }))
  }

  const addTackle = (playerId: number) => {
    setPlayerStats((prev) => ({
      ...prev,
      [playerId]: {
        goals: prev[playerId]?.goals || 0,
        assists: prev[playerId]?.assists || 0,
        tackles: (prev[playerId]?.tackles || 0) + 1,
      },
    }))
  }

  const activateLastMatch = () => {
    setIsLastMatch(true)
    setScore({ team1: 0, team2: 0 })
    setPlayerStats({})
    setTime(0) // No timer for "Last Match" mode
    setIsRunning(false)
  }

  const handleSubstitution = (type: 'individual' | 'team') => {
    setSubstitutionType(type)
    setShowSubstitutionModal(true)
  }

  const executeSubstitution = () => {
    if (substitutionType === 'individual' && selectedPlayer) {
      // Logic for individual substitution
      console.log('Substituting player:', selectedPlayer)
    } else if (substitutionType === 'team' && selectedTeam) {
      // Logic for team substitution
      console.log('Substituting entire team:', selectedTeam)
    }
    setShowSubstitutionModal(false)
    setSubstitutionType(null)
    setSelectedPlayer(null)
    setSelectedTeam(null)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(initialTime)
  }

  const endMatch = () => {
    setIsRunning(false)
    onNavigate('matchSummary')
  }

  const getPlayingPlayers = (teamNumber: 1 | 2) => {
    return teams[`team${teamNumber}`].filter((player) => player.isPlaying)
  }

  // const getReservePlayers = (teamNumber: 1 | 2) => {
  //   return teams[`team${teamNumber}`].filter(player => !player.isPlaying);
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Discrete Page Title */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('matchControl')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-700 text-center">
          ⚽ Partida ao Vivo
        </h1>
      </div>

      {/* Last Match Mode Banner */}
      {isLastMatch && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-lg mb-4 shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <Flame className="h-5 w-5" />
            <span className="font-semibold">🔥 Última do Dia (5 gols)</span>
            <Flame className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Timer and Score */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        {/* Timer */}
        {!isLastMatch && (
          <div className="text-center mb-6">
            <div
              className={`text-4xl font-bold mb-2 ${
                time <= 60 ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {time <= 60 && time > 0 && 'Último minuto!'}
              {time === 0 && 'Tempo esgotado!'}
            </div>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-3 bg-[#F2442E] text-white rounded-lg hover:bg-[#d63a2a] transition-colors"
                disabled={time === 0}
              >
                {isRunning ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Square className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div
              className={`text-3xl font-bold ${score.team1 >= 5 && isLastMatch ? 'text-yellow-600' : 'text-blue-600'}`}
            >
              {score.team1}
              {score.team1 >= 5 && isLastMatch && (
                <Crown className="h-6 w-6 inline ml-2 text-yellow-600" />
              )}
            </div>
            <div className="text-sm text-gray-600">Time 1</div>
          </div>
          <div className="text-2xl font-bold text-gray-400">x</div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold ${score.team2 >= 5 && isLastMatch ? 'text-yellow-600' : 'text-red-600'}`}
            >
              {score.team2}
              {score.team2 >= 5 && isLastMatch && (
                <Crown className="h-6 w-6 inline ml-2 text-yellow-600" />
              )}
            </div>
            <div className="text-sm text-gray-600">Time 2</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {/* Substitution Button */}
        <CustomButton
          onClick={() => handleSubstitution('individual')}
          variant="secondary"
          size="md"
          fullWidth
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Substituição
        </CustomButton>

        {/* Last Match Button - Only show if not already active */}
        {!isLastMatch && (
          <CustomButton
            onClick={activateLastMatch}
            variant="gradient"
            size="md"
            fullWidth
          >
            <Flame className="h-4 w-4 mr-2" />🔥 Última do Dia
          </CustomButton>
        )}
      </div>

      {/* Players List with Actions */}
      <div className="space-y-4">
        {/* Team 1 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 text-center bg-blue-50 py-2 rounded-lg">
            Time 1
          </h3>
          <div className="space-y-3">
            {getPlayingPlayers(1).map((player) => (
              <div
                key={player.id}
                className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <ImageWithFallback
                    src={player.photo}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {player.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      G: {playerStats[player.id]?.goals || 0} | A:{' '}
                      {playerStats[player.id]?.assists || 0} | D:{' '}
                      {playerStats[player.id]?.tackles || 0}
                    </div>
                  </div>
                </div>

                {/* Larger Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => addGoal(player.id, 1)}
                    className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors border-2 border-green-300 hover:border-green-400"
                  >
                    <Target className="h-6 w-6 text-green-700 mb-1" />
                    <span className="text-sm font-medium text-green-700">
                      Gol
                    </span>
                  </button>
                  <button
                    onClick={() => addAssist(player.id)}
                    className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border-2 border-blue-300 hover:border-blue-400"
                  >
                    <Users className="h-6 w-6 text-blue-700 mb-1" />
                    <span className="text-sm font-medium text-blue-700">
                      Assist
                    </span>
                  </button>
                  <button
                    onClick={() => addTackle(player.id)}
                    className="flex flex-col items-center justify-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors border-2 border-purple-300 hover:border-purple-400"
                  >
                    <Shield className="h-6 w-6 text-purple-700 mb-1" />
                    <span className="text-sm font-medium text-purple-700">
                      Desarme
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team 2 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 text-center bg-red-50 py-2 rounded-lg">
            Time 2
          </h3>
          <div className="space-y-3">
            {getPlayingPlayers(2).map((player) => (
              <div
                key={player.id}
                className="bg-white border-2 border-red-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <ImageWithFallback
                    src={player.photo}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {player.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      G: {playerStats[player.id]?.goals || 0} | A:{' '}
                      {playerStats[player.id]?.assists || 0} | D:{' '}
                      {playerStats[player.id]?.tackles || 0}
                    </div>
                  </div>
                </div>

                {/* Larger Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => addGoal(player.id, 2)}
                    className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors border-2 border-green-300 hover:border-green-400"
                  >
                    <Target className="h-6 w-6 text-green-700 mb-1" />
                    <span className="text-sm font-medium text-green-700">
                      Gol
                    </span>
                  </button>
                  <button
                    onClick={() => addAssist(player.id)}
                    className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border-2 border-blue-300 hover:border-blue-400"
                  >
                    <Users className="h-6 w-6 text-blue-700 mb-1" />
                    <span className="text-sm font-medium text-blue-700">
                      Assist
                    </span>
                  </button>
                  <button
                    onClick={() => addTackle(player.id)}
                    className="flex flex-col items-center justify-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors border-2 border-purple-300 hover:border-purple-400"
                  >
                    <Shield className="h-6 w-6 text-purple-700 mb-1" />
                    <span className="text-sm font-medium text-purple-700">
                      Desarme
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* End Match Button */}
      <div className="mt-6">
        <CustomButton
          onClick={endMatch}
          variant="secondary"
          size="lg"
          fullWidth
        >
          Encerrar Partida
        </CustomButton>
      </div>

      {/* Substitution Modal */}
      {showSubstitutionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Substituição
              </h3>
              <p className="text-gray-600">Escolha o tipo de substituição</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSubstitutionType('individual')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    substitutionType === 'individual'
                      ? 'border-[#F2442E] bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Individual</div>
                  <div className="text-sm text-gray-600">Trocar um jogador</div>
                </button>

                <button
                  onClick={() => setSubstitutionType('team')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    substitutionType === 'team'
                      ? 'border-[#F2442E] bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Time Todo</div>
                  <div className="text-sm text-gray-600">Trocar equipe</div>
                </button>
              </div>

              {substitutionType === 'individual' && (
                <div className="space-y-3">
                  <h4 className="font-medium">
                    Selecione o jogador para substituir:
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {[...getPlayingPlayers(1), ...getPlayingPlayers(2)].map(
                      (player) => (
                        <button
                          key={player.id}
                          onClick={() => setSelectedPlayer(player)}
                          className={`w-full flex items-center p-3 rounded-lg border transition-colors ${
                            selectedPlayer?.id === player.id
                              ? 'border-[#F2442E] bg-red-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <ImageWithFallback
                            src={player.photo}
                            alt={player.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="text-left">
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-gray-600">
                              Time {player.team}
                            </div>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {substitutionType === 'team' && (
                <div className="space-y-3">
                  <h4 className="font-medium">
                    Selecione o time para substituir:
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedTeam(1)}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        selectedTeam === 1
                          ? 'border-[#F2442E] bg-red-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">Time 1</div>
                      <div className="text-sm text-gray-600">
                        {getPlayingPlayers(1).length} jogadores
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedTeam(2)}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        selectedTeam === 2
                          ? 'border-[#F2442E] bg-red-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">Time 2</div>
                      <div className="text-sm text-gray-600">
                        {getPlayingPlayers(2).length} jogadores
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <CustomButton
                  onClick={() => setShowSubstitutionModal(false)}
                  variant="outline"
                  size="md"
                  fullWidth
                >
                  Cancelar
                </CustomButton>
                <CustomButton
                  onClick={executeSubstitution}
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={!selectedPlayer && !selectedTeam}
                >
                  Substituir
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveMatchScreen
