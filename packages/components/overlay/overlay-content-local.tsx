import classnames from 'classnames';
import type { JSX } from 'solid-js';

import styles from '$/components/overlay/overlay.module.css';

const OverlayContentLocal = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  return <div data-id="overlay-content-local" {...props} class={classnames(styles.content, styles.contentLocal)} />;
};

export default OverlayContentLocal;
