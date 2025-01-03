import classnames from 'classnames';

import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxSelectableGroupHeaderProps } from '$/components/combobox/utils';
import List from '$/components/list';

const SelectableGroupHeader = (props: ComboboxSelectableGroupHeaderProps) => {
  return (
    <List.Item data-id="selectable-group-header" class={classnames(styles.selectableGroupHeader, styles.listOption)}>
      {props.label}
    </List.Item>
  );
};

export default SelectableGroupHeader;
