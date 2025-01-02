import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/icon/icon.module.css';
import { IconColor, IconSize, IconVariant } from '$/components/icon/utils';

export type IconProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  icon: string;
  variant?: IconVariant;
  size?: IconSize;
  color?: IconColor;
};

const Icon = (passedProps: IconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: IconVariant.OUTLINED,
        size: IconSize,
        color: IconColor.NONE,
      },
      passedProps,
    ),
    ['class', 'icon', 'variant', 'size', 'color'],
  );

  return (
    <span
      class={classnames(styles.icon, props.class, {
        'material-icons': props.variant === IconVariant.FILLED,
        [`material-icons-${props.variant}`]: props.variant !== IconVariant.FILLED,
        [styles.extra_small]: props.size === IconSize.EXTRA_SMALL,
        [styles.small]: props.size === IconSize.SMALL,
        [styles.large]: props.size === IconSize.LARGE,
        [styles.extra_large]: props.size === IconSize.EXTRA_LARGE,
        [styles.extra_large2]: props.size === IconSize.EXTRA_LARGE2,
        [styles.neutral]: props.color === IconColor.NEUTRAL,
        [styles.brand]: props.color === IconColor.BRAND,
        [styles.success]: props.color === IconColor.SUCCESS,
        [styles.info]: props.color === IconColor.INFO,
        [styles.warning]: props.color === IconColor.WARNING,
        [styles.danger]: props.color === IconColor.DANGER,
        [styles.inherit]: props.color === IconColor.INHERIT,
      })}
      {...restOfProps}
    >
      {props.icon}
    </span>
  );
};

export default Icon;
