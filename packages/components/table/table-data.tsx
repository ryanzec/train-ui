import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/table/table.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type TableDataProps = JSX.HTMLAttributes<HTMLTableCellElement> & CommonDataAttributes;

const TableData = (passedProps: TableDataProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <td class={classnames(styles.tableData, props.class)} {...restOfProps}>
      {props.children}
    </td>
  );
};

export default TableData;
