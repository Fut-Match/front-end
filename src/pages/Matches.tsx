import { useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Hash } from "lucide-react";

interface MatchesProps {
  onCreateMatch?: () => void;
  onViewMatch?: (matchId: string) => void;
  onManageMatch?: (matchId: string) => void;
}

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

export function Matches({ onCreateMatch, onViewMatch, onManageMatch }: MatchesProps) {
  const [inviteCode, setInviteCode] = useState("");

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

  const handleJoinByCode = () => {
    if (inviteCode.trim()) {
      console.log("Joining match with code:", inviteCode);
      // TODO: Implement join by invite code
      setInviteCode("");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Quick Actions */}
      <div className="space-y-3">
        <Button className="w-full h-12 gap-2" onClick={onCreateMatch}>
          <Plus className="h-5 w-5" />
          Criar Nova Partida
        </Button>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Código da partida"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={handleJoinByCode}>
            Entrar
          </Button>
        </div>
      </div>

      {/* Matches Tabs */}
      <Tabs defaultValue="participating" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="participating">Participando</TabsTrigger>
          <TabsTrigger value="organizing">Organizando</TabsTrigger>
        </TabsList>
        
        <TabsContent value="participating" className="space-y-4 mt-4">
          {participatingMatches.length > 0 ? (
            participatingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onJoin={handleJoinMatch}
                onView={handleViewMatch}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Você não está participando de nenhuma partida</p>
              <p className="text-sm">Use um código de convite ou crie uma nova partida</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="organizing" className="space-y-4 mt-4">
          {organizingMatches.length > 0 ? (
            organizingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onJoin={handleJoinMatch}
                onView={handleViewMatch}
                onManage={handleManageMatch}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Plus className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Você não está organizando nenhuma partida</p>
              <p className="text-sm">Crie sua primeira partida agora</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}