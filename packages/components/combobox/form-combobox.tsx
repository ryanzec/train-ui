import { mergeProps, splitProps } from 'solid-js';

import Combobox from '$/components/combobox/combobox';
import type { ComboboxExtraData, FormComboboxProps } from '$/components/combobox/utils';
import FormField from '$/components/form-field';
import Label from '$/components/label';
import { FormInputValidationState } from '$/stores/form/utils';

const FormCombobox = <TFormData, TComboboxExtraData extends ComboboxExtraData>(
  passedProps: FormComboboxProps<TFormData, TComboboxExtraData>,
) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        disabledPlaceholder: '',
        isLoading: false,
        isMulti: false,
      },
      passedProps,
    ),
    ['errors', 'label', 'name', 'isLoading'],
  );

  const name = () => props.name as string;

  const errors = () => props.errors?.()[name() as keyof TFormData]?.errors;

  return (
    <FormField>
      <Label for={name()}>{props.label}</Label>
      <Combobox
        id={name()}
        name={name()}
        {...restOfProps}
        validationState={errors() ? FormInputValidationState.INVALID : FormInputValidationState.VALID}
      />
    </FormField>
  );
};

export default FormCombobox;
