import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid } from "lucide-react";
import { MatchCard } from "@/components/MatchCard";
import { MatchesModel } from "@/pages/Matchs/MatchesModel";

export function CardMatchHome({ onViewMatch, onManageMatch }: any) {
  const { organizingMatches } = MatchesModel({});


  const nextMatches = organizingMatches.slice(0, 2);

  return (
    <section className="w-full max-w-4xl mx-auto">
      {/* === Título === */}
      <div className="flex items-center gap-2 mb-3">
        <LayoutGrid className="h-5 w-5 text-pink-500" />
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
          Próximas Partidas
        </h3>
      </div>

      {/* === Container de Cards === */}
      <div className="bg-gradient-to-b from-white/90 to-pink-50/50 border border-pink-100 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
        {nextMatches.length > 0 ? (
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            {nextMatches.map((match) => (
              <div
                key={match.id}
                className="flex-1 min-w-[260px] max-w-[320px]"
              >
                <MatchCard
                  match={match}
                  onView={onViewMatch}
                  onManage={onManageMatch}
                  className="
                    w-full h-full 
                    bg-white/90 border border-pink-100 rounded-xl
                    hover:bg-pink-50 transition-all duration-300
                    flex flex-col justify-between
                    shadow-sm hover:shadow-md
                  "
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-pink-400" />
            <p className="text-muted-foreground text-sm sm:text-base">
              Nenhuma partida agendada no momento 🎯
            </p>
          </div>
        )}

        {/* === Botão "Ver todas" === */}
        {organizingMatches.length > 3 && (
          <div className="pt-4 text-center">
            <Button
              variant="outline"
              className="
                rounded-full border-pink-300 text-pink-600 
                hover:bg-pink-100 hover:text-pink-700 
                transition-all text-sm font-medium px-5 py-2
              "
            >
              Ver todas →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
