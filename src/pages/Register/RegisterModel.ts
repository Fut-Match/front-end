import { useState } from "react";
import { 
  showRegisterErrorToast, 
  showRegisterSuccessToast, 
  showValidationConfirmPasswordRequiredToast 
} from "./RegisterToast";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { useNavigate } from "react-router-dom";

export interface RegisterModelData {
  registerData: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string; 
  };
  showPassword: boolean;
  isLoading: boolean;
  setRegisterData: (
    data: { name: string; lastname: string; email: string; password: string; password_confirmation: string }
  ) => void;
  setShowPassword: (show: boolean) => void;
  
  handleRegister: (
    e: React.FormEvent,
    callbacks?: {
      onAuth?: () => void;
      onNavigateToLogin?: () => void;
      onNavigateToHome?: () => void;
      onNavigateToConfirmEmail?: () => void;
    }
  ) => Promise<void>;
  navigateToLogin: (onNavigateToLogin?: () => void) => void;
  navigateToConfirmEmail: (onNavigateToConfirmEmail?: () => void) => void;
}

export function RegisterModel(): RegisterModelData {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: registerMutation, isPending } = useRegister();

  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = async (
    e: React.FormEvent,
    callbacks?: {
      onAuth?: () => void;
      onNavigateToLogin?: () => void;
      onNavigateToHome?: () => void;
    }
  ) => {
    e.preventDefault();
    

    if (registerData.password !== registerData.password_confirmation) {
      showValidationConfirmPasswordRequiredToast();
      return;
    }

    try {
      await registerMutation({
        name: `${registerData.name} ${registerData.lastname}`,
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation
      });

      showRegisterSuccessToast();

      if (callbacks?.onAuth) {
        callbacks.onAuth();
      } else {
        navigate('/login');
      }
    } catch (error) {
      showRegisterErrorToast();
    }
  };

  const navigateToLogin = (onNavigateToLogin?: () => void) => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      navigate('/login');
    }
  };

  const navigateToConfirmEmail = (onNavigateToConfirmEmail?: () => void) => {
    if (onNavigateToConfirmEmail) {
      onNavigateToConfirmEmail();
    } else {
      navigate('/home');
    }
  };

  return {
    registerData,
    showPassword,
    isLoading: isPending,
    setRegisterData,
    setShowPassword,
    handleRegister,
    navigateToLogin,
    navigateToConfirmEmail,
  };
}
