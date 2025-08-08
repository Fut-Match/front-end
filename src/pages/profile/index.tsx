// Bibliotecas
import { Calendar, Camera, Edit3, Shield, Star, Target, Trophy, User, Users } from 'lucide-react';
import React, { useState, } from 'react';
// Componentes
import { Screen } from '../../App';
// Imagens
import playerIconImage from '../../../public/favicon.svg';

interface PlayerProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'history' | 'achievements'>('stats');

  const playerData = {
    name: 'João Silva',
    nickname: 'Jão',
    position: 'Atacante',
    joinDate: '2023-05-15',
    avatar: playerIconImage,
    level: 25,
    experience: 2580,
    experienceToNext: 3000,
    tier: 'Diamante',
    ranking: 1,
    totalPlayers: 156
  };

  const stats = {
    general: {
      matchesPlayed: 45,
      wins: 35,
      draws: 7,
      losses: 3,
      winRate: 78,
      goals: 89,
      assists: 45,
      mvpCount: 12,
      yellowCards: 3,
      redCards: 0
    },
    detailed: {
      goalsPerMatch: 1.98,
      assistsPerMatch: 1.0,
      shotsOnTarget: 78,
      passAccuracy: 85,
      tacklesWon: 42,
      cleanSheets: 8,
      minutesPlayed: 3150
    }
  };

  const recentMatches = [
    { date: '2024-01-15', opponent: 'Time Azul', result: 'V', score: '4-2', goals: 2, assists: 1, mvp: true },
    { date: '2024-01-12', opponent: 'Estrelas FC', result: 'V', score: '3-1', goals: 1, assists: 2, mvp: false },
    { date: '2024-01-08', opponent: 'Unidos', result: 'E', score: '2-2', goals: 1, assists: 0, mvp: false },
    { date: '2024-01-05', opponent: 'Leões', result: 'V', score: '5-1', goals: 3, assists: 1, mvp: true },
    { date: '2024-01-02', opponent: 'Falcões', result: 'D', score: '1-2', goals: 0, assists: 1, mvp: false }
  ];

  const achievements = [
    { title: 'Hat-trick Master', description: 'Marcou 5 hat-tricks', icon: Target, completed: true },
    { title: 'Artilheiro', description: 'Mais de 50 gols', icon: Trophy, completed: true },
    { title: 'Assistente Real', description: 'Mais de 30 assistências', icon: Users, completed: true },
    { title: 'MVP Legend', description: '10 títulos de MVP', icon: Star, completed: true },
    { title: 'Invencível', description: '15 vitórias seguidas', icon: Shield, completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Page Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl shadow-lg relative">
          <div className="absolute right-4 top-4 opacity-20">
            <User className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
          <p className="text-blue-100">Suas estatísticas e conquistas</p>
        </div>
      </div>

      {/* Player Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img 
              src={playerData.avatar} 
              alt={playerData.name}
              className="h-20 w-20 rounded-full border-4 border-blue-200"
            />
            <button  className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
              <Camera className="h-3 w-3" />
            </button>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{playerData.name}</h2>
              <button  className="text-gray-400 hover:text-gray-600">
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-600">"{playerData.nickname}" • {playerData.position}</p>
            
            <div className="flex items-center space-x-4 mt-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                {playerData.tier}
              </div>
              <div className="text-sm text-gray-600">
                #{playerData.ranking} de {playerData.totalPlayers}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">Nv. {playerData.level}</div>
            <div className="text-xs text-gray-500">
              {playerData.experience}/{playerData.experienceToNext} XP
            </div>
            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(playerData.experience / playerData.experienceToNext) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          Jogando desde {new Date(playerData.joinDate).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm ${
            activeTab === 'stats'
              ? 'bg-[#F2442E] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Estatísticas
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm ${
            activeTab === 'history'
              ? 'bg-[#F2442E] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Histórico
        </button>
        <button 
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm ${
            activeTab === 'achievements'
              ? 'bg-[#F2442E] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Conquistas
        </button>
      </div>

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* General Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Estatísticas Gerais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.general.matchesPlayed}</div>
                <div className="text-sm text-gray-600">Partidas</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.general.winRate}%</div>
                <div className="text-sm text-gray-600">Taxa de Vitória</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.general.goals}</div>
                <div className="text-sm text-gray-600">Gols</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.general.assists}</div>
                <div className="text-sm text-gray-600">Assistências</div>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Estatísticas Detalhadas</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Gols por partida</span>
                <span className="font-medium">{stats.detailed.goalsPerMatch}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Assistências por partida</span>
                <span className="font-medium">{stats.detailed.assistsPerMatch}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">MVPs conquistados</span>
                <span className="font-medium">{stats.general.mvpCount}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Minutos jogados</span>
                <span className="font-medium">{stats.detailed.minutesPlayed}'</span>
              </div>
            </div>
          </div>

          {/* Win/Loss Record */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Resultados</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{stats.general.wins}</div>
                <div className="text-sm text-gray-600">Vitórias</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600">{stats.general.draws}</div>
                <div className="text-sm text-gray-600">Empates</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{stats.general.losses}</div>
                <div className="text-sm text-gray-600">Derrotas</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Últimas 5 Partidas</h3>
            <div className="space-y-3">
              {recentMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      match.result === 'V' ? 'bg-green-500' : 
                      match.result === 'E' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {match.result}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{match.opponent}</p>
                      <p className="text-sm text-gray-600">{new Date(match.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">{match.score}</p>
                    <div className="text-xs text-gray-600 flex items-center space-x-2">
                      <span>{match.goals}G {match.assists}A</span>
                      {match.mvp && <Star className="h-3 w-3 text-yellow-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-lg p-4 shadow-sm border-2 ${
                  achievement.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${
                    achievement.completed ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <div className="text-green-500">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Botões de Ações */}
      {/* <div className="mt-6 space-y-3">
        <CustomButton
          onClick={() => onNavigate('challenges')}
          className="w-full"
          variant="gradient"
        >
          Ver Todos os Desafios
        </CustomButton>
        
        <CustomButton
          onClick={() => onNavigate('ranking')}
          className="w-full"
          variant="secondary"
        >
          Comparar no Ranking
        </CustomButton>
      </div> */}
    </div>
  );
};

export default PlayerProfileScreen;