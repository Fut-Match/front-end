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

  const handleModalityChange = (value: string) => {
    let playersPerTeam = "";
    switch (value) {
      case "Futebol":
        playersPerTeam = "11";
        break;
      case "Futsal":
        playersPerTeam = "5";
        break;
      case "Society":
        playersPerTeam = "7";
        break;
    }
    setMatchData((prev) => ({
      ...prev,
      modality: value,
      playersPerTeam,
    }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMatch.mutate(
      {
        title: matchData.name,
        modality: matchData.modality,
        playersPerTeam: parseInt(matchData.playersPerTeam),
        location: matchData.location,
        date: matchData.date,
        time: matchData.time,
        description: matchData.description,
        endByGoals: matchData.endByGoals,
        endByTime: matchData.endByTime,
        maxGoals: matchData.endByGoals
          ? parseInt(matchData.maxGoals.toString())
          : undefined,
        maxTime: matchData.endByTime
          ? parseInt(matchData.maxTime.toString())
          : undefined,
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
    handleModalityChange,
    handleSubmit,
    onBack,
    matchData,
    setMatchData,
    handleCheckBoxChange,
    isChecked,
  };
}
