import { usePlayerMe } from "@/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Retirando dados fictícios
const UpcomingMatches = [

];


export function HomeModel() {
    const { data: playerData, isLoading, error } = usePlayerMe();
    const navigate = useNavigate();

    const playerStats = playerData ? {
        goals: playerData.goals || 0,
        assists: playerData.assists || 0,
        tackles: playerData.tackles || 0,
        mvps: playerData.mvps || 0,
        wins: playerData.wins || 0,
        averageRating: typeof playerData.average_rating === 'string'
            ? parseFloat(playerData.average_rating)
            : playerData.average_rating || 0
    } : null;

    const handleCreateMatch = () => {
        navigate("/matches/create");
    };

    const handleMyMatches = () => {
        navigate("/matches")
    };

    const [activeTab, setActiveTab] = useState<"conquistas" | "alertas">("conquistas");
    const RecentAchievements = [
        { id: 1, title: "Artilheiro da Temporada", date: "2024-05-10" },
        { id: 2, title: "Melhor Jogador do Mês", date: "2024-04-22" },
    ];
    const Alerts = [
        { id: 1, message: "Partida agendada para 15/06 às 18h." },
        { id: 2, message: "Atualize seu perfil para melhores recomendações." },
    ];

    return {
        playerData,
        playerStats,
        isLoading,
        error,
        UpcomingMatches,
        handleCreateMatch,
        handleMyMatches,
        activeTab,
        setActiveTab,
        RecentAchievements,
        Alerts,
    }

}

