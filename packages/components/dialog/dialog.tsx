import classnames from 'classnames';
import { type JSX, Show, mergeProps, onCleanup, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import Button, { ButtonColor, ButtonShape, ButtonVariant } from '$/components/button';
import styles from '$/components/dialog/dialog.module.css';
import { DialogFooterAlignment } from '$/components/dialog/utils';
import Icon from '$/components/icon';
import Overlay from '$/components/overlay';
import { Key } from '$/types/generic';

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  closeDialog: () => void;
  headerElement?: JSX.Element;
  footerElement?: JSX.Element;
  footerAlignment?: DialogFooterAlignment;
  closeOnClickOverlay?: boolean;
  closeOnEscape?: boolean;
  closeEnabled?: boolean;
};

export const defaultDialogProps: Partial<DialogProps> = {
  footerAlignment: DialogFooterAlignment.RIGHT,
  closeOnClickOverlay: false,
  closeOnEscape: true,
  closeEnabled: true,
};

const Dialog = (passedProps: DialogProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultDialogProps, passedProps), [
    'children',
    'class',
    'isOpen',
    'closeDialog',
    'headerElement',
    'footerElement',
    'footerAlignment',
    'closeOnClickOverlay',
    'closeOnEscape',
    'closeEnabled',
  ]);
  const dialogRef = () => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (props.closeEnabled === false || props.closeOnEscape === false || event.key === Key.ESCAPE) {
        return;
      }

      props.closeDialog();
    };

    document.addEventListener('keydown', keyDownListener);

    onCleanup(() => {
      document.removeEventListener('keydown', keyDownListener);
    });
  };

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    props.closeDialog();
  };

  const handleCloseDialog = () => {
    if (props.closeEnabled === false) {
      return;
    }

    props.closeDialog();
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div ref={dialogRef} data-id="dialog" {...restOfProps} class={classnames(styles.dialog, props.class)}>
          <div class={styles.dialogHeader}>
            {props.headerElement}
            <Button
              variant={ButtonVariant.GHOST}
              color={ButtonColor.NEUTRAL}
              class={styles.closeHeaderTrigger}
              onclick={handleCloseDialog}
              shape={ButtonShape.CIRCLE}
            >
              <Icon icon="x" />
            </Button>
          </div>
          <div class={styles.dialogContent}>{props.children}</div>
          <Show when={props.footerElement}>
            <div
              class={classnames(styles.dialogFooter, {
                [styles.dialogFooterRightAligned]: props.footerAlignment,
              })}
            >
              {props.footerElement}
            </div>
          </Show>
        </div>
      </Portal>
      <Overlay onClick={handleClickOverlay} />
    </Show>
  );
};

export default Dialog;
