import styles from '$/components/icon/icon.module.css';
import type { CommonDataAttributes } from '$/types/generic';
import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

export type IconGroupProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const IconGroup = (passedProps: IconGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="icon-group" {...restOfProps} class={classnames(styles.group, props.class)} />;
};

export default IconGroup;
