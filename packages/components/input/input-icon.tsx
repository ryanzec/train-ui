import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/input/input.module.css';

export type InputIconProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  icon: JSX.Element;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form
// directly (like the auto complete component)
const InputIcon = (props: InputIconProps) => {
  const [local, restOfProps] = splitProps(props, ['icon', 'class']);

  return (
    <span data-id="input-icon" {...restOfProps} class={classnames(local.class, styles.icon)}>
      {local.icon}
    </span>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default InputIcon;
