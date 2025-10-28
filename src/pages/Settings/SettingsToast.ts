import { toast } from "sonner";
import { SETTINGS_MESSAGES } from "./SettingsMessage";

export const showUpdateSuccessToast = () => {
  toast.success(SETTINGS_MESSAGES.UPDATE_SUCCESS.title, {
    description: SETTINGS_MESSAGES.UPDATE_SUCCESS.description,
  });
};

export const showUpdateErrorToast = () => {
  toast.error(SETTINGS_MESSAGES.UPDATE_ERROR.title, {
    description: SETTINGS_MESSAGES.UPDATE_ERROR.description,
  });
};
