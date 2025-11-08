import { useState } from "react";
import {
  useGetAchievements,
  useGetPlayerAchievements,
} from "@/hooks/queries/useAchievementQueries";
import type { AchievementRarity } from "@/entities/achievement";

export function AchievementsModel() {
  const [rarityFilter, setRarityFilter] = useState<
    AchievementRarity | undefined
  >(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: achievementsData,
    isLoading: isLoadingAchievements,
    isError: isErrorAchievements,
  } = useGetAchievements({
    rarity: rarityFilter,
    page: currentPage > 1 ? currentPage : undefined,
  });

  const {
    data: playerAchievementsData,
    isLoading: isLoadingPlayerAchievements,
    isError: isErrorPlayerAchievements,
  } = useGetPlayerAchievements();

  const handleRarityFilter = (rarity: AchievementRarity | undefined) => {
    setRarityFilter(rarity);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const playerAchievementIds = new Set(
    playerAchievementsData?.data.map((pa) => pa.achievement_id) || []
  );

  const unlockedAchievements =
    achievementsData?.data.filter((achievement) =>
      playerAchievementIds.has(achievement.id)
    ) || [];

  const lockedAchievements =
    achievementsData?.data.filter(
      (achievement) => !playerAchievementIds.has(achievement.id)
    ) || [];

  const isLoading = isLoadingAchievements || isLoadingPlayerAchievements;
  const isError = isErrorAchievements || isErrorPlayerAchievements;

  return {
    achievementsData,
    playerAchievementsData,
    unlockedAchievements,
    lockedAchievements,
    isLoading,
    isError,
    rarityFilter,
    handleRarityFilter,
    currentPage,
    handlePageChange,
  };
}
