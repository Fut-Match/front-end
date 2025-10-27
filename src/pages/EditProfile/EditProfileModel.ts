import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  updateUserRequestSchema,
  type UpdateUserRequest,
} from "@/entities/user";
import { useUpdateUser } from "@/hooks/mutations/useUserMutations";
import { useGetCurrentUser } from "@/hooks/queries/useUserQueries";
import { showUpdateSuccessToast } from "./EditProfileToast";
import { handleApiError } from "@/utils/error-handler";

type EditProfileFormData = z.infer<typeof updateUserRequestSchema>;

export function EditProfileModel() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();
  const { data: currentUserData, isLoading: isLoadingUser } =
    useGetCurrentUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(updateUserRequestSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      nickname: "",
      image: "",
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Atualizar formulário quando dados do usuário forem carregados
  useEffect(() => {
    if (currentUserData?.data) {
      const user = currentUserData.data;
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        nickname: user.player?.nickname || "",
        image: user.player?.image || "",
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [currentUserData, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      // Remover campos de senha se não foram preenchidos
      const updateData: UpdateUserRequest = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        nickname: data.nickname,
        image: data.image,
      };

      // Adicionar senhas apenas se a nova senha foi informada
      if (data.password && data.password.length > 0) {
        updateData.current_password = data.current_password;
        updateData.password = data.password;
        updateData.password_confirmation = data.password_confirmation;
      }

      await updateUserMutation(updateData);
      showUpdateSuccessToast();
      navigate("/settings");
    } catch (error) {
      handleApiError(error, {
        title: "Erro ao atualizar perfil",
        useBackendMessage: true,
      });
    }
  };

  const handleSave = handleSubmit(onSubmit);

  const handleCancel = () => {
    navigate("/settings");
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    control,
    handleSubmit: handleSave,
    handleCancel,
    errors,
    isLoading: isPending,
    isLoadingUser,
    showCurrentPassword,
    showPassword,
    showConfirmPassword,
    toggleShowCurrentPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    Controller,
  };
}
