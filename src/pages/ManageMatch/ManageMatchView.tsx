import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ManageMatchModel } from "./ManageMatchModel";
import {
  Calendar, MapPin, Users, Target, Plus, Shuffle,
  Check, DollarSign, X, Play
} from "lucide-react";

type ManageMatchViewProps = ReturnType<typeof ManageMatchModel>

interface ManageMatchProps {
  onBack?: () => void;
  onStartMatch?: (matchId: string) => void;
}

export const ManageMatchView = (props: ManageMatchViewProps & ManageMatchProps) => {
  const {
    match,
    players,
    teams,
    newPlayerName,
    isShuffling,
    addPlayer,
    removePlayer,
    toggleConfirmation,
    togglePayment,
    shuffleTeams,
    setNewPlayerName,
    confirmedPlayers,
    paidPlayers,
    matchId,
    onStartMatch
  } = props;

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Match Info */}
      {/* HEADER - Informações da Partida */}
      <Card className="shadow-md border-none rounded-2xl bg-card/80 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Detalhes da Partida
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{match.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{match.date} às {match.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{match.teamSize} por time</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>  {match.maxGoals} gols</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <Card className="shadow-sm">
          <CardContent className="p-2">
            <div className="text-lg font-semibold text-red-500">{confirmedPlayers.length}</div>
            <div className="text-xs">Confirmados</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-2">
            <div className="text-lg font-semibold text-green-600">{paidPlayers.length}</div>
            <div className="text-xs">Pagaram</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-2">
            <div className="text-lg font-semibold text-yellow-500">
              {players.length - confirmedPlayers.length}
            </div>
            <div className="text-xs">Pendentes</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-2">
            <div className="text-lg font-semibold">{match.totalSlots}</div>
            <div className="text-xs">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Players Section */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center text-base">
            <span>Jogadores ({players.length})</span>
            <Button
              variant="outline"
              size="sm"
              onClick={shuffleTeams}
              disabled={isShuffling}
              className="gap-1"
            >
              <Shuffle className="h-4 w-4" />
              {isShuffling ? "Sorteando..." : "Sortear Times"}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add Player */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Nome do jogador"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addPlayer()}
              className="flex-1 rounded-full px-4 py-2"
            />
            <Button
              onClick={addPlayer}
              disabled={!newPlayerName.trim()}
              className="rounded-full bg-rose-400 hover:bg-rose-500 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          <Separator />

          {/* Players List */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {players.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-4">
                Nenhum jogador adicionado
              </div>
            )}

            {players.map((player) => (
              <div
                key={player.id}
                className="flex flex-col gap-2 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors duration-200"
              >
                {/* Player Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground">
                      {player.name}
                    </div>
                    <div className="text-xs text-muted-foreground">@{player.nickname}</div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant={player.isConfirmed ? "default" : "secondary"}
                    className={`text-[11px] px-2 ${
                      player.isConfirmed
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {player.isConfirmed ? "Confirmado" : "Pendente"}
                  </Badge>
                  <Badge
                    variant={player.hasPaid ? "default" : "destructive"}
                    className={`text-[11px] px-2 ${
                      player.hasPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {player.hasPaid ? "Pago" : "Não Pago"}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleConfirmation(player.id)}
                    className="p-2 rounded-full hover:bg-green-100"
                  >
                    <Check
                      className={`h-4 w-4 ${
                        player.isConfirmed ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => togglePayment(player.id)}
                    className="p-2 rounded-full hover:bg-yellow-100"
                  >
                    <DollarSign
                      className={`h-4 w-4 ${
                        player.hasPaid ? "text-green-600" : "text-yellow-600"
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removePlayer(player.id)}
                    className="p-2 rounded-full hover:bg-red-100"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teams Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Times</span>
            <Button
              size="sm"
              onClick={() => onStartMatch?.(matchId || "1")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              Iniciar Partida
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="space-y-2">
              <h4 className="font-semibold">{team.name}</h4>
              <div className="space-y-2 p-4 rounded-lg border min-h-[100px] bg-muted/30">
                {team.players.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-6">
                    Nenhum jogador atribuído ainda
                  </div>
                ) : (
                  <div className="space-y-2">
                    {team.players.map((playerId) => {
                      const player = players.find((p) => p.id === playerId);
                      if (!player) return null;
                      return (
                        <div
                          key={playerId}
                          className="flex items-center gap-3 p-2 rounded-md bg-white"
                        >
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {player.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              @{player.nickname}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
