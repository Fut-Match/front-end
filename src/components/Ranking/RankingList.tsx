import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Crown, Medal, Award, ChevronLeft, ChevronRight } from "lucide-react";
import type { RankingItem } from "@/entities/ranking";
import type { Pagination } from "@/entities/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface RankingListProps {
  players: RankingItem[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  pagination?: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function RankingList({
  players,
  isLoading,
  searchTerm,
  onSearchChange,
  pagination,
  currentPage,
  onPageChange,
}: RankingListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-700" />;
      case 2:
        return <Medal className="h-6 w-6 text-sport-silver" />;
      case 3:
        return <Award className="h-6 w-6 text-sport-bronze" />;
      default:
        return (
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
            {position}
          </div>
        );
    }
  };

  const getRankBadgeVariant = (position: number) => {
    switch (position) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  const getTopPlayerCardStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-ranking border-sport-gold shadow-glow";
      case 2:
        return "bg-gradient-to-br from-sport-silver/20 to-sport-silver/5 border-sport-silver";
      case 3:
        return "bg-gradient-to-br from-sport-bronze/20 to-sport-bronze/5 border-sport-bronze";
      default:
        return "bg-card";
    }
  };

  const getPlayerName = (player: RankingItem) => {
    return player.username || player.player?.name || "Jogador";
  };

  const getPlayerNickname = (player: RankingItem) => {
    return player.player?.nickname || player.username || "user";
  };

  const getPlayerAvatar = (player: RankingItem) => {
    return player.image_url || player.player?.image || undefined;
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar jogador..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Top 3 Players - Special Display */}
      {players.slice(0, 3).length > 0 && (
        <div className="space-y-3">
          {players.slice(0, 3).map((player) => {
            const position = player.position || 0;
            const playerName = getPlayerName(player);
            const playerNickname = getPlayerNickname(player);
            const playerAvatar = getPlayerAvatar(player);

            return (
              <Card
                key={player.id}
                className={`p-4 transition-all hover:scale-105 ${getTopPlayerCardStyle(position)}`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Icon */}
                  <div className="flex-shrink-0">
                    {getRankIcon(position)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {playerAvatar ? (
                      <img src={playerAvatar} alt={playerName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground font-bold text-sm">
                        {playerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">{playerName}</h4>
                      <Badge variant={getRankBadgeVariant(position) as "default" | "secondary" | "outline"} className="text-xs">
                        #{position}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">@{playerNickname}</p>
                  </div>

                  {/* Score and Stats */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{player.score || 0}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {player.wins}/{player.total_matches} vitórias
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Rest of Players */}
      {players.slice(3).length > 0 && (
        <div className="space-y-3">
          {players.slice(3).map((player) => {
            const position = player.position || 0;
            const playerName = getPlayerName(player);
            const playerNickname = getPlayerNickname(player);
            const playerAvatar = getPlayerAvatar(player);

            return (
              <Card key={player.id} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">{position}</span>
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {playerAvatar ? (
                      <img src={playerAvatar} alt={playerName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground font-bold text-xs">
                        {playerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{playerName}</h4>
                    <p className="text-sm text-muted-foreground">@{playerNickname}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">{player.score || 0}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {pagination.total_pages} ({pagination.total_elements} jogadores)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pagination.total_pages}
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {players.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum jogador encontrado</p>
        </div>
      )}
    </div>
  );
}
