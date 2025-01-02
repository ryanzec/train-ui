import classnames from 'classnames';
import { type JSX, type ParentProps, Show, mergeProps, onCleanup, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import Button, { ButtonColor, ButtonVariant } from '$/components/button';
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
};

const Dialog = (passedProps: ParentProps<DialogProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ footerAlignment: DialogFooterAlignment.RIGHT, closeOnClickOverlay: false }, passedProps),
    [
      'children',
      'class',
      'isOpen',
      'closeDialog',
      'headerElement',
      'footerElement',
      'footerAlignment',
      'closeOnClickOverlay',
    ],
  );
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

  const handleClickOverlay = () => {
    if (props.closeOnClickOverlay === false) {
      return;
    }

    props.closeDialog();
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div ref={modalRef} class={classnames(styles.dialog, props.class)} {...restOfProps}>
          <div class={styles.dialogHeader}>
            {props.headerElement}
            <Button
              variant={ButtonVariant.TEXT}
              color={ButtonColor.NEUTRAL}
              class={styles.closeHeaderTrigger}
              onclick={() => props.closeDialog()}
              preItem={<Icon icon="close" />}
            />
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
