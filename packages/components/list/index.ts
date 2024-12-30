import List, { type ListProps } from '$/components/list/list';
import Item, { type ListItemProps } from '$/components/list/list-item';

export type { ListItemProps, ListProps };

export default Object.assign(List, { Item });
