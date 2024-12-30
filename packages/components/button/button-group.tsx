import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isAttached?: boolean;
};

const ButtonGroup = (passedProps: ButtonGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'isAttached']);

  return (
    <div
      data-id="button-group"
      class={classnames(styles.buttonGroup, props.class, {
        [styles.buttonGroupAttached]: props.isAttached,
      })}
      {...restOfProps}
    />
  );
};

export default ButtonGroup;
