import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import Icon from '$/components/icon';
import styles from '$/components/loading/loading.module.css';

export type LoadingProps = JSX.HTMLAttributes<HTMLDivElement>;

// @todo get a design for how the application should look while the application is doing the
// @todo initial load (for authentication data, feature flags, etc.) and implement it here
const Loading = (passedProps: LoadingProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return (
    <div class={classnames(props.class, styles.loading)} {...restOfProps}>
      <Icon icon="refresh" class={styles.icon} />
    </div>
  );
};

export default Loading;
