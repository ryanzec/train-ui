import classnames from 'classnames';
import { type JSX, type ParentProps, splitProps } from 'solid-js';

import styles from '$/components/checkbox/checkbox.module.css';
import type { FormInputValidationState } from '$/stores/form/utils';

export interface CheckboxGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  validationState?: FormInputValidationState;
}

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxGroup = (passedProps: ParentProps<CheckboxGroupProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children', 'validationState']);

  return (
    <div data-id="checkbox-group" class={classnames(styles.group, props.class)} {...restOfProps}>
      {props.children}
    </div>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxGroup;
