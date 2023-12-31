import classnames from 'classnames';
import { JSX, mergeProps, onCleanup, ParentProps, Show, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import Button, { ButtonVariant } from '$/components/button';
import styles from '$/components/dialog/dialog.module.css';
import { DialogFooterAlignment } from '$/components/dialog/utils';
import Icon from '$/components/icon';
import Overlay from '$/components/overlay';
import { Key } from '$/types/generic';

export interface DialogProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  closeDialog: () => void;
  headerElement?: JSX.Element;
  footerElement?: JSX.Element;
  footerAlignment?: DialogFooterAlignment;
}

const Dialog = (passedProps: ParentProps<DialogProps>) => {
  const [props, restOfProps] = splitProps(mergeProps({ footerAlignment: DialogFooterAlignment.RIGHT }, passedProps), [
    'children',
    'class',
    'isOpen',
    'closeDialog',
    'headerElement',
    'footerElement',
    'footerAlignment',
  ]);
  const modalRef = () => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === Key.ESCAPE) {
        props.closeDialog();
      }
    };

    document.addEventListener('keydown', keyDownListener);

    onCleanup(() => {
      document.removeEventListener('keydown', keyDownListener);
    });
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div ref={modalRef} class={classnames(styles.dialog, props.class)} {...restOfProps}>
          <div class={styles.dialogHeader}>
            {props.headerElement}
            <Button
              variant={ButtonVariant.TEXT}
              class={styles.closeHeaderTrigger}
              onclick={() => props.closeDialog()}
              preItem={<Icon icon="close" />}
            />
          </div>
          <div class={styles.dialogContent}>{props.children}</div>
          <Show when={props.footerElement}>
            <div class={classnames(styles.dialogFooter, { [styles.dialogFooterRightAligned]: props.footerAlignment })}>
              {props.footerElement}
            </div>
          </Show>
        </div>
      </Portal>
      <Overlay />
    </Show>
  );
};

export default Dialog;
