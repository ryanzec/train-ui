import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import classnames from 'classnames';
import { createEffect, createSignal, mergeProps, onCleanup, Show, splitProps } from 'solid-js';

import DatePicker, { DatePickerProps } from '$/components/date-picker/date-picker';
import styles from '$/components/date-picker/date-picker.module.css';
import { datePickerUtils } from '$/components/date-picker/utils';
import Input, { InputProps } from '$/components/input';
import { clickOutside } from '$/stores/click-outside';
import { CommonDataAttributes } from '$/types/generic';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutside;

export enum WhichDate {
  FIRST = 'first',
  SECOND = 'second',
}

export interface DatePickerInputProps
  extends InputProps,
    Omit<DatePickerProps, 'onSelectDate' | 'defaultSelectedDate' | 'defaultDisplayDate'>,
    CommonDataAttributes {
  isRange?: boolean;
  onSelectDate?: (date?: Date, which?: WhichDate) => void;
  defaultStartDisplayDate?: Date;
  defaultStartSelectedDate?: Date;
  defaultEndDisplayDate?: Date;
  defaultEndSelectedDate?: Date;
}

const DatePickerInput = (passedProps: DatePickerInputProps) => {
  const [customProps, restOfProps] = splitProps(
    mergeProps(
      {
        isRange: false,
        defaultStartDisplayDate: passedProps.defaultStartSelectedDate ?? new Date(),
        defaultEndDisplayDate: passedProps.defaultEndSelectedDate ?? new Date(),
      },
      passedProps,
    ),
    [
      'children',
      'class',
      'onSelectDate',
      'includeTime',
      'isRange',
      'defaultStartDisplayDate',
      'defaultStartSelectedDate',
      'defaultEndDisplayDate',
      'defaultEndSelectedDate',
    ],
  );
  const [props, datePickerProps] = splitProps(customProps, [
    'children',
    'class',
    'onSelectDate',
    'isRange',
    'defaultStartDisplayDate',
    'defaultStartSelectedDate',
    'defaultEndDisplayDate',
    'defaultEndSelectedDate',
  ]);

  const [containerElement, setContainerElement] = createSignal<HTMLDivElement>();
  const [inputElement, setInputElement] = createSignal<HTMLInputElement>();
  const [isDatePickerVisible, setIsDatePickerVisible] = createSignal(false);
  const startDate = datePickerUtils.createDatePickerInputDate({
    includeTime: datePickerProps.includeTime,
    defaultDate: props.defaultStartSelectedDate,
  });
  const endDate = datePickerUtils.createDatePickerInputDate({
    includeTime: datePickerProps.includeTime,
    defaultDate: props.defaultEndSelectedDate,
  });

  const containerRef = (element: HTMLDivElement) => {
    setContainerElement(element);
  };

  const inputRef = (element: HTMLInputElement) => {
    setInputElement(element);
  };

  const showDatePicker = () => {
    const currentInputElement = inputElement();

    if (currentInputElement) {
      // since when the user interacts with the date picker, the input would technically become blurred however
      // in this case we don't really want to consider it blurred as the date picker in really part of the input
      // so this can be used by other parts of the code (like form validation)
      currentInputElement.dataset.blurred = 'false';
    }

    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    if (!isDatePickerVisible()) {
      return;
    }

    const currentInputElement = inputElement();

    if (currentInputElement) {
      // once the date picker is no longer visible, the user has truly blurred the input so we can force that event
      currentInputElement.dataset.blurred = 'true';
      currentInputElement.dispatchEvent(new Event('blur'));
    }

    setIsDatePickerVisible(false);
  };

  const onSelectDate = (selectedDate?: Date, which?: WhichDate) => {
    const currentInputElement = inputElement();

    if (!currentInputElement) {
      return;
    }

    if (which === WhichDate.FIRST) {
      startDate.setDate(selectedDate);
    } else {
      endDate.setDate(selectedDate);
    }

    props.onSelectDate?.(selectedDate, which);
  };

  const onSelectStartDate = (date?: Date) => {
    onSelectDate(date, WhichDate.FIRST);
  };

  const onSelectEndDate = (date?: Date) => {
    onSelectDate(date, WhichDate.SECOND);
  };

  // handle updating the input
  createEffect(() => {
    const currentInputElement = inputElement();

    if (!currentInputElement) {
      return;
    }

    const startDateFormatted = startDate.getFormattedDate();
    const endDateFormatted = endDate.getFormattedDate();
    const currentValue = currentInputElement.value;

    if (!startDateFormatted && !endDateFormatted) {
      if (currentValue) {
        currentInputElement.value = '';
        currentInputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      }

      return;
    }

    const inputValue = props.isRange ? `${startDateFormatted} - ${endDateFormatted}` : startDateFormatted;

    if (currentValue === inputValue) {
      return;
    }

    currentInputElement.value = inputValue;
    currentInputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  });

  // handle the positioning of the date pickers
  createEffect(() => {
    const currentContainerElement = containerElement();

    if (!currentContainerElement) {
      return;
    }

    // we need to use :scope so that the selector only look at direct children
    const handleElement = currentContainerElement.querySelector(':scope > :nth-child(1)');
    const contentElement = currentContainerElement.querySelector(':scope > :nth-child(2)') as HTMLElement;

    if (!handleElement || !contentElement) {
      if (import.meta.env.MODE !== 'production') {
        console.error('date picker input component must have 2 children to function properly');
      } else {
        // @todo(logging) add logging once we have a solution for that for frontend code
      }

      return;
    }

    const updatePosition = () => {
      computePosition(handleElement, contentElement, {
        placement: 'bottom-start',
        // @todo(feature) should this be configurable?
        middleware: [flip(), shift(), offset(5)],
      }).then(({ x, y }) => {
        contentElement.style.top = `${y}px`;
        contentElement.style.left = `${x}px`;
      });
    };

    const cleanup = autoUpdate(handleElement, contentElement, updatePosition);

    onCleanup(() => {
      cleanup();
    });
  });

  return (
    <div
      data-id="date-picker-input"
      ref={containerRef}
      class={classnames(styles.datePickerInput, props.class)}
      use:clickOutside={hideDatePicker}
    >
      <Input
        ref={inputRef}
        onFocus={showDatePicker}
        {...restOfProps}
        readonly
        includeReadonlyStyles={false}
        data-uncontrolled-value="true"
      />
      <div class={styles.datePickerInputPickerContainer}>
        <Show when={isDatePickerVisible()}>
          <DatePicker
            {...datePickerProps}
            defaultDisplayDate={startDate.date() ?? props.defaultStartDisplayDate}
            defaultSelectedDate={startDate.date() ?? props.defaultStartSelectedDate}
            disableAfter={endDate.date()}
            onSelectDate={onSelectStartDate}
            includeFooter
            onDone={hideDatePicker}
          />
          <Show when={props.isRange}>
            <DatePicker
              {...datePickerProps}
              defaultDisplayDate={endDate.date() ?? props.defaultEndDisplayDate}
              defaultSelectedDate={endDate.date() ?? props.defaultEndSelectedDate}
              disableBefore={startDate.date()}
              onSelectDate={onSelectEndDate}
              includeFooter
              onDone={hideDatePicker}
            />
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default DatePickerInput;
