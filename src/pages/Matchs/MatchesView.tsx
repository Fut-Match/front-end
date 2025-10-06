import { MatchCard } from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Hash } from "lucide-react";
import { MatchesModel } from "./MatchesModel";


type MatchesViewProps = ReturnType<typeof MatchesModel>;


export function MatchesView(props: MatchesViewProps) {
  const {
    inviteCode,
    setInviteCode,
    organizingMatches,
    participatingMatches,
    handleJoinMatch,
    handleViewMatch,
    handleManageMatch,
    handleJoinByCode,
    navigateToCreateMatch,
  } = props;


  return (
    <div className="p-4 space-y-6">
      {/* Quick Actions */}
      <div className="space-y-3">
        <Button className="w-full h-12 gap-2" onClick={navigateToCreateMatch}>
          <Plus className="h-5 w-5" />
          Criar Nova Partida
        </Button>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Código da partida"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={handleJoinByCode}>
            Entrar
          </Button>
        </div>
      </div>

      {/* Matches Tabs */}
      <Tabs defaultValue="participating" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="participating">Participando</TabsTrigger>
          <TabsTrigger value="organizing">Organizando</TabsTrigger>
        </TabsList>

        <TabsContent value="participating" className="space-y-4 mt-4">
          {participatingMatches.length > 0 ? (
            participatingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onJoin={handleJoinMatch}
                onView={handleViewMatch}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Você não está participando de nenhuma partida</p>
              <p className="text-sm">Use um código de convite ou crie uma nova partida</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="organizing" className="space-y-4 mt-4">
          {organizingMatches.length > 0 ? (
            organizingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onJoin={handleJoinMatch}
                onView={handleViewMatch}
                onManage={handleManageMatch}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Plus className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Você não está organizando nenhuma partida</p>
              <p className="text-sm">Crie sua primeira partida agora</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}