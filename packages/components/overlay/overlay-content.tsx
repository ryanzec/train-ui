import type { ParentProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from '$/components/overlay/overlay.module.css';

const OverlayContent = (props: ParentProps) => {
  return (
    <Portal>
      <div class={styles.content} {...props} />
    </Portal>
  );
};

export default OverlayContent;
