import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/peek/peek.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type PeekFooterProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PeekFooter = (passedProps: PeekFooterProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div data-id="footer" class={classnames(styles.peekFooter, props.class)} {...restOfProps}>
      {props.children}
    </div>
  );
};

export default PeekFooter;
