import classnames from 'classnames';

import styles from '$/components/auto-complete/auto-complete.module.css';
import type { AutoCompleteExtraData, AutoCompleteSelectableOptionProps } from '$/components/auto-complete/utils';
import List from '$/components/list';

const SelectableOption = <TData extends AutoCompleteExtraData>(props: AutoCompleteSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id={`option${props.isFocusedOption(props.optionIndex) ? ' highlighted-option' : ''}`}
      data-auto-complete-value={props.option.value}
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
