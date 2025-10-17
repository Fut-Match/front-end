import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Clock, MapPin, Target, Timer } from "lucide-react";
import { CreateModel } from "./CreateModel";

type CreateViewProps = ReturnType<typeof CreateModel>;


export function CreateView(props: CreateViewProps) {
  const {
    handleModalityChange,
    handleSubmit,
    onBack,
    matchData,
    setMatchData,
  } = props;

  return (
    <div className="w-full min-h-screen bg-background flex justify-center py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-4 sm:px-6 space-y-6"
      >
        {/* === Seção principal === */}
        <Card className="p-5 sm:p-6 space-y-5 shadow-sm border rounded-2xl">
          <h2 className="text-lg font-semibold text-center text-primary mb-2">
            Criar Partida
          </h2>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Partida</Label>
            <Input
              id="name"
              placeholder="Ex: Pelada do Sábado"
              value={matchData.name}
              onChange={(e) =>
                setMatchData({ ...matchData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Modalidade */}
          <div className="space-y-2">
            <Label htmlFor="modalidade">Modalidade</Label>
            <Select
              value={matchData.modality}
              onValueChange={handleModalityChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Futebol">Futebol</SelectItem>
                <SelectItem value="Futsal">Futsal</SelectItem>
                <SelectItem value="Society">Society</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Formato */}
          <div className="space-y-2">
            <Label htmlFor="playersPerTeam">Formato da Partida</Label>
            <Input
              id="playersPerTeam"
              readOnly
              className="bg-muted"
              value={
                matchData.playersPerTeam
                  ? `${matchData.playersPerTeam} vs ${matchData.playersPerTeam}`
                  : ""
              }
            />
          </div>

          {/* Local */}
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ex: Campo do Vila Nova"
                className="pl-9"
                value={matchData.location}
                onChange={(e) =>
                  setMatchData({ ...matchData, location: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-9"
                  value={matchData.date}
                  onChange={(e) =>
                    setMatchData({ ...matchData, date: e.target.value })
                  }
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
                  className="pl-9"
                  value={matchData.time}
                  onChange={(e) =>
                    setMatchData({ ...matchData, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              className="min-h-[80px]"
              placeholder="Adicione informações extras sobre a partida..."
              value={matchData.description}
              onChange={(e) =>
                setMatchData({ ...matchData, description: e.target.value })
              }
            />
          </div>
        </Card>

        {/* === Critérios de finalização === */}
        <Card className="p-5 sm:p-6 space-y-5 border rounded-2xl shadow-sm">
          <h3 className="text-base font-semibold text-center text-primary">
            Critérios de Finalização
          </h3>

          {/* Por gols */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="endByGoals">Finalizar por gols</Label>
              </div>
              <Switch
                id="endByGoals"
                checked={matchData.endByGoals}
                onCheckedChange={(checked) =>
                  setMatchData({ ...matchData, endByGoals: checked })
                }
              />
            </div>

            {matchData.endByGoals && (
              <div className="ml-6 space-y-1">
                <Label htmlFor="maxGoals">Gols para vencer</Label>
                <Select
                  value={matchData.maxGoals.toString()}
                  onValueChange={(v) =>
                    setMatchData({ ...matchData, maxGoals: parseInt(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((g) => (
                      <SelectItem key={g} value={g.toString()}>
                        {g} {g === 1 ? "gol" : "gols"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Por tempo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="endByTime">Finalizar por tempo</Label>
              </div>
              <Switch
                id="endByTime"
                checked={matchData.endByTime}
                onCheckedChange={(checked) =>
                  setMatchData({ ...matchData, endByTime: checked })
                }
              />
            </div>

            {matchData.endByTime && (
              <div className="ml-6 space-y-1">
                <Label htmlFor="maxTime">Duração (minutos)</Label>
                <Select
                  value={matchData.maxTime.toString()}
                  onValueChange={(v) =>
                    setMatchData({ ...matchData, maxTime: parseInt(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[30, 45, 60, 90, 120].map((t) => (
                      <SelectItem key={t} value={t.toString()}>
                        {t} minutos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        {/* === Ações === */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 py-5 text-base"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!matchData.endByGoals && !matchData.endByTime}
            className="flex-1 py-5 text-base"
          >
            Criar Partida
          </Button>
        </div>
      </form>
    </div>
  );
}
