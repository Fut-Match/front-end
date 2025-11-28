import { EditProfileModel } from "./EditProfileModel";
import { EditProfileView } from "./EditProfileView";

export default function EditProfile() {
  const editProfileModelData = EditProfileModel();

  return <EditProfileView {...editProfileModelData} />;
}