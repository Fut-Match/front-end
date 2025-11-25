import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Goal, Shield, Users, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveMatchProps {
  matchId: string;
  onBack: () => void;
}

interface Player {
  id: string;
  name: string;
  nickname: string;
  team: "A" | "B";
  goals: number;
  assists: number;
  defenses: number;
}

export function LiveMatch({ matchId, onBack }: LiveMatchProps) {
  const { toast } = useToast();
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Carlos Mendes", nickname: "@carlosm", team: "A", goals: 0, assists: 0, defenses: 0 },
    { id: "2", name: "João Silva", nickname: "@joaosilva", team: "A", goals: 0, assists: 0, defenses: 0 },
    { id: "3", name: "Pedro Santos", nickname: "@pedrinho", team: "A", goals: 0, assists: 0, defenses: 0 },
    { id: "4", name: "Maria Souza", nickname: "@mariasouza", team: "B", goals: 0, assists: 0, defenses: 0 },
    { id: "5", name: "Felipe Lima", nickname: "@felipelima", team: "B", goals: 0, assists: 0, defenses: 0 },
  ]);
  const [events, setEvents] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  const teamA = players.filter((p) => p.team === "A");
  const teamB = players.filter((p) => p.team === "B");
  const scoreA = teamA.reduce((sum, p) => sum + p.goals, 0);
  const scoreB = teamB.reduce((sum, p) => sum + p.goals, 0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Cronômetro
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setGameTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const addEvent = (type: "goal" | "assist" | "defense", playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId ? { ...p, [type + "s"]: (p as any)[type + "s"] + 1 } : p
      )
    );
    setEvents((prev) => [
      { id: Date.now().toString(), playerId, type, time: formatTime(gameTime) },
      ...prev,
    ]);
  };

  const undo = () => {
    if (!events.length) return;
    const last = events[0];
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === last.playerId
          ? { ...p, [last.type + "s"]: Math.max(0, (p as any)[last.type + "s"] - 1) }
          : p
      )
    );
    setEvents((prev) => prev.slice(1));
  };

  return (
    <div className="p-4 space-y-4">
      {/* PLACAR FIXO */}
      <Card className="p-4 sticky top-0 z-10 bg-white shadow-md rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{scoreA}</p>
            <p className="text-xs text-gray-500">Time A</p>
          </div>

          <div className="text-center">
            <Timer className="inline-block text-gray-500" />
            <span className="ml-2 font-mono text-lg">{formatTime(gameTime)}</span>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{scoreB}</p>
            <p className="text-xs text-gray-500">Time B</p>
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex justify-center gap-3 mt-3">
          <Button
            size="sm"
            className="rounded-full w-12 h-12"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            size="sm"
            className="rounded-full w-12 h-12"
            onClick={undo}
            disabled={!events.length}
          >
            <RotateCcw />
          </Button>
        </div>
      </Card>

      {/* TIMES LADO A LADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TIME A */}
        <div>
          <h3 className="text-center font-semibold text-green-600 mb-2">🅰️ Time A</h3>
          <div className="space-y-2">
            {teamA.map((p) => (
              <Card key={p.id} className="p-3 flex items-center justify-between rounded-xl shadow-sm">
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.nickname}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => addEvent("goal", p.id)}
                    className="bg-green-100 text-green-700 w-9 h-9 rounded-full"
                  >
                    <Goal className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addEvent("assist", p.id)}
                    className="bg-blue-100 text-blue-700 w-9 h-9 rounded-full"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addEvent("defense", p.id)}
                    className="bg-orange-100 text-orange-700 w-9 h-9 rounded-full"
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* TIME B */}
        <div>
          <h3 className="text-center font-semibold text-red-600 mb-2">🅱️ Time B</h3>
          <div className="space-y-2">
            {teamB.map((p) => (
              <Card key={p.id} className="p-3 flex items-center justify-between rounded-xl shadow-sm">
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.nickname}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => addEvent("goal", p.id)}
                    className="bg-green-100 text-green-700 w-9 h-9 rounded-full"
                  >
                    <Goal className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addEvent("assist", p.id)}
                    className="bg-blue-100 text-blue-700 w-9 h-9 rounded-full"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addEvent("defense", p.id)}
                    className="bg-orange-100 text-orange-700 w-9 h-9 rounded-full"
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* EVENTOS */}
      <div className="mt-4">
        <h3 className="text-center font-semibold text-gray-700 mb-2">📋 Eventos</h3>
        {events.length === 0 ? (
          <p className="text-center text-sm text-gray-500">Nenhum evento ainda</p>
        ) : (
          <div className="space-y-2">
            {events.map((e) => (
              <Card key={e.id} className="p-2 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  {e.type === "goal" && <Goal className="text-green-500 h-4 w-4" />}
                  {e.type === "assist" && <Users className="text-blue-500 h-4 w-4" />}
                  {e.type === "defense" && <Shield className="text-orange-500 h-4 w-4" />}
                  <span>{players.find((p) => p.id === e.playerId)?.name}</span>
                </div>
                <span className="text-xs text-gray-400">{e.time}</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
