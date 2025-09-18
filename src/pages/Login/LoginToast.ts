import { toast } from 'sonner';
import { LOGIN_MESSAGES } from './LoginMessages';

export const showLoginSuccessToast = () => {
    toast.success(LOGIN_MESSAGES.SUCCESS.title, {
        description: LOGIN_MESSAGES.SUCCESS.description,
    });
};

export const showLoginErrorToast = () => {
    toast.error(LOGIN_MESSAGES.ERROR.title, {
        description: LOGIN_MESSAGES.ERROR.description,
    });
};

export const showInvalidCredentialsToast = () => {
    toast.error(LOGIN_MESSAGES.INVALID_CREDENTIALS.title, {
        description: LOGIN_MESSAGES.INVALID_CREDENTIALS.description,
    });
};

export const showNetworkErrorToast = () => {
    toast.error(LOGIN_MESSAGES.NETWORK_ERROR.title, {
        description: LOGIN_MESSAGES.NETWORK_ERROR.description,
    });
};

export const showLoadingToast = () => {
    toast.loading(LOGIN_MESSAGES.LOADING.title, {
        description: LOGIN_MESSAGES.LOADING.description,
    });
};

export const showEmailRequiredToast = () => {
    toast.error(LOGIN_MESSAGES.VALIDATION_EMAIL_REQUIRED.title, {
        description: LOGIN_MESSAGES.VALIDATION_EMAIL_REQUIRED.description,
    });
};

export const showEmailInvalidToast = () => {
    toast.error(LOGIN_MESSAGES.VALIDATION_EMAIL_INVALID.title, {
        description: LOGIN_MESSAGES.VALIDATION_EMAIL_INVALID.description,
    });
};

export const showPasswordRequiredToast = () => {
    toast.error(LOGIN_MESSAGES.VALIDATION_PASSWORD_REQUIRED.title, {
        description: LOGIN_MESSAGES.VALIDATION_PASSWORD_REQUIRED.description,
    });
};

export const showPasswordMinLengthToast = () => {
    toast.error(LOGIN_MESSAGES.VALIDATION_PASSWORD_MIN_LENGTH.title, {
        description: LOGIN_MESSAGES.VALIDATION_PASSWORD_MIN_LENGTH.description,
    });
};

export const showSessionExpiredToast = () => {
    toast.error(LOGIN_MESSAGES.SESSION_EXPIRED.title, {
        description: LOGIN_MESSAGES.SESSION_EXPIRED.description,
    });
};

export const showAccountLockedToast = () => {
    toast.error(LOGIN_MESSAGES.ACCOUNT_LOCKED.title, {
        description: LOGIN_MESSAGES.ACCOUNT_LOCKED.description,
    });
};

export const showGoogleLoginErrorToast = () => {
    toast.error(LOGIN_MESSAGES.GOOGLE_LOGIN_ERROR.title, {
        description: LOGIN_MESSAGES.GOOGLE_LOGIN_ERROR.description,
    });
};

export const showFacebookLoginErrorToast = () => {
    toast.error(LOGIN_MESSAGES.FACEBOOK_LOGIN_ERROR.title, {
        description: LOGIN_MESSAGES.FACEBOOK_LOGIN_ERROR.description,
    });
};
