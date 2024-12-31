import Table, { type TableProps } from '$/components/table/table';
import Data, { type TableDataProps } from '$/components/table/table-data';
import Header, { type TableHeaderProps } from '$/components/table/table-header';
import Row, { type TableRowProps } from '$/components/table/table-row';

export { TableShape } from '$/components/table/utils';
export type { TableProps, TableRowProps, TableDataProps, TableHeaderProps };

export default Object.assign(Table, { Row, Data, Header });
