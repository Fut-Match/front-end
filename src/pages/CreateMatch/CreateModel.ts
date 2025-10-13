
import { useState } from "react";

interface CreateMatchProps {
    onBack: () => void;
}

export function CreateModel(props: CreateMatchProps) {
    const { onBack } = props;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Criando partida:", matchData);
        onBack();
    };

    return {
        handleModalityChange,
        handleSubmit,
        onBack,
        matchData,
        setMatchData,
    };
}


