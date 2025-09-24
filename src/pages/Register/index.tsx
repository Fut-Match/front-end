import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";

interface RegisterProps {
  onAuth?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
}
export const Register = (props: RegisterProps) => {
    const registerModelData = RegisterModel();
    
    return <RegisterView {...registerModelData} {...props} />;
};
export default Register;
