import type { ParentProps } from 'solid-js';

import styles from '$sandbox/components/sandbox-examples-container/sandbox-examples-container.module.css';

const ExpandableCode = (props: ParentProps<object>) => {
  return <div class={styles.container}>{props.children}</div>;
};

export default ExpandableCode;
