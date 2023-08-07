import Button, { ButtonVariant, ButtonSentiment } from '$/components/button';
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
          <div>
            <Button sentiment={ButtonSentiment.BRAND} onClick={() => alert('test')}>
              Primary
            </Button>
            <Button variant={ButtonVariant.GHOST} onClick={() => dialogStore.closeDialog()}>
              Close
            </Button>
          </div>
        }
      >
        This is a dialog
      </Dialog>
    </div>
  );
};
