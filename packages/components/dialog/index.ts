import Dialog, { type DialogProps, defaultDialogProps } from '$/components/dialog/dialog';
import DeleteConfirmation, { type DialogDeleteConfirmationProps } from '$/components/dialog/dialog-delete-confirmation';

export { DialogFooterAlignment, dialogComponentUtils, type DialogStore } from '$/components/dialog/utils';

export type { DialogProps, DialogDeleteConfirmationProps };
export { defaultDialogProps };

export default Object.assign(Dialog, { DeleteConfirmation });
