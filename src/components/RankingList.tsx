import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Crown, Medal, Award } from "lucide-react";
import { useState } from "react";

interface Player {
  id: string;
  name: string;
  nickname: string;
  score: number;
  avatar?: string;
  city: string;
}

interface RankingListProps {
  players: Player[];
  currentCity: string;
}

export function RankingList({ players, currentCity }: RankingListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar jogador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Top 3 Players - Special Display */}
      {filteredPlayers.slice(0, 3).length > 0 && (
        <div className="space-y-3">
          {filteredPlayers.slice(0, 3).map((player, index) => {
            const position = index + 1;
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
                    {player.avatar ? (
                      <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground font-bold text-sm">
                        {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">{player.name}</h4>
                      <Badge variant={getRankBadgeVariant(position)} className="text-xs">
                        #{position}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">@{player.nickname}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{player.score}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Rest of Players */}
      {filteredPlayers.slice(3).length > 0 && (
        <div className="space-y-3">
          {filteredPlayers.slice(3).map((player, index) => {
            const position = index + 4;
            return (
              <Card key={player.id} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">{position}</span>
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {player.avatar ? (
                      <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground font-bold text-xs">
                        {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{player.name}</h4>
                    <p className="text-sm text-muted-foreground">@{player.nickname}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">{player.score}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {filteredPlayers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum jogador encontrado</p>
        </div>
      )}
    </div>
  );
}