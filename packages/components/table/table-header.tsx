import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/table/table.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export interface TableHeaderProps extends JSX.HTMLAttributes<HTMLTableCellElement>, CommonDataAttributes {}

const TableHeader = (passedProps: TableHeaderProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <td class={classnames(styles.tableHeader, props.class)} {...restOfProps}>
      {props.children}
    </td>
  );
};

export default TableHeader;
