import { debounce } from '@solid-primitives/scheduled';
import { type Accessor, type JSX, createEffect, createSignal, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import type { FormInputValidationState } from '$/stores/form/utils';
import { Key } from '$/types/generic';
import { domUtils } from '$/utils/dom';

export type ComboboxOptionValue = string | number;

// we use the as the default for extending the auto complete option to allow any data
export interface ComboboxExtraData {
  // biome-ignore lint/suspicious/noExplicitAny: to make this be easier to be used as a generic type, we need to
  // biome-ignore lint/suspicious/noExplicitAny: allow any extra data for auto complete options
  [key: string]: any;
}

export type ComboboxOption<TData = ComboboxExtraData> = {
  display: string;
  value: ComboboxOptionValue;
} & TData;

export enum AsyncOptionsState {
  // nothing is happening
  NOT_APPLICABLE = 'not-applicable',

  // wait for the debounced request to be executed
  DEBOUNCED = 'debounced',

  // async request in progress
  FETCHING = 'fetching',

  // async request has successful completed
  SUCCESSFUL = 'successful',

  // async request failed to load options
  // @todo handle this properly in the component
  ERROR = 'error',

  BEFORE_THRESHOLD = 'before-threshold',
}

export interface ComboboxSelectableOptionProps<TData extends ComboboxExtraData> {
  option: ComboboxOption<TData>;
  optionIndex: number;
  isFocusedOption: (optionIndex: number) => boolean;
  isSelectedOption: (value: ComboboxOptionValue) => boolean;
  onMouseEnterOption: (optionIndex: number) => void;
  onMouseLeaveOption: () => void;
  onMouseDownOption: (option: ComboboxOption<TData>) => void;
}

export interface ComboboxSelectedOptionProps<TData extends ComboboxExtraData> {
  option: ComboboxOption<TData>;
  optionIndex: number;
  removeValue: (optionIndex: number) => void;
}

export interface ComboboxProps<TData extends ComboboxExtraData> extends JSX.HTMLAttributes<HTMLDivElement> {
  selected: ComboboxOption<TData>[];
  setSelected: (option: ComboboxOption<TData>[]) => void;
  placeholder?: string;
  options: ComboboxOption<TData>[];
  autoShowOptions?: boolean;
  forceSelection?: boolean;
  filterOptions?: (
    options: ComboboxOption<TData>[],
    inputValue?: string,
    excludeValues?: ComboboxOptionValue[],
  ) => ComboboxOption<TData>[];
  isMulti?: boolean;
  getOptionsAsync?: (inputValue?: string) => Promise<ComboboxOption<TData>[]>;
  asyncDelay?: number;
  selectedComponent?: (props: ComboboxSelectedOptionProps<TData>) => JSX.Element;
  selectableComponent: (props: ComboboxSelectableOptionProps<TData>) => JSX.Element;
  onDeleteOption?: (deletedOption: ComboboxOption<TData>) => void;
  asyncThreshold?: number;
  name: string;
  removeOnDuplicateSingleSelect?: boolean;
  disabled?: boolean;
  validationState?: FormInputValidationState;
  showClearIcon?: boolean;
}

export interface GetSelectableOptionPropsReturns<TData extends ComboboxExtraData> {
  isFocusedOption: (optionIndex: number) => boolean;
  isSelectedOption: (value: ComboboxOptionValue) => boolean;
  onMouseEnterOption: (optionIndex: number) => void;
  onMouseLeaveOption: () => void;
  onMouseDownOption: (option: ComboboxOption<TData>) => void;
}

export interface GetInputPropsReturns {
  ref: (element: HTMLInputElement) => void;
  disabled: boolean;
  value: string;
  onFocus: (event: Event) => void;
  onBlur: (event: Event) => void;
  onKeyDown: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;
  onKeyUp: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;
  placeholder?: string;
  id?: string;
  name: string;
}

export interface GetSelectedOptionPropsReturns {
  removeValue: (optionIndex: number) => void;
}

export interface GetOptionsContainerPropsReturns {
  ref: (element: HTMLDivElement) => void;
}

export interface ComboboxStore<TData extends ComboboxExtraData> {
  disabled: boolean;
  inputValue: string;
  isOpen: boolean;
  displayOptions: ComboboxOption<TData>[];
  focusedOptionIndex?: number;
  focusedOption?: ComboboxOption<TData>;
  inputRef?: HTMLInputElement;
  optionsContainerRef?: HTMLDivElement;
  keepFocusOnBlur: boolean;
  isLoadingAsyncOptions: boolean;
  asyncOptionsState: AsyncOptionsState;
  asyncThreshold: number;
}

const removeInvalidOptions = <TData>(options: ComboboxOption<TData>[]) => {
  return options.filter((option) => {
    // since value can be anything, 0 should be a valid value
    return (option.value || option.value === 0) && option.display;
  });
};

const getComboboxStoreDefaults = <TData extends ComboboxExtraData>() => {
  return {
    disabled: false,
    inputValue: '',
    isOpen: false,
    displayOptions: [],
    keepFocusOnBlur: false,
    isLoadingAsyncOptions: false,
    asyncOptionsState: AsyncOptionsState.NOT_APPLICABLE,
    asyncThreshold: 3,
  } as ComboboxStore<TData>;
};

const createCombobox = <TData extends ComboboxExtraData>(props: ComboboxProps<TData>) => {
  const orderDisplayOptions = (options: ComboboxOption<TData>[]) => {
    if (!props.isMulti) {
      return options;
    }

    // we need to copy the options so we don't affect the default order so that when options are deselected, they
    // go back to there normal order instead of remaining in the position based on when they were selected.
    const orderOptions = [...options];

    orderOptions.sort((a: ComboboxOption<TData>, b: ComboboxOption<TData>) => {
      if (isSelectedOption(a.value) && !isSelectedOption(b.value)) {
        return -1;
      }

      if (!isSelectedOption(a.value) && isSelectedOption(b.value)) {
        return 1;
      }

      return 0;
    });

    return orderOptions;
  };

  // make sure data is properly set if there is an initial selected value
  const validOptions = removeInvalidOptions(props.options);
  const foundOptionIndex = props.isMulti
    ? -1
    : validOptions.findIndex((value) => value.value === props.selected?.[0]?.value);
  const focusedOption = foundOptionIndex !== -1 ? validOptions[foundOptionIndex] : undefined;
  const focusedOptionIndex = foundOptionIndex !== -1 ? foundOptionIndex : undefined;

  const [comboboxStore, setComboboxStore] = createStore<ComboboxStore<TData>>({
    ...getComboboxStoreDefaults<TData>(),
    displayOptions: props.getOptionsAsync ? [] : validOptions,
    focusedOption,
    focusedOptionIndex,
    inputValue: focusedOption?.display ?? '',
  });

  const getDisplayOptionIndex = (option?: ComboboxOption<TData>) => {
    return comboboxStore.displayOptions.findIndex((value) => value.value === option?.value);
  };

  const getSelectedOptionIndex = (option?: ComboboxOption<TData>) => {
    return props.selected.findIndex((value) => value.value === option?.value);
  };

  const getSelectedValues = (forFiltering = false) => {
    // single select should not filter out values
    if (forFiltering && props.isMulti === false) {
      return [];
    }

    return props.selected.map((option) => option.value);
  };

  const getDefaultIsOpen = () => {
    return !!props.autoShowOptions || !!props.getOptionsAsync;
  };

  const openCombobox = () => {
    if (!props.isMulti) {
      const foundOptionIndex = getDisplayOptionIndex(props.selected[0]);

      if (getDefaultIsOpen() && foundOptionIndex !== -1) {
        setFocusedOption(foundOptionIndex);
      }
    }

    setComboboxStore(
      produce((store) => {
        store.isOpen = getDefaultIsOpen();

        // if we are getting the options from an async source then we don't need to so this since that process
        // happens own its own and ignores the statically passed in options
        if ((props.isMulti || foundOptionIndex !== -1) && !props.getOptionsAsync && props.filterOptions) {
          store.displayOptions = props.filterOptions(
            removeInvalidOptions(props.options),
            props.isMulti ? '' : comboboxStore.displayOptions[foundOptionIndex].display,
            getSelectedValues(true),
          );
        } else {
          // since the options could have changes since the component was first rendered, we need to make sure to
          // set sync the display options to that
          store.displayOptions = removeInvalidOptions(props.options);
        }

        store.displayOptions = orderDisplayOptions(store.displayOptions);
      }),
    );
  };

  const closeCombobox = () => {
    setComboboxStore(
      produce((store) => {
        // we check this at the top as the selectValue() calls below if need will properly set the input value is
        // there is a selected
        if (props.forceSelection) {
          store.inputValue = !props.isMulti && props.selected.length > 0 ? props.selected[0].display : '';
        }

        store.isOpen = false;
        store.focusedOption = undefined;
        store.focusedOptionIndex = undefined;
      }),
    );

    comboboxStore.inputRef?.blur();
  };

  const getSelectValue = (): ComboboxOption<TData> | undefined => {
    if (comboboxStore.focusedOption) {
      return comboboxStore.focusedOption;
    }

    if ((props.selected.length === 0 && !props.forceSelection) || (!props.forceSelection && comboboxStore.inputValue)) {
      // @todo(refactor) not sure if there is a way to avoid the explicit cast here
      return {
        display: comboboxStore.inputValue,
        value: comboboxStore.inputValue,
      } as ComboboxOption<TData>;
    }

    return;
  };

  interface SelectValueOptions {
    removeDuplicateSingle?: boolean;
  }

  const selectValue = (option: ComboboxOption<TData>, options: SelectValueOptions = {}) => {
    // if the user is able to click on a selectable option that is already selected, we assume this value should
    // be unselected regardless if in multi mode since this library is opinionated in that you should not be able
    // to select the same thing multiple times
    if (props.isMulti && isSelectedOption(option.value)) {
      removeValue(getSelectedOptionIndex(option));
    } else {
      // there are cases where we do and don't what to remove the value if already selected in single-select mode
      //  depending on how the select value was triggered so we use the removeDuplicateSingle to determine this
      if (options.removeDuplicateSingle && isSelectedOption(option.value)) {
        removeValue(getSelectedOptionIndex(option));
      } else {
        props.setSelected(props.isMulti ? [...props.selected, option] : [option]);
      }
    }

    setComboboxStore(
      produce((store) => {
        store.inputValue = props.isMulti ? '' : option.display;
        store.focusedOption = undefined;
        store.focusedOptionIndex = undefined;

        if (props.isMulti) {
          if (props.getOptionsAsync) {
            store.displayOptions = [];

            return store;
          }

          if (!props.filterOptions) {
            return store;
          }

          store.displayOptions = props.filterOptions(
            removeInvalidOptions(props.options),
            store.inputValue,
            getSelectedValues(true),
          );
        }

        store.displayOptions = orderDisplayOptions(store.displayOptions);
      }),
    );
  };

  const removeValue = (selectedIndex: number) => {
    if (props.selected.length === 0) {
      return;
    }

    const deletedOption = props.selected[selectedIndex];

    props.setSelected([...props.selected.slice(0, selectedIndex), ...props.selected.slice(selectedIndex + 1)]);

    if (props.onDeleteOption) {
      props.onDeleteOption(deletedOption);
    }
  };

  const clearSelection = (optionAfterClear?: boolean) => {
    if (!props.isMulti) {
      props.setSelected([]);
    }

    setComboboxStore(
      produce((store) => {
        store.isOpen = optionAfterClear !== undefined ? optionAfterClear : getDefaultIsOpen();
        store.inputValue = '';
        store.focusedOption = undefined;
        store.focusedOptionIndex = undefined;
      }),
    );
  };

  const isFocusedOption = (optionIndex: number) => {
    return comboboxStore.focusedOptionIndex === optionIndex;
  };

  const isSelectedOption = (value: ComboboxOptionValue) => {
    return !!props.selected.find((selectedItem) => selectedItem.value === value);
  };

  const setFocusedOption = (optionIndex: number) => {
    let newOptionIndex = optionIndex;

    if (optionIndex < 0) {
      newOptionIndex = comboboxStore.displayOptions.length - 1;
    } else if (optionIndex >= comboboxStore.displayOptions.length) {
      newOptionIndex = 0;
    }

    setComboboxStore(
      produce((store) => {
        // we need to make sure to show the option when we are selecting an index as if we don't, a selection could
        // be made without the user knowing
        store.isOpen = true;
        store.focusedOptionIndex = newOptionIndex;
        store.focusedOption = store.displayOptions[newOptionIndex];
      }),
    );
  };

  const clearFocusedOption = () => {
    setComboboxStore(
      produce((store) => {
        store.focusedOptionIndex = undefined;
        store.focusedOption = undefined;
      }),
    );
  };

  const onFocusInput = () => {
    openCombobox();
  };

  const onBlurInput = () => {
    if (comboboxStore.keepFocusOnBlur) {
      comboboxStore.inputRef?.focus();

      setComboboxStore(
        produce((store) => {
          store.keepFocusOnBlur = false;
        }),
      );

      return;
    }

    const selectedValue = getSelectValue();

    if (selectedValue) {
      // regardless of the props passed in for this functionality, we don't want to do this when blurring as
      // removal should be an explicit user interaction and not a implicit one
      selectValue(selectedValue, { removeDuplicateSingle: false });
    }

    closeCombobox();
  };

  const onKeyDownInput: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = (event) => {
    switch (event.key) {
      case Key.ESCAPE: {
        const hasValue = !!event.currentTarget.value;

        clearSelection();

        // we want to use escape as a way to clear any previous value so if there was one, we don't want to blur
        // to make it easier to clear the current value and start typing for a new one
        if (!hasValue) {
          comboboxStore.inputRef?.blur();
        }

        break;
      }

      case Key.ARROW_DOWN: {
        // this should make the down arrow start with the first item
        setFocusedOption((comboboxStore.focusedOptionIndex ?? -1) + 1);

        const elementToScrollTo = comboboxStore.optionsContainerRef?.querySelector(
          `[data-combobox-value="${comboboxStore.focusedOption?.value}"]`,
        ) as HTMLElement;

        if (elementToScrollTo) {
          domUtils.scrollToElement(elementToScrollTo);
        }

        break;
      }

      case Key.ARROW_UP: {
        // this should make the up arrow start with the last item
        setFocusedOption((comboboxStore.focusedOptionIndex ?? comboboxStore.displayOptions.length) - 1);

        const elementToScrollTo = comboboxStore.optionsContainerRef?.querySelector(
          `[data-combobox-value="${comboboxStore.focusedOption?.value}"]`,
        ) as HTMLElement;

        if (elementToScrollTo) {
          domUtils.scrollToElement(elementToScrollTo);
        }

        break;
      }

      case Key.TAB:
      case Key.ENTER: {
        const selectedValue = getSelectValue();

        if (selectedValue) {
          // since there is a selected value, we should not do the default for these keys since we are selecting
          // the value instead
          event.preventDefault();

          selectValue(selectedValue, {
            removeDuplicateSingle: props.removeOnDuplicateSingleSelect,
          });
        }

        if (props.isMulti) {
          setComboboxStore(
            produce((store) => {
              store.isOpen = getDefaultIsOpen();
            }),
          );

          return;
        }

        comboboxStore.inputRef?.blur();

        break;
      }
    }
  };

  const onKeyUpInput: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = (event) => {
    if (event.currentTarget.value === comboboxStore.inputValue) {
      return;
    }

    setComboboxStore(
      produce((store) => {
        const shouldBeOpened = event.currentTarget.value !== '' || getDefaultIsOpen();
        store.isOpen = shouldBeOpened;
        store.inputValue = event.currentTarget.value;

        if (!shouldBeOpened) {
          store.focusedOption = undefined;
          store.focusedOptionIndex = undefined;
        }

        // async options happens in it own effect so we can skip this process
        if (!props.getOptionsAsync && props.filterOptions) {
          store.displayOptions = props.filterOptions(
            removeInvalidOptions(props.options),
            event.currentTarget.value,
            getSelectedValues(true),
          );
        }

        store.displayOptions = orderDisplayOptions(store.displayOptions);
      }),
    );
  };

  const onMouseDownSelectableOption = (option: ComboboxOption<TData>) => {
    selectValue(option, {
      removeDuplicateSingle: props.removeOnDuplicateSingleSelect,
    });

    // when in multi select mode we want to make sure we keep the focus on the input after they select since
    // multiple selection can be able and having a UX where the user needs to refocus the input after each select
    // is not great
    if (props.isMulti) {
      setComboboxStore(
        produce((store) => {
          store.keepFocusOnBlur = true;
          store.inputValue = '';
        }),
      );
    }
  };

  const onMouseEnterSelectableOption = (optionIndex: number) => {
    setFocusedOption(optionIndex);
  };

  const onMouseLeaveSelectableOption = () => {
    clearFocusedOption();
  };

  const inputRef = (element: HTMLInputElement) => {
    setComboboxStore(
      produce((store) => {
        store.inputRef = element;
      }),
    );
  };

  const optionsContainerRef = (element: HTMLDivElement) => {
    setComboboxStore(
      produce((store) => {
        store.optionsContainerRef = element;
      }),
    );
  };

  const getOptionsAsync = debounce(async (inputValue?: string) => {
    if (!props.getOptionsAsync || !inputValue) {
      return;
    }

    if (inputValue.length < comboboxStore.asyncThreshold) {
      setComboboxStore(
        produce((store) => {
          store.asyncOptionsState = AsyncOptionsState.BEFORE_THRESHOLD;
        }),
      );

      return;
    }

    setComboboxStore(
      produce((store) => {
        store.isLoadingAsyncOptions = true;
        store.asyncOptionsState = AsyncOptionsState.FETCHING;
      }),
    );

    try {
      const asyncOptions = await props.getOptionsAsync(inputValue);

      // since it is possible for the user to have trigger an async request for option but make a change to the
      // input before that request returned results, we check to see if the input value that was used for the
      // request for options matches the current one and if it does not, we ignore these results since they are
      // no longer valid
      if (inputValue !== comboboxStore.inputValue) {
        return;
      }

      setComboboxStore(
        produce((store) => {
          store.displayOptions = orderDisplayOptions(removeInvalidOptions(asyncOptions));
          store.isLoadingAsyncOptions = false;
          store.asyncOptionsState = AsyncOptionsState.SUCCESSFUL;
        }),
      );
    } catch (error) {
      setComboboxStore(
        produce((store) => {
          store.displayOptions = [];
          store.isLoadingAsyncOptions = false;
          store.asyncOptionsState = AsyncOptionsState.ERROR;
        }),
      );
    }
  }, props.asyncDelay);

  const asyncOptionsAreLoading = () => {
    return (
      comboboxStore.asyncOptionsState === AsyncOptionsState.DEBOUNCED ||
      comboboxStore.asyncOptionsState === AsyncOptionsState.FETCHING
    );
  };

  const showOptions = () => {
    return (
      !asyncOptionsAreLoading() &&
      (comboboxStore.asyncOptionsState === AsyncOptionsState.NOT_APPLICABLE ||
        comboboxStore.asyncOptionsState === AsyncOptionsState.SUCCESSFUL ||
        comboboxStore.asyncOptionsState === AsyncOptionsState.DEBOUNCED)
    );
  };

  const inputHasClearableValue = () => !props.isMulti && comboboxStore.inputValue;

  const getInputProps = (): GetInputPropsReturns => {
    return {
      ref: inputRef,
      disabled: comboboxStore.disabled,
      value: comboboxStore.inputValue,
      onFocus: onFocusInput,
      onBlur: onBlurInput,
      onKeyDown: onKeyDownInput,
      onKeyUp: onKeyUpInput,
      placeholder: props.placeholder,
      id: props.id,
      name: props.name,
    };
  };

  const getSelectionOptionProps = (): GetSelectableOptionPropsReturns<TData> => {
    return {
      isFocusedOption,
      isSelectedOption,
      onMouseEnterOption: onMouseEnterSelectableOption,
      onMouseLeaveOption: onMouseLeaveSelectableOption,
      onMouseDownOption: onMouseDownSelectableOption,
    };
  };

  const getSelectedOptionProps = (): GetSelectedOptionPropsReturns => {
    return {
      removeValue,
    };
  };

  const getOptionsContainerProps = (): GetOptionsContainerPropsReturns => {
    return {
      ref: optionsContainerRef,
    };
  };

  // handle making sure if the selected value is in the options list when opening, we scroll to it
  createEffect(() => {
    if (!comboboxStore.isOpen || !comboboxStore.optionsContainerRef || props.isMulti) {
      return;
    }

    const values = getSelectedValues();

    if (values.length === 0) {
      return;
    }

    const elementToScrollTo = comboboxStore.optionsContainerRef?.querySelector(
      `[data-combobox-value="${values[0]}"]`,
    ) as HTMLElement;

    domUtils.scrollToElement(elementToScrollTo);
  });

  // handle the request of async options
  createEffect(() => {
    if (!props.getOptionsAsync) {
      return;
    }

    // there is no reason to request data if the input value is already the selected value
    if (comboboxStore.inputValue === props.selected?.[0]?.display) {
      return;
    }

    setComboboxStore(
      produce((store) => {
        store.asyncOptionsState =
          comboboxStore.inputValue.length >= comboboxStore.asyncThreshold
            ? AsyncOptionsState.DEBOUNCED
            : AsyncOptionsState.BEFORE_THRESHOLD;
      }),
    );

    getOptionsAsync.clear();
    getOptionsAsync(comboboxStore.inputValue);

    onCleanup(() => {
      getOptionsAsync.clear();
    });
  });

  // this makes sure that if the selected value is updated from outside this component, the input value reflects
  // those changes
  // @todo(refactor) is it possible to refactor so all management of the input value is just handled here?
  createEffect(() => {
    setComboboxStore(
      produce((store) => {
        store.inputValue = !props.isMulti && props.selected.length > 0 ? props.selected[0].display : '';
      }),
    );
  });

  return {
    store: comboboxStore,
    getDisplayOptionIndex,
    getSelectedOptionIndex,
    getSelectedValues,
    getDefaultIsOpen,
    openCombobox,
    closeCombobox,
    getSelectValue,
    selectValue,
    removeValue,
    clearSelection,
    isFocusedOption,
    isSelectedOption,
    setFocusedOption,
    clearFocusedOption,
    onFocusInput,
    onBlurInput,
    onKeyDownInput,
    onKeyUpInput,
    onMouseDownSelectableOption,
    onMouseEnterSelectableOption,
    onMouseLeaveSelectableOption,
    inputRef,
    asyncOptionsAreLoading,
    showOptions,
    inputHasClearableValue,
    getInputProps,
    getSelectionOptionProps,
    getSelectedOptionProps,
    getOptionsContainerProps,
  };
};

interface CreateProps<TData = ComboboxExtraData> {
  defaultValue?: ComboboxOption<TData>[];
  onSetSelected?: (selected: ComboboxOption<TData>[]) => void;
}

export interface ComboboxValueStore<TData = ComboboxExtraData> {
  selected: Accessor<ComboboxOption<TData>[]>;
  setSelected: (selected: ComboboxOption<TData>[]) => void;
}

const createComboboxValue = <TData = ComboboxExtraData>(options?: CreateProps<TData>): ComboboxValueStore<TData> => {
  const [selected, internalSetSelected] = createSignal<ComboboxOption<TData>[]>(options?.defaultValue ?? []);

  const setSelected = (selected: ComboboxOption<TData>[]) => {
    internalSetSelected(selected);

    if (options?.onSetSelected) {
      options.onSetSelected(selected);
    }
  };

  return {
    selected,
    setSelected,
  };
};

const simpleFilter = <TData>(options: ComboboxOption<TData>[], inputValue = '') => {
  if (!inputValue) {
    return options;
  }

  return options.filter((option) => {
    return option.display.toLowerCase().includes(inputValue.toLowerCase());
  });
};

const excludeSelectedFilter = <TData>(
  options: ComboboxOption<TData>[],
  inputValue = '',
  excludeValues: ComboboxOptionValue[] = [],
) => {
  if (!inputValue && excludeValues.length === 0) {
    return options;
  }

  return options.filter((option) => {
    return !excludeValues.includes(option.value) && option.display.toLowerCase().includes(inputValue.toLowerCase());
  });
};

export const comboboxUtils = {
  createComboboxValue,
  createCombobox,
  simpleFilter,
  excludeSelectedFilter,
};