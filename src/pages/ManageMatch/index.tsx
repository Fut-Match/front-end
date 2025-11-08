import { ManageMatchView } from "./ManageMatchView";
import { ManageMatchModel } from "./ManageMatchModel";

export const ManageMatch = () => {
    return <ManageMatchView {...ManageMatchModel()} />;
}