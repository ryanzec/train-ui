import classnames from 'classnames';
import { For, Show, createSignal } from 'solid-js';
import * as zod from 'zod';

import AutoComplete, {
  type AutoCompleteOption,
  type AutoCompleteProps,
  type AutoCompleteSelectableOptionProps,
  type AutoCompleteSelectedOptionProps,
  autoCompleteUtils,
} from '$/components/auto-complete';
import styles from '$/components/auto-complete/auto-complete.module.css';
import Button from '$/components/button';
import FormField from '$/components/form-field';
import Label from '$/components/label';
import List from '$/components/list';
import SupportingText, { SupportingTextSentiment } from '$/components/supporting-text';
import { FormInputValidationState, formStoreUtils } from '$/stores/form';
import { zodUtils } from '$/utils/zod';

export default {
  title: 'Components/AutoComplete',
};

type CustomExtraData = {
  meta?: {
    extra: string;
  };
};

const getOptionsAsync = async (inputValue?: string): Promise<AutoCompleteOption<CustomExtraData>[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { display: `${inputValue} 1`, value: 11 },
    { display: `${inputValue} 2`, value: 22 },
    { display: `${inputValue} 3`, value: 33 },
    { display: `${inputValue} 4`, value: 44 },
  ];
};

interface ExampleProps {
  selectedOptionIndex?: number;
  autoShowOptions?: boolean;
  forceSelection?: boolean;
  placeholder?: string;
  useAsync?: boolean;
  onSelected?: (options: AutoCompleteOption<CustomExtraData>[]) => void;
  filterOptions?: AutoCompleteProps<CustomExtraData>['filterOptions'];
  selectedComponent?: AutoCompleteProps<CustomExtraData>['selectedComponent'] | null;
  selectableComponent?: AutoCompleteProps<CustomExtraData>['selectableComponent'];
  removeOnDuplicateSingleSelect?: boolean;
  disabled?: boolean;
  options?: AutoCompleteOption<CustomExtraData>[];
  supportingText?: string[];
  validationState?: FormInputValidationState;
}

const getSelectedComponent = (selectedComponent?: AutoCompleteProps<CustomExtraData>['selectedComponent'] | null) => {
  if (selectedComponent === undefined) {
    return AutoComplete.SelectedOption;
  }

  return selectedComponent === null ? undefined : selectedComponent;
};

const baseOptions = [
  { display: 'test1', value: 11, meta: { extra: 'test' } },
  { display: 'test2', value: 22 },
  { display: 'tes3', value: 33 },
  { display: 'tes4', value: 44 },
];

const BasicExample = (props: ExampleProps) => {
  const defaultOptions = props.options ?? baseOptions;
  const [options] = createSignal<AutoCompleteOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const autoCompleteStore = autoCompleteUtils.createAutoCompleteValue({
    defaultValue:
      props.selectedOptionIndex !== undefined && props.selectedOptionIndex >= 0
        ? [options()[props.selectedOptionIndex]]
        : [],
  });

  const setSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    autoCompleteStore.setSelected(options);

    if (props.onSelected) {
      props.onSelected(options);
    }
  };

  const onSetSelected = () => {
    setSelected([options()[3]]);
  };

  const onResetSelected = () => {
    setSelected([]);
  };

  return (
    <>
      <FormField>
        <Label>Label</Label>
        <AutoComplete
          forceSelection={props.forceSelection}
          autoShowOptions={props.autoShowOptions}
          options={options()}
          filterOptions={props.filterOptions ?? autoCompleteUtils.excludeSelectedFilter}
          setSelected={setSelected}
          selected={autoCompleteStore.selected()}
          placeholder={props.disabled ? 'disabled' : props.placeholder}
          getOptionsAsync={props.useAsync ? getOptionsAsync : undefined}
          name="autoComplete"
          selectedComponent={getSelectedComponent(props.selectedComponent)}
          selectableComponent={props.selectableComponent ?? AutoComplete.SelectableOption}
          removeOnDuplicateSingleSelect={!!props.removeOnDuplicateSingleSelect}
          disabled={!!props.disabled}
          validationState={props.validationState}
        />
        <SupportingText
          supportingText={props.supportingText}
          sentiment={
            props.validationState === FormInputValidationState.INVALID ? SupportingTextSentiment.DANGER : undefined
          }
        />
      </FormField>
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      <Button data-id="set-selected-button" onClick={onSetSelected}>
        manually set selected
      </Button>
      <Show when={autoCompleteStore.selected().length > 0}>
        <div data-id="check-selected-auto-complete-value">
          selected item value: {autoCompleteStore.selected()[0].display}
        </div>
      </Show>
    </>
  );
};

