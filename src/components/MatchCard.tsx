import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users, Target, Timer } from "lucide-react";

interface Match {
  id: string;
  name: string;
  organizer: string;
  playersPerTeam: number;
  currentPlayers: number;
  maxPlayers: number;
  date: string;
  time: string;
  location: string;
  endCriteria: {
    goals?: number;
    time?: number;
  };
  status: "organizing" | "playing" | "finished";
  userRole: "organizer" | "participant" | "none";
}

interface MatchCardProps {
  match: Match;
  onJoin?: (matchId: string) => void;
  onView?: (matchId: string) => void;
  onManage?: (matchId: string) => void;
}

export function MatchCard({ match, onJoin, onView, onManage }: MatchCardProps) {
  const getStatusBadge = () => {
    switch (match.status) {
      case "organizing":
        return <Badge variant="secondary">Organizando</Badge>;
      case "playing":
        return <Badge className="bg-accent">Em Andamento</Badge>;
      case "finished":
        return <Badge variant="outline">Finalizada</Badge>;
    }
  };

  const getRoleBadge = () => {
    switch (match.userRole) {
      case "organizer":
        return <Badge className="bg-primary">Organizador</Badge>;
      case "participant":
        return <Badge className="bg-accent">Participando</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getPlayersColor = () => {
    const percentage = (match.currentPlayers / match.maxPlayers) * 100;
    if (percentage >= 90) return "text-accent";
    if (percentage >= 70) return "text-primary";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-4 space-y-4 hover:shadow-card transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground">{match.name}</h3>
          <p className="text-sm text-muted-foreground">por {match.organizer}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          {getStatusBadge()}
          {getRoleBadge()}
        </div>
      </div>

      {/* Match Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{match.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{match.location}</span>
        </div>
      </div>

      {/* Players and Format */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {match.playersPerTeam}v{match.playersPerTeam}
          </span>
        </div>
        <div className={`text-sm font-medium ${getPlayersColor()}`}>
          {match.currentPlayers}/{match.maxPlayers} jogadores
        </div>
      </div>

      {/* End Criteria */}
      <div className="flex gap-3 text-xs text-muted-foreground">
        {match.endCriteria.goals && (
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            <span>{match.endCriteria.goals} gols</span>
          </div>
        )}
        {match.endCriteria.time && (
          <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            <span>{match.endCriteria.time} min</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onView?.(match.id)}
          className="flex-1"
        >
          Ver Detalhes
        </Button>
        {match.userRole === "organizer" && match.status === "organizing" && (
          <Button 
            size="sm" 
            onClick={() => onManage?.(match.id)}
            className="flex-1"
          >
            Gerenciar
          </Button>
        )}
        {match.userRole === "none" && match.status === "organizing" && (
          <Button 
            size="sm" 
            onClick={() => onJoin?.(match.id)}
            className="flex-1"
            disabled={match.currentPlayers >= match.maxPlayers}
          >
            {match.currentPlayers >= match.maxPlayers ? "Lotado" : "Participar"}
          </Button>
        )}
      </div>
    </Card>
  );
}