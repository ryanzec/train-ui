import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import Button, { ButtonColor, ButtonShape, ButtonVariant } from '$/components/button';
import Icon from '$/components/icon';
import styles from '$/components/peek/peek.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type PeekHeaderProps = JSX.HTMLAttributes<HTMLHeadingElement> &
  CommonDataAttributes & {
    title: string;
  };

const PeekHeader = (passedProps: PeekHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'title']);

  return (
    <h2 data-id="header" {...restOfProps} class={classnames(styles.peekHeader, props.class)}>
      {props.title}
      <Button
        variant={ButtonVariant.GHOST}
        color={ButtonColor.NEUTRAL}
        aria-label="close"
        data-peek-close="true"
        shape={ButtonShape.CIRCLE}
      >
        <Icon icon="x" />
      </Button>
    </h2>
  );
};

export default PeekHeader;
