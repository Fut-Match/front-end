import { Trophy, Lock, Star, Zap, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { AchievementsModel } from "./AchievementsModel";
import type { Achievement, AchievementRarity } from "@/entities/achievement";

type AchievementsViewProps = ReturnType<typeof AchievementsModel>;

export function AchievementsView(props: AchievementsViewProps) {
  const {
    achievementsData,
    playerAchievementsData,
    unlockedAchievements,
    lockedAchievements,
    isLoading,
    isError,
    rarityFilter,
    handleRarityFilter,
  } = props;

  if (isError) {
    return (
      <ErrorState
        title="Erro ao carregar conquistas"
        message="Não foi possível carregar as conquistas. Tente novamente mais tarde."
      />
    );
  }

  const getRarityColor = (rarity: AchievementRarity) => {
    switch (rarity) {
      case "facil":
        return "bg-muted text-muted-foreground";
      case "medio":
        return "bg-accent/10 text-accent border-accent/20";
      case "dificil":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRarityIcon = (rarity: AchievementRarity) => {
    switch (rarity) {
      case "facil":
        return <Star className="h-3 w-3" />;
      case "medio":
        return <Zap className="h-3 w-3" />;
      case "dificil":
        return <Award className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  const getRarityLabel = (rarity: AchievementRarity) => {
    switch (rarity) {
      case "facil":
        return "Fácil";
      case "medio":
        return "Médio";
      case "dificil":
        return "Difícil";
      default:
        return rarity;
    }
  };

  const getProgressIcon = () => <Trophy className="text-2xl" />;

  const AchievementCard = ({
    achievement,
    unlocked,
  }: {
    achievement: Achievement;
    unlocked: boolean;
  }) => {
    const playerAchievement = playerAchievementsData?.data.find(
      (pa) => pa.achievement_id === achievement.id
    );

    const progress = playerAchievement?.progress_current || 0;
    const target = achievement.progress_target;
    const progressPercentage = (progress / target) * 100;

    return (
      <Card
        className={`border-border/40 ${
          unlocked ? "bg-card" : "bg-muted/30 opacity-60"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                unlocked ? "bg-primary/10" : "bg-muted/50"
              }`}
            >
              {unlocked ? (
                getProgressIcon()
              ) : (
                <Lock className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`font-semibold truncate ${
                    unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {achievement.title}
                </h3>
                <Badge
                  className={`${getRarityColor(achievement.rarity)} text-xs`}
                >
                  {getRarityIcon(achievement.rarity)}
                  <span className="ml-1">{getRarityLabel(achievement.rarity)}</span>
                </Badge>
              </div>

              <p
                className={`text-sm mb-2 ${
                  unlocked
                    ? "text-muted-foreground"
                    : "text-muted-foreground/60"
                }`}
              >
                {achievement.description}
              </p>

              {!unlocked && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="text-muted-foreground">
                      {progress}/{target}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 pb-6 space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const totalAchievements = achievementsData?.data.length || 0;
  const unlockedCount = unlockedAchievements.length;
  const progressPercentage = totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0;

  return (
    <div className="container mx-auto p-4 pb-6 space-y-6">
      <Card className="border-border/40">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso Geral</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />

            <div className="grid grid-cols-3 gap-4 text-center pt-2">
              <div>
                <div className="text-lg font-bold text-foreground">
                  {unlockedCount}
                </div>
                <div className="text-xs text-muted-foreground">
                  Desbloqueadas
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {unlockedAchievements.filter((a) => a.rarity === "dificil").length}
                </div>
                <div className="text-xs text-muted-foreground">Difíceis</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent">
                  {unlockedAchievements.filter((a) => a.rarity === "medio").length}
                </div>
                <div className="text-xs text-muted-foreground">Médias</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={rarityFilter === undefined ? "default" : "outline"}
          size="sm"
          onClick={() => handleRarityFilter(undefined)}
        >
          Todas
        </Button>
        <Button
          variant={rarityFilter === "facil" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRarityFilter("facil")}
        >
          Fácil
        </Button>
        <Button
          variant={rarityFilter === "medio" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRarityFilter("medio")}
        >
          Médio
        </Button>
        <Button
          variant={rarityFilter === "dificil" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRarityFilter("dificil")}
        >
          Difícil
        </Button>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Conquistas Desbloqueadas
            </h2>
          </div>
          <div className="space-y-3">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Em Progresso
            </h2>
          </div>
          <div className="space-y-3">
            {lockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={false}
              />
            ))}
          </div>
        </div>
      )}

      {totalAchievements === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Nenhuma conquista disponível</p>
        </div>
      )}
    </div>
  );
}