const MultiSelectExample = (props: ExampleProps) => {
  const defaultOptions = props.options ?? baseOptions;
  const [options] = createSignal<AutoCompleteOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const autoCompleteStore = autoCompleteUtils.createAutoCompleteValue({
    defaultValue:
      props.selectedOptionIndex !== undefined && props.selectedOptionIndex >= 0
        ? [options()[props.selectedOptionIndex]]
        : [],
  });

  const onDeleteOption = (deletedOption: AutoCompleteOption<CustomExtraData>) => {
    console.log(JSON.stringify(deletedOption));
  };

  const setSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    autoCompleteStore.setSelected(options);

    if (props.onSelected) {
      props.onSelected(options);
    }
  };

  const onSetSelected = () => {
    setSelected([options()[3]]);
  };

  const onResetSelected = () => {
    setSelected([]);
  };

  return (
    <>
      <FormField>
        <Label>Label</Label>
        <AutoComplete
          forceSelection={props.forceSelection}
          autoShowOptions={props.autoShowOptions}
          options={options()}
          filterOptions={props.filterOptions ?? autoCompleteUtils.excludeSelectedFilter}
          setSelected={setSelected}
          selected={autoCompleteStore.selected()}
          onDeleteOption={onDeleteOption}
          placeholder={props.disabled ? 'disabled' : props.placeholder}
          getOptionsAsync={props.useAsync ? getOptionsAsync : undefined}
          isMulti
          name="autoComplete"
          selectedComponent={getSelectedComponent(props.selectedComponent)}
          selectableComponent={props.selectableComponent ?? AutoComplete.SelectableOption}
          removeOnDuplicateSingleSelect={!!props.removeOnDuplicateSingleSelect}
          disabled={!!props.disabled}
          validationState={props.validationState}
        />
        <SupportingText
          supportingText={props.supportingText}
          sentiment={
            props.validationState === FormInputValidationState.INVALID ? SupportingTextSentiment.DANGER : undefined
          }
        />
      </FormField>
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      <Button data-id="set-selected-button" onClick={onSetSelected}>
        manually set selected
      </Button>
      <Show when={autoCompleteStore.selected().length > 0}>
        <hr />
        <For each={autoCompleteStore.selected()}>
          {(selected) => {
            return (
              <div data-id="manual-selected-options">
                {selected.display}({selected.value})
              </div>
            );
          }}
        </For>
      </Show>
    </>
  );
};

const CustomSelectedOption = (props: AutoCompleteSelectedOptionProps<CustomExtraData>) => {
  return (
    <span data-id="selected-option" class={styles.selectedOption}>
      {props.option.display}
      <Button
        data-id="delete-indicator"
        class={styles.removeSelectedOption}
        onclick={() => props.removeValue(props.optionIndex)}
      >
        Z
      </Button>
    </span>
  );
};

