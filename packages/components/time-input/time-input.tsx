import { type JSX, createReaction, createSignal, mergeProps, splitProps } from 'solid-js';

import Input, { type InputProps } from '$/components/input';
import { DEFAULT_VALUE, EditItem, editItemsOrder, timeInputComponentUtils } from '$/components/time-input/utils';
import type { DefaultFormData } from '$/stores/form/utils';
import { Key } from '$/types/generic';

export type TimeInputProps<TFormData = DefaultFormData> = InputProps<TFormData> & {
  // @todo(!!!) implement
  format?: string;
};

const TimeInput = <TFormData = DefaultFormData>(passedProps: TimeInputProps<TFormData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ placeholder: 'Time', format: '' }, passedProps), ['format']);

  let inputRef: HTMLInputElement | undefined;
  const [activeEditItem, setActiveEditItem] = createSignal<EditItem>(EditItem.NONE);
  const [activeEditCharacter, setActiveEditCharacter] = createSignal<number>(0);
  const [disableValidation, setDisabledValidation] = createSignal(false);

  const updateActiveEditItemBySelection = () => {
    if (!inputRef) {
      return;
    }

    const selectionStart = inputRef.selectionStart;

    if (selectionStart === null) {
      return;
    }

    if (selectionStart >= 0 && selectionStart <= 2) {
      setActiveEditItem(EditItem.HOURS);
    } else if (selectionStart >= 3 && selectionStart <= 5) {
      setActiveEditItem(EditItem.MINUTES);
    } else {
      setActiveEditItem(EditItem.MERIDIEM);
    }
  };

  const inlineUpdateInputValue = (currentValue: string, newPartValue: string, selectionRange: number[]) => {
    if (!inputRef) {
      return;
    }

    const prepend = currentValue.substring(0, selectionRange[0]);
    const append = currentValue.substring(selectionRange[1]);

    inputRef.value = `${prepend}${newPartValue}${append}`;
    inputRef.setSelectionRange(selectionRange[0], selectionRange[1]);
    inputRef.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const handleFocus: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = () => {
    if (!inputRef) {
      return;
    }

    if (!inputRef.value) {
      inputRef.value = DEFAULT_VALUE;
    }

    // this should handle cases where the user tabs into the input
    const isDefaultSelect = inputRef.selectionStart === 0 && inputRef.selectionEnd === inputRef.value.length;

    if (inputRef.value === DEFAULT_VALUE || isDefaultSelect) {
      setActiveEditItem(EditItem.HOURS);
    }
  };

  const handleBlur: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = () => {
    if (!inputRef) {
      return;
    }

    setActiveEditItem(EditItem.NONE);

    if (inputRef.value === DEFAULT_VALUE) {
      inputRef.value = '';
    }
  };

  const handleMouseUp: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent> = () => {
    if (!inputRef) {
      return;
    }

    updateActiveEditItemBySelection();
  };

  const handleKeyDown: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = (event) => {
    if (!inputRef) {
      return;
    }

    const currentActiveEditItem = activeEditItem();

    if (currentActiveEditItem === EditItem.NONE) {
      return;
    }

    const selectionRange = timeInputComponentUtils.getEditItemStringLocations(currentActiveEditItem);

    if (!selectionRange) {
      return;
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case Key.ARROW_LEFT:
      case Key.ARROW_RIGHT: {
        const newEditItemIndex = timeInputComponentUtils.getNewEditItemIndex(
          currentActiveEditItem,
          event.key === Key.ARROW_LEFT ? -1 : 1,
          {
            allowWrapping: true,
          },
        );

        if (newEditItemIndex === -1) {
          return;
        }

        event.preventDefault();

        setActiveEditItem(editItemsOrder[newEditItemIndex]);

        break;
      }

      case Key.ARROW_DOWN:
      case Key.ARROW_UP: {
        event.preventDefault();

        const isUp = event.key === Key.ARROW_UP;
        const currentEditItemValue = inputRef.value.substring(inputRef.selectionStart || 0, inputRef.selectionEnd || 0);
        const newEditItemValue = timeInputComponentUtils.getNewSteppedEditItemValue(
          currentActiveEditItem,
          currentEditItemValue,
          isUp,
        );

        if (!newEditItemValue) {
          return;
        }

        inlineUpdateInputValue(inputRef.value, newEditItemValue, selectionRange);

        break;
      }

      case Key.LOWER_A:
      case Key.UPPER_A:
      case Key.LOWER_P:
      case Key.UPPER_P: {
        event.preventDefault();

        const meridiemValue = event.key.toLowerCase() === Key.LOWER_A ? 'am' : 'pm';

        inlineUpdateInputValue(inputRef.value, meridiemValue, selectionRange);

        break;
      }

      case Key.ALPHA_NUMERIC:
      case Key.ZERO:
      case Key.ONE:
      case Key.TWO:
      case Key.THREE:
      case Key.FOUR:
      case Key.FIVE:
      case Key.SIX:
      case Key.SEVEN:
      case Key.EIGHT:
      case Key.NINE: {
        event.preventDefault();

        const isFirstCharacter = activeEditCharacter() === 0;
        const currentEditItemValue = inputRef.value.substring(selectionRange[0], selectionRange[1]);
        const newItemValue = isFirstCharacter ? `0${event.key}` : `${currentEditItemValue.substring(1, 2)}${event.key}`;
        const numericValue = Number.parseInt(event.key);

        inlineUpdateInputValue(inputRef.value, newItemValue, selectionRange);

        if (
          isFirstCharacter &&
          ((currentActiveEditItem === EditItem.HOURS && numericValue < 2) ||
            (currentActiveEditItem === EditItem.MINUTES && numericValue < 6))
        ) {
          setActiveEditCharacter(1);

          return;
        }

        if (currentActiveEditItem === EditItem.MERIDIEM) {
          return;
        }

        const newEditItemIndex = timeInputComponentUtils.getNewEditItemIndex(currentActiveEditItem, 1);

        if (newEditItemIndex === -1) {
          return;
        }

        setActiveEditItem(editItemsOrder[newEditItemIndex]);

        break;
      }

      case Key.TAB: {
        // we want the default action here
        break;
      }

      default:
        event.preventDefault();
        break;
    }
  };

  const trackActiveEditItemChange = createReaction(() => {
    trackActiveEditItemChange(() => activeEditItem());

    const currentActiveEditItem = activeEditItem();

    if (!inputRef || currentActiveEditItem === EditItem.NONE) {
      return;
    }

    const newSelectionRange = timeInputComponentUtils.getEditItemStringLocations(currentActiveEditItem);

    if (!newSelectionRange) {
      return;
    }

    setActiveEditCharacter(0);

    inputRef.setSelectionRange(newSelectionRange[0], newSelectionRange[1]);
  });

  trackActiveEditItemChange(() => activeEditItem());

  return (
    <Input
      ref={inputRef}
      data-id="time-input"
      {...restOfProps}
      type="type"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TimeInput;
