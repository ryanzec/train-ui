import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import Checkbox from '$/components/checkbox';
import TableData from '$/components/table/table-data';
import styles from '$/components/table/table.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement> &
  CommonDataAttributes & {
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelected?: (id: string) => void;
    id?: string;
  };

const TableRow = (passedProps: TableRowProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isSelectable: false }, passedProps), [
    'children',
    'class',
    'isSelectable',
    'isSelected',
    'onSelected',
    'id',
  ]);

  const handleSelected = () => {
    if (!props.onSelected || !props.id) {
      return;
    }

    props.onSelected(props.id);
  };

  return (
    <tr
      class={classnames(styles.tableRow, props.class, { [styles.tableRowIsSelected]: props.isSelected })}
      {...restOfProps}
    >
      <Show when={props.isSelectable}>
        {/* setting the width to 1px will make the table data element only take up the width of the content */}
        <TableData class={styles.tableCellSelectable}>
          <Checkbox
            checked={props.isSelected}
            name={`table-select-id-${props.id}`}
            value={props.id}
            onChange={handleSelected}
          />
        </TableData>
      </Show>
      {props.children}
    </tr>
  );
};

export default TableRow;
