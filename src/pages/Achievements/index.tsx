import { AchievementsModel } from "./AchievementsModel";
import { AchievementsView } from "./AchievementsView";

export default function Achievements() {
  const achievementsModelData = AchievementsModel();
  return <AchievementsView {...achievementsModelData} />;
}
