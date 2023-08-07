import classnames from 'classnames';
import { createSignal, JSX, ParentProps, splitProps } from 'solid-js';

import Icon from '$/components/icon';
import styles from '$/components/radio/radio.module.css';
import { FormInputValidationState } from '$/stores/form/utils';

export interface RadioProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  labelElement: JSX.Element;
  alignEnd?: boolean;
  validationState?: FormInputValidationState;
}

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const Radio = (passedProps: RadioProps) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'labelElement',
    'alignEnd',
    'validationState',
    'onSelect',
  ]);

  // we need to manually track the checked state of the input in order to make sure the toggle slider properly
  // reacts when the checked state of the input changes
  const [isChecked, setIsChecked] = createSignal(restOfProps.checked);

  const onSelect: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    setIsChecked(checked);

    if (props.onSelect) {
      const eventHandler = props.onSelect as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  return (
    <span
      class={classnames(styles.radio, props.class, {
        [styles.alignEnd]: props.alignEnd,
      })}
    >
      <label>
        <input data-id="radio" {...restOfProps} type="radio" onChange={onSelect} />
        <Icon
          class={classnames(styles.icon, { [styles.iconIsChecked]: isChecked() })}
          icon={isChecked() ? 'radio_button_checked' : 'radio_button_unchecked'}
        />
        <span class={styles.label}>{props.labelElement}</span>
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Radio;
