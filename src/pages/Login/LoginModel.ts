import { useState } from "react";
import { useLogin } from "@/hooks/mutations/useAuthMutations";
import { LoginSuccessResponse } from "@/entities/auth";
import { setAuthUser } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export function LoginModel() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin({
    onSuccess: (data) => {
      if (data.success && "data" in data) {
        const successResponse = data as LoginSuccessResponse;
        setAuthUser(successResponse.data.user);

        toast.success("Login realizado com sucesso!", {
          description: `Bem-vindo de volta, ${successResponse.data.user.name}!`,
        });

        // Pequeno delay para garantir que o contexto seja atualizado
        setTimeout(() => {
          navigate("/home");
        }, 100);
      }
    },
    onError: (error) => {
      toast.error("Erro no login", {
        description: error.message,
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      email: loginData.email,
      password: loginData.password,
    });
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return {
    loginData,
    showPassword,
    isLoading: loginMutation.isPending,
    setLoginData,
    setShowPassword,
    handleLogin,
    navigateToRegister,
    navigateToForgotPassword,
  };
}