const CustomSelectableOption = (props: AutoCompleteSelectableOptionProps<CustomExtraData>) => {
  return (
    <List.Item
      data-id={`option${props.isFocusedOption(props.optionIndex) ? ' highlighted-option' : ''}`}
      class={classnames(styles.selectableOption)}
      isSelected={props.isFocusedOption(props.optionIndex)}
      onMouseEnter={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseLeave={() => props.onMouseLeaveOption()}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      --{props.option.display}({props.option.meta?.extra})--
    </List.Item>
  );
};

export const Single = () => {
  return <BasicExample />;
};

export const Multi = () => {
  return <MultiSelectExample />;
};

export const SingleWithMissingData = () => {
  return (
    <BasicExample
      autoShowOptions
      // @ts-expect-error using malformed data as it is the point of this example
      options={[...baseOptions, { display: 'no value' }, { value: 'no display' }]}
    />
  );
};

export const MultiWithMissingData = () => {
  return (
    <MultiSelectExample
      autoShowOptions
      // @ts-expect-error using malformed data as it is the point of this example
      options={[...baseOptions, { display: 'no value' }, { value: 'no display' }]}
    />
  );
};

export const SingleFormattedSelectables = () => {
  return (
    <BasicExample
      selectableComponent={AutoComplete.FormattedSelectableOption}
      filterOptions={autoCompleteUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectables = () => {
  return (
    <MultiSelectExample
      selectableComponent={AutoComplete.FormattedSelectableOption}
      filterOptions={autoCompleteUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectablesAutoShow = () => {
  return (
    <MultiSelectExample
      selectableComponent={AutoComplete.FormattedSelectableOption}
      filterOptions={autoCompleteUtils.simpleFilter}
      selectedComponent={null}
      autoShowOptions
    />
  );
};

export const SingleFormattedSelectablesRemoveDuplicateSelect = () => {
  return (
    <BasicExample
      selectableComponent={AutoComplete.FormattedSelectableOption}
      filterOptions={autoCompleteUtils.simpleFilter}
      selectedComponent={null}
      removeOnDuplicateSingleSelect
    />
  );
};

export const SinglePreselected = () => {
  return <BasicExample selectedOptionIndex={0} />;
};

export const MultiPreselected = () => {
  return <MultiSelectExample selectedOptionIndex={0} />;
};

export const MultiPreselectedFormattedAutoShow = () => {
  return (
    <MultiSelectExample
      selectedOptionIndex={2}
      selectableComponent={AutoComplete.FormattedSelectableOption}
      filterOptions={autoCompleteUtils.simpleFilter}
      selectedComponent={null}
      autoShowOptions
    />
  );
};

export const SingleAutoShowOptions = () => {
  return <BasicExample autoShowOptions />;
};

export const MultiAutoShowOptions = () => {
  return <MultiSelectExample autoShowOptions />;
};

export const SingleNoForceSelection = () => {
  return <BasicExample forceSelection={false} />;
};

export const MultiNoForceSelection = () => {
  return <MultiSelectExample forceSelection={false} />;
};

export const SinglePlaceholder = () => {
  return <BasicExample placeholder="placeholder" />;
};

export const MultiPlaceholder = () => {
  return <MultiSelectExample placeholder="placeholder" />;
};

export const SingleAsync = () => {
  return <BasicExample useAsync />;
};

export const MultiAsync = () => {
  return <MultiSelectExample useAsync />;
};

export const SingleDisabled = () => {
  return <BasicExample disabled autoShowOptions />;
};

export const MultiDisabled = () => {
  return <MultiSelectExample disabled autoShowOptions />;
};

interface FormData {
  autoComplete: number[];
}

const formDataSchema = zodUtils.schemaForType<FormData>()(
  zod.object({
    autoComplete: zod.number().array().min(1, 'must select at least 1 value'),
  }),
);

export const SingleInForm = () => {
  const { form, setValue, errors } = formStoreUtils.createForm({
    schema: formDataSchema,
    initialValues: {
      autoComplete: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('autoComplete', value);
  };

  return (
    <form use:form>
      <BasicExample
        onSelected={onSelected}
        validationState={
          errors().autoComplete?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
        supportingText={errors().autoComplete?.errors}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInForm = () => {
  const { form, setValue, errors } = formStoreUtils.createForm({
    schema: formDataSchema,
    initialValues: {
      autoComplete: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('autoComplete', value);
  };

  return (
    <form use:form>
      <MultiSelectExample
        onSelected={onSelected}
        supportingText={errors().autoComplete?.errors}
        validationState={
          errors().autoComplete?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const SingleInFormAutoShowOptions = () => {
  const { form, setValue, errors } = formStoreUtils.createForm({
    schema: formDataSchema,
    initialValues: {
      autoComplete: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('autoComplete', value);
  };

  return (
    <form use:form>
      <BasicExample
        onSelected={onSelected}
        autoShowOptions
        supportingText={errors().autoComplete?.errors}
        validationState={
          errors().autoComplete?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInFormAutoShowOptions = () => {
  const { form, setValue, errors } = formStoreUtils.createForm({
    schema: formDataSchema,
    initialValues: {
      autoComplete: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: AutoCompleteOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('autoComplete', value);
  };

  return (
    <form use:form>
      <MultiSelectExample
        onSelected={onSelected}
        autoShowOptions
        supportingText={errors().autoComplete?.errors}
        validationState={
          errors().autoComplete?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};
