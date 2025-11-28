import { RankingModel } from "./RankingModel";
import { RankingView } from "./RankingView";

export default function Ranking() {
  const rankingModelData = RankingModel();
  return <RankingView {...rankingModelData} />;
}