import { type Accessor, mergeProps } from 'solid-js';

import AutoComplete from '$/components/auto-complete/auto-complete';
import FormattedSelectableOption from '$/components/auto-complete/formatted-selectable-option';
import SelectableOption from '$/components/auto-complete/selectable-option';
import { type AutoCompleteOption, autoCompleteUtils } from '$/components/auto-complete/utils';
import type { FormErrorsData } from '$/stores/form';
import { FormInputValidationState } from '$/stores/form/utils';

export interface FormAutoCompleteAutoCompleteItem {
  display: string;
  value: string;
}

interface FormAutoCompleteProps<TFormData> {
  errors?: Accessor<FormErrorsData<TFormData>>;
  label?: string;
  class?: string;
  setSelected: (autoCompleteOptions: AutoCompleteOption[]) => void;
  selected: AutoCompleteOption[];
  options: FormAutoCompleteAutoCompleteItem[];
  name: keyof TFormData;
  placeholder?: string;
  disabledPlaceholder?: string;
  isLoading?: boolean;
  isMulti?: boolean;
}

const FormAutoComplete = <TFormData,>(passedProps: FormAutoCompleteProps<TFormData>) => {
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
    <AutoComplete
      id={name()}
      name={name()}
      isMulti={props.isMulti}
      autoShowOptions
      forceSelection
      options={props.options}
      filterOptions={autoCompleteUtils.simpleFilter}
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

export default FormAutoComplete;
