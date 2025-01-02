import classnames from 'classnames';
import { type Accessor, For, Show, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  AsyncOptionsState,
  type ComboboxExtraData,
  type ComboboxOption,
  type ComboboxProps,
  comboboxUtils,
} from '$/components/combobox/utils';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import Input from '$/components/input';
import List from '$/components/list';

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

      // we move out the id in order to assign it to the input so things like label for works
      'id',
      'name',
      'disabled',
    ],
  );

  const comboboxStore = comboboxUtils.createCombobox(props);

  const onClickClearTrigger = () => {
    if (comboboxStore.inputHasClearableValue()) {
      comboboxStore.clearSelection(false);
    }
  };

  const onClickDropDownIndicator = () => {
    comboboxStore.store.inputRef?.focus();
  };

  return (
    <div data-id="combobox" {...restOfProps} class={classnames(styles.combobox, props.class)}>
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
        data-id="options"
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
          <For
            each={comboboxStore.store.displayOptions}
            fallback={
              <Show when={!comboboxStore.asyncOptionsAreLoading()}>
                <List.Item data-id="option no-options-found" class={styles.listOption}>
                  No Options Found"
                </List.Item>
              </Show>
            }
          >
            {(option, optionIndex) => {
              return (
                <Dynamic
                  component={props.selectableComponent}
                  {...comboboxStore.getSelectionOptionProps()}
                  option={option}
                  optionIndex={optionIndex()}
                />
              );
            }}
          </For>
        </Show>
      </List>
    </div>
  );
};

export default Combobox;
