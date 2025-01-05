import classnames from 'classnames';

import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/components/combobox/utils';
import List from '$/components/list';

const SelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id="selectable-option"
      data-combobox-value={props.option.value}
      class={classnames(styles.selectableOption, styles.listOption)}
      onMouseMove={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      {props.option.label}
    </List.Item>
  );
};

export default SelectableOption;
