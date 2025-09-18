import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showLoginSuccessToast, showLoginErrorToast } from "./LoginToast";

export interface LoginModelData {
  loginData: {
    email: string;
    password: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  setLoginData: (data: { email: string; password: string }) => void;
  setShowPassword: (show: boolean) => void;
  handleLogin: (e: React.FormEvent, callbacks?: {
    onAuth?: () => void;
    onNavigateToRegister?: () => void;
    onNavigateToForgotPassword?: () => void;
    onNavigateToHome?: () => void;
  }) => Promise<void>;
  navigateToRegister: (onNavigateToRegister?: () => void) => void;
  navigateToForgotPassword: (onNavigateToForgotPassword?: () => void) => void;
  navigateToHome: (onNavigateToHome?: () => void) => void;
}

export function LoginModel(): LoginModelData {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (
    e: React.FormEvent, 
    callbacks?: {
      onAuth?: () => void;
      onNavigateToRegister?: () => void;
      onNavigateToForgotPassword?: () => void;
      onNavigateToHome?: () => void;
    }
  ) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      
      showLoginSuccessToast();
      
      if (callbacks?.onAuth) {
        callbacks.onAuth();
      } else {
        // Navigate to app home
        window.location.href = '/home';
      }
    } catch (error) {
      showLoginErrorToast();
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = (onNavigateToRegister?: () => void) => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      window.location.href = '/register';
    }
  };

  const navigateToForgotPassword = (onNavigateToForgotPassword?: () => void) => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    } else {
      window.location.href = '/forgot-password';
    }
  };

  const navigateToHome = (onNavigateToHome?: () => void) => {
    if (onNavigateToHome) {
      onNavigateToHome();
    } else {
      window.location.href = '/';
    }
  };

  return {
    loginData,
    showPassword,
    isLoading,
    setLoginData,
    setShowPassword,
    handleLogin,
    navigateToRegister,
    navigateToForgotPassword,
    navigateToHome,
  };
}