import { MatchesView } from "./MatchesView";
import { MatchesModel } from "./MatchesModel";



interface MatchesProps {
    onCreateMatch?: () => void;
    onViewMatch?: (matchId: string) => void;
    onManageMatch?: (matchId: string) => void;
}

export function Matches( props: MatchesProps ) {
    const model = MatchesModel(props);

    return <MatchesView {...model} {...props} />;
}


