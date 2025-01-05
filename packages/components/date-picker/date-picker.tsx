import classnames from 'classnames';
import dayjs, { type Dayjs } from 'dayjs';
import { Index, type JSX, Show, createMemo, createSignal, mergeProps, splitProps } from 'solid-js';

import Button, { ButtonColor, ButtonVariant } from '$/components/button';
import DatePickerMonthYearSelection from '$/components/date-picker/date-picker-month-year-selection';
import styles from '$/components/date-picker/date-picker.module.css';
import Icon from '$/components/icon';
import TimeInput from '$/components/time-input';
import { FormInputValidationState } from '$/stores/form';
import { dateTimeFormat } from '$/utils/date';
import { loggerUtils } from '$/utils/logger';

type DayData = {
  isDisabled: boolean;
  isCurrentMonth: boolean;
  date: Dayjs;
  day: string;
  formatCurrentCheck: string;
};

export type DatePickerProps = {
  defaultDisplayDate?: Date;
  defaultSelectedDate?: Date;
  onSelectDate?: (selectedDate?: Date) => void;
  onDone?: () => void;
  includeTime?: boolean;
  includeFooter?: boolean;
  disableBefore?: Date;
  disableAfter?: Date;
};

const DatePicker = (passedProps: DatePickerProps & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        defaultDisplayDate: passedProps.defaultSelectedDate ?? new Date(),
        includeTime: false,
        includeFooter: false,
      },
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

  const currentDayFormatted = dayjs(new Date()).startOf('day').format(dateTimeFormat.DATE_COMPARE);

  const [displayDate, setDisplayDate] = createSignal<Date>(props.defaultDisplayDate);
  const [selectedDate, setSelectedDate] = createSignal<Date | undefined>(props.defaultSelectedDate);
  const [showMonthYearSelection, setShowMonthYearSelection] = createSignal(false);
  const [timeInputValidationState, setTimeInputValidationState] = createSignal<FormInputValidationState>(
    FormInputValidationState.VALID,
  );
  const [timeInputValue, setTimeInputValue] = createSignal<string>(
    props.defaultSelectedDate ? dayjs(props.defaultSelectedDate).format(dateTimeFormat.TIME_INPUT_TIME) : '12:00 am',
  );

  const selectedDateFormatted = createMemo(() => {
    const currentSelectedDate = selectedDate();

    if (!currentSelectedDate) {
      return;
    }

    return dayjs(currentSelectedDate).format(dateTimeFormat.DATE_COMPARE);
  });
  const currentMonth = createMemo(() => {
    return dayjs(displayDate()).month();
  });
  const currentYear = createMemo(() => {
    return dayjs(displayDate()).year();
  });
  const headerText = createMemo(() => {
    return dayjs(displayDate()).format('MMM YYYY');
  });
  const currentViewDays = createMemo(() => {
    const currentMonthNumber = dayjs(displayDate()).month();
    let currentProcessingDate = dayjs(dayjs(displayDate()).startOf('month')).startOf('week');
    const endDate = dayjs(dayjs(displayDate()).endOf('month')).endOf('week');
    const newViewDays: Array<DayData[]> = [];
    let currentWeek: DayData[] = [];

    while (!dayjs(currentProcessingDate).isAfter(endDate)) {
      const currentProcessingMonthNumber = dayjs(currentProcessingDate).month();
      const day = dayjs(currentProcessingDate).day();

      currentWeek.push({
        isDisabled:
          (!!props.disableBefore && dayjs(currentProcessingDate).isBefore(props.disableBefore)) ||
          (!!props.disableAfter && dayjs(currentProcessingDate).isAfter(props.disableAfter)),
        isCurrentMonth: currentProcessingMonthNumber === currentMonthNumber,
        date: currentProcessingDate,
        day: dayjs(currentProcessingDate).format('D'),
        formatCurrentCheck: dayjs(currentProcessingDate).format(dateTimeFormat.DATE_COMPARE),
      });

      // zero indexed
      if (day === 6) {
        newViewDays.push([...currentWeek]);

        currentWeek = [];
      }

      currentProcessingDate = dayjs(currentProcessingDate).add(1, 'day');
    }

    return newViewDays;
  });

  const moveToNextMonth = () => {
    setDisplayDate(dayjs(displayDate()).add(1, 'month').toDate());
  };

  const moveToPreviousMonth = () => {
    setDisplayDate(dayjs(displayDate()).subtract(1, 'month').toDate());
  };

  const setMonth = (month: number) => {
    setDisplayDate(dayjs(displayDate()).month(month).toDate());
  };

  const setYear = (year: number) => {
    setDisplayDate(dayjs(displayDate()).year(year).toDate());
  };

  const handleToggleMonthYearSelection = () => {
    setShowMonthYearSelection(!showMonthYearSelection());
  };

  const handleTimeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    setTimeInputValue(target.value);

    const currentSelectedDate = selectedDate();

    if (!currentSelectedDate) {
      return;
    }

    const date = dayjs(target.value, dateTimeFormat.TIME_INPUT_TIME);

    if (!dayjs(date).isValid()) {
      setTimeInputValidationState(FormInputValidationState.INVALID);

      return;
    }

    setTimeInputValidationState(FormInputValidationState.VALID);

    setSelectedDate(date.toDate());
    props.onSelectDate?.(date.toDate());
  };

  const selectDate = (day: DayData) => {
    if (day.isDisabled) {
      loggerUtils.warn(`can't select a disabled day`);

      return;
    }

    const currentTimeValue = timeInputValue();
    let date = dayjs(currentTimeValue, dateTimeFormat.TIME_INPUT_TIME);

    // @todo(investigate) is there an easier way to do this?
    date = date.date(day.date.date());
    date = date.month(day.date.month());
    date = date.year(day.date.year());

    if (!dayjs(date).isValid()) {
      loggerUtils.warn(`can't select an invalid date`, date);

      return;
    }

    setSelectedDate(date.toDate());
    setDisplayDate(date.toDate());

    props.onSelectDate?.(date.toDate());
  };

  const clearDate = () => {
    setSelectedDate(undefined);
    props.onSelectDate?.(undefined);
  };

  return (
    <div data-id="date-picker" {...restOfProps} class={classnames(styles.datePicker, props.class)}>
      <div class={styles.header}>
        <Icon class={styles.previousMonthTrigger} icon="chevron-left" onClick={moveToPreviousMonth} />
        <button type="button" class={styles.headerText} onClick={handleToggleMonthYearSelection}>
          {headerText()}
        </button>
        <Icon class={styles.nextMonthTrigger} icon="chevron-right" onClick={moveToNextMonth} />
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
                      <button
                        class={classnames(styles.day, {
                          [styles.dayInactive]: !day().isCurrentMonth,
                          [styles.dayDisabled]: day().isDisabled,
                          [styles.dayCurrent]: day().formatCurrentCheck === currentDayFormatted,
                          [styles.daySelected]: day().formatCurrentCheck === selectedDateFormatted(),
                        })}
                        disabled={day().isDisabled}
                        type="button"
                        onClick={() => selectDate(day())}
                      >
                        {day().day}
                      </button>
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
            onInput={handleTimeChange}
            placeholder="Time"
            value={timeInputValue()}
            validationState={timeInputValidationState()}
          />
        </div>
      </Show>
      <Show when={props.includeFooter}>
        <Button.Group class={styles.footer}>
          <Button variant={ButtonVariant.TEXT} onClick={clearDate}>
            Clear
          </Button>
          <Show when={props.onDone}>
            <Button variant={ButtonVariant.FILLED} color={ButtonColor.BRAND} onClick={props.onDone}>
              Done
            </Button>
          </Show>
        </Button.Group>
      </Show>
      <Show when={showMonthYearSelection()}>
        <DatePickerMonthYearSelection
          defaultMonth={currentMonth()}
          defaultYear={currentYear()}
          onSelectMonth={setMonth}
          onSelectYear={setYear}
          toggleDisplay={handleToggleMonthYearSelection}
        />
      </Show>
    </div>
  );
};

export default DatePicker;
