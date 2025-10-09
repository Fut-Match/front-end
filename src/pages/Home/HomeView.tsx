
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { HomeModel } from "./HomeModel";
import { HomeError } from "@/components/Home/HomeError";
import { PlayerCardSkeleton } from "@/components/Home/PlayerCardSkeleton";
import { PlayerCard } from "@/components/Home/PlayerCard";

type HomeViewProps = ReturnType<typeof HomeModel> & {
  onCreateMatch?: () => void;
  onMyMatches?: () => void;
};


export function HomeView( props: HomeViewProps) {
  const {
    playerData,
    playerStats,
    isLoading,
    error,
    UpcomingMatches,
    handleCreateMatch,
    handleMyMatches
  } = props;

  if (isLoading) {
    return <PlayerCardSkeleton />;
  }

  if (error) {
    return <HomeError />;
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <PlayerCard
            name={playerData.name}
            nickname={playerData.nickname || `@${playerData.name.toLowerCase().replace(/\s+/g, '')}`}
            stats={playerStats}
            avatar={playerData.image || playerData.avatar}
          />
      </div>

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

      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">📅 Próximas Partidas</h3>
        <div className="space-y-3">
          {UpcomingMatches.map((match) => (
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
          
          {UpcomingMatches.length === 0 && (
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