import {
  Calendar,
  Clock,
  Eye,
  Search,
  Shield,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { ImageWithFallback } from '../../../public/figma'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void
  onSelectMatch: (match: any) => void
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onNavigate,
  onSelectMatch,
}) => {
  const [activeFilter, setActiveFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock historical matches with more detailed data
  const historicalMatches = [
    {
      id: 1,
      name: 'Final do Campeonato',
      date: '2025-01-20',
      time: '16:00',
      duration: 18,
      location: 'Campo Central',
      type: 'Oficial',
      result: 'Vitória',
      finalScore: { team1: 3, team2: 1 },
      mvp: {
        name: 'João Silva',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        goals: 3,
        assists: 1,
      },
      participants: 10,
      totalGoals: 4,
      category: 'competitivo',
    },
    {
      id: 2,
      name: 'Pelada do Sábado',
      date: '2025-01-18',
      time: '15:00',
      duration: 22,
      location: 'Quadra da Escola',
      type: 'Amistoso',
      result: 'Empate',
      finalScore: { team1: 2, team2: 2 },
      mvp: {
        name: 'Maria Santos',
        photo:
          'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        assists: 4,
        tackles: 3,
      },
      participants: 8,
      totalGoals: 4,
      category: 'amistoso',
    },
    {
      id: 3,
      name: 'Racha da Galera',
      date: '2025-01-15',
      time: '18:30',
      duration: 15,
      location: 'Campo do Parque',
      type: 'Treino',
      result: 'Derrota',
      finalScore: { team1: 1, team2: 3 },
      mvp: {
        name: 'Pedro Costa',
        photo:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        tackles: 8,
        goals: 1,
      },
      participants: 6,
      totalGoals: 4,
      category: 'treino',
    },
    {
      id: 4,
      name: 'Treino de Quinta',
      date: '2025-01-12',
      time: '19:00',
      duration: 20,
      location: 'Ginásio Municipal',
      type: 'Treino',
      result: 'Vitória',
      finalScore: { team1: 4, team2: 2 },
      mvp: {
        name: 'Carlos Lima',
        photo:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        goals: 2,
        assists: 2,
      },
      participants: 8,
      totalGoals: 6,
      category: 'treino',
    },
    {
      id: 5,
      name: 'Copa de Verão',
      date: '2025-01-08',
      time: '14:00',
      duration: 25,
      location: 'Estádio da Cidade',
      type: 'Oficial',
      result: 'Vitória',
      finalScore: { team1: 5, team2: 3 },
      mvp: {
        name: 'Ana Oliveira',
        photo:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        goals: 2,
        assists: 3,
      },
      participants: 12,
      totalGoals: 8,
      category: 'competitivo',
    },
  ]

  const filterOptions = [
    { value: 'todos', label: 'Todas' },
    { value: 'competitivo', label: 'Competitivas' },
    { value: 'amistoso', label: 'Amistosas' },
    { value: 'treino', label: 'Treinos' },
  ]

  // Filter matches based on active filters
  const filteredMatches = historicalMatches.filter((match) => {
    const matchesFilter =
      activeFilter === 'todos' || match.category === activeFilter
    const matchesSearch =
      match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate statistics
  const stats = {
    totalMatches: historicalMatches.length,
    victories: historicalMatches.filter((m) => m.result === 'Vitória').length,
    draws: historicalMatches.filter((m) => m.result === 'Empate').length,
    defeats: historicalMatches.filter((m) => m.result === 'Derrota').length,
    totalGoals: historicalMatches.reduce(
      (acc, match) => acc + match.totalGoals,
      0
    ),
    avgDuration: Math.round(
      historicalMatches.reduce((acc, match) => acc + match.duration, 0) /
        historicalMatches.length
    ),
    totalParticipants: historicalMatches.reduce(
      (acc, match) => acc + match.participants,
      0
    ),
  }

  const handleViewSummary = (match: any) => {
    onSelectMatch(match)
    onNavigate('matchSummary')
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Vitória':
        return 'bg-green-100 text-green-800'
      case 'Empate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Derrota':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case 'Oficial':
        return '🏆'
      case 'Amistoso':
        return '⚽'
      case 'Treino':
        return '🎯'
      default:
        return '⚽'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Discrete Page Title */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-700 text-center">
          📊 Histórico
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-[#F2442E]">
              {stats.totalMatches}
            </div>
            <Trophy className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">Total de Partidas</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.victories}V • {stats.draws}E • {stats.defeats}D
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalGoals}
            </div>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">Total de Gols</div>
          <div className="text-xs text-gray-500 mt-1">
            {(stats.totalGoals / stats.totalMatches).toFixed(1)} por partida
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-blue-600">
              {stats.avgDuration}
            </div>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">Min/Partida</div>
          <div className="text-xs text-gray-500 mt-1">Tempo médio</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalParticipants}
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">Jogadores</div>
          <div className="text-xs text-gray-500 mt-1">Total únicos</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === option.value
                  ? 'bg-[#F2442E] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="text-gray-400 mb-2">
              <Trophy className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">
              Nenhuma partida encontrada
            </h3>
            <p className="text-sm text-gray-600">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Match Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">
                        {getMatchTypeIcon(match.type)}
                      </span>
                      <h3 className="font-semibold text-gray-900">
                        {match.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(match.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {match.time}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(match.result)}`}
                  >
                    {match.result}
                  </span>
                </div>

                {/* Score Display */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    📍 {match.location}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {match.finalScore.team1} x {match.finalScore.team2}
                  </div>
                </div>
              </div>

              {/* MVP Section */}
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ImageWithFallback
                      src={match.mvp.photo}
                      alt={match.mvp.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <div className="absolute -top-1 -right-1">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {match.mvp.name}
                      </span>
                      <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">
                        MVP
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                      {match.mvp.goals && (
                        <span className="flex items-center">
                          <Target className="h-3 w-3 mr-1" />
                          {match.mvp.goals}G
                        </span>
                      )}
                      {match.mvp.assists && (
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {match.mvp.assists}A
                        </span>
                      )}
                      {match.mvp.tackles && (
                        <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          {match.mvp.tackles}D
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Stats */}
              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {match.duration} min
                    </div>
                    <div className="text-xs text-gray-600">Duração</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {match.participants}
                    </div>
                    <div className="text-xs text-gray-600">Jogadores</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {match.totalGoals}
                    </div>
                    <div className="text-xs text-gray-600">Gols</div>
                  </div>
                </div>

                <CustomButton
                  onClick={() => handleViewSummary(match)}
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Resumo Completo
                </CustomButton>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {/* {filteredMatches.length > 0 && (
        <div className="mt-6 text-center">
          <CustomButton variant="outline" size="md">
            <TrendingUp className="h-4 w-4 mr-2" />
            Carregar mais partidas
          </CustomButton>
        </div>
      )} */}
    </div>
  )
}

export default HistoryScreen
