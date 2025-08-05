import { Award, Shield, Star, Target, Trophy, Users } from 'lucide-react'
import type React from 'react'
import playerIconImage from '../../../public/favicon.svg'
import { ImageWithFallback } from '../../../public/figma'
import type { Screen } from '.././../App'

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // Mock user data
  const userData = {
    name: 'João Silva',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    stats: {
      goals: 24,
      assists: 12,
      matches: 18,
      tackles: 67,
    },
    rating: 87,
  }

  // Conquistas deixar para mais tarde
  // const achievements = [
  //   {
  //     id: 1,
  //     title: 'Artilheiro',
  //     description: 'Marque 20 gols',
  //     progress: 100,
  //     icon: Target,
  //     color: 'bg-yellow-500',
  //     completed: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Veterano',
  //     description: 'Jogue 15 partidas',
  //     progress: 100,
  //     icon: Users,
  //     color: 'bg-blue-500',
  //     completed: true
  //   },
  //   {
  //     id: 3,
  //     title: 'Defensor',
  //     description: 'Faça 50 desarmes',
  //     progress: 85,
  //     icon: Shield,
  //     color: 'bg-green-500',
  //     completed: false
  //   },
  //   {
  //     id: 4,
  //     title: 'Craque',
  //     description: 'Seja MVP 5 vezes',
  //     progress: 60,
  //     icon: Star,
  //     color: 'bg-purple-500',
  //     completed: false
  //   }
  // ];

  // Açoes rapidas

  const quickActions = [
    {
      title: 'Minhas Partidas',
      description: 'Veja suas partidas ativas',
      icon: Users,
      action: () => onNavigate('myMatches'),
      color: 'bg-[#F2442E]',
    },
    {
      title: 'Histórico',
      description: 'Revisar partidas antigas',
      icon: Trophy,
      action: () => onNavigate('history'),
      color: 'bg-gray-800',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Discrete Page Title */}

      {/* FIFA-style Player Card */}
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F2442E]/20 to-transparent"></div>
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5"></div>
          <div className="absolute -left-5 -bottom-5 h-20 w-20 rounded-full bg-white/10"></div>
          {/* Player Icon Background */}
          <div className="absolute right-4 top-4 opacity-10">
            <img
              src={playerIconImage}
              alt="Player Icon"
              className="h-16 w-16"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ImageWithFallback
                    src={userData.photo}
                    alt={userData.name}
                    className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#F2442E] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {userData.rating}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-300">Jogador</p>
                </div>
              </div>
            </div>

            {/* Stats Layout */}
            <div className="grid grid-cols-6 gap-2">
              {/* Goals */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  GOLS
                </div>
                <div className="text-lg font-bold text-white">
                  {userData.stats.goals}
                </div>
              </div>

              {/* Assists */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  ASSISTÊNCIAS
                </div>
                <div className="text-lg font-bold text-white">
                  {userData.stats.assists}
                </div>
              </div>

              {/* Tackles */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  DESARMES
                </div>
                <div className="text-lg font-bold text-white">
                  {userData.stats.tackles}
                </div>
              </div>

              {/* Matches */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  MVPS
                </div>
                <div className="text-lg font-bold text-white">7</div>
              </div>

              {/* Victories */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  VITÓRIAS
                </div>
                <div className="text-lg font-bold text-white">
                  {userData.stats.matches}
                </div>
              </div>

              {/* Average Rating */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  NOTA MÉDIA
                </div>
                <div className="text-lg font-bold text-white">8.2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Achievements Section */}
      {/* <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Conquistas</h3>
          <button
            onClick={() => onNavigate('challenges')}
            className="text-[#F2442E] text-sm font-medium"
          >
            Ver todas
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {achievements.slice(0, 3).map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.completed ? (
                    <div className="text-green-600">
                      <Award className="h-6 w-6" />
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{achievement.progress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-[#F2442E] h-2 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  )
}

export default HomeScreen
