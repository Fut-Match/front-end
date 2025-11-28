import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queries/queryKeys";
import type { UpdateUserRequest, UpdateUserResponse } from "@/entities/user";
import { DC } from "@/externals/dependency-container";

export const useUpdateUser = (options?: {
  onSuccess?: (data: UpdateUserResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const userRepository = DC.repositories.userRepository("auth");

  return useMutation({
    mutationFn: (userData: UpdateUserRequest) =>
      userRepository.updateMe(userData),
    onSuccess: (data: UpdateUserResponse) => {
      // Invalidar queries relacionadas ao usuário
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });

      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
