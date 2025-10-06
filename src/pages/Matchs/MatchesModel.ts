
import { useState } from "react";
import { useNavigate } from "react-router-dom";




// Mock data - will be replaced with real data from Supabase
const mockMatches = [
    {
        id: "1",
        name: "Pelada do Sábado",
        organizer: "Carlos Mendes",
        playersPerTeam: 5,
        currentPlayers: 8,
        maxPlayers: 10,
        date: "2024-01-20",
        time: "15:00",
        location: "Campo do Vila Nova",
        endCriteria: { goals: 3, time: 90 },
        status: "organizing" as const,
        userRole: "participant" as const
    },
    {
        id: "2",
        name: "Copa do Bairro",
        organizer: "Ana Costa",
        playersPerTeam: 3,
        currentPlayers: 6,
        maxPlayers: 6,
        date: "2024-01-22",
        time: "18:30",
        location: "Quadra Central",
        endCriteria: { time: 60 },
        status: "organizing" as const,
        userRole: "organizer" as const
    },
    {
        id: "3",
        name: "Amistoso Fim de Semana",
        organizer: "Pedro Santos",
        playersPerTeam: 5,
        currentPlayers: 10,
        maxPlayers: 10,
        date: "2024-01-15",
        time: "16:00",
        location: "Campo do Centro",
        endCriteria: { goals: 5 },
        status: "finished" as const,
        userRole: "participant" as const
    }
];


interface MatchesProps {
    onCreateMatch?: () => void;
    onViewMatch?: (matchId: string) => void;
    onManageMatch?: (matchId: string) => void;
}

export function MatchesModel({ onCreateMatch, onViewMatch, onManageMatch }: MatchesProps) {
    const [inviteCode, setInviteCode] = useState("");
    const navigate = useNavigate();
    const organizingMatches = mockMatches.filter(m => m.userRole === "organizer");
    const participatingMatches = mockMatches.filter(m => m.userRole === "participant");

    const handleJoinMatch = (matchId: string) => {
        console.log("Joining match:", matchId);
        // TODO: Implement join match logic with Supabase
    };

    const handleViewMatch = (matchId: string) => {
        onViewMatch?.(matchId);
    };

    const handleManageMatch = (matchId: string) => {
        onManageMatch?.(matchId);
    };

    const navigateToCreateMatch = () => {
        navigate("/matches/create");

    }

    const handleJoinByCode = () => {
        if (inviteCode.trim()) {
            console.log("Joining match with code:", inviteCode);
            // TODO: Implement join by invite code
            setInviteCode("");
        }
    };

    return {
        handleJoinByCode,
        handleJoinMatch,
        handleViewMatch,
        navigateToCreateMatch,
        handleManageMatch,
        inviteCode,
        setInviteCode,
        organizingMatches,
        participatingMatches
    };
}