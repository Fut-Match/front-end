//Adicionando comentário para descrever o propósito do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatch } from "@/hooks/queries/useMatchesQueries";
import { useAuth } from "@/hooks";
interface Match {
  id: number;
  code: string;
  name: string;
  match_date?: string;
  admin_id?: number;
  [key: string]: any;
}

interface MatchResponse {
  data: Match[];
  pagination?: object;
}

interface MatchesProps {
  onCreateMatch?: () => void;
  onViewMatch?: (matchId: string) => void;
  onManageMatch?: (matchId: string) => void;
}

export function MatchesModel({ onCreateMatch, onViewMatch, onManageMatch }: MatchesProps) {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");

  const { data: apiResponse, isLoading, error } = useMatch() as {
    data?: MatchResponse;
    isLoading: boolean;
    error?: unknown;
  };
  const { user } = useAuth();

  // Extrai corretamente os dados da API
  const Matches = Array.isArray(apiResponse?.data)
    ? apiResponse.data
    : Array.isArray(apiResponse)
      ? apiResponse
      : [];

  // Mapeia e define roles
  const MatchesWithRole = Matches.map((match: any) => {
    const isOrganizer = match.admin_id === user?.id;
    const isParticipant = match.players?.some((p: any) => p.id === user?.id);

    return {
      id: String(match.id),
      name: match.name ?? "Partida sem nome",
      organizer: match.organizer_name ?? "Desconhecido",
      playersPerTeam: match.players_per_team ?? 5,
      currentPlayers: match.players?.length ?? 0,
      maxPlayers: (match.players_per_team ?? 5) * 2,
      date: match.match_date ?? new Date().toISOString(),
      time: match.match_time ?? "00:00",
      location: match.location ?? "Local não informado",
      endCriteria: { goals: 3 },
      status: (match.status ?? "organizing").toLowerCase(),
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



  const navigateToCreateMatch = () => navigate("/matches/create");

  const handleJoinByCode = () => {
    if (inviteCode.trim()) {
      console.log("Joining match with code:", inviteCode);
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
    participatingMatches,
    filteredMatches,
    error,
    isLoading,
  };
}
