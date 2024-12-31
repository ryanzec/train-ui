import classnames from 'classnames';
import { Match, Switch } from 'solid-js';

import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/components/combobox/utils';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import List from '$/components/list';

const FormattedSelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id={`option${props.isFocusedOption(props.optionIndex) ? ' highlighted-option' : ''}`}
      data-combobox-value={props.option.value}
      class={classnames(styles.selectableOption, styles.listOption)}
      isSelected={props.isFocusedOption(props.optionIndex)}
      onMouseEnter={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseLeave={() => props.onMouseLeaveOption()}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      <Switch fallback={<Icon class={classnames(styles.invisible, iconStyles.spacingRight)} icon="question_mark" />}>
        <Match when={props.isFocusedOption(props.optionIndex) && props.isSelectedOption(props.option.value)}>
          <Icon class={classnames(styles.removeIcon, iconStyles.spacingRight)} icon="close" />
        </Match>
        <Match when={props.isSelectedOption(props.option.value)}>
          <Icon class={classnames(styles.addIcon, iconStyles.spacingRight)} icon="check" />
        </Match>
        <Match when={props.isFocusedOption(props.optionIndex)}>
          <Icon class={classnames(styles.addIcon, iconStyles.spacingRight)} icon="add" />
        </Match>
      </Switch>
      {props.option.display}
    </List.Item>
  );
};

export default FormattedSelectableOption;
