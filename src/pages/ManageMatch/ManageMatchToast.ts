import { toast } from 'sonner';
import { MANAGE_MATCH_MESSAGES } from './ManageMatchMessages';

export const showPlayerAddedToast = (playerName: string) => {
    toast.success(MANAGE_MATCH_MESSAGES.PLAYER_ADDED_SUCCESS.title, {
        description: MANAGE_MATCH_MESSAGES.PLAYER_ADDED_SUCCESS.description.replace('{playerName}', playerName),
    });
};
export const showPlayerRemovedToast = () => {
    toast.success(MANAGE_MATCH_MESSAGES.PLAYER_REMOVED_SUCCESS.title, {
        description: MANAGE_MATCH_MESSAGES.PLAYER_REMOVED_SUCCESS.description,
    });
};
export const showPaymentToggledToast = () => {
    toast.success(MANAGE_MATCH_MESSAGES.PAYMENT_TOGGLED_SUCCESS.title, {
        description: MANAGE_MATCH_MESSAGES.PAYMENT_TOGGLED_SUCCESS.description,
    });
};
export const showConfirmationToggledToast = () => {
    toast.success(MANAGE_MATCH_MESSAGES.CONFIRMATION_TOGGLED_SUCCESS.title, {
        description: MANAGE_MATCH_MESSAGES.CONFIRMATION_TOGGLED_SUCCESS.description,
    });
};
export const showTeamsShuffledToast = () => {
    toast.success(MANAGE_MATCH_MESSAGES.TEAMS_SHUFFLED_SUCCESS.title, {
        description: MANAGE_MATCH_MESSAGES.TEAMS_SHUFFLED_SUCCESS.description,
    });
};
export const showGenericErrorToast = () => {
    toast.error(MANAGE_MATCH_MESSAGES.ERROR_GENERIC.title, {
        description: MANAGE_MATCH_MESSAGES.ERROR_GENERIC.description,
    });
};
export const showLoadingMatchErrorToast = () => {
    toast.error(MANAGE_MATCH_MESSAGES.ERROR_LOADING_MATCH.title, {
        description: MANAGE_MATCH_MESSAGES.ERROR_LOADING_MATCH.description,
    });
};

