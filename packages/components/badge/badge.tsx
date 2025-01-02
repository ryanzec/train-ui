import classnames from 'classnames';
import { type JSX, type ParentProps, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/badge/badge.module.css';
import { BadgeColor, BadgeShape, BadgeSize, BadgeVariant } from '$/components/badge/utils';
import Icon from '$/components/icon';

export type BadgeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: BadgeColor;
  variant?: BadgeVariant;
  shape?: BadgeShape;
  size?: BadgeSize;
  preIcon?: string;
  postIcon?: string;
};

const Badge = (passedProps: ParentProps<BadgeProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        color: BadgeColor.BRAND,
        variant: BadgeVariant.WEAK,
        shape: BadgeShape.ROUNDED,
        size: BadgeSize.SMALL,
      },
      passedProps,
    ),
    ['color', 'variant', 'shape', 'size', 'class', 'children', 'preIcon', 'postIcon'],
  );
  const isStrong = props.variant === BadgeVariant.STRONG;

  return (
    <div
      class={classnames(props.class, styles.badge, {
        [styles.badgeSmall]: props.size === BadgeSize.SMALL,
        [styles.badgePill]: props.shape === BadgeShape.PILL,
        [styles.neutral]: props.color === BadgeColor.NEUTRAL,
        [styles.neutralStrong]: props.color === BadgeColor.NEUTRAL && isStrong,
        [styles.brand]: props.color === BadgeColor.BRAND,
        [styles.brandStrong]: props.color === BadgeColor.BRAND && isStrong,
        [styles.success]: props.color === BadgeColor.SUCCESS,
        [styles.successStrong]: props.color === BadgeColor.SUCCESS && isStrong,
        [styles.info]: props.color === BadgeColor.INFO,
        [styles.infoStrong]: props.color === BadgeColor.INFO && isStrong,
        [styles.warning]: props.color === BadgeColor.WARNING,
        [styles.warningStrong]: props.color === BadgeColor.WARNING && isStrong,
        [styles.danger]: props.color === BadgeColor.DANGER,
        [styles.dangerStrong]: props.color === BadgeColor.DANGER && isStrong,
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
