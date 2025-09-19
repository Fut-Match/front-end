import { useState } from "react";
import { 
  showRegisterErrorToast, 
  showRegisterSuccessToast, 
  showValidationConfirmPasswordRequiredToast 
} from "./RegisterToast";
import { useAuth } from "@/hooks/useAuth";

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
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

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
    setIsLoading(true);

    if (registerData.password !== registerData.password_confirmation) {
      showValidationConfirmPasswordRequiredToast();
      setIsLoading(false);
      return;
    }

    try {
      await register(
        registerData.name,
        registerData.lastname,
        registerData.email,
        registerData.password
      );

      showRegisterSuccessToast();

      if (callbacks?.onAuth) {
        callbacks.onAuth();
      } else {
        window.location.href = "/home";
      }
    } catch (error) {
      // showRegisterErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = (onNavigateToLogin?: () => void) => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      window.location.href = "/login";
    }
  };

  const navigateToConfirmEmail = (onNavigateToConfirmEmail?: () => void) => {
    if (onNavigateToConfirmEmail) {
      onNavigateToConfirmEmail();
    } else {
      window.location.href = "/home";
    }
  };

  return {
    registerData,
    showPassword,
    isLoading,
    setRegisterData,
    setShowPassword,
    handleRegister,
    navigateToLogin,
    navigateToConfirmEmail,
  };
}
