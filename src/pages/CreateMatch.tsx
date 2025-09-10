import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Clock, MapPin, Users, Target, Timer } from "lucide-react";

interface CreateMatchProps {
  onBack: () => void;
}

export function CreateMatch({ onBack }: CreateMatchProps) {
  const [matchData, setMatchData] = useState({
    name: "",
    playersPerTeam: "5",
    location: "",
    date: "",
    time: "",
    description: "",
    endByGoals: true,
    endByTime: true,
    maxGoals: 3,
    maxTime: 90
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating match:", matchData);
    // TODO: Implement match creation with Supabase
    onBack();
  };

  return (
    <div className="p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Partida</Label>
            <Input
              id="name"
              placeholder="Ex: Pelada do Sábado"
              value={matchData.name}
              onChange={(e) => setMatchData({ ...matchData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="playersPerTeam">Formato da Partida</Label>
            <Select 
              value={matchData.playersPerTeam} 
              onValueChange={(value) => setMatchData({ ...matchData, playersPerTeam: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 vs 3 (6 jogadores)</SelectItem>
                <SelectItem value="4">4 vs 4 (8 jogadores)</SelectItem>
                <SelectItem value="5">5 vs 5 (10 jogadores)</SelectItem>
                <SelectItem value="6">6 vs 6 (12 jogadores)</SelectItem>
                <SelectItem value="7">7 vs 7 (14 jogadores)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ex: Campo do Vila Nova"
                value={matchData.location}
                onChange={(e) => setMatchData({ ...matchData, location: e.target.value })}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={matchData.date}
                  onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={matchData.time}
                  onChange={(e) => setMatchData({ ...matchData, time: e.target.value })}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Adicione informações extras sobre a partida..."
              value={matchData.description}
              onChange={(e) => setMatchData({ ...matchData, description: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Critérios de Finalização</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="endByGoals">Finalizar por gols</Label>
              </div>
              <Switch
                id="endByGoals"
                checked={matchData.endByGoals}
                onCheckedChange={(checked) => setMatchData({ ...matchData, endByGoals: checked })}
              />
            </div>

            {matchData.endByGoals && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="maxGoals">Número de gols para vencer</Label>
                <Select 
                  value={matchData.maxGoals.toString()} 
                  onValueChange={(value) => setMatchData({ ...matchData, maxGoals: parseInt(value) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 gol</SelectItem>
                    <SelectItem value="2">2 gols</SelectItem>
                    <SelectItem value="3">3 gols</SelectItem>
                    <SelectItem value="4">4 gols</SelectItem>
                    <SelectItem value="5">5 gols</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="endByTime">Finalizar por tempo</Label>
              </div>
              <Switch
                id="endByTime"
                checked={matchData.endByTime}
                onCheckedChange={(checked) => setMatchData({ ...matchData, endByTime: checked })}
              />
            </div>

            {matchData.endByTime && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="maxTime">Duração da partida (minutos)</Label>
                <Select 
                  value={matchData.maxTime.toString()} 
                  onValueChange={(value) => setMatchData({ ...matchData, maxTime: parseInt(value) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                    <SelectItem value="90">90 minutos</SelectItem>
                    <SelectItem value="120">120 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3 flex-col">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={!matchData.endByGoals && !matchData.endByTime}
          >
            Criar Partida
          </Button>
        </div>
      </form>
    </div>
  );
}