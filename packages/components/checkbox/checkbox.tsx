import classnames from 'classnames';
import { type JSX, Show, createSignal, splitProps } from 'solid-js';

import styles from '$/components/checkbox/checkbox.module.css';
import Icon from '$/components/icon';
import type { IconName } from '$/components/icon/utils';
import type { FormInputValidationState } from '$/stores/form/utils';

export type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  labelElement?: JSX.Element;
  alignEnd?: boolean;
};

enum CheckedState {
  UNCHECKED = 'unchecked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate',
}

const getCheckedStateIcon = (state: CheckedState): IconName => {
  if (state === CheckedState.UNCHECKED) {
    return 'square';
  }

  if (state === CheckedState.CHECKED) {
    return 'square-check';
  }

  return 'square-minus';
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const Checkbox = (passedProps: CheckboxProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'labelElement', 'alignEnd', 'onChange']);

  // we need to manually track the checked state of the input in order to make sure the toggle slider properly
  // reacts when the checked state of the input changes
  const [checkedState, setCheckedState] = createSignal<CheckedState>(CheckedState.UNCHECKED);

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const checkedState = checked ? CheckedState.CHECKED : CheckedState.UNCHECKED;

    setCheckedState(target.indeterminate ? CheckedState.INDETERMINATE : checkedState);

    if (props.onChange) {
      const eventHandler = props.onChange as JSX.EventHandler<HTMLInputElement, Event>;

      eventHandler(event);
    }
  };

  return (
    <span
      class={classnames(styles.checkbox, props.class, {
        [styles.alignEnd]: props.alignEnd,
      })}
    >
      <label>
        <input data-id="checkbox" {...restOfProps} type="checkbox" onChange={handleChange} />
        <Icon class={classnames(styles.icon)} icon={getCheckedStateIcon(checkedState())} />
        <Show when={props.labelElement}>
          <span class={styles.label}>{props.labelElement}</span>
        </Show>
      </label>
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Checkbox;
