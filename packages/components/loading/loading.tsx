import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import Icon, { IconSentiment, IconSize } from '$/components/icon';
import styles from '$/components/loading/loading.module.css';

export interface LoadingProps extends JSX.HTMLAttributes<HTMLDivElement> {
  iconSize?: IconSize;
}

// @todo get a design for how the application should look while the application is doing the
// @todo initial load (for authentication data, feature flags, etc.) and implement it here
const Loading = (passedProps: LoadingProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ iconSize: IconSize.BASE }, passedProps), ['class', 'iconSize']);

  return (
    <div class={classnames(props.class, styles.loading)} {...restOfProps}>
      <Icon icon="refresh" size={props.iconSize} class={styles.icon} sentiment={IconSentiment.NEUTRAL} />
    </div>
  );
};

export default Loading;
