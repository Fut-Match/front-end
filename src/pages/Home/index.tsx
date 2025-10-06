import { HomeView } from "./HomeView";
import { HomeModel } from "./HomeModel";

export function Home() {
    return <HomeView {...HomeModel()} />;
}