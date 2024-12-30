import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/icon/icon.module.css';
import { IconSentiment, IconSize, IconVariant } from '$/components/icon/utils';

export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  variant?: IconVariant;
  size?: IconSize;
  sentiment?: IconSentiment;
}

const Icon = (passedProps: IconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: IconVariant.OUTLINED,
        size: IconSize,
        sentiment: IconSentiment.NONE,
      },
      passedProps,
    ),
    ['class', 'icon', 'variant', 'size', 'sentiment'],
  );

  return (
    <span
      class={classnames(styles.icon, props.class, {
        'material-icons': props.variant === IconVariant.FILLED,
        [`material-icons-${props.variant}`]: props.variant !== IconVariant.FILLED,
        [styles.small2]: props.size === IconSize.SMALL2,
        [styles.small1]: props.size === IconSize.SMALL1,
        [styles.large1]: props.size === IconSize.LARGE1,
        [styles.large2]: props.size === IconSize.LARGE2,
        [styles.large3]: props.size === IconSize.LARGE3,
        [styles.neutral]: props.sentiment === IconSentiment.NEUTRAL,
        [styles.brand]: props.sentiment === IconSentiment.BRAND,
        [styles.success]: props.sentiment === IconSentiment.SUCCESS,
        [styles.info]: props.sentiment === IconSentiment.INFO,
        [styles.warning]: props.sentiment === IconSentiment.WARNING,
        [styles.danger]: props.sentiment === IconSentiment.DANGER,
        [styles.inherit]: props.sentiment === IconSentiment.INHERIT,
      })}
      {...restOfProps}
    >
      {props.icon}
    </span>
  );
};

export default Icon;
