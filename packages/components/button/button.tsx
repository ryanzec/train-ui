import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import ButtonPrePostItem from '$/components/button/button-pre-post-item';
import styles from '$/components/button/button.module.css';
import { ButtonColor, ButtonItemPosition, ButtonShape, ButtonState, ButtonVariant } from '$/components/button/utils';
import Icon from '$/components/icon';
import type { CommonDataAttributes } from '$/types/generic';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    variant?: ButtonVariant;
    color?: ButtonColor;
    state?: ButtonState;
    shape?: ButtonShape;
    preItem?: JSX.Element;
    postItem?: JSX.Element;
    loadingIconPosition?: ButtonItemPosition;
  };

export const Button = (passedProps: ButtonProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: ButtonVariant.FILLED,
        color: ButtonColor.BRAND,
        state: ButtonState.DEFAULT,
        shape: ButtonShape.ROUNDED,
        loadingIconPosition: ButtonItemPosition.PRE,
      },
      passedProps,
    ),
    [
      'children',
      'variant',
      'disabled',
      'class',
      'preItem',
      'postItem',
      'loadingIconPosition',
      'state',
      'color',
      'shape',
    ],
  );

  const isLoading = () => props.state === ButtonState.IS_LOADING;
  const hasPreItem = () => props.preItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.PRE);
  const hasPostItem = () => props.postItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.POST);

  return (
    <button
      data-id="button"
      type="button"
      {...restOfProps}
      class={classnames(styles.button, props.class, {
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
        [styles.isLoading]: isLoading(),
        [styles.circle]: props.shape === ButtonShape.CIRCLE,
      })}
      disabled={props.disabled || isLoading()}
    >
      <span class={styles.buttonContent}>
        {isLoading() && (
          <ButtonPrePostItem
            class={styles.preIcon}
            position={ButtonItemPosition.PRE}
            item={<Icon icon="refresh" class={styles.iconIsLoading} />}
          />
        )}
        {!isLoading() && hasPreItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.PRE} item={props.preItem} />
        )}
        <span class={styles.buttonMainContent}>{props.children}</span>
        {!isLoading() && hasPostItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.POST} item={props.postItem} />
        )}
      </span>
    </button>
  );
};

export default Button;
