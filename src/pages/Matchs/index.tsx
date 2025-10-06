import { MatchesView } from "./MatchesView";
import { MatchesModel } from "./MatchesModel";

// Não entendi o motivo de utilizar as três funções, se possível remover as que não forem necessárias
interface MatchesProps {
    onCreateMatch?: () => void;
    onViewMatch?: (matchId: string) => void;
    onManageMatch?: (matchId: string) => void;
}

export function Matches( props: MatchesProps ) {
    const model = MatchesModel(props);

    return <MatchesView {...model} {...props} />;
}


