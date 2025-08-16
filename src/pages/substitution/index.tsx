import playerIconImage from 'figma:asset/c38c8f907b4c177d52e9de910c93caf2e0d2213f.png'
import {
  AlertCircle,
  ArrowRightLeft,
  RefreshCw,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface Player {
  id: number
  name: string
  position: string
  avatar: string
  stamina: number
}

interface SubstitutionScreenProps {
  onNavigate: (screen: Screen) => void
}

const SubstitutionScreen: React.FC<SubstitutionScreenProps> = ({
  onNavigate,
}) => {
  const [selectedPlayerOut, setSelectedPlayerOut] = useState<Player | null>(
    null
  )
  const [selectedPlayerIn, setSelectedPlayerIn] = useState<Player | null>(null)
  const [activeTeam, setActiveTeam] = useState<'team1' | 'team2'>('team1')

  // Mock data para jogadores
  const team1Playing = [
    {
      id: 1,
      name: 'João Silva',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 85,
    },
    {
      id: 2,
      name: 'Pedro Santos',
      position: 'Meio-campo',
      avatar: playerIconImage,
      stamina: 70,
    },
    {
      id: 3,
      name: 'Carlos Lima',
      position: 'Defensor',
      avatar: playerIconImage,
      stamina: 90,
    },
    {
      id: 4,
      name: 'Rafael Costa',
      position: 'Goleiro',
      avatar: playerIconImage,
      stamina: 95,
    },
    {
      id: 5,
      name: 'Lucas Ferreira',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 60,
    },
  ]

  const team2Playing = [
    {
      id: 6,
      name: 'Miguel Oliveira',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 80,
    },
    {
      id: 7,
      name: 'André Silva',
      position: 'Meio-campo',
      avatar: playerIconImage,
      stamina: 75,
    },
    {
      id: 8,
      name: 'Bruno Costa',
      position: 'Defensor',
      avatar: playerIconImage,
      stamina: 85,
    },
    {
      id: 9,
      name: 'Paulo Lima',
      position: 'Goleiro',
      avatar: playerIconImage,
      stamina: 90,
    },
    {
      id: 10,
      name: 'Roberto Santos',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 55,
    },
  ]

  const team1Bench = [
    {
      id: 11,
      name: 'Felipe Rocha',
      position: 'Meio-campo',
      avatar: playerIconImage,
      stamina: 100,
    },
    {
      id: 12,
      name: 'Diego Alves',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 100,
    },
    {
      id: 13,
      name: 'Marcos Silva',
      position: 'Defensor',
      avatar: playerIconImage,
      stamina: 100,
    },
  ]

  const team2Bench = [
    {
      id: 14,
      name: 'Gabriel Santos',
      position: 'Meio-campo',
      avatar: playerIconImage,
      stamina: 100,
    },
    {
      id: 15,
      name: 'Thiago Lima',
      position: 'Atacante',
      avatar: playerIconImage,
      stamina: 100,
    },
    {
      id: 16,
      name: 'Rodrigo Costa',
      position: 'Defensor',
      avatar: playerIconImage,
      stamina: 100,
    },
  ]

  const currentPlaying = activeTeam === 'team1' ? team1Playing : team2Playing
  const currentBench = activeTeam === 'team1' ? team1Bench : team2Bench

  const handleSubstitution = () => {
    if (selectedPlayerOut && selectedPlayerIn) {
      alert(
        `Substituição realizada: ${selectedPlayerOut.name} saiu, ${selectedPlayerIn.name} entrou`
      )
      setSelectedPlayerOut(null)
      setSelectedPlayerIn(null)
      // Reset stamina and start new "queda"
    }
  }

  const handleResetMatch = () => {
    if (
      confirm(
        'Tem certeza que deseja resetar a partida e reorganizar os times?'
      )
    ) {
      alert('Partida resetada! Reorganizando os times...')
      onNavigate('matchControl')
    }
  }

  const getStaminaColor = (stamina: number) => {
    if (stamina >= 80) return 'text-green-600 bg-green-100'
    if (stamina >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Page Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl shadow-lg relative">
          <div className="absolute right-4 top-4 opacity-20">
            <ArrowRightLeft className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Substituições</h1>
          <p className="text-orange-100">Gerencie os jogadores em campo</p>
        </div>
      </div>

      {/* Team Selection */}
      <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTeam('team1')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm ${
            activeTeam === 'team1'
              ? 'bg-[#F2442E] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Time A
        </button>
        <button
          type="button"
          onClick={() => setActiveTeam('team2')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm ${
            activeTeam === 'team2'
              ? 'bg-[#F2442E] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Time B
        </button>
      </div>

      {/* Substitution Status */}
      {(selectedPlayerOut || selectedPlayerIn) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <ArrowRightLeft className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">
              Substituição em Andamento
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedPlayerOut ? (
                <div className="flex items-center space-x-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-700">
                    Sai: {selectedPlayerOut.name}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  Selecione quem sai
                </span>
              )}
            </div>

            <ArrowRightLeft className="h-4 w-4 text-gray-400" />

            <div className="flex items-center space-x-3">
              {selectedPlayerIn ? (
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Entra: {selectedPlayerIn.name}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  Selecione quem entra
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Players in Field */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Jogadores em Campo</h3>
          <span className="text-sm text-gray-600">
            {currentPlaying.length} jogadores
          </span>
        </div>

        <div className="p-4 space-y-3">
          {currentPlaying.map((player) => (
            <button
              type="button"
              key={player.id}
              onClick={() => setSelectedPlayerOut(player)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedPlayerOut(player)
                }
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors text-left ${
                selectedPlayerOut?.id === player.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="h-10 w-10 rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-900">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.position}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStaminaColor(player.stamina)}`}
                >
                  {player.stamina}% energia
                </div>
                {selectedPlayerOut?.id === player.id && (
                  <UserX className="h-5 w-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bench Players */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Jogadores Reservas</h3>
          <span className="text-sm text-gray-600">
            {currentBench.length} disponíveis
          </span>
        </div>

        <div className="p-4 space-y-3">
          {currentBench.length > 0 ? (
            currentBench.map((player) => (
              <button
                type="button"
                key={player.id}
                onClick={() => setSelectedPlayerIn(player)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedPlayerIn(player)
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors text-left ${
                  selectedPlayerIn?.id === player.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="h-10 w-10 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-600">{player.position}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    100% energia
                  </div>
                  {selectedPlayerIn?.id === player.id && (
                    <UserCheck className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum jogador disponível no banco</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <CustomButton
          onClick={handleSubstitution}
          disabled={!selectedPlayerOut || !selectedPlayerIn}
          variant="gradient"
          className="w-full"
        >
          <ArrowRightLeft className="h-5 w-5 mr-2" />
          Realizar Substituição
        </CustomButton>

        <CustomButton
          onClick={handleResetMatch}
          variant="secondary"
          className="w-full"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Resetar e Reorganizar Times
        </CustomButton>

        <CustomButton
          onClick={() => onNavigate('matchControl')}
          variant="outline"
          className="w-full"
        >
          Voltar ao Controle da Partida
        </CustomButton>
      </div>

      {/* Substitution Rules */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Regras de Substituição
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Substituições resetam a "queda" atual</li>
              <li>• Jogador que sai não pode retornar na mesma queda</li>
              <li>• Energia do jogador é restaurada ao entrar</li>
              <li>• Máximo de 3 substituições por time por partida</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubstitutionScreen
