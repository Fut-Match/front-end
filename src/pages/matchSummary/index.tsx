import React from 'react';
import { ArrowLeft, Trophy, Target, Users, Shield, Clock, Calendar, Share2, } from 'lucide-react';
import { Screen } from '../../App';
import { ImageWithFallback } from '../../../public/figma';
import CustomButton from '../../components/ui/customButton';

interface MatchSummaryScreenProps {
    onNavigate: (screen: Screen) => void;
    match: any;
}

const MatchSummaryScreen: React.FC<MatchSummaryScreenProps> = ({ onNavigate, match }) => {
    const handleShareMatch = () => {
        const matchText = `🏆 Partida Finalizada - FutMatch\n\n${matchDetails.name}\n📅 ${new Date(matchDetails.date).toLocaleDateString('pt-BR')}\n⏰ ${matchDetails.time}\n👥 ${matchDetails.participants} jogadores\n🥇 MVP: ${matchDetails.mvp.name}\n\nConfira mais detalhes no FutMatch!`;

        if (navigator.share) {
            navigator.share({
                title: 'Resumo da Partida - FutMatch',
                text: matchText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(matchText);
            alert('Resumo copiado para a área de transferência!');
        }
    };

    // Mock detailed match data
    const matchDetails = {
        name: match?.name || 'Final do Campeonato',
        date: match?.date || '2025-01-20',
        time: match?.time || '16:00',
        duration: match?.duration || 18,
        participants: match?.participants || 10,
        topScorer: {
            name: 'João Silva',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            goals: 3
        },
        topAssister: {
            name: 'Maria Santos',
            photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
            assists: 4
        },
        topDefender: {
            name: 'Carlos Lima',
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            tackles: 8
        },
        mvp: match?.mvp || {
            name: 'João Silva',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            goals: 3
        }
    };

    const stats = [
        {
            title: 'Mais Gols',
            player: matchDetails.topScorer,
            value: `${matchDetails.topScorer.goals} gols`,
            icon: Target,
            color: 'bg-green-500'
        },
        {
            title: 'Mais Assistências',
            player: matchDetails.topAssister,
            value: `${matchDetails.topAssister.assists} assistências`,
            icon: Users,
            color: 'bg-blue-500'
        },
        {
            title: 'Mais Desarmes',
            player: matchDetails.topDefender,
            value: `${matchDetails.topDefender.tackles} desarmes`,
            icon: Shield,
            color: 'bg-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => onNavigate('history')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Resumo da Partida</h1>
                    <p className="text-gray-600">{matchDetails.name}</p>
                </div>
            </div>

            {/* Match Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(matchDetails.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {matchDetails.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {matchDetails.duration} min jogados
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {matchDetails.participants} participantes
                    </div>
                </div>
            </div>

            {/* MVP Section */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 mb-6 text-white">
                <div className="text-center">
                    <Trophy className="h-12 w-12 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">MVP da Partida</h2>
                    <div className="flex items-center justify-center space-x-4">
                        <ImageWithFallback
                            src={matchDetails.mvp.photo}
                            alt={matchDetails.mvp.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white"
                        />
                        <div className="text-left">
                            <div className="text-xl font-bold">{matchDetails.mvp.name}</div>
                            <div className="text-yellow-100">
                                {matchDetails.mvp.goals && `${matchDetails.mvp.goals} gols`}
                                {matchDetails.mvp.assists && `${matchDetails.mvp.assists} assistências`}
                                {matchDetails.mvp.tackles && `${matchDetails.mvp.tackles} desarmes`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Statistics */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Destaques da Partida</h3>
                <div className="space-y-4">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-lg ${stat.color}`}>
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{stat.title}</h4>
                                        <p className="text-sm text-gray-600">{stat.value}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <ImageWithFallback
                                            src={stat.player.photo}
                                            alt={stat.player.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="text-right">
                                            <div className="font-medium text-gray-900">{stat.player.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Estatísticas Gerais</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#F2442E]">
                            {Math.round(matchDetails.duration / matchDetails.participants * 10) / 10}
                        </div>
                        <div className="text-sm text-gray-600">Min/Jogador</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {matchDetails.topScorer.goals + (matchDetails.topAssister.assists || 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Ações</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {Math.round(matchDetails.participants / 2)}
                        </div>
                        <div className="text-sm text-gray-600">Jogadores/Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">100%</div>
                        <div className="text-sm text-gray-600">Participação</div>
                    </div>
                </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Curiosidades</h3>
                <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                        <Trophy className="h-5 w-5 text-yellow-600 mr-3" />
                        <span className="text-sm text-gray-700">
                            Partida mais longa do mês com {matchDetails.duration} minutos
                        </span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <Target className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-sm text-gray-700">
                            {matchDetails.topScorer.name} fez hat-trick nesta partida
                        </span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-sm text-gray-700">
                            Maior número de participantes da semana
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
                <CustomButton
                    onClick={handleShareMatch}
                    variant="gradient"
                    className="w-full"
                >
                    <Share2 className="h-5 w-5 mr-2" />
                    Compartilhar Resumo
                </CustomButton>

                {/* Area futura para galeria */}
                {/* <div className="grid grid-cols-2 gap-3">
          <CustomButton
            onClick={() => onNavigate('gallery')}
            variant="primary"
            className="flex items-center justify-center"
          >
            <Camera className="h-5 w-5 mr-2" />
            Ver Galeria
          </CustomButton>

          <CustomButton
            onClick={handleDownloadSummary}
            variant="secondary"
            className="flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Baixar Relatório
          </CustomButton>
        </div>

        <CustomButton
          onClick={() => onNavigate('feed')}
          variant="outline"
          className="w-full"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Postar no Feed Social
        </CustomButton> */}
            </div>
        </div>
    );
};

export default MatchSummaryScreen;