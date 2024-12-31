import { type Accessor, mergeProps } from 'solid-js';

import Combobox from '$/components/combobox/combobox';
import FormattedSelectableOption from '$/components/combobox/formatted-selectable-option';
import SelectableOption from '$/components/combobox/selectable-option';
import { type ComboboxOption, comboboxUtils } from '$/components/combobox/utils';
import type { FormErrorsData } from '$/stores/form';
import { FormInputValidationState } from '$/stores/form/utils';

export interface FormComboboxComboboxItem {
  display: string;
  value: string;
}

interface FormComboboxProps<TFormData> {
  errors?: Accessor<FormErrorsData<TFormData>>;
  label?: string;
  class?: string;
  setSelected: (comboboxOptions: ComboboxOption[]) => void;
  selected: ComboboxOption[];
  options: FormComboboxComboboxItem[];
  name: keyof TFormData;
  placeholder?: string;
  disabledPlaceholder?: string;
  isLoading?: boolean;
  isMulti?: boolean;
}

const FormCombobox = <TFormData,>(passedProps: FormComboboxProps<TFormData>) => {
  const props = mergeProps(
    {
      placeholder: '',
      disabledPlaceholder: '',
      isLoading: false,
      isMulti: false,
    },
    passedProps,
  );

  const isDisabled = () => props.options.length === 0;

  const name = () => props.name as string;

  const errors = () => props.errors?.()[name() as keyof TFormData]?.errors;

  return (
    <Combobox
      id={name()}
      name={name()}
      isMulti={props.isMulti}
      autoShowOptions
      forceSelection
      options={props.options}
      filterOptions={comboboxUtils.simpleFilter}
      setSelected={(selectedItems) => {
        props.setSelected(selectedItems);
      }}
      selected={props.selected}
      placeholder={isDisabled() ? props.disabledPlaceholder : props.placeholder}
      selectableComponent={props.isMulti ? FormattedSelectableOption : SelectableOption}
      disabled={isDisabled()}
      validationState={errors() ? FormInputValidationState.INVALID : FormInputValidationState.VALID}
    />
  );
};

export default FormCombobox;
