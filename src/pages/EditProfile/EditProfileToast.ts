import { toast } from "sonner";
import { EDIT_PROFILE_MESSAGES } from "./EditProfileMessage";

export const showUpdateSuccessToast = () => {
  toast.success(EDIT_PROFILE_MESSAGES.UPDATE_SUCCESS.title, {
    description: EDIT_PROFILE_MESSAGES.UPDATE_SUCCESS.description,
  });
};

export const showUpdateErrorToast = () => {
  toast.error(EDIT_PROFILE_MESSAGES.UPDATE_ERROR.title, {
    description: EDIT_PROFILE_MESSAGES.UPDATE_ERROR.description,
  });
};

export const showLoadingToast = () => {
  toast.loading(EDIT_PROFILE_MESSAGES.LOADING.title, {
    description: EDIT_PROFILE_MESSAGES.LOADING.description,
  });
};
