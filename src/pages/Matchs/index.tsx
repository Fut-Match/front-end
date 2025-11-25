import { MatchesView } from "./MatchesView";
import { MatchesModel } from "./MatchesModel";



export function Matches() {


    return <MatchesView {...MatchesModel({})} />;
}


