import { Trophy, Lock, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockAchievements } from "@/data/mockData";

export default function Achievements() {
  const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
  const lockedAchievements = mockAchievements.filter(a => !a.unlocked);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'rare': return 'bg-accent/10 text-accent border-accent/20';
      case 'epic': return 'bg-primary/10 text-primary border-primary/20';
      case 'legendary': return 'bg-gradient-premium text-white border-gold/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="h-3 w-3" />;
      case 'rare': return <Zap className="h-3 w-3" />;
      case 'epic': return <Trophy className="h-3 w-3" />;
      case 'legendary': return <Trophy className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <Card className={`border-border/40 ${achievement.unlocked ? 'bg-card' : 'bg-muted/30 opacity-60'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            achievement.unlocked ? 'bg-primary/10' : 'bg-muted/50'
          }`}>
            {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold truncate ${
                achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.title}
              </h3>
              <Badge className={`${getRarityColor(achievement.rarity)} text-xs`}>
                {getRarityIcon(achievement.rarity)}
                <span className="ml-1 capitalize">{achievement.rarity}</span>
              </Badge>
            </div>
            
            <p className={`text-sm mb-2 ${
              achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
            }`}>
              {achievement.description}
            </p>
            
            {/* Progress Bar */}
            {achievement.progress && !achievement.unlocked && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="text-muted-foreground">
                    {achievement.progress.current}/{achievement.progress.target}
                  </span>
                </div>
                <Progress 
                  value={(achievement.progress.current / achievement.progress.target) * 100}
                  className="h-2"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 pb-6 space-y-6">
      {/* Progress Overview */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso Geral</span>
              <span className="font-medium">
                {Math.round((unlockedAchievements.length / mockAchievements.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={(unlockedAchievements.length / mockAchievements.length) * 100}
              className="h-3"
            />
            
            <div className="grid grid-cols-4 gap-4 text-center pt-2">
              <div>
                <div className="text-lg font-bold text-foreground">{unlockedAchievements.length}</div>
                <div className="text-xs text-muted-foreground">Desbloqueadas</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {mockAchievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
                </div>
                <div className="text-xs text-muted-foreground">Lendárias</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent">
                  {mockAchievements.filter(a => a.rarity === 'epic' && a.unlocked).length}
                </div>
                <div className="text-xs text-muted-foreground">Épicas</div>
              </div>
              <div>
                <div className="text-lg font-bold text-success">
                  {mockAchievements.filter(a => a.rarity === 'rare' && a.unlocked).length}
                </div>
                <div className="text-xs text-muted-foreground">Raras</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Conquistas Desbloqueadas</h2>
          </div>
          <div className="space-y-3">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Em Progresso</h2>
          </div>
          <div className="space-y-3">
            {lockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}