import { toast } from 'sonner';
import { Create_Messages } from './CreateMessages';

export const showSuccessCreateMatch = () => {
    toast.success(Create_Messages.SUCCESS_CREATE.title, {
        description: Create_Messages.SUCCESS_CREATE.description,
    });
}
export const showErrorCreateMatch = () => {
    toast.error(Create_Messages.ERROR_CREATE.title, {
        description: Create_Messages.ERROR_CREATE.description,
    });
}
export const showInvalidData = () => {
    toast.error(Create_Messages.INVALID_DATA.title, {
        description: Create_Messages.INVALID_DATA.description,
    });
}
export const showNetworkError = () => {
    toast.error(Create_Messages.NETWORKERROR.title, {
        description: Create_Messages.NETWORKERROR.description,
    });
}
export const showAllFieldsRequired = () => {
    toast.error(Create_Messages.ALL_FIELDS_REQUIRED.title, {
        description: Create_Messages.ALL_FIELDS_REQUIRED.description,
    });
}