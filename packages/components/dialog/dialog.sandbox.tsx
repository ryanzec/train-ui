import Button, { ButtonVariant, ButtonColor } from '$/components/button';
import Dialog from '$/components/dialog/dialog';
import { dialogUtils } from '$/components/dialog/utils';

export default {
  title: 'Components/Dialog',
};

export const Default = () => {
  const dialogStore = dialogUtils.createDialog();

  return (
    <div>
      <Button onclick={dialogStore.openDialog}>Toggle Dialog</Button>
      <Dialog
        isOpen={dialogStore.isOpen()}
        closeDialog={dialogStore.closeDialog}
        headerElement="Header"
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogStore.closeDialog()}>
              Close
            </Button>
            <Button color={ButtonColor.BRAND} onClick={() => alert('test')}>
              Primary
            </Button>
          </Button.Group>
        }
      >
        This is a dialog
      </Dialog>
    </div>
  );
};

export const CloseOnClickOverlay = () => {
  const dialogStore = dialogUtils.createDialog();

  return (
    <div>
      <Button onclick={dialogStore.openDialog}>Toggle Dialog</Button>
      <Dialog
        isOpen={dialogStore.isOpen()}
        closeDialog={dialogStore.closeDialog}
        headerElement="Header"
        closeOnClickOverlay
        footerElement={
          <Button.Group>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogStore.closeDialog()}>
              Close
            </Button>
            <Button color={ButtonColor.BRAND} onClick={() => alert('test')}>
              Primary
            </Button>
          </Button.Group>
        }
      >
        This is a dialog
      </Dialog>
    </div>
  );
};
