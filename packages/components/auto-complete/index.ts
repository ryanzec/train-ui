import AutoComplete from '$/components/auto-complete/auto-complete';
import Form from '$/components/auto-complete/form-auto-complete';
import FormattedSelectableOption from '$/components/auto-complete/formatted-selectable-option';
import SelectableOption from '$/components/auto-complete/selectable-option';
import SelectedOption from '$/components/auto-complete/selected-option';

export type {
  AutoCompleteOptionValue,
  AutoCompleteExtraData,
  AutoCompleteOption,
  AutoCompleteProps,
  AutoCompleteValueStore,
  AutoCompleteStore,
  AutoCompleteSelectableOptionProps,
  AutoCompleteSelectedOptionProps,
  GetInputPropsReturns,
  GetSelectableOptionPropsReturns,
  GetSelectedOptionPropsReturns,
} from '$/components/auto-complete/utils';

export {
  autoCompleteUtils,
  AsyncOptionsState,
} from '$/components/auto-complete/utils';

export type { FormAutoCompleteAutoCompleteItem } from '$/components/auto-complete/form-auto-complete';

export default Object.assign(AutoComplete, {
  SelectableOption,
  FormattedSelectableOption,
  SelectedOption,
  Form,
});
