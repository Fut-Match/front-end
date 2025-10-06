import { HomeView } from "./HomeView";
import { HomeModel } from "./HomeModel";

interface HomeProps {
    onCreateMatch: () => void;
    onMyMatches: () => void;
 }


export function Home(
    { onCreateMatch, onMyMatches }: HomeProps
) {


    return <HomeView {...HomeModel()} />;
}