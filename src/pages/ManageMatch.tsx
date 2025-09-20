import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { 
  Calendar, MapPin, Users, Target, Plus, Shuffle, 
  Check, DollarSign, X, Play
} from "lucide-react";
import { mockMatches } from "@/data/mockData";

interface Player {
  id: string
  name: string
  nickname: string
  avatar: string
  hasPaid: boolean
  isConfirmed: boolean
}

interface Team {
  id: string
  name: string
  players: string[]
}

interface ManageMatchProps {
  onBack?: () => void;
  onStartMatch?: (matchId: string) => void;
}

export default function ManageMatch({ onBack, onStartMatch }: ManageMatchProps) {
  const { matchId } = useParams()
  
  // Mock match data - in real app would fetch by matchId
  const match = mockMatches.organizing[0]
  
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "João Silva", nickname: "joaoplayer", avatar: "https://i.pravatar.cc/150?img=3", hasPaid: true, isConfirmed: true },
    { id: "2", name: "Lucas Santos", nickname: "lucas10", avatar: "https://i.pravatar.cc/150?img=4", hasPaid: true, isConfirmed: true },
    { id: "3", name: "Pedro Lima", nickname: "pedrinho", avatar: "https://i.pravatar.cc/150?img=6", hasPaid: false, isConfirmed: true },
    { id: "4", name: "Carlos Mendes", nickname: "carlitos", avatar: "https://i.pravatar.cc/150?img=7", hasPaid: true, isConfirmed: true },
    { id: "5", name: "Rafael Costa", nickname: "rafa99", avatar: "https://i.pravatar.cc/150?img=8", hasPaid: false, isConfirmed: false },
  ])
  
  const [teams, setTeams] = useState<Team[]>([
    { id: "team1", name: "Team A", players: [] },
    { id: "team2", name: "Team B", players: [] }
  ])
  
  const [newPlayerName, setNewPlayerName] = useState("")
  const [isShuffling, setIsShuffling] = useState(false)

  const addPlayer = () => {
    if (!newPlayerName.trim()) return
    
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      nickname: newPlayerName.toLowerCase().replace(" ", ""),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      hasPaid: false,
      isConfirmed: false
    }
    
    setPlayers(prev => [...prev, newPlayer])
    setNewPlayerName("")
    
    toast.success("Jogador Adicionado", {
      description: `${newPlayer.name} foi adicionado à partida.`
    })
  }

  const removePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId))
    setTeams(prev => prev.map(team => ({
      ...team,
      players: team.players.filter(p => p !== playerId)
    })))
    
    toast.success("Jogador Removido", {
      description: "Jogador foi removido da partida."
    })
  }

  const togglePayment = (playerId: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, hasPaid: !p.hasPaid } : p
    ))
  }

  const toggleConfirmation = (playerId: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, isConfirmed: !p.isConfirmed } : p
    ))
  }

  const shuffleTeams = async () => {
    setIsShuffling(true)
    
    const confirmedPlayers = players.filter(p => p.isConfirmed)
    const shuffled = [...confirmedPlayers].sort(() => Math.random() - 0.5)
    const mid = Math.ceil(shuffled.length / 2)
    
    // Simulate delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setTeams([
      { id: "team1", name: "Time A", players: shuffled.slice(0, mid).map(p => p.id) },
      { id: "team2", name: "Time B", players: shuffled.slice(mid).map(p => p.id) }
    ])
    
    setIsShuffling(false)
    

  }

  const confirmedPlayers = players.filter(p => p.isConfirmed)
  const paidPlayers = players.filter(p => p.hasPaid)

  return (
    <div className="p-4 space-y-6">
      {/* Match Info Card */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">{match.date} às {match.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{match.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">{match.teamSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm">{match.endCriteria} - {match.maxGoals} gols</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{confirmedPlayers.length}</div>
            <div className="text-sm text-muted-foreground">Confirmados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{paidPlayers.length}</div>
            <div className="text-sm text-muted-foreground">Pagaram</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{players.length - confirmedPlayers.length}</div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{match.totalSlots}</div>
            <div className="text-sm text-muted-foreground">Total Vagas</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Players Management */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>Jogadores ({players.length})</span>
              <Button variant="outline" size="sm" onClick={shuffleTeams} disabled={isShuffling} className="self-start sm:self-auto">
                <Shuffle className="h-4 w-4 mr-2" />
                {isShuffling ? "Sorteando..." : "Sortear Times"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Player */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Nome do jogador"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                className="flex-1"
              />
              <Button onClick={addPlayer} disabled={!newPlayerName.trim()} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Adicionar</span>
              </Button>
            </div>

            <Separator />

            {/* Players List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="flex flex-col gap-3 p-3 rounded-lg border">
                  {/* Player Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{player.name}</div>
                      <div className="text-sm text-muted-foreground">@{player.nickname}</div>
                    </div>
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={player.isConfirmed ? "default" : "secondary"}>
                      {player.isConfirmed ? "Confirmado" : "Pendente"}
                    </Badge>
                    <Badge variant={player.hasPaid ? "default" : "destructive"}>
                      {player.hasPaid ? "Pago" : "Não Pago"}
                    </Badge>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleConfirmation(player.id)}
                      className={`w-full justify-center gap-2 ${
                        player.isConfirmed ? 'text-green-600 border-green-600' : ''
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      {player.isConfirmed ? 'Confirmado' : 'Confirmar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePayment(player.id)}
                      className={`w-full justify-center gap-2 ${
                        player.hasPaid ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'
                      }`}
                    >
                      <DollarSign className="h-4 w-4" />
                      {player.hasPaid ? 'Pago' : 'Marcar Pago'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePlayer(player.id)}
                      className="w-full justify-center gap-2 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <X className="h-4 w-4" />
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teams */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>Times</span>
              <Button size="sm" onClick={() => onStartMatch?.(matchId || "1")} className="self-start sm:self-auto">
                <Play className="h-4 w-4 mr-2" />
                Iniciar Partida
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="space-y-2">
                <h4 className="font-semibold">{team.name}</h4>
                <div className="space-y-2 p-4 rounded-lg border min-h-[100px]">
                  {team.players.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-6">
                      Nenhum jogador atribuído ainda
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {team.players.map((playerId) => {
                        const player = players.find(p => p.id === playerId)
                        if (!player) return null
                        
                        return (
                          <div key={playerId} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{player.name}</div>
                              <div className="text-xs text-muted-foreground">@{player.nickname}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}