import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Target, Shield, Trophy, TrendingUp } from "lucide-react";

interface PlayerStats {
  goals: number;
  assists: number;
  tackles: number;
  mvps: number;
  wins: number;
  averageRating: number;
}

interface PlayerCardProps {
  name: string;
  nickname: string;
  stats: PlayerStats;
  avatar?: string;
}

export function PlayerCard({ name, nickname, stats, avatar }: PlayerCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-sport-gold";
    if (rating >= 8) return "text-primary";
    if (rating >= 7) return "text-accent";
    return "text-muted-foreground";
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 9) return "bg-sport-gold";
    if (rating >= 8) return "bg-primary";
    if (rating >= 7) return "bg-accent";
    return "bg-muted";
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-sport p-6 shadow-card">
      {/* FIFA-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-primary-foreground">
            <h3 className="text-xl font-bold">{name}</h3>
            <Badge variant="secondary" className="mt-1">
              {nickname}
            </Badge>
          </div>
          
          {/* Level Rating */}
          <div className={`${getRatingBg(stats.averageRating)} text-white rounded-lg p-3 min-w-[60px] text-center`}>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <div className="text-xs opacity-90">LVL</div>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center border-2 border-primary-foreground/30">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="text-primary-foreground/70 text-2xl font-bold">
                {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : null}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">{stats.goals}</div>
            <div className="text-xs opacity-90">Gols</div>
          </div>
          
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">{stats.assists}</div>
            <div className="text-xs opacity-90">Assist.</div>
          </div>
          
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-1">
              <Shield className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">{stats.tackles}</div>
            <div className="text-xs opacity-90">Desarmes</div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">{stats.mvps}</div>
            <div className="text-xs opacity-90">MVPs</div>
          </div>
          
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-4 w-4 mr-1" />
            </div>
            <div className="text-lg font-bold">{stats.wins}</div>
            <div className="text-xs opacity-90">Vitórias</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PlayerCardSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-gradient-sport p-6 shadow-card">
      {/* FIFA-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-primary-foreground">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          {/* Level Rating */}
          <div className="bg-muted rounded-lg p-3 min-w-[60px] text-center">
            <Skeleton className="h-8 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-6 mx-auto" />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center text-primary-foreground">
              <div className="flex items-center justify-center mb-1">
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
          {[1, 2].map((i) => (
            <div key={i} className="text-center text-primary-foreground">
              <div className="flex items-center justify-center mb-1">
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}