import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatches } from "@/hooks/queries/useMatchesQueries";
import { useAuth } from "@/hooks";

interface Match {
  id?: number | string;
  code?: string;
  name?: string;
  match_date?: string;
  admin_id?: number;
  players?: any[];
  [key: string]: any;
}
export interface MatchesResponse {
  data: Match[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}



interface MatchesProps {
  onCreateMatch?: () => void;
  onViewMatch?: (matchId: string) => void;
  onManageMatch?: (matchId: string) => void;
}

export function MatchesModel({ onCreateMatch, onViewMatch, onManageMatch }: MatchesProps) {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");

  // Agora sem renomeação desnecessária
 const { data: response, isLoading, error } = useMatches();
  const { user } = useAuth();

  // Garantimos que sempre será array
 const Matches: Match[] = Array.isArray(response?.data) ? response.data : [];

  // Define roles
  const MatchesWithRole = Matches.map((matchItem: Match) => {
    const isOrganizer = matchItem.admin_id === user?.id;
    const isParticipant = matchItem.players?.some((p: any) => p.id === user?.id);

    return {
      id: String(matchItem.id),
      name: matchItem.name ?? "Partida sem nome",
      organizer: matchItem.organizer_name ?? "Desconhecido",
      playersPerTeam: matchItem.players_per_team ?? 5,
      currentPlayers: matchItem.players?.length ?? 0,
      maxPlayers: (matchItem.players_per_team ?? 5) * 2,
      date: matchItem.match_date ?? new Date().toISOString(),
      time: matchItem.match_time ?? "00:00",
      location: matchItem.location ?? "Local não informado",
      endCriteria: { goals: 3 },
      status: (matchItem.status ?? "organizing").toLowerCase(),
      userRole: isOrganizer ? "organizer" : isParticipant ? "participant" : "none",
    };
  });

  const organizingMatches = MatchesWithRole.filter(m => m.userRole === "organizer");
  const participatingMatches = MatchesWithRole.filter(m => m.userRole === "participant");
  const filteredMatches = MatchesWithRole.filter(m => m.status === "organizing");

  // Handlers
  const handleJoinMatch = (matchId: string) => console.log("Joining match:", matchId);
  const handleViewMatch = (matchId: string) => onViewMatch?.(matchId);

  const handleManageMatch = (matchId: string) => {
    console.log("⚙️ handleManageMatch chamado com:", matchId);
    navigate(`/matches/${matchId}/manage`);
  };

  const handleJoinByCode = () => {
    if (inviteCode.trim()) {
      console.log("Joining match with code:", inviteCode);
      setInviteCode("");
    }
  };

  const navigateToCreateMatch = () => navigate("/matches/create");

  return {
    handleJoinByCode,
    handleJoinMatch,
    handleViewMatch,
    navigateToCreateMatch,
    handleManageMatch,
    inviteCode,
    setInviteCode,
    organizingMatches,
    participatingMatches,
    filteredMatches,
    error,
    isLoading,
    
  };
}
