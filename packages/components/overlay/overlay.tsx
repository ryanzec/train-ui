import classnames from 'classnames';
import { mergeProps, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from '$/components/overlay/overlay.module.css';
import { type OverlayProps, OverlayVariant, defaultOverlayProps } from '$/components/overlay/utils';

const Overlay = (passedProps: OverlayProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultOverlayProps, passedProps), ['class', 'variant']);

  return (
    <Portal>
      <button
        type="button"
        class={classnames(styles.overlay, props.class, {
          [styles.strong]: props.variant === OverlayVariant.STRONG,
          [styles.weak]: props.variant === OverlayVariant.WEAK,
        })}
        {...restOfProps}
      />
    </Portal>
  );
};

export default Overlay;
