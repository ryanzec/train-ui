import classnames from 'classnames';
import { type JSX, type ParentProps, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/badge/badge.module.css';
import { BadgeSentiment, BadgeShape, BadgeSize, BadgeStrength } from '$/components/badge/utils';
import Icon from '$/components/icon';

export type BadgeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  sentiment?: BadgeSentiment;
  strength?: BadgeStrength;
  shape?: BadgeShape;
  size?: BadgeSize;
  preIcon?: string;
  postIcon?: string;
};

const Badge = (passedProps: ParentProps<BadgeProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        sentiment: BadgeSentiment.BRAND,
        strength: BadgeStrength.WEAK,
        shape: BadgeShape.ROUNDED,
        size: BadgeSize.SMALL,
      },
      passedProps,
    ),
    ['sentiment', 'strength', 'shape', 'size', 'class', 'children', 'preIcon', 'postIcon'],
  );
  const isStrong = props.strength === BadgeStrength.STRONG;

  return (
    <div
      class={classnames(props.class, styles.badge, {
        [styles.badgeSmall]: props.size === BadgeSize.SMALL,
        [styles.badgePill]: props.shape === BadgeShape.PILL,
        [styles.neutral]: props.sentiment === BadgeSentiment.NEUTRAL,
        [styles.neutralStrong]: props.sentiment === BadgeSentiment.NEUTRAL && isStrong,
        [styles.brand]: props.sentiment === BadgeSentiment.BRAND,
        [styles.brandStrong]: props.sentiment === BadgeSentiment.BRAND && isStrong,
        [styles.success]: props.sentiment === BadgeSentiment.SUCCESS,
        [styles.successStrong]: props.sentiment === BadgeSentiment.SUCCESS && isStrong,
        [styles.info]: props.sentiment === BadgeSentiment.INFO,
        [styles.infoStrong]: props.sentiment === BadgeSentiment.INFO && isStrong,
        [styles.warning]: props.sentiment === BadgeSentiment.WARNING,
        [styles.warningStrong]: props.sentiment === BadgeSentiment.WARNING && isStrong,
        [styles.danger]: props.sentiment === BadgeSentiment.DANGER,
        [styles.dangerStrong]: props.sentiment === BadgeSentiment.DANGER && isStrong,
      })}
      {...restOfProps}
    >
      {props.preIcon && (
        <Icon
          icon={props.preIcon}
          class={classnames(styles.icon, styles.preIcon, {
            [styles.iconSmall]: props.size === BadgeSize.SMALL,
          })}
        >
          {props.preIcon}
        </Icon>
      )}
      {props.children}
      {props.postIcon && (
        <Icon
          icon={props.postIcon}
          class={classnames(styles.icon, styles.postIcon, {
            [styles.iconSmall]: props.size === BadgeSize.SMALL,
          })}
        >
          {props.postIcon}
        </Icon>
      )}
    </div>
  );
};

export default Badge;
