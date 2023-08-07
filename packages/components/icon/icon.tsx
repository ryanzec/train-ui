import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/icon/icon.module.css';
import { IconSize, IconVariant } from '$/components/icon/utils';

export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  variant?: IconVariant;
  size?: IconSize;
}

const Icon = (passedProps: IconProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ variant: IconVariant.OUTLINED, size: IconSize }, passedProps), [
    'class',
    'icon',
    'variant',
    'size',
  ]);

  return (
    <span
      class={classnames(styles.icon, props.class, {
        ['material-icons']: props.variant === IconVariant.FILLED,
        [`material-icons-${props.variant}`]: props.variant !== IconVariant.FILLED,
        [styles.small1]: props.size === IconSize.SMALL1,
        [styles.large1]: props.size === IconSize.LARGE1,
        [styles.large2]: props.size === IconSize.LARGE2,
        [styles.large3]: props.size === IconSize.LARGE3,
      })}
      {...restOfProps}
    >
      {props.icon}
    </span>
  );
};

export default Icon;
