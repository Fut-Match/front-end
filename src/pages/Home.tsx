import { PlayerCard, PlayerCardSkeleton } from "@/components/PlayerCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { usePlayerMe } from "@/hooks";

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

interface HomeProps {
  onCreateMatch?: () => void;
  onMyMatches?: () => void;
}

export function Home({ onCreateMatch, onMyMatches }: HomeProps) {
  const { data: playerData, isLoading, error } = usePlayerMe();
  
  console.log("🚀 ~ Home ~ playerData:", playerData)

  const handleCreateMatch = () => {
    onCreateMatch?.();
  };

  const handleMyMatches = () => {
    onMyMatches?.();
  };

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

  return (
    <div className="p-4 space-y-6">
      {/* Player Card */}
      <div>
        {isLoading ? (
          <PlayerCardSkeleton />
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-destructive">Erro ao carregar dados do jogador</p>
          </Card>
        ) : playerData && playerStats ? (
          <PlayerCard
            name={playerData.name}
            nickname={playerData.nickname || `@${playerData.name.toLowerCase().replace(/\s+/g, '')}`}
            stats={playerStats}
            avatar={playerData.image || playerData.avatar}
          />
        ) : null}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleCreateMatch}>
          <Plus className="h-6 w-6" />
          <span className="text-sm">Nova Partida</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleMyMatches}>
          <Calendar className="h-6 w-6" />
          <span className="text-sm">Minhas Partidas</span>
        </Button>
      </div>

      {/* Upcoming Matches */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">📅 Próximas Partidas</h3>
        <div className="space-y-3">
          {mockUpcomingMatches.map((match) => (
            <Card key={match.id} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-foreground">{match.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(match.date).toLocaleDateString('pt-BR')} às {match.time}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>
            </Card>
          ))}
          
          {mockUpcomingMatches.length === 0 && (
            <Card className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhuma partida agendada</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}