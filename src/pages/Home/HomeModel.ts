import { usePlayerMe } from "@/hooks";
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


    return {
        playerData,
        playerStats,
        isLoading,
        error,
        UpcomingMatches,
        handleCreateMatch,
        handleMyMatches
    }

}

