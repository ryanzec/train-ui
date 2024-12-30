import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/list/list.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export interface ListItemProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  isSelected?: boolean;
  preItem?: JSX.Element;
}

const ListItem = (passedProps: ListItemProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isSelected: false }, passedProps), [
    'class',
    'children',
    'isSelected',
    'preItem',
  ]);

  return (
    <div
      data-id="list-item"
      class={classnames(styles.listItem, props.class, {
        [styles.selectedItem]: props.isSelected,
      })}
      {...restOfProps}
    >
      <Show when={props.preItem}>
        <span class={styles.preItem}>{props.preItem}</span>
      </Show>
      {props.children}
    </div>
  );
};

export default ListItem;
