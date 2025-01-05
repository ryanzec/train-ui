import SelectableGroupHeader from '$/components/combobox/selectable-group-header';
import type {
  ComboboxExtraData,
  ComboboxOption,
  ComboboxSelectableOptionProps,
  GetSelectableOptionPropsReturns,
} from '$/components/combobox/utils';
import { For, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type OptionsProps<TData extends ComboboxExtraData> = {
  options: ComboboxOption<TData>[];
  groupLabel: string;
  selectableComponent: (props: ComboboxSelectableOptionProps<TData>) => JSX.Element;
  asyncOptionsAreLoading: () => boolean;
  getSelectionOptionProps: () => GetSelectableOptionPropsReturns<TData>;
  indexOffset: number;
};

const Options = <TData extends ComboboxExtraData>(props: OptionsProps<TData>) => {
  return (
    <>
      <Show when={!!props.groupLabel}>
        <SelectableGroupHeader label={props.groupLabel} />
      </Show>
      <For each={props.options}>
        {(option, optionIndex) => {
          return (
            <>
              <Dynamic
                component={props.selectableComponent}
                {...props.getSelectionOptionProps()}
                option={option}
                optionIndex={optionIndex() + props.indexOffset}
              />
            </>
          );
        }}
      </For>
    </>
  );
};

export default Options;
