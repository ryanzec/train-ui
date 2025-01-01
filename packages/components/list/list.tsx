import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/list/list.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type ListProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const List = (passedProps: ListProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="list" class={classnames(styles.list, props.class)} {...restOfProps} />;
};

export default List;
