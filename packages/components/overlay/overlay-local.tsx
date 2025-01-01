import classnames from 'classnames';
import { mergeProps, splitProps } from 'solid-js';

import styles from '$/components/overlay/overlay.module.css';
import { type OverlayProps, OverlayStrength, defaultOverlayProps } from '$/components/overlay/utils';

const OverlayLocal = (passedProps: OverlayProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultOverlayProps, passedProps), ['class', 'strength']);

  return (
    <button
      type="button"
      class={classnames(styles.overlay, styles.overlayLocal, props.class, {
        [styles.strong]: props.strength === OverlayStrength.STRONG,
        [styles.weak]: props.strength === OverlayStrength.WEAK,
      })}
      {...restOfProps}
    />
  );
};

export default OverlayLocal;
