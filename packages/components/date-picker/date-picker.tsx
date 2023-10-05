import classnames from 'classnames';
import * as dateFns from 'date-fns';
import { createMemo, createSignal, Index, JSX, mergeProps, Show, splitProps } from 'solid-js';

import Button, { ButtonSentiment, ButtonVariant } from '$/components/button';
import DatePickerMonthYearSelection from '$/components/date-picker/date-picker-month-year-selection';
import styles from '$/components/date-picker/date-picker.module.css';
import Icon from '$/components/icon';
import Input from '$/components/input';
import TimeInput from '$/components/time-input';
import { FormInputValidationState } from '$/stores/form';
import { dateTimeFormat } from '$/utils/date';
import { developmentUtils } from '$/utils/development';

interface DayData {
  isDisabled: boolean;
  isCurrentMonth: boolean;
  date: Date;
  day: string;
  formatCurrentCheck: string;
}

export interface DatePickerProps {
  defaultDisplayDate?: Date;
  defaultSelectedDate?: Date;
  onSelectDate?: (selectedDate?: Date) => void;
  onDone?: () => void;
  includeTime?: boolean;
  includeFooter?: boolean;
  disableBefore?: Date;
  disableAfter?: Date;
}

const DatePicker = (passedProps: DatePickerProps & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { defaultDisplayDate: passedProps.defaultSelectedDate ?? new Date(), includeTime: false, includeFooter: false },
      passedProps,
    ),
    [
      'class',
      'defaultDisplayDate',
      'onSelectDate',
      'onDone',
      'includeTime',
      'includeFooter',
      'defaultSelectedDate',
      'disableBefore',
      'disableAfter',
    ],
  );

  const currentDayFormatted = dateFns.format(dateFns.startOfDay(new Date()), dateTimeFormat.DATE_COMPARE);

  const [displayDate, setDisplayDate] = createSignal<Date>(props.defaultDisplayDate);
  const [selectedDate, setSelectedDate] = createSignal<Date | undefined>(props.defaultSelectedDate);
  const [showMonthYearSelection, setShowMonthYearSelection] = createSignal(false);
  const [timeInputValidationState, setTimeInputValidationState] = createSignal<FormInputValidationState>(
    FormInputValidationState.VALID,
  );
  const [timeInputValue, setTimeInputValue] = createSignal<string>(
    props.defaultSelectedDate ? dateFns.format(props.defaultSelectedDate, dateTimeFormat.TIME_INPUT_TIME) : '12:00 am',
  );

  const selectedDateFormatted = createMemo(() => {
    const currentSelectedDate = selectedDate();

    if (!currentSelectedDate) {
      return;
    }

    return dateFns.format(currentSelectedDate, dateTimeFormat.DATE_COMPARE);
  });
  const currentMonth = createMemo(() => {
    return dateFns.getMonth(displayDate());
  });
  const currentYear = createMemo(() => {
    return dateFns.getYear(displayDate());
  });
  const headerText = createMemo(() => {
    return dateFns.format(displayDate(), 'MMM yyyy');
  });
  const currentViewDays = createMemo(() => {
    const currentMonthNumber = dateFns.getMonth(displayDate());
    let currentProcessingDate = dateFns.startOfWeek(dateFns.startOfMonth(displayDate()));
    const endDate = dateFns.endOfWeek(dateFns.endOfMonth(displayDate()));
    const newViewDays: Array<DayData[]> = [];
    let currentWeek: DayData[] = [];

    while (!dateFns.isAfter(currentProcessingDate, endDate)) {
      const currentProcessingMonthNumber = dateFns.getMonth(currentProcessingDate);
      const day = dateFns.getDay(currentProcessingDate);

      currentWeek.push({
        isDisabled:
          (!!props.disableBefore && dateFns.isBefore(currentProcessingDate, props.disableBefore)) ||
          (!!props.disableAfter && dateFns.isAfter(currentProcessingDate, props.disableAfter)),
        isCurrentMonth: currentProcessingMonthNumber === currentMonthNumber,
        date: currentProcessingDate,
        day: dateFns.format(currentProcessingDate, 'd'),
        formatCurrentCheck: dateFns.format(currentProcessingDate, dateTimeFormat.DATE_COMPARE),
      });

      // zero indexed
      if (day === 6) {
        newViewDays.push([...currentWeek]);

        currentWeek = [];
      }

      currentProcessingDate = dateFns.addDays(currentProcessingDate, 1);
    }

    return newViewDays;
  });

  const moveToNextMonth = () => {
    setDisplayDate(dateFns.addMonths(displayDate(), 1));
  };

  const moveToPreviousMonth = () => {
    setDisplayDate(dateFns.subMonths(displayDate(), 1));
  };

  const setMonth = (month: number) => {
    setDisplayDate(dateFns.setMonth(displayDate(), month));
  };

  const setYear = (year: number) => {
    setDisplayDate(dateFns.setYear(displayDate(), year));
  };

  const onToggleMonthYearSelection = () => {
    setShowMonthYearSelection(!showMonthYearSelection());
  };

  const onTimeChange = (event: Event) => {
    console.log('test');
    const target = event.target as HTMLInputElement;

    setTimeInputValue(target.value);

    const currentSelectedDate = selectedDate();

    if (!currentSelectedDate) {
      return;
    }

    const date = dateFns.parse(target.value, dateTimeFormat.TIME_INPUT_TIME, currentSelectedDate);

    if (!dateFns.isValid(date)) {
      setTimeInputValidationState(FormInputValidationState.INVALID);

      return;
    }

    setTimeInputValidationState(FormInputValidationState.VALID);

    setSelectedDate(date);
    props.onSelectDate?.(date);
  };

  const selectDate = (day: DayData) => {
    console.log(day);
    if (day.isDisabled) {
      developmentUtils.logWarn(`can't select a disabled day`);

      return;
    }

    const currentTimeValue = timeInputValue();
    const date = dateFns.parse(currentTimeValue, dateTimeFormat.TIME_INPUT_TIME, day.date);

    if (!dateFns.isValid(date)) {
      developmentUtils.logWarn(`can't select an invalid date`, date);
      return;
    }

    setSelectedDate(date);
    setDisplayDate(date);

    props.onSelectDate?.(date);
  };

  const clearDate = () => {
    setSelectedDate(undefined);
    props.onSelectDate?.(undefined);
  };

  return (
    <div data-id="date-picker" class={classnames(styles.datePicker, props.class)} {...restOfProps}>
      <div class={styles.header}>
        <Icon class={styles.previousMonthTrigger} icon="chevron_left" onClick={moveToPreviousMonth} />
        <Button variant={ButtonVariant.UNSTYLED} class={styles.headerText} onClick={onToggleMonthYearSelection}>
          {headerText()}
        </Button>
        <Icon class={styles.nextMonthTrigger} icon="chevron_right" onClick={moveToNextMonth} />
      </div>
      <div class={styles.calendar}>
        <div>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Su</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Mo</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Tu</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>We</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Th</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Fr</span>
          <span class={classnames(styles.day, styles.dayOfWeekHeaderItem)}>Sa</span>
        </div>
        <Index each={currentViewDays()}>
          {(days) => {
            return (
              <div>
                <Index each={days()}>
                  {(day) => {
                    return (
                      <Button
                        class={classnames(styles.day, {
                          [styles.dayInactive]: !day().isCurrentMonth,
                          [styles.dayDisabled]: day().isDisabled,
                          [styles.dayCurrent]: day().formatCurrentCheck === currentDayFormatted,
                          [styles.daySelected]: day().formatCurrentCheck === selectedDateFormatted(),
                        })}
                        disabled={day().isDisabled}
                        variant={ButtonVariant.UNSTYLED}
                        onClick={() => selectDate(day())}
                      >
                        {day().day}
                      </Button>
                    );
                  }}
                </Index>
              </div>
            );
          }}
        </Index>
      </div>
      <Show when={props.includeTime}>
        <div class={styles.timeContainer}>
          <TimeInput
            data-uncontrolled-value="true"
            onInput={onTimeChange}
            placeholder="Time"
            value={timeInputValue()}
            validationState={timeInputValidationState()}
          />
        </div>
      </Show>
      <Show when={props.includeFooter}>
        <div class={styles.footer}>
          <Button variant={ButtonVariant.TEXT} onClick={clearDate}>
            Clear
          </Button>
          <Show when={props.onDone}>
            <Button variant={ButtonVariant.FILLED} sentiment={ButtonSentiment.BRAND} onClick={props.onDone}>
              Done
            </Button>
          </Show>
        </div>
      </Show>
      <Show when={showMonthYearSelection()}>
        <DatePickerMonthYearSelection
          defaultMonth={currentMonth()}
          defaultYear={currentYear()}
          onSelectMonth={setMonth}
          onSelectYear={setYear}
          toggleDisplay={onToggleMonthYearSelection}
        />
      </Show>
    </div>
  );
};

export default DatePicker;
