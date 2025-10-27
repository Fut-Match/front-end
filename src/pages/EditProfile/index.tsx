import { EditProfileModel } from "./EditProfileModel";
import { EditProfileView } from "./EditProfileView";

export const EditProfile = () => {
  const editProfileModelData = EditProfileModel();

  return <EditProfileView {...editProfileModelData} />;
};

export default EditProfile;
