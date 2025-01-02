import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';
import { ButtonColor, ButtonVariant } from '$/components/button/utils';
import Icon from '$/components/icon';
import type { CommonDataAttributes } from '$/types/generic';

export type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    variant?: ButtonVariant;
    color?: ButtonColor;
    isLoading?: boolean;
    icon: string;
  };

const IconButton = (passedProps: IconButtonProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: ButtonVariant.TEXT,
        isLoading: false,
        color: ButtonColor.NEUTRAL,
      },
      passedProps,
    ),
    ['variant', 'color', 'isLoading', 'icon', 'class', 'disabled'],
  );
  const dataId = () => {
    return `icon-button${props.isLoading ? ' loading' : ''}`;
  };

  return (
    <button
      data-id={dataId()}
      class={classnames(styles.iconButton, styles.button, props.class, {
        [styles.filled]: props.variant === ButtonVariant.FILLED,
        [styles.weak]: props.variant === ButtonVariant.WEAK,
        [styles.outlined]: props.variant === ButtonVariant.OUTLINED,
        [styles.text]: props.variant === ButtonVariant.TEXT,
        [styles.ghost]: props.variant === ButtonVariant.GHOST,
        [styles.neutral]: props.color === ButtonColor.NEUTRAL,
        [styles.brand]: props.color === ButtonColor.BRAND,
        [styles.success]: props.color === ButtonColor.SUCCESS,
        [styles.info]: props.color === ButtonColor.INFO,
        [styles.warning]: props.color === ButtonColor.WARNING,
        [styles.danger]: props.color === ButtonColor.DANGER,
        [styles.isLoading]: props.isLoading,
      })}
      {...restOfProps}
      disabled={props.disabled || props.isLoading}
    >
      <span class={styles.buttonContent}>
        <Icon class={styles.icon} icon={props.isLoading ? 'refresh' : props.icon} />
      </span>
      <div class={styles.buttonUnderlay} />
    </button>
  );
};

export default IconButton;
