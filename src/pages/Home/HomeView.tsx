
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Trophy, Bell } from "lucide-react";
import { HomeModel } from "./HomeModel";
import { HomeError } from "@/components/Home/HomeError";
import { PlayerCardSkeleton } from "@/components/Home/PlayerCardSkeleton";
import { PlayerCard } from "@/components/Home/PlayerCard";
import { MatchesModel } from "../Matchs/MatchesModel";

type HomeViewProps = ReturnType<typeof HomeModel> & {
  onCreateMatch?: () => void;
  onMyMatches?: () => void;
};



export function HomeView(props: HomeViewProps) {
  const {
    playerData,
    playerStats,
    isLoading,
    error,
    handleCreateMatch,
    handleMyMatches,
  } = props;

  if (isLoading) {
    return <PlayerCardSkeleton />;
  }

  if (error) {
    return <HomeError />;
  }

  const { handleViewMatch, handleManageMatch, organizingMatches } = MatchesModel(props);
  const UpcomingMatches = organizingMatches.filter((match => new Date(match.date) >= new Date()));
  const nextMatches = UpcomingMatches.slice(0, 3);



  return (
    <div className="p-4 space-y-6">
      {/* === PERFIL USUARIO  === */}
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



    </div>
  );
}