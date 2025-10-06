import { usePlayerMe } from "@/hooks";
import { useNavigate } from "react-router-dom";

// Mock data para partidas futuras - será substituído por dados reais posteriormente
const mockUpcomingMatches = [
    {
        id: "1",
        name: "Pelada do Fim de Semana",
        date: "2024-01-20",
        time: "15:00"
    },
    {
        id: "2",
        name: "Copa do Bairro",
        date: "2024-01-22",
        time: "18:30"
    }
];


export function HomeModel() {
    const { data: playerData, isLoading, error } = usePlayerMe();
    const navigate = useNavigate();

    // Preparar os dados do player no formato esperado pelo PlayerCard
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


    return {
        playerData,
        playerStats,
        isLoading,
        error,
        mockUpcomingMatches,
        handleCreateMatch,
        handleMyMatches
    }

}

