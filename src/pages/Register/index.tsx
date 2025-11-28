import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";

export default function Register() {
    const registerModelData = RegisterModel();

    return <RegisterView {...registerModelData} />;
}