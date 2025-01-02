import type { ParentProps } from 'solid-js';

import styles from '$sandbox/components/sandbox-examples-container/sandbox-examples-container.module.css';
import classnames from 'classnames';

const ExpandableCode = (props: ParentProps<{ asRow?: boolean }>) => {
  return (
    <div
      class={classnames(styles.container, {
        [styles.row]: props.asRow,
      })}
    >
      {props.children}
    </div>
  );
};

export default ExpandableCode;
