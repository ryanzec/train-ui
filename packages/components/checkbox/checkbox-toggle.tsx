import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/checkbox/checkbox.module.css';

export type CheckboxToggleProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  labelElement: JSX.Element;
  alignEnd?: boolean;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxToggle = (passedProps: CheckboxToggleProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'labelElement', 'alignEnd', 'onChange']);

  return (
    <label class={classnames(styles.toggleContainer)}>
      <input
        data-id="checkbox-toggle"
        {...restOfProps}
        type="checkbox"
        // onChange={handleChange}
        class={classnames(styles.toggle, props.class)}
      />
      {props.labelElement}
    </label>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxToggle;
