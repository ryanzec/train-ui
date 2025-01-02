import classnames from 'classnames';
import { type JSX, type ParentProps, mergeProps, splitProps } from 'solid-js';

import ButtonPrePostItem from '$/components/button/button-icon';
import styles from '$/components/button/button.module.css';
import { ButtonColor, ButtonIconPosition, ButtonState, ButtonVariant } from '$/components/button/utils';
import Icon from '$/components/icon';
import type { CommonDataAttributes } from '$/types/generic';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    variant?: ButtonVariant;
    color?: ButtonColor;
    state?: ButtonState;
    preItem?: JSX.Element;
    postItem?: JSX.Element;
    loadingIconPosition?: ButtonIconPosition;
  };

export const Button = (passedProps: ParentProps<ButtonProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: ButtonVariant.FILLED,
        color: ButtonColor.BRAND,
        state: ButtonState.DEFAULT,
        loadingIconPosition: ButtonIconPosition.PRE,
      },
      passedProps,
    ),
    ['children', 'variant', 'disabled', 'class', 'preItem', 'postItem', 'loadingIconPosition', 'state', 'color'],
  );

  const isLoading = () => props.state === ButtonState.IS_LOADING;
  const hasPreItem = () => props.preItem || (isLoading() && props.loadingIconPosition === ButtonIconPosition.PRE);
  const hasPostItem = () => props.postItem || (isLoading() && props.loadingIconPosition === ButtonIconPosition.POST);

  return (
    <button
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
      })}
      disabled={props.disabled || isLoading()}
      data-id="button"
      type="button"
      {...restOfProps}
    >
      <span class={styles.buttonContent}>
        {isLoading() && (
          <ButtonPrePostItem
            class={styles.preIcon}
            position={ButtonIconPosition.PRE}
            item={<Icon icon="refresh" class={styles.iconIsLoading} />}
            isIconOnly={!props.children}
          />
        )}
        {!isLoading() && hasPreItem() && (
          <ButtonPrePostItem
            class={styles.preIcon}
            position={ButtonIconPosition.PRE}
            item={props.preItem}
            isIconOnly={!props.children}
          />
        )}
        <span>{props.children}</span>
        {!isLoading() && hasPostItem() && (
          <ButtonPrePostItem
            class={styles.preIcon}
            position={ButtonIconPosition.POST}
            item={props.postItem}
            isIconOnly={!props.children}
          />
        )}
      </span>
    </button>
  );
};

export default Button;
