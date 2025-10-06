import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function PlayerCardSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-gradient-sport p-6 shadow-card">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-primary-foreground">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          <div className="bg-muted rounded-lg p-3 min-w-[60px] text-center">
            <Skeleton className="h-8 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-6 mx-auto" />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center text-primary-foreground">
              <div className="flex items-center justify-center mb-1">
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
          {[1, 2].map((i) => (
            <div key={i} className="text-center text-primary-foreground">
              <div className="flex items-center justify-center mb-1">
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}