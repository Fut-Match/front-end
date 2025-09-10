import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Target,
  Timer, 
  Copy, 
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MatchDetailsProps {
  matchId: string;
  onBack: () => void;
}

// Mock data - will be replaced with real data from Supabase
const mockMatch = {
  id: "1",
  name: "Pelada do Sábado",
  organizer: "Carlos Mendes",
  playersPerTeam: 5,
  currentPlayers: 8,
  maxPlayers: 10,
  date: "2024-01-20",
  time: "15:00",
  location: "Campo do Vila Nova",
  description: "Partida amistosa para descontrair no final de semana. Venham todos!",
  endCriteria: { goals: 3, time: 90 },
  status: "organizing" as const,
  userRole: "organizer" as const,
  inviteCode: "PELADA123",
  players: [
    { id: "1", name: "Carlos Mendes", role: "organizer", nickname: "@carlosm" },
    { id: "2", name: "João Silva", role: "participant", nickname: "@joaosilva" },
    { id: "3", name: "Pedro Santos", role: "participant", nickname: "@pedrinho" },
    { id: "4", name: "Ana Costa", role: "participant", nickname: "@aninha10" },
    { id: "5", name: "Luis Oliveira", role: "participant", nickname: "@luisoliveira" },
    { id: "6", name: "Maria Souza", role: "participant", nickname: "@mariasouza" },
    { id: "7", name: "Felipe Lima", role: "participant", nickname: "@felipelima" },
    { id: "8", name: "Carla Ramos", role: "participant", nickname: "@carlaramos" }
  ]
};

export function MatchDetails({ matchId, onBack }: MatchDetailsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(mockMatch.inviteCode);
    toast({
      title: "Código copiado!",
      description: "O código da partida foi copiado para a área de transferência.",
    });
  };

  const handleShareMatch = () => {
    if (navigator.share) {
      navigator.share({
        title: mockMatch.name,
        text: `Participe da partida: ${mockMatch.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link da partida foi copiado para a área de transferência.",
      });
    }
  };

  const getStatusBadge = () => {
    if (mockMatch.status === "organizing") {
      return <Badge variant="secondary">Organizando</Badge>;
    } else if (mockMatch.status === "playing") {
      return <Badge className="bg-accent">Em Andamento</Badge>;
    } else if (mockMatch.status === "finished") {
      return <Badge variant="outline">Finalizada</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">{mockMatch.name}</h1>
            <p className="text-muted-foreground">Organizada por {mockMatch.organizer}</p>
          </div>
          {getStatusBadge()}
        </div>

        {mockMatch.description && (
          <p className="text-sm text-muted-foreground">{mockMatch.description}</p>
        )}
      </div>

      {/* Quick Info */}
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate(mockMatch.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{mockMatch.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{mockMatch.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {mockMatch.playersPerTeam}v{mockMatch.playersPerTeam}
            </span>
          </div>
          <div className="text-sm font-medium text-primary">
            {mockMatch.currentPlayers}/{mockMatch.maxPlayers} jogadores
          </div>
        </div>

        {/* End Criteria */}
        <div className="flex gap-3 text-xs text-muted-foreground mt-3">
          {mockMatch.endCriteria.goals && (
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>{mockMatch.endCriteria.goals} gols</span>
            </div>
          )}
          {mockMatch.endCriteria.time && (
            <div className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              <span>{mockMatch.endCriteria.time} min</span>
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      {mockMatch.userRole === "organizer" && mockMatch.status === "organizing" && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyInviteCode} className="flex-1">
            <Copy className="h-4 w-4 mr-2" />
            Código: {mockMatch.inviteCode}
          </Button>
          <Button variant="outline" onClick={handleShareMatch}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="players">Jogadores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Informações da Partida</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Formato:</span>
                <span className="font-medium">{mockMatch.playersPerTeam} vs {mockMatch.playersPerTeam}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vagas disponíveis:</span>
                <span className="font-medium">{mockMatch.maxPlayers - mockMatch.currentPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  {mockMatch.status === "organizing" ? "Organizando" : 
                   mockMatch.status === "playing" ? "Em andamento" : "Finalizada"}
                </span>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="players" className="space-y-4 mt-4">
          <div className="space-y-3">
            {mockMatch.players.map((player) => (
              <Card key={player.id} className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{player.name}</p>
                      {player.role === "organizer" && (
                        <Badge variant="secondary" className="text-xs">Organizador</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{player.nickname}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}