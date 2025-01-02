import Button, { ButtonShape } from '$/components/button';
import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectedOptionProps } from '$/components/combobox/utils';
import Icon from '$/components/icon';

const SelectedOption = <TData extends ComboboxExtraData>(props: ComboboxSelectedOptionProps<TData>) => {
  return (
    <div data-id="selected-option" class={styles.selectedOption}>
      {props.option.display}
      <Button
        data-id="delete-indicator"
        onClick={() => {
          props.removeValue(props.optionIndex);
        }}
        shape={ButtonShape.CIRCLE}
      >
        <Icon icon="close" />
      </Button>
    </div>
  );
};

export default SelectedOption;
