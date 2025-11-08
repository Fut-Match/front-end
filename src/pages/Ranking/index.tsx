import { RankingModel } from "./RankingModel";
import { RankingView } from "./RankingView";

export function Ranking() {
  const rankingModelData = RankingModel();
  return <RankingView {...rankingModelData} />;
}

export default Ranking;