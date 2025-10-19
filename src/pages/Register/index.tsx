import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";


export const Register = () => {
    const registerModelData = RegisterModel();

    return <RegisterView {...registerModelData} />;
};
export default Register;
