import classnames from 'classnames';
import { mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from '$/components/overlay/overlay.module.css';
import { defaultOverlayProps, OverlayProps, OverlayStrength } from '$/components/overlay/utils';

const Overlay = (passedProps: OverlayProps) => {
  const props = mergeProps(defaultOverlayProps, passedProps);

  return (
    <Portal>
      <div
        class={classnames(styles.overlay, {
          [styles.strong]: props.strength === OverlayStrength.STRONG,
          [styles.weak]: props.strength === OverlayStrength.WEAK,
        })}
      />
    </Portal>
  );
};

export default Overlay;
