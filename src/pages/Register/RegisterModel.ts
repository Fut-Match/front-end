import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  showRegisterErrorToast,
  showRegisterSuccessToast,
} from "./RegisterToast";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "@/entities/auth";
import { z } from "zod";

const registerFormSchema = z
  .object({
    firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Senhas não coincidem",
    path: ["password_confirmation"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

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
    resolver: zodResolver(registerFormSchema),
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
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };

      await registerMutation(apiData);

      setShowSuccessMessage(true);
      showRegisterSuccessToast();
    } catch (error) {
      showRegisterErrorToast();
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
