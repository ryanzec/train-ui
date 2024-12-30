import classnames from 'classnames';
import type { ParentProps } from 'solid-js';

import styles from '$/components/overlay/overlay.module.css';

const OverlayContentLocal = (props: ParentProps) => {
  return <div class={classnames(styles.content, styles.contentLocal)} {...props} />;
};

export default OverlayContentLocal;
