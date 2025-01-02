import Badge, { BadgeColor, BadgeVariant } from '$/components/badge';
import Button, { ButtonColor, ButtonShape, ButtonVariant } from '$/components/button';
import styles from '$/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectedOptionProps } from '$/components/combobox/utils';
import Icon from '$/components/icon';

const SelectedOption = <TData extends ComboboxExtraData>(props: ComboboxSelectedOptionProps<TData>) => {
  return (
    <Badge
      data-id="selected-option"
      class={styles.selectedOption}
      variant={BadgeVariant.WEAK}
      color={BadgeColor.NEUTRAL}
    >
      {props.option.display}
      <Button
        data-id="delete-indicator"
        class={styles.removeSelectedOption}
        onClick={() => {
          props.removeValue(props.optionIndex);
        }}
        variant={ButtonVariant.TEXT}
        color={ButtonColor.NEUTRAL}
      >
        <Icon icon="close" />
      </Button>
    </Badge>
  );
};

export default SelectedOption;
