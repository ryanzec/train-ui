import dayjs from 'dayjs';
import { Accessor, createSignal } from 'solid-js';

import { WhichDate } from '$/components/date-picker/date-picker-input';
import { dateTimeFormat } from '$/utils/date';

export interface DatePickerInputDateStore {
  date: Accessor<Date | undefined>;
  setDate: (date?: Date) => void;
  getFormattedDate: () => string;
}

interface CreateDatePickerInputDateOptions {
  defaultDate?: Date;
  includeTime?: boolean;
}

const createDatePickerInputDate = (options: CreateDatePickerInputDateOptions): DatePickerInputDateStore => {
  const [date, setDate] = createSignal<Date | undefined>(options.defaultDate);

  const getFormattedDate = () => {
    const currentDate = date();

    if (!currentDate) {
      return '';
    }

    return dayjs(currentDate).format(
      options.includeTime ? dateTimeFormat.STANDARD_DATE_TIME : dateTimeFormat.STANDARD_DATE,
    );
  };

  return {
    date,
    setDate,
    getFormattedDate,
  };
};

export type DateFormValue = undefined | Array<Date | undefined>;

export interface DatePickerInputValueStore {
  startDate: Accessor<Date | undefined>;
  endDate: Accessor<Date | undefined>;
  setDate: (date?: Date, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
}

interface createDatePickerInputValueOptions {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

const createDatePickerInputValue = (options: createDatePickerInputValueOptions = {}): DatePickerInputValueStore => {
  const [startDate, setStartDate] = createSignal<Date | undefined>(options.defaultStartDate);
  const [endDate, startEndDate] = createSignal<Date | undefined>(options.defaultEndDate);

  const getFormValue = () => {
    const currentStartDate = startDate();
    const currentEndDate = endDate();

    if (!currentStartDate && !currentEndDate) {
      return;
    }

    return [currentStartDate, currentEndDate];
  };

  const setDate = (date?: Date, which?: WhichDate) => {
    if (which !== WhichDate.SECOND) {
      setStartDate(date);

      return;
    }

    startEndDate(date);
  };

  return { startDate, endDate, setDate, getFormValue };
};

const isValidDate = (value: DateFormValue) => {
  return !!value && !!value[0];
};

const isValidDateRange = (value: DateFormValue) => {
  return !!value && !!value[0] && !!value[1];
};

export const datePickerUtils = {
  createDatePickerInputDate,
  createDatePickerInputValue,
  isValidDate,
  isValidDateRange,
};
