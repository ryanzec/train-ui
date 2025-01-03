import classnames from 'classnames';
import { type Accessor, For, Show, batch, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  AsyncOptionsState,
  COMBOBOX_GROUPED_DATA_ATTRIBUTE,
  type ComboboxExtraData,
  type ComboboxOption,
  type ComboboxProps,
  comboboxUtils,
} from '$/components/combobox/utils';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import Input from '$/components/input';
import List from '$/components/list';

import Options from '$/components/combobox/options';
import styles from './combobox.module.css';

const Combobox = <TData extends ComboboxExtraData>(passedProps: ComboboxProps<TData>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        placeholder: 'Select option...',
        autoShowOptions: false,
        forceSelection: true,
        isMulti: false,
        asyncDelay: 350,
        removeOnDuplicateSingleSelect: false,
        disabled: false,
        showClearIcon: true,
        ungroupedKey: 'Ungrouped',
      },
      passedProps,
    ),
    [
      'selected',
      'setSelected',
      'placeholder',
      'options',
      'autoShowOptions',
      'forceSelection',
      'filterOptions',
      'isMulti',
      'getOptionsAsync',
      'asyncDelay',
      'selectedComponent',
      'selectableComponent',
      'onDeleteOption',
      'asyncThreshold',
      'removeOnDuplicateSingleSelect',
      'validationState',
      'showClearIcon',
      'class',
      'ungroupedKey',

      // we move out the id in order to assign it to the input so things like label for works
      'id',
      'name',
      'disabled',
    ],
  );

  const comboboxStore = comboboxUtils.createCombobox(props);

  const [groupedOptions, setGroupedOptions] = createSignal<ComboboxOption<TData>[][]>([]);
  const [groupedOptionKeys, setGroupedOptionKeys] = createSignal<string[]>([]);
  const [indexOffsets, setIndexOffsets] = createSignal<number[]>([]);
  const [totalOptionsCount, setTotalOptionsCount] = createSignal(0);

  const onClickClearTrigger = () => {
    if (comboboxStore.inputHasClearableValue()) {
      comboboxStore.clearSelection(false);
    }
  };

  const onClickDropDownIndicator = () => {
    comboboxStore.store.inputRef?.focus();
  };

  const dynamicProps = {
    [COMBOBOX_GROUPED_DATA_ATTRIBUTE]: comboboxStore.isGrouped() ? 'true' : 'false',
  };

  // maintained the list of displayed options in the grouped format
  createEffect(() => {
    const defaultGroupKey = comboboxStore.isGrouped() ? props.ungroupedKey : '';
    const tempGroupedOptions = comboboxStore.store.displayOptions.reduce<Record<string, ComboboxOption<TData>[]>>(
      (collector, displayOption) => {
        const groupKey = displayOption.groupKey ?? defaultGroupKey;

        if (!collector[groupKey]) {
          collector[groupKey] = [];
        }

        collector[groupKey].push(displayOption);

        return collector;
      },
      {},
    );

    // @todo add ordering

    const indexOffsets: number[] = [];
    const testGroupedOptions2: ComboboxOption<TData>[][] = [];
    const testGroupedOptions3: string[] = [];
    let currentTotalCount = 0;

    for (const groupKey in tempGroupedOptions) {
      indexOffsets.push(currentTotalCount);
      testGroupedOptions2.push(tempGroupedOptions[groupKey]);
      testGroupedOptions3.push(groupKey);

      currentTotalCount += tempGroupedOptions[groupKey].length;
    }

    setTotalOptionsCount(currentTotalCount);
    setGroupedOptions(testGroupedOptions2);
    setIndexOffsets(indexOffsets);
    setGroupedOptionKeys(testGroupedOptions3);
  });

  return (
    <div data-id="combobox" {...restOfProps} class={classnames(styles.combobox, props.class)} {...dynamicProps}>
      <div>
        <Input
          {...comboboxStore.getInputProps()}
          inputContainerClass={comboboxStore.store.isOpen ? styles.inputContainer : undefined}
          type="text"
          data-uncontrolled-value="true"
          disabled={props.disabled}
          validationState={props.validationState}
          preItemIsInline
          inlineItem={
            <Show when={props.isMulti && props.selected.length > 0 && !!props.selectedComponent}>
              {/*<div class={styles.selectedOptions}>*/}
              {/*  <div data-id="selected-options">*/}
              <For each={props.selected}>
                {(option: ComboboxOption<TData>, optionIndex: Accessor<number>) => {
                  return (
                    <Dynamic
                      component={passedProps.selectedComponent}
                      {...comboboxStore.getSelectedOptionProps()}
                      option={option}
                      optionIndex={optionIndex()}
                    />
                  );
                }}
              </For>
              {/*  </div>*/}
              {/*</div>*/}
            </Show>
          }
          postItem={
            props.disabled ? null : (
              <>
                <Show
                  when={props.showClearIcon && !comboboxStore.store.isOpen && comboboxStore.inputHasClearableValue()}
                >
                  <Icon data-id="clear-icon-trigger" icon="close" onClick={onClickClearTrigger} />
                </Show>
                <Icon data-id="input-icon-indicator" icon="arrow_drop_down" onClick={onClickDropDownIndicator} />
              </>
            )
          }
          postItemIsClickable
        />
      </div>
      <List
        data-id="selectable-options"
        class={classnames(styles.list, {
          [styles.openedList]: comboboxStore.store.isOpen,
        })}
        {...comboboxStore.getOptionsContainerProps()}
      >
        <Show when={comboboxStore.store.isOpen && comboboxStore.asyncOptionsAreLoading()}>
          <List.Item data-id="async-options-loading" class={styles.listOption}>
            <Icon class={classnames(styles.loadingIndicator, iconStyles.spacingRight)} icon="refresh" /> Loading...
          </List.Item>
        </Show>
        <Show
          when={
            comboboxStore.store.isOpen && comboboxStore.store.asyncOptionsState === AsyncOptionsState.BEFORE_THRESHOLD
          }
        >
          <List.Item data-id="async-options-before-threshold" class={styles.listOption}>
            Type {comboboxStore.store.asyncThreshold} characters for options...
          </List.Item>
        </Show>
        <Show when={comboboxStore.store.isOpen && comboboxStore.showOptions()}>
          <Show
            when={totalOptionsCount() > 0}
            fallback={
              <Show when={!comboboxStore.asyncOptionsAreLoading()}>
                <List.Item data-id="no-options-found" class={styles.listOption}>
                  No Options Found
                </List.Item>
              </Show>
            }
          >
            <For each={groupedOptions()}>
              {(options, index) => {
                return (
                  <Options
                    options={options}
                    groupLabel={groupedOptionKeys()[index()]}
                    selectableComponent={props.selectableComponent}
                    asyncOptionsAreLoading={comboboxStore.asyncOptionsAreLoading}
                    getSelectionOptionProps={comboboxStore.getSelectionOptionProps}
                    indexOffset={indexOffsets()[index()]}
                  />
                );
              }}
            </For>
          </Show>
        </Show>
      </List>
    </div>
  );
};

export default Combobox;
