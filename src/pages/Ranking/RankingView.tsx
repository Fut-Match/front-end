import { RankingList } from "@/components/RankingList";
import { RankingModel } from "./RankingModel";
import { ErrorState } from "@/components/ErrorState";

type RankingViewProps = ReturnType<typeof RankingModel>;

export function RankingView(props: RankingViewProps) {
  const {
    rankingData,
    isLoading,
    isError,
    searchTerm,
    handleSearchChange,
    currentPage,
    handlePageChange,
  } = props;

  if (isError) {
    return (
      <ErrorState
        title="Erro ao carregar ranking"
        message="Não foi possível carregar o ranking de jogadores no momento. Por favor, tente novamente mais tarde."
      />
    );
  }

  return (
    <div className="p-4 space-y-6">
      <RankingList
        players={rankingData?.data || []}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        pagination={rankingData?.pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
