import { HomeView } from "./HomeView";
import { HomeModel } from "./HomeModel";

export default function Home() {
    return <HomeView {...HomeModel()} />;
}