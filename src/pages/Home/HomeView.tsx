
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Trophy, Bell } from "lucide-react";
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
    handleMyMatches,
    activeTab,
    setActiveTab,
    RecentAchievements = [], 
    Alerts = [],
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
  {/* === Cabeçalho === */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
    <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center justify-center sm:justify-start">
      <span className="mr-1">⭐</span> Comunicados
    </h3>

    <div className="flex justify-center sm:justify-end gap-1.5">
      <Button
        size="sm"
        variant={activeTab === "conquistas" ? "default" : "outline"}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
          activeTab === "conquistas"
            ? "bg-pink-500 text-white shadow-sm hover:bg-pink-400"
            : "border-pink-300 text-pink-500 hover:bg-pink-50"
        }`}
        onClick={() => setActiveTab("conquistas")}
      >
        <Trophy className="h-3.5 w-3.5 mr-1" />
        Conquistas
      </Button>

      <Button
        size="sm"
        variant={activeTab === "alertas" ? "default" : "outline"}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
          activeTab === "alertas"
            ? "bg-pink-500 text-white shadow-sm hover:bg-pink-400"
            : "border-pink-300 text-pink-500 hover:bg-pink-50"
        }`}
        onClick={() => setActiveTab("alertas")}
      >
        <Bell className="h-3.5 w-3.5 mr-1" />
        Alertas
      </Button>
    </div>
  </div>

  {/* === Conteúdo === */}
  <Card className="p-3 sm:p-5 rounded-2xl shadow-sm border border-pink-100 bg-white/80 backdrop-blur-sm">
    {activeTab === "conquistas" ? (
      RecentAchievements.length > 0 ? (
        <div className="space-y-2.5">
          {RecentAchievements.map((ach, i) => (
            <Card
              key={i}
              className="p-2.5 flex items-center gap-2.5 border border-pink-100 bg-gradient-to-r from-white to-pink-50/40 hover:shadow-md transition rounded-xl"
            >
              <div className="bg-yellow-100 p-1.5 rounded-full flex items-center justify-center">
                <Trophy className="text-yellow-500 h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm leading-tight">
                  {ach.title}
                </h4>
                <p className="text-xs text-muted-foreground">{ach.date}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-6 text-sm">
          Nenhuma conquista recente ainda 💪
        </p>
      )
    ) : Alerts.length > 0 ? (
      <div className="space-y-2.5">
        {Alerts.map((alert, i) => (
          <Card
            key={i}
            className="p-2.5 border-l-4 border-pink-400 bg-pink-50/70 text-sm text-foreground hover:shadow-md hover:bg-pink-100/50 transition rounded-xl"
          >
            {alert.message}
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-center text-muted-foreground py-6 text-sm">
        Nenhum alerta por enquanto 🎯
      </p>
    )}
  </Card>
</div>


      {/* === PRÓXIMAS PARTIDAS === */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground flex items-center gap-2 justify-center sm:justify-start">
          📅 Próximas Partidas
        </h3>
        <div className="space-y-3">
          {UpcomingMatches.length > 0 ? (
            UpcomingMatches.map((match) => (
              <Card
                key={match.id}
                className="p-4 sm:p-5 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="text-center sm:text-left">
                  <h4 className="font-medium text-foreground">{match.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(match.date).toLocaleDateString("pt-BR")} às {match.time}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-pink-400 text-pink-500 w-full sm:w-auto"
                >
                  Ver
                </Button>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm sm:text-base">
                Nenhuma partida agendada
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}