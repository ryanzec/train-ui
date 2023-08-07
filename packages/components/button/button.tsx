import classnames from 'classnames';
import { JSX, mergeProps, ParentProps, splitProps } from 'solid-js';

import ButtonIcon from '$/components/button/button-icon';
import styles from '$/components/button/button.module.css';
import { ButtonVariant, ButtonIconPosition, ButtonState, ButtonSentiment } from '$/components/button/utils';
import Icon from '$/components/icon';
import { CommonDataAttributes } from '$/types/generic';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>, CommonDataAttributes {
  variant?: ButtonVariant;
  sentiment?: ButtonSentiment;
  state?: ButtonState;
  isLoading?: boolean;
  preIcon?: string;
  postIcon?: string;
  loadingIconPosition?: ButtonIconPosition;
}

export const Button = (passedProps: ParentProps<ButtonProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: ButtonVariant.FILLED,
        sentiment: ButtonSentiment.NEUTRAL,
        state: ButtonState.DEFAULT,
        isLoading: false,
        loadingIconPosition: ButtonIconPosition.PRE,
      },
      passedProps,
    ),
    [
      'children',
      'variant',
      'disabled',
      'class',
      'isLoading',
      'preIcon',
      'postIcon',
      'loadingIconPosition',
      'state',
      'sentiment',
    ],
  );

  const isLoading = () => props.state === ButtonState.IS_LOADING;
  const hasPreIcon = () => props.preIcon || (isLoading() && props.loadingIconPosition === ButtonIconPosition.PRE);

  return (
    <button
      class={classnames(styles.button, props.class, {
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
        [styles.hasPreIcon]: hasPreIcon(),
        [styles.isLoading]: props.isLoading,
      })}
      disabled={props.disabled || props.isLoading}
      data-id="button"
      type="button"
      {...restOfProps}
    >
      <span class={styles.buttonContent}>
        {hasPreIcon() && (
          <ButtonIcon
            class={styles.preIcon}
            position={ButtonIconPosition.PRE}
            isLoading={isLoading()}
            icon={<Icon icon={props.isLoading ? 'refresh' : props.preIcon ?? 'question_mark'} />}
          />
        )}
        <span>{props.children}</span>
        {(props.postIcon || (isLoading() && props.loadingIconPosition === ButtonIconPosition.POST)) && (
          <ButtonIcon
            class={styles.postIcon}
            position={ButtonIconPosition.POST}
            isLoading={isLoading()}
            icon={<Icon icon={props.isLoading ? 'refresh' : props.postIcon ?? 'question_mark'} />}
          />
        )}
      </span>
      <div class={styles.buttonUnderlay} />
    </button>
  );
};

export default Button;
