import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import ButtonPrePostItem from '$/components/button/button-pre-post-item';
import styles from '$/components/button/button.module.css';
import {
  ButtonColor,
  ButtonItemPosition,
  ButtonShape,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '$/components/button/utils';
import Icon, { IconSize } from '$/components/icon';
import type { IconName } from '$/components/icon/utils';
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
    size?: ButtonSize;
    icon?: IconName;
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
        size: ButtonSize.BASE,
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
      'size',
      'icon',
    ],
  );

  const isLoading = () => props.state === ButtonState.IS_LOADING;
  const hasPreItem = () => props.preItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.PRE);
  const hasPostItem = () => props.postItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.POST);
  const getIconSize = () => (props.size === ButtonSize.SMALL ? IconSize.EXTRA_SMALL2 : undefined);

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
        [styles.small]: props.size === ButtonSize.SMALL,
      })}
      disabled={props.disabled || isLoading()}
    >
      <span class={styles.buttonContent}>
        {isLoading() && (
          <ButtonPrePostItem
            class={styles.preIcon}
            position={ButtonItemPosition.PRE}
            item={<Icon icon="loader" class={styles.iconIsLoading} size={getIconSize()} />}
          />
        )}
        {!isLoading() && hasPreItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.PRE} item={props.preItem} />
        )}
        <span class={styles.buttonMainContent}>
          <Show when={!props.icon} fallback={<Icon icon={props.icon!} size={getIconSize()} />}>
            {props.children}
          </Show>
        </span>
        {!isLoading() && hasPostItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.POST} item={props.postItem} />
        )}
      </span>
    </button>
  );
};

export default Button;
