import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import styles from '$/components/list/list.module.css';
import { CommonDataAttributes } from '$/types/generic';

export interface ListProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {}

const List = (passedProps: ListProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="list" class={classnames(styles.list, props.class)} {...restOfProps} />;
};

export default List;
