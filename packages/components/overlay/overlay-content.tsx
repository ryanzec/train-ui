import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from '$/components/overlay/overlay.module.css';

const OverlayContent = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Portal>
      <div data-id="overlay-content" {...props} class={styles.content} />
    </Portal>
  );
};

export default OverlayContent;
