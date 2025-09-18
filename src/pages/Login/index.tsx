import { LoginModel } from "./LoginModel";
import { LoginView } from "./LoginView";

interface LoginProps {
  onAuth?: () => void;
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  onNavigateToHome?: () => void;
}

export const Login = (props: LoginProps) => {
  const loginModelData = LoginModel();

  return <LoginView {...loginModelData} {...props} />;
};

export default Login;