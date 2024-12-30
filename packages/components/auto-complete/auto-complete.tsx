import classnames from 'classnames';
import { type Accessor, For, Show, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  AsyncOptionsState,
  type AutoCompleteExtraData,
  type AutoCompleteOption,
  type AutoCompleteProps,
  autoCompleteUtils,
} from '$/components/auto-complete/utils';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import Input from '$/components/input';
import List from '$/components/list';

import styles from './auto-complete.module.css';

const AutoComplete = <TData extends AutoCompleteExtraData>(passedProps: AutoCompleteProps<TData>) => {
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

      // we move out the id in order to assign it to the input so things like label for works
      'id',
      'name',
      'disabled',
    ],
  );

  const autoCompleteStore = autoCompleteUtils.createAutoComplete(props);

  const onClickClearTrigger = () => {
    if (autoCompleteStore.inputHasClearableValue()) {
      autoCompleteStore.clearSelection(false);
    }
  };

  const onClickDropDownIndicator = () => {
    autoCompleteStore.store.inputRef?.focus();
  };

  return (
    <div data-id="auto-complete" class={styles.autoComplete} {...restOfProps}>
      <Input
        {...autoCompleteStore.getInputProps()}
        inputContainerClass={autoCompleteStore.store.isOpen ? styles.inputContainer : undefined}
        type="text"
        data-uncontrolled-value="true"
        disabled={props.disabled}
        validationState={props.validationState}
        postItem={
          props.disabled ? null : (
            <>
              <Show
                when={
                  props.showClearIcon && !autoCompleteStore.store.isOpen && autoCompleteStore.inputHasClearableValue()
                }
              >
                <Icon data-id="clear-icon-trigger" icon="close" onClick={onClickClearTrigger} />
              </Show>
              <Icon data-id="input-icon-indicator" icon="arrow_drop_down" onClick={onClickDropDownIndicator} />
            </>
          )
        }
        postItemIsClickable
      />
      <List
        data-id="options"
        class={classnames(styles.list, {
          [styles.openedList]: autoCompleteStore.store.isOpen,
        })}
        {...autoCompleteStore.getOptionsContainerProps()}
      >
        <Show when={autoCompleteStore.store.isOpen && autoCompleteStore.asyncOptionsAreLoading()}>
          <List.Item data-id="async-options-loading" class={styles.listOption}>
            <Icon class={classnames(styles.loadingIndicator, iconStyles.spacingRight)} icon="refresh" /> Loading...
          </List.Item>
        </Show>
        <Show
          when={
            autoCompleteStore.store.isOpen &&
            autoCompleteStore.store.asyncOptionsState === AsyncOptionsState.BEFORE_THRESHOLD
          }
        >
          <List.Item data-id="async-options-before-threshold" class={styles.listOption}>
            Type {autoCompleteStore.store.asyncThreshold} characters for options...
          </List.Item>
        </Show>
        <Show when={autoCompleteStore.store.isOpen && autoCompleteStore.showOptions()}>
          <For
            each={autoCompleteStore.store.displayOptions}
            fallback={
              <Show when={!autoCompleteStore.asyncOptionsAreLoading()}>
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
                  {...autoCompleteStore.getSelectionOptionProps()}
                  option={option}
                  optionIndex={optionIndex()}
                />
              );
            }}
          </For>
        </Show>
      </List>
      <Show when={props.isMulti && props.selected.length > 0 && !!props.selectedComponent}>
        <div data-id="selected-options">
          <For each={props.selected}>
            {(option: AutoCompleteOption<TData>, optionIndex: Accessor<number>) => {
              return (
                <Dynamic
                  component={passedProps.selectedComponent}
                  {...autoCompleteStore.getSelectedOptionProps()}
                  option={option}
                  optionIndex={optionIndex()}
                />
              );
            }}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default AutoComplete;
