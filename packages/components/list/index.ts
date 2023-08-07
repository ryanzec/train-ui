import List, { ListProps } from '$/components/list/list';
import Item, { ListItemProps } from '$/components/list/list-item';

export type { ListItemProps, ListProps };

export default Object.assign(List, { Item });
