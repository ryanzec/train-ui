import classnames from 'classnames';
import { For, Show, createSignal, mergeProps } from 'solid-js';
import * as zod from 'zod';

import Button from '$/components/button';
import Combobox, {
  type ComboboxOption,
  type ComboboxProps,
  type ComboboxSelectableOptionProps,
  type ComboboxSelectedOptionProps,
  comboboxComponentUtils,
} from '$/components/combobox';
import styles from '$/components/combobox/combobox.module.css';
import FormField from '$/components/form-field';
import Label from '$/components/label';
import List from '$/components/list';
import SupportingText, { SupportingTextColor } from '$/components/supporting-text';
import { FormInputValidationState, formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
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
    { label: `${inputValue} 1`, value: 11 },
    { label: `${inputValue} 2`, value: 22 },
    { label: `${inputValue} 3`, value: 33 },
    { label: `${inputValue} 4`, value: 44 },
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
  groupOrder?: string[];
};

const getSelectedComponent = (selectedComponent?: ComboboxProps<CustomExtraData>['selectedComponent'] | null) => {
  if (selectedComponent === undefined) {
    return Combobox.SelectedOption;
  }

  return selectedComponent === null ? undefined : selectedComponent;
};

const baseOptions: ComboboxOption<CustomExtraData>[] = [
  { label: 'test1', value: 11, meta: { extra: 'test' } },
  { label: 'test2', value: 22 },
  { label: 'tes3', value: 33 },
  { label: 'tes4', value: 44 },
];

const baseLargeOptions: ComboboxOption[] = [];

for (let i = 0; i < 200; i++) {
  baseLargeOptions.push({ label: `test${i}`, value: i });
}

const baseGroupedOptions: ComboboxOption<CustomExtraData>[] = [
  { label: 'test1', value: 11, groupKey: 'Group 1', meta: { extra: 'test' } },
  { label: 'tes5', value: 55, groupKey: 'Group 1' },
  { label: 'test2', value: 22, groupKey: 'Group 2' },
  { label: 'tes4', value: 44, groupKey: 'Group 3' },
  { label: 'tes7', value: 77 },
  { label: 'tes3', value: 33, groupKey: 'Group 1' },
  { label: 'tes6', value: 66, groupKey: 'Group 2' },
];

const BasicExample = (props: ExampleProps) => {
  const defaultOptions = props.options ?? baseOptions;
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const comboboxStore = comboboxComponentUtils.createValueStore({
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
          filterOptions={props.filterOptions ?? comboboxComponentUtils.excludeSelectedFilter}
          setSelected={setSelected}
          selected={comboboxStore.selected()}
          placeholder={props.disabled ? 'disabled' : props.placeholder}
          getOptionsAsync={props.useAsync ? getOptionsAsync : undefined}
          name="combobox"
          selectedComponent={getSelectedComponent(props.selectedComponent)}
          selectableComponent={props.selectableComponent ?? Combobox.SelectableOption}
          removeOnDuplicateSingleSelect={!!props.removeOnDuplicateSingleSelect}
          disabled={!!props.disabled}
          groupOrder={props.groupOrder}
        />
      </FormField>
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      <Button data-id="set-selected-button" onClick={onSetSelected}>
        manually set selected
      </Button>
      <Show when={comboboxStore.selected().length > 0}>
        <div data-id="check-selected-combobox-value">selected item value: {comboboxStore.selected()[0].label}</div>
      </Show>
    </>
  );
};

const MultiSelectExample = (props: ExampleProps) => {
  const defaultOptions = props.options ?? baseOptions;
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(props.useAsync ? [] : defaultOptions);
  const comboboxStore = comboboxComponentUtils.createValueStore({
    defaultValue:
      props.selectedOptionIndex !== undefined && props.selectedOptionIndex >= 0
        ? [options()[props.selectedOptionIndex]]
        : [],
  });

  const onDeleteOption = (deletedOption: ComboboxOption<CustomExtraData>) => {
    console.log(JSON.stringify(deletedOption));
  };

  const setSelected = (options: ComboboxOption<CustomExtraData>[]) => {
    console.log(options);
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
          filterOptions={props.filterOptions ?? comboboxComponentUtils.excludeSelectedFilter}
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
          groupOrder={props.groupOrder}
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
                {selected.label}({selected.value})
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
      {props.option.label}
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
      --{props.option.label}({props.option.meta?.extra})--
    </List.Item>
  );
};

export const Single = () => {
  return <BasicExample />;
};

export const Multi = () => {
  return <MultiSelectExample />;
};

export const SingleGrouped = () => {
  return <BasicExample options={baseGroupedOptions} />;
};

export const SingleGroupedOrdered = () => {
  return <BasicExample options={baseGroupedOptions} groupOrder={['Group 3', 'Group 2', 'Group 1']} />;
};

export const MultiGrouped = () => {
  return <MultiSelectExample options={baseGroupedOptions} />;
};

export const MultiGroupedOrdered = () => {
  return <BasicExample options={baseGroupedOptions} groupOrder={['Group 3', 'Group 2', 'Group 1']} />;
};

export const SingleWithMissingData = () => {
  return (
    <BasicExample
      autoShowOptions
      // @ts-expect-error using malformed data as it is the point of this example
      options={[...baseOptions, { label: 'no value' }, { value: 'no display' }]}
    />
  );
};

export const MultiWithMissingData = () => {
  return (
    <MultiSelectExample
      autoShowOptions
      // @ts-expect-error using malformed data as it is the point of this example
      options={[...baseOptions, { label: 'no value' }, { value: 'no display' }]}
    />
  );
};

export const SingleFormattedSelectables = () => {
  return (
    <BasicExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxComponentUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectables = () => {
  return (
    <MultiSelectExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxComponentUtils.simpleFilter}
      selectedComponent={null}
    />
  );
};

export const MultiFormattedSelectablesAutoShow = () => {
  return (
    <MultiSelectExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxComponentUtils.simpleFilter}
      selectedComponent={null}
      autoShowOptions
    />
  );
};

export const SingleFormattedSelectablesRemoveDuplicateSelect = () => {
  return (
    <BasicExample
      selectableComponent={Combobox.FormattedSelectableOption}
      filterOptions={comboboxComponentUtils.simpleFilter}
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
      filterOptions={comboboxComponentUtils.simpleFilter}
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
    combobox: zod
      .number()
      .array()
      .min(1, validationUtils.getMessage(ValidationMessageType.MIN_COUNT, ['1'])),
  }),
);

