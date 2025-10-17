import { CreateView } from "./CreateView"
import { CreateModel } from "./CreateModel"



export function CreateMatch({onBack }) {

    return <CreateView {...CreateModel(onBack)} />;
}