import classnames from 'classnames';
import { type JSX, Show, createSignal, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/input/input.module.css';
import { FormInputValidationState } from '$/stores/form/utils';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  validationState?: FormInputValidationState;
  preItem?: JSX.Element;
  preItemIsInline?: boolean;
  postItem?: JSX.Element;
  inlineItem?: JSX.Element;
  postItemIsClickable?: boolean;
  inputContainerClass?: string;
  includeReadonlyStyles?: false;
};

const Input = (passedProps: InputProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ preItemIsInline: false, includeReadonlyStyles: true }, passedProps),
    [
      'class',
      'validationState',
      'onFocus',
      'onBlur',
      'disabled',
      'readonly',
      'preItem',
      'preItemIsInline',
      'postItem',
      'inlineItem',
      'postItemIsClickable',
      'inputContainerClass',
      'includeReadonlyStyles',
    ],
  );

  const [isInputFocused, setIsInputFocused] = createSignal(false);

  const handleFocus: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (event) => {
    setIsInputFocused(true);

    if (props.onFocus) {
      const eventHandler = props.onFocus as JSX.EventHandler<HTMLInputElement, FocusEvent>;

      eventHandler(event);
    }
  };

  const handleBlur: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (event) => {
    setIsInputFocused(false);

    if (props.onBlur) {
      const eventHandler = props.onBlur as JSX.EventHandler<HTMLInputElement, FocusEvent>;

      eventHandler(event);
    }
  };

  const isFocused = () => isInputFocused() && !props.disabled;

  return (
    <div
      class={classnames(styles.container, {
        [styles.containerDisabled]: props.disabled,
        [styles.containerReadonly]: props.readonly && props.includeReadonlyStyles,
        [styles.containerFocus]: isFocused(),
        [styles.containerInvalid]: props.validationState === FormInputValidationState.INVALID,
        [styles.containerWithPreItem]: !!props.preItem,
        [styles.containerWithInlinePreItem]: props.preItemIsInline,
        [styles.containerWithPostItem]: !!props.postItem,
      })}
    >
      <div class={classnames(styles.inputContainer, props.inputContainerClass)}>
        <Show when={props.preItem}>
          <div
            class={classnames(styles.preItem, {
              [styles.preItemInline]: props.preItemIsInline,
            })}
          >
            {props.preItem}
          </div>
        </Show>
        <div class={styles.inputInnerContainer}>
          <Show when={!!props.inlineItem}>{props.inlineItem}</Show>
          <input
            data-id="input"
            {...restOfProps}
            class={classnames(styles.input, props.class, {
              [styles.errorState]: props.validationState === FormInputValidationState.INVALID,
            })}
            disabled={props.disabled}
            readonly={props.readonly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autocomplete="off"
          />
        </div>
        <Show when={props.postItem}>
          <div
            class={classnames(styles.postItem, {
              [styles.postItemIsClickable]: !!props.postItemIsClickable,
            })}
          >
            {props.postItem}
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Input;
