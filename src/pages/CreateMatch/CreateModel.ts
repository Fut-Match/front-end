import { useState } from "react";
import { useCreateMatch } from "@/hooks/mutations/useMatchMutations";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

export function CreateModel(onBack: () => void) {
  const createMatch = useCreateMatch();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const [matchData, setMatchData] = useState({
    name: "",
    modality: "",
    playersPerTeam: "",
    location: "",
    date: "",
    time: "",
    description: "",
    endByGoals: true,
    endByTime: false,
    maxGoals: 3,
    maxTime: 90,
  });



  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMatch.mutate(
      {

        name: matchData.name,
        playersPerTeam: "3", 
        location: matchData.location,
        match_date: matchData.date,
        match_time: matchData.time,
        description: matchData.description,
        end_mode: matchData.endByGoals
          ? "goals"
          : matchData.endByTime
            ? "time"
            : "both",
        goal_limit: matchData.endByGoals
          ? parseInt(matchData.maxGoals.toString())
          : undefined,
        time_limit: matchData.endByTime
          ? parseInt(matchData.maxTime.toString())
          : undefined,
        maxPlayers: isChecked
          ? parseInt(matchData.playersPerTeam) * 2
          : parseInt(matchData.playersPerTeam),
      },
      {
        onSuccess: () => {
          toast.success("Partida criada com sucesso!", {
            description: `Sua nova partida foi criada.`,
          });
          navigate("/manage-match");
        },
        onError: (error: Error) => {
          toast.error("Erro ao criar partida", {
            description: error.message,
          });
        },
      }
    );
  };

  return {
    handleSubmit,
    onBack,
    matchData,
    setMatchData,
    handleCheckBoxChange,
    isChecked,
  };
}
