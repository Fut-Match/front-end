import { toast } from "sonner";
import { MATCH_MESSAGES } from "./MatchesMessages";

export const  NO_MATCHES_FOUND_TOAST = () => {
    toast.success(MATCH_MESSAGES.NO_MATCHES_FOUND.title, {
        description: MATCH_MESSAGES.NO_MATCHES_FOUND.description,
    });
}
export const ERROR_LOADING_TOAST = () => {
    toast.error(MATCH_MESSAGES.ERROR_LOADING.title, {
        description: MATCH_MESSAGES.ERROR_LOADING.description,
    });
}
export const LOADING_TOAST = () => {
    toast(MATCH_MESSAGES.LOADING.title, {
        description: MATCH_MESSAGES.LOADING.description,    
        duration: 2000,
    });
}
export const REFRESH_SUCCESS_TOAST = () => {
    toast.success(MATCH_MESSAGES.REFRESH_SUCCESS.title, {
        description: MATCH_MESSAGES.REFRESH_SUCCESS.description,
    });
}
export const MATCH_ALERT_TOAST = () => {
    toast(MATCH_MESSAGES.MATCH_ALERT.title, {
        description: MATCH_MESSAGES.MATCH_ALERT.description,
    });
}
export const JOIN_SUCCESS_TOAST = () => {
    toast.success(MATCH_MESSAGES.JOIN_SUCCESS.title, {
        description: MATCH_MESSAGES.JOIN_SUCCESS.description,
    });
}
export const JOIN_ERROR_TOAST = () => {
    toast.error(MATCH_MESSAGES.JOIN_ERROR.title, {
        description: MATCH_MESSAGES.JOIN_ERROR.description,
    });
}