export const SingleInForm = () => {
  const formStore = formStoreUtils.createStore<FormData>({
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

    formStore.setValue('combobox', value);
  };

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().combobox?.errors}>
        <BasicExample onSelected={onSelected} />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInForm = () => {
  const formStore = formStoreUtils.createStore<FormData>({
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

    formStore.setValue('combobox', value);
  };

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().combobox?.errors}>
        <MultiSelectExample onSelected={onSelected} />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export const SingleInFormAutoShowOptions = () => {
  const formStore = formStoreUtils.createStore<FormData>({
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

    formStore.setValue('combobox', value);
  };

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().combobox?.errors}>
        <BasicExample onSelected={onSelected} autoShowOptions />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export const MultiInFormAutoShowOptions = () => {
  const formStore = formStoreUtils.createStore<FormData>({
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

    formStore.setValue('combobox', value);
  };

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <FormField errors={formStore.errors().combobox?.errors}>
        <MultiSelectExample onSelected={onSelected} autoShowOptions />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export const SingleLarge = () => {
  return <BasicExample options={baseLargeOptions} autoShowOptions />;
};

export const SingleChangeLocalOptions = () => {
  const [options, setOptions] = createSignal<ComboboxOption<CustomExtraData>[]>(baseOptions);
  const comboboxStore = comboboxComponentUtils.createValueStore();

  const handleChangeOptions = () => {
    setOptions(options().length > 5 ? baseOptions : baseLargeOptions);
  };

  return (
    <>
      <FormField>
        <Label>Label</Label>
        <Combobox
          autoShowOptions
          options={options()}
          filterOptions={comboboxComponentUtils.excludeSelectedFilter}
          setSelected={comboboxStore.setSelected}
          selected={comboboxStore.selected()}
          name="combobox"
          selectedComponent={Combobox.SelectedOption}
          selectableComponent={Combobox.SelectableOption}
        />
      </FormField>
      <Button data-id="handle-change-options-button" onClick={handleChangeOptions}>
        change options
      </Button>
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const formStore = formStoreUtils.createStore<{ combobox: number[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(baseOptions);
  const comboboxStore = comboboxComponentUtils.createValueStore();

  return (
    <FormField>
      <Label>Label</Label>
      <Combobox
        options={options()}
        setSelected={comboboxStore.setSelected}
        selected={comboboxStore.selected()}
        // @ts-expect-error should error since it is not part of the form data, intended to test this functionality
        name="combobo"
        formData={formStore.data}
      />
    </FormField>
  );
};

export const NoFiltering = () => {
  const [options] = createSignal<ComboboxOption<CustomExtraData>[]>(baseOptions);
  const comboboxStore = comboboxComponentUtils.createValueStore();

  return (
    <FormField>
      <Combobox options={options()} setSelected={comboboxStore.setSelected} selected={comboboxStore.selected()} />
    </FormField>
  );
};
