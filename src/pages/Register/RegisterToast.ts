import { toast } from "sonner";
import { REGISTER_MESSAGES } from "./RegisterMessage";

export const showRegisterSuccessToast = () => {
    toast.success(REGISTER_MESSAGES.SUCCESS.title, {
        description: REGISTER_MESSAGES.SUCCESS.description,
    });
};

export const showRegisterErrorToast = () => {
    toast.error(REGISTER_MESSAGES.ERROR.title, {
        description: REGISTER_MESSAGES.ERROR.description,
    });
};
export const showEmailInUseToast = () => {
    toast.error(REGISTER_MESSAGES.EMAIL_IN_USE.title, {
        description: REGISTER_MESSAGES.EMAIL_IN_USE.description,
    });
}
export const showNetworkErrorToast = () => {
    toast.error(REGISTER_MESSAGES.NETWORK_ERROR.title, {
        description: REGISTER_MESSAGES.NETWORK_ERROR.description,
    });
}
export const showLoadingToast = () => {
    toast.loading(REGISTER_MESSAGES.LOADING.title, {
        description: REGISTER_MESSAGES.LOADING.description,
    });
}
export const showValidationNameRequiredToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_NAME_REQUIRED.title, {
        description: REGISTER_MESSAGES.VALIDATION_NAME_REQUIRED.description,
    });
}
export const showValidationLastnameRequiredToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_LASTNAME_REQUIRED.title, {
        description: REGISTER_MESSAGES.VALIDATION_LASTNAME_REQUIRED.description,
    });
}
export const showValidationEmailRequiredToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_EMAIL_REQUIRED.title, {
        description: REGISTER_MESSAGES.VALIDATION_EMAIL_REQUIRED.description,
    });
}
export const showValidationEmailInvalidToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_EMAIL_INVALID.title, {
        description: REGISTER_MESSAGES.VALIDATION_EMAIL_INVALID.description,
    });
    
}
export const showValidationPasswordRequiredToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_PASSWORD_REQUIRED.title, {
        description: REGISTER_MESSAGES.VALIDATION_PASSWORD_REQUIRED.description,
    });
}
export const showValidationPasswordMinLengthToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_PASSWORD_MIN_LENGTH.title, {
        description: REGISTER_MESSAGES.VALIDATION_PASSWORD_MIN_LENGTH.description,
    });
}
export const showValidationConfirmPasswordRequiredToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_CONFIRM_PASSWORD_REQUIRED.title, {
        description: REGISTER_MESSAGES.VALIDATION_CONFIRM_PASSWORD_REQUIRED.description,
    });
}
export const showValidationPasswordsDoNotMatchToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_PASSWORDS_DO_NOT_MATCH.title, {
        description: REGISTER_MESSAGES.VALIDATION_PASSWORDS_DO_NOT_MATCH.description,
    });
}
export const showValidationTermsNotAcceptedToast = () => {
    toast.error(REGISTER_MESSAGES.VALIDATION_TERMS_NOT_ACCEPTED.title, {
        description: REGISTER_MESSAGES.VALIDATION_TERMS_NOT_ACCEPTED.description,
    });
}
