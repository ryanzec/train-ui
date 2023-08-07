import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/list/list.module.css';
import { CommonDataAttributes } from '$/types/generic';

export interface ListItemProps extends JSX.LabelHTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  isSelected?: boolean;
}

const ListItem = (passedProps: ListItemProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isSelected: false }, passedProps), ['class', 'isSelected']);

  return (
    <div
      data-id="list-item"
      class={classnames(styles.listItem, props.class, { [styles.selectedItem]: props.isSelected })}
      {...restOfProps}
    />
  );
};

export default ListItem;
