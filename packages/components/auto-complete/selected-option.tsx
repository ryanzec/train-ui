import styles from '$/components/auto-complete/auto-complete.module.css';
import { AutoCompleteExtraData, AutoCompleteSelectedOptionProps } from '$/components/auto-complete/utils';
import Button from '$/components/button';

const SelectedOption = <TData extends AutoCompleteExtraData>(props: AutoCompleteSelectedOptionProps<TData>) => {
  return (
    <div data-id="selected-option" class={styles.selectedOption}>
      {props.option.display}
      <Button.IconButton
        data-id="delete-indicator"
        icon="close"
        onClick={() => {
          props.removeValue(props.optionIndex);
        }}
      />
    </div>
  );
};

export default SelectedOption;
