import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showRegisterSuccessToast } from "./RegisterToast";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, registerRequestSchema } from "@/entities/auth";
import { z } from "zod";
import { handleApiError } from "@/utils/error-handler";

type RegisterFormData = z.infer<typeof registerRequestSchema>;

export function RegisterModel() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { mutateAsync: registerMutation, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const apiData: RegisterRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };

      await registerMutation(apiData);

      setShowSuccessMessage(true);
      showRegisterSuccessToast();
    } catch (error) {
      handleApiError(error, {
        title: "Erro ao realizar cadastro",
        useBackendMessage: true,
      });
    }
  };

  const handleRegister = handleSubmit(onSubmit);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    control,
    handleSubmit: handleRegister,
    errors,
    watch,
    showPassword,
    showConfirmPassword,
    showSuccessMessage,
    isLoading: isPending,
    setShowPassword,
    setShowConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    navigateToLogin,
    Controller,
  };
}
