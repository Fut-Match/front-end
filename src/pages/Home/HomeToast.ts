import { toast } from 'sonner';
import { HOME_MESSAGES } from './HomeMessages';

export const showDataFetchSuccessToast = () => {
    toast.success(HOME_MESSAGES.WELCOME.title, {
        description: HOME_MESSAGES.WELCOME.description,
    });
}

export const showDataFetchErrorToast = () => {
    toast.error(HOME_MESSAGES.ERROR_LOADING.title, {
        description: HOME_MESSAGES.ERROR_LOADING.description,
    });
}
export const showNoMatchesFoundToast = () => {
    toast.info(HOME_MESSAGES.NO_MATCHES_FOUND.title, {
        description: HOME_MESSAGES.NO_MATCHES_FOUND.description,
    });
}
export const showLoadingToast = () => {
    toast(HOME_MESSAGES.LOADING.title, {
        description: HOME_MESSAGES.LOADING.description,
        duration: 2000,
    });
}
export const showRefreshSuccessToast = () => {
    toast.success(HOME_MESSAGES.REFRESH_SUCCESS.title, {
        description: HOME_MESSAGES.REFRESH_SUCCESS.description,
    });
}
export const showRefreshErrorToast = () => {
    toast.error(HOME_MESSAGES.REFRESH_ERROR.title, {
        description: HOME_MESSAGES.REFRESH_ERROR.description,
    });
}
