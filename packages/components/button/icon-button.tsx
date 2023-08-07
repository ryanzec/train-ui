import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';
import { ButtonSentiment, ButtonVariant } from '$/components/button/utils';
import Icon from '$/components/icon';
import { CommonDataAttributes } from '$/types/generic';

export interface IconButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>, CommonDataAttributes {
  variant?: ButtonVariant;
  sentiment?: ButtonSentiment;
  isLoading?: boolean;
  icon: string;
}

const IconButton = (passedProps: IconButtonProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ variant: ButtonVariant.TEXT, isLoading: false, sentiment: ButtonSentiment.NEUTRAL }, passedProps),
    ['variant', 'sentiment', 'isLoading', 'icon', 'class', 'disabled'],
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
        [styles.neutral]: props.sentiment === ButtonSentiment.NEUTRAL,
        [styles.brand]: props.sentiment === ButtonSentiment.BRAND,
        [styles.success]: props.sentiment === ButtonSentiment.SUCCESS,
        [styles.info]: props.sentiment === ButtonSentiment.INFO,
        [styles.warning]: props.sentiment === ButtonSentiment.WARNING,
        [styles.danger]: props.sentiment === ButtonSentiment.DANGER,
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
