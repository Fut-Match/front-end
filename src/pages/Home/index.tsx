import { HomeView } from "../Home";
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