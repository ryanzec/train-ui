import Combobox from '$/components/combobox/combobox';
import Form from '$/components/combobox/form-combobox';
import FormattedSelectableOption from '$/components/combobox/formatted-selectable-option';
import SelectableOption from '$/components/combobox/selectable-option';
import SelectedOption from '$/components/combobox/selected-option';

export type {
  FormComboboxComboboxItem,
  ComboboxOptionValue,
  ComboboxExtraData,
  ComboboxOption,
  ComboboxProps,
  FormComboboxProps,
  ComboboxValueStore,
  ComboboxStore,
  ComboboxSelectableOptionProps,
  ComboboxSelectedOptionProps,
  GetInputPropsReturns,
  GetSelectableOptionPropsReturns,
  GetSelectedOptionPropsReturns,
} from '$/components/combobox/utils';

export {
  comboboxUtils,
  AsyncOptionsState,
} from '$/components/combobox/utils';

export default Object.assign(Combobox, {
  SelectableOption,
  FormattedSelectableOption,
  SelectedOption,
  Form,
});
