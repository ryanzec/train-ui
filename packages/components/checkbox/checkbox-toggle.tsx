import classnames from 'classnames';
import { type JSX, createSignal, splitProps } from 'solid-js';

import styles from '$/components/checkbox/checkbox.module.css';
import type { FormInputValidationState } from '$/stores/form/utils';

export interface CheckboxToggleProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  labelElement: JSX.Element;
  alignEnd?: boolean;
  validationState?: FormInputValidationState;
}

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxToggle = (passedProps: CheckboxToggleProps) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'validationState',
    'onChange',
  ]);

  // we need to manually track the checked state of the input in order to make sure the toggle slider properly
  // reacts when the checked state of the input changes
  const [isChecked, setIsChecked] = createSignal(restOfProps.checked);
  let inputRef: HTMLInputElement | undefined;

  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    setIsChecked(checked);

    if (props.onChange) {
      const eventHandler = props.onChange as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  return (
    <span class={classnames(styles.checkbox, styles.checkboxToggle, props.class)}>
      <label>
        <input ref={inputRef} data-id="checkbox-toggle" {...restOfProps} type="checkbox" onChange={onChange} />
        <div
          class={classnames(styles.checkboxToggleSlider, {
            [styles.checkboxToggleOn]: isChecked(),
          })}
        >
          <div class={styles.checkboxToggleBar} />
          <div class={styles.checkboxToggleKnob} />
        </div>
        {props.labelElement}
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxToggle;
