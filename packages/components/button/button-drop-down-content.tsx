import { type JSX, type ParentProps, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';

export type ButtonDropDownContentProps = JSX.HTMLAttributes<HTMLDivElement>;

const ButtonDropDownContent = (passedProps: ParentProps<ButtonDropDownContentProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div {...restOfProps} class={styles.dropDownContent}>
      {props.children}
    </div>
  );
};

export default ButtonDropDownContent;
