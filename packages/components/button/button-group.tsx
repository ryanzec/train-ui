import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement>;

const ButtonGroup = (passedProps: ButtonGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="button-group" class={classnames(styles.buttonGroup, props.class)} {...restOfProps} />;
};

export default ButtonGroup;
