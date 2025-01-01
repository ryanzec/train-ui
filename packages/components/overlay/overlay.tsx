import classnames from 'classnames';
import { mergeProps, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from '$/components/overlay/overlay.module.css';
import { type OverlayProps, OverlayStrength, defaultOverlayProps } from '$/components/overlay/utils';

const Overlay = (passedProps: OverlayProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultOverlayProps, passedProps), ['class', 'strength']);

  return (
    <Portal>
      <button
        type="button"
        class={classnames(styles.overlay, props.class, {
          [styles.strong]: props.strength === OverlayStrength.STRONG,
          [styles.weak]: props.strength === OverlayStrength.WEAK,
        })}
        {...restOfProps}
      />
    </Portal>
  );
};

export default Overlay;
