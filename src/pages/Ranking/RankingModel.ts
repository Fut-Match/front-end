import { useState } from "react";
import { useGetRankings } from "@/hooks/queries/useRankingQueries";
import { useDebounce } from "@/hooks/useDebounce";

export function RankingModel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: rankingData,
    isLoading,
    isError,
  } = useGetRankings({
    username: debouncedSearch || undefined,
    page: currentPage > 1 ? currentPage : undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    rankingData,
    isLoading,
    isError,
    searchTerm,
    handleSearchChange,
    currentPage,
    handlePageChange,
  };
}
