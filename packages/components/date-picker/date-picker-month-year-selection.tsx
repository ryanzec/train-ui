import { merge } from 'lodash';
import { createMemo } from 'solid-js';

import Button, { ButtonColor } from '$/components/button';
import Combobox, { type ComboboxExtraData, type ComboboxOption, comboboxUtils } from '$/components/combobox';
import styles from '$/components/date-picker/date-picker.module.css';
import { clickOutsideDirective } from '$/directives/click-outside-directive';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutsideDirective;

type DatePickerMonthYearSelectionProps = {
  defaultMonth?: number;
  defaultYear?: number;
  endYear?: number;
  startYear?: number;
  onSelectMonth?: (month: number) => void;
  onSelectYear?: (year: number) => void;
  toggleDisplay?: () => void;
};

type Month = { label: string; value: number };

const months: Month[] = [
  {
    label: 'January',
    value: 0,
  },
  {
    label: 'February',
    value: 1,
  },
  {
    label: 'March',
    value: 2,
  },
  {
    label: 'April',
    value: 3,
  },
  {
    label: 'May',
    value: 4,
  },
  {
    label: 'June',
    value: 5,
  },
  {
    label: 'July',
    value: 6,
  },
  {
    label: 'August',
    value: 7,
  },
  {
    label: 'September',
    value: 8,
  },
  {
    label: 'October',
    value: 9,
  },
  {
    label: 'November',
    value: 10,
  },
  {
    label: 'December',
    value: 11,
  },
];

const DatePickerMonthYearSelection = (passedProps: DatePickerMonthYearSelectionProps) => {
  const props = merge({ startYear: 1900, endYear: 2099 }, passedProps);

  const years = createMemo(() => {
    let currentYear = props.startYear;
    const innerYears = [];

    while (currentYear <= props.endYear) {
      innerYears.push({
        label: `${currentYear}`,
        value: currentYear,
      });

      currentYear++;
    }

    return innerYears;
  });

  const defaultMonth = months.find((month) => month.value === props.defaultMonth);
  const defaultYear = years().find((year) => year.value === props.defaultYear);

  const monthComboboxStore = comboboxUtils.createComboboxValue<ComboboxExtraData>({
    defaultValue: defaultMonth ? [defaultMonth] : [],
  });
  const yearComboboxStore = comboboxUtils.createComboboxValue<ComboboxExtraData>({
    defaultValue: defaultYear ? [defaultYear] : [],
  });

  const setMonth = (options: ComboboxOption[]) => {
    monthComboboxStore.setSelected(options);

    if (props.onSelectMonth) {
      props.onSelectMonth(options[0].value as number);
    }
  };

  const setYear = (options: ComboboxOption[]) => {
    yearComboboxStore.setSelected(options);

    if (props.onSelectYear) {
      props.onSelectYear(options[0].value as number);
    }
  };

  return (
    <div class={styles.monthYearSelection} use:clickOutsideDirective={props.toggleDisplay}>
      <div class={styles.monthYearInputs}>
        <Combobox
          showClearIcon={false}
          forceSelection
          autoShowOptions
          options={months}
          setSelected={setMonth}
          selected={monthComboboxStore.selected()}
          placeholder="Month"
          name="datePickerMonth"
          selectedComponent={Combobox.SelectedOption}
          selectableComponent={Combobox.SelectableOption}
        />
        <div class={styles.yearSelection}>
          <Combobox
            showClearIcon={false}
            forceSelection
            autoShowOptions
            options={years()}
            setSelected={setYear}
            selected={yearComboboxStore.selected()}
            placeholder="Year"
            name="datePickerYear"
            selectedComponent={Combobox.SelectedOption}
            selectableComponent={Combobox.SelectableOption}
          />
        </div>
      </div>
      <Button color={ButtonColor.BRAND} onClick={props.toggleDisplay}>
        Done
      </Button>
    </div>
  );
};

export default DatePickerMonthYearSelection;
