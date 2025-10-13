
import { useState } from "react";
import { useNavigate } from "react-router-dom";




//  Retirando dados fictícios
const Matches = [

];


interface MatchesProps {
    onCreateMatch?: () => void;
    onViewMatch?: (matchId: string) => void;
    onManageMatch?: (matchId: string) => void;
}

export function MatchesModel({ onCreateMatch, onViewMatch, onManageMatch }: MatchesProps) {
    const [inviteCode, setInviteCode] = useState("");
    const navigate = useNavigate();
    const organizingMatches = Matches.filter(m => m.userRole === "organizer");
    const participatingMatches = Matches.filter(m => m.userRole === "participant");

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