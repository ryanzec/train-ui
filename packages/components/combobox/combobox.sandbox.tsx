import classnames from 'classnames';
import { For, Show, createSignal } from 'solid-js';
import * as zod from 'zod';

import Button from '$/components/button';
import Combobox, {
  type ComboboxOption,
  type ComboboxProps,
  type ComboboxSelectableOptionProps,
  type ComboboxSelectedOptionProps,
  comboboxUtils,
} from '$/components/combobox';
import styles from '$/components/combobox/combobox.module.css';
import FormField from '$/components/form-field';
import Label from '$/components/label';
import List from '$/components/list';
import SupportingText, { SupportingTextSentiment } from '$/components/supporting-text';
import { FormInputValidationState, formStoreUtils } from '$/stores/form';
import { zodUtils } from '$/utils/zod';

export default {
  title: 'Components/Combobox',
};

type CustomExtraData = {
  meta?: {
    extra: string;
  };
};

const getOptionsAsync = async (inputValue?: string): Promise<ComboboxOption<CustomExtraData>[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { display: `${inputValue} 1`, value: 11 },
    { display: `${inputValue} 2`, value: 22 },
    { display: `${inputValue} 3`, value: 33 },
    { display: `${inputValue} 4`, value: 44 },
  ];
};

type ExampleProps = {
  selectedOptionIndex?: number;
  autoShowOptions?: boolean;
  forceSelection?: boolean;
  placeholder?: string;
  useAsync?: boolean;
  onSelected?: (options: ComboboxOption<CustomExtraData>[]) => void;
  filterOptions?: ComboboxProps<CustomExtraData>['filterOptions'];
  selectedComponent?: ComboboxProps<CustomExtraData>['selectedComponent'] | null;
  selectableComponent?: ComboboxProps<CustomExtraData>['selectableComponent'];
  removeOnDuplicateSingleSelect?: boolean;
  disabled?: boolean;
  options?: ComboboxOption<CustomExtraData>[];
  supportingText?: string[];
  validationState?: FormInputValidationState;
};

const getSelectedComponent = (selectedComponent?: ComboboxProps<CustomExtraData>['selectedComponent'] | null) => {
  if (selectedComponent === undefined) {
    return Combobox.SelectedOption;
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
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const comboboxStore = comboboxUtils.createComboboxValue({
    defaultValue:
      props.selectedOptionIndex !== undefined && props.selectedOptionIndex >= 0
        ? [options()[props.selectedOptionIndex]]
        : [],
  });

  const setSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    comboboxStore.setSelected(options);

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
        <Combobox
          forceSelection={props.forceSelection}
          autoShowOptions={props.autoShowOptions}
          options={options()}
          filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
          setSelected={setSelected}
          selected={comboboxStore.selected()}
          placeholder={props.disabled ? 'disabled' : props.placeholder}
          getOptionsAsync={props.useAsync ? getOptionsAsync : undefined}
          name="combobox"
          selectedComponent={getSelectedComponent(props.selectedComponent)}
          selectableComponent={props.selectableComponent ?? Combobox.SelectableOption}
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
      <Show when={comboboxStore.selected().length > 0}>
        <div data-id="check-selected-combobox-value">selected item value: {comboboxStore.selected()[0].display}</div>
      </Show>
    </>
  );
};

const MultiSelectExample = (props: ExampleProps) => {
  const defaultOptions = props.options ?? baseOptions;
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const comboboxStore = comboboxUtils.createComboboxValue({
    defaultValue:
      props.selectedOptionIndex !== undefined && props.selectedOptionIndex >= 0
        ? [options()[props.selectedOptionIndex]]
        : [],
  });

  const onDeleteOption = (deletedOption: ComboboxOption<CustomExtraData>) => {
    console.log(JSON.stringify(deletedOption));
  };

  const setSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    comboboxStore.setSelected(options);

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
        <Combobox
          forceSelection={props.forceSelection}
          autoShowOptions={props.autoShowOptions}
          options={options()}
          filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
          setSelected={setSelected}
          selected={comboboxStore.selected()}
          onDeleteOption={onDeleteOption}
          placeholder={props.disabled ? 'disabled' : props.placeholder}
          getOptionsAsync={props.useAsync ? getOptionsAsync : undefined}
          isMulti
          name="combobox"
          selectedComponent={getSelectedComponent(props.selectedComponent)}
          selectableComponent={props.selectableComponent ?? Combobox.SelectableOption}
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
      <Show when={comboboxStore.selected().length > 0}>
        <hr />
        <For each={comboboxStore.selected()}>
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

const CustomSelectedOption = (props: ComboboxSelectedOptionProps<CustomExtraData>) => {
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

const CustomSelectableOption = (props: ComboboxSelectableOptionProps<CustomExtraData>) => {
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
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectables = () => {
  return (
    <MultiSelectExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectablesAutoShow = () => {
  return (
    <MultiSelectExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxUtils.simpleFilter}
      selectedComponent={null}
      autoShowOptions
    />
  );
};

export const SingleFormattedSelectablesRemoveDuplicateSelect = () => {
  return (
    <BasicExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxUtils.simpleFilter}
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
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxUtils.simpleFilter}
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

type FormData = {
  combobox: number[];
};

const formDataSchema = zodUtils.schemaForType<FormData>()(
  zod.object({
    combobox: zod.number().array().min(1, 'must select at least 1 value'),
  }),
);

export const SingleInForm = () => {
  const { formDirective, setValue, errors } = formStoreUtils.createForm<FormData, typeof formDataSchema.shape>({
    schema: formDataSchema,
    initialValues: {
      combobox: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('combobox', value);
  };

  return (
    <form use:formDirective>
      <BasicExample
        onSelected={onSelected}
        validationState={
          errors().combobox?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
        supportingText={errors().combobox?.errors}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInForm = () => {
  const { formDirective, setValue, errors } = formStoreUtils.createForm<FormData, typeof formDataSchema.shape>({
    schema: formDataSchema,
    initialValues: {
      combobox: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('combobox', value);
  };

  return (
    <form use:formDirective>
      <MultiSelectExample
        onSelected={onSelected}
        supportingText={errors().combobox?.errors}
        validationState={
          errors().combobox?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const SingleInFormAutoShowOptions = () => {
  const { formDirective, setValue, errors } = formStoreUtils.createForm<FormData, typeof formDataSchema.shape>({
    schema: formDataSchema,
    initialValues: {
      combobox: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('combobox', value);
  };

  return (
    <form use:formDirective>
      <BasicExample
        onSelected={onSelected}
        autoShowOptions
        supportingText={errors().combobox?.errors}
        validationState={
          errors().combobox?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInFormAutoShowOptions = () => {
  const { formDirective, setValue, errors } = formStoreUtils.createForm<FormData, typeof formDataSchema.shape>({
    schema: formDataSchema,
    initialValues: {
      combobox: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    // cast needed since auto complete values can be a number of types
    const value = options.map((option) => option.value) as number[];

    setValue('combobox', value);
  };

  return (
    <form use:formDirective>
      <MultiSelectExample
        onSelected={onSelected}
        autoShowOptions
        supportingText={errors().combobox?.errors}
        validationState={
          errors().combobox?.errors ? FormInputValidationState.INVALID : FormInputValidationState.NEUTRAL
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};
