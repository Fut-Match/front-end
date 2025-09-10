import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Goal,
  Shield,
  Users,
  Timer,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveMatchProps {
  matchId: string;
  onBack: () => void;
}

interface Player {
  id: string;
  name: string;
  nickname: string;
  team: 'A' | 'B';
  goals: number;
  assists: number;
  defenses: number;
}

interface GameEvent {
  id: string;
  type: 'goal' | 'assist' | 'defense';
  playerId: string;
  playerName: string;
  team: 'A' | 'B';
  timestamp: string;
}

// Mock data - será substituído por dados reais do Supabase
const mockPlayers: Player[] = [
  // Time A
  { id: "1", name: "Carlos Mendes", nickname: "@carlosm", team: 'A', goals: 0, assists: 0, defenses: 0 },
  { id: "2", name: "João Silva", nickname: "@joaosilva", team: 'A', goals: 0, assists: 0, defenses: 0 },
  { id: "3", name: "Pedro Santos", nickname: "@pedrinho", team: 'A', goals: 0, assists: 0, defenses: 0 },
  { id: "4", name: "Ana Costa", nickname: "@aninha10", team: 'A', goals: 0, assists: 0, defenses: 0 },
  { id: "5", name: "Luis Oliveira", nickname: "@luisoliveira", team: 'A', goals: 0, assists: 0, defenses: 0 },
  
  // Time B
  { id: "6", name: "Maria Souza", nickname: "@mariasouza", team: 'B', goals: 0, assists: 0, defenses: 0 },
  { id: "7", name: "Felipe Lima", nickname: "@felipelima", team: 'B', goals: 0, assists: 0, defenses: 0 },
  { id: "8", name: "Carla Ramos", nickname: "@carlaramos", team: 'B', goals: 0, assists: 0, defenses: 0 },
  { id: "9", name: "Roberto Silva", nickname: "@robertosilva", team: 'B', goals: 0, assists: 0, defenses: 0 },
  { id: "10", name: "Julia Santos", nickname: "@juliasantos", team: 'B', goals: 0, assists: 0, defenses: 0 },
];

export function LiveMatch({ matchId, onBack }: LiveMatchProps) {
  const { toast } = useToast();
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [activeTab, setActiveTab] = useState("teamA");

  const teamA = players.filter(p => p.team === 'A');
  const teamB = players.filter(p => p.team === 'B');
  
  const scoreA = teamA.reduce((sum, player) => sum + player.goals, 0);
  const scoreB = teamB.reduce((sum, player) => sum + player.goals, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addEvent = (type: 'goal' | 'assist' | 'defense', playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    // Atualizar estatísticas do jogador
    setPlayers(prev => prev.map(p => 
      p.id === playerId 
        ? { ...p, [type === 'goal' ? 'goals' : type === 'assist' ? 'assists' : 'defenses']: 
            p[type === 'goal' ? 'goals' : type === 'assist' ? 'assists' : 'defenses'] + 1 }
        : p
    ));

    // Adicionar evento
    const newEvent: GameEvent = {
      id: Date.now().toString(),
      type,
      playerId,
      playerName: player.name,
      team: player.team,
      timestamp: formatTime(gameTime)
    };

    setEvents(prev => [newEvent, ...prev]);

    const eventText = type === 'goal' ? 'Gol' : type === 'assist' ? 'Assistência' : 'Defesa';
    toast({
      title: `${eventText} registrado!`,
      description: `${player.name} - ${eventText}`,
    });
  };

  const undoLastEvent = () => {
    if (events.length === 0) return;

    const lastEvent = events[0];
    const player = players.find(p => p.id === lastEvent.playerId);
    
    if (player) {
      // Reverter estatística
      setPlayers(prev => prev.map(p => 
        p.id === lastEvent.playerId 
          ? { ...p, [lastEvent.type === 'goal' ? 'goals' : lastEvent.type === 'assist' ? 'assists' : 'defenses']: 
              Math.max(0, p[lastEvent.type === 'goal' ? 'goals' : lastEvent.type === 'assist' ? 'assists' : 'defenses'] - 1) }
          : p
      ));

      // Remover evento
      setEvents(prev => prev.slice(1));

      toast({
        title: "Ação desfeita!",
        description: "Última ação foi removida.",
      });
    }
  };

  const PlayerCard = ({ player }: { player: Player }) => (
    <Card className="p-3">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
            {player.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{player.name}</p>
          <p className="text-xs text-muted-foreground">{player.nickname}</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-1 mb-3 text-xs">
        <div className="text-center">
          <div className="font-bold text-green-600">{player.goals}</div>
          <div className="text-muted-foreground">Gols</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-blue-600">{player.assists}</div>
          <div className="text-muted-foreground">Assist</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-orange-600">{player.defenses}</div>
          <div className="text-muted-foreground">Def</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-1">
        <Button 
          size="sm" 
          variant="outline"
          className="h-8 text-xs bg-green-50 hover:bg-green-100 border-green-200"
          onClick={() => addEvent('goal', player.id)}
        >
          <Goal className="h-3 w-3 mr-1" />
          Gol
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="h-8 text-xs bg-blue-50 hover:bg-blue-100 border-blue-200"
          onClick={() => addEvent('assist', player.id)}
        >
          <Users className="h-3 w-3 mr-1" />
          Assist
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="h-8 text-xs bg-orange-50 hover:bg-orange-100 border-orange-200"
          onClick={() => addEvent('defense', player.id)}
        >
          <Shield className="h-3 w-3 mr-1" />
          Def
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Placar */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{scoreA}</div>
              <Badge variant="outline" className="mt-1">Time A</Badge>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">×</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{scoreB}</div>
              <Badge variant="outline" className="mt-1">Time B</Badge>
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-3">
            <Timer className="h-5 w-5 text-muted-foreground" />
            <span className="text-xl font-mono">{formatTime(gameTime)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={undoLastEvent}
              disabled={events.length === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Teams Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="teamA">Time A ({teamA.length})</TabsTrigger>
          <TabsTrigger value="teamB">Time B ({teamB.length})</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teamA" className="space-y-3 mt-4">
          {teamA.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </TabsContent>
        
        <TabsContent value="teamB" className="space-y-3 mt-4">
          {teamB.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-3 mt-4">
          {events.length === 0 ? (
            <Card className="p-6 text-center">
              <Timer className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum evento registrado ainda</p>
            </Card>
          ) : (
            events.map(event => (
              <Card key={event.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {event.type === 'goal' && <Goal className="h-4 w-4 text-green-600" />}
                    {event.type === 'assist' && <Users className="h-4 w-4 text-blue-600" />}
                    {event.type === 'defense' && <Shield className="h-4 w-4 text-orange-600" />}
                    <div>
                      <p className="font-medium text-sm">{event.playerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.type === 'goal' ? 'Gol' : event.type === 'assist' ? 'Assistência' : 'Defesa'} - Time {event.team}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.timestamp}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
