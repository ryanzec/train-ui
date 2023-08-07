import classnames from 'classnames';
import { mergeProps } from 'solid-js';

import styles from '$/components/overlay/overlay.module.css';
import { defaultOverlayProps, OverlayProps, OverlayStrength } from '$/components/overlay/utils';

const OverlayLocal = (passedProps: OverlayProps) => {
  const props = mergeProps(defaultOverlayProps, passedProps);

  return (
    <div
      class={classnames(styles.overlay, styles.overlayLocal, {
        [styles.strong]: props.strength === OverlayStrength.STRONG,
        [styles.weak]: props.strength === OverlayStrength.WEAK,
      })}
    />
  );
};

export default OverlayLocal;
