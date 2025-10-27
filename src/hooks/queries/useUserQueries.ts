import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { DC } from "@/externals/dependency-container";

export const useGetCurrentUser = () => {
  const userRepository = DC.repositories.userRepository("auth");

  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: () => userRepository.getMe(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 1,
  });
};
