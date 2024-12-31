import classnames from 'classnames';

import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/components/combobox/utils';
import List from '$/components/list';

const SelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id={`option${props.isFocusedOption(props.optionIndex) ? ' highlighted-option' : ''}`}
      data-combobox-value={props.option.value}
      class={classnames(styles.selectableOption, styles.listOption)}
      isSelected={props.isFocusedOption(props.optionIndex)}
      onMouseMove={() => props.onMouseEnterOption(props.optionIndex)}
      // onMouseLeave={() => props.onMouseLeaveOption()}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      {props.option.display}
    </List.Item>
  );
};

export default SelectableOption;
