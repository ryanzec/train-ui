import { merge } from 'lodash';
import { createMemo } from 'solid-js';

import AutoComplete, { AutoCompleteExtraData, AutoCompleteOption, autoCompleteUtils } from '$/components/auto-complete';
import Button, { ButtonSentiment } from '$/components/button';
import styles from '$/components/date-picker/date-picker.module.css';
import { clickOutside } from '$/stores/click-outside';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutside;

interface DatePickerMonthYearSelectionProps {
  defaultMonth?: number;
  defaultYear?: number;
  endYear?: number;
  startYear?: number;
  onSelectMonth?: (month: number) => void;
  onSelectYear?: (year: number) => void;
  toggleDisplay?: () => void;
}

const months = [
  {
    display: 'January',
    value: 0,
  },
  {
    display: 'February',
    value: 1,
  },
  {
    display: 'March',
    value: 2,
  },
  {
    display: 'April',
    value: 3,
  },
  {
    display: 'May',
    value: 4,
  },
  {
    display: 'June',
    value: 5,
  },
  {
    display: 'July',
    value: 6,
  },
  {
    display: 'August',
    value: 7,
  },
  {
    display: 'September',
    value: 8,
  },
  {
    display: 'October',
    value: 9,
  },
  {
    display: 'November',
    value: 10,
  },
  {
    display: 'December',
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
        display: `${currentYear}`,
        value: currentYear,
      });

      currentYear++;
    }

    return innerYears;
  });

  const defaultMonth = months.find((month) => month.value === props.defaultMonth);
  const defaultYear = years().find((year) => year.value === props.defaultYear);

  const monthAutoCompleteStore = autoCompleteUtils.createAutoCompleteValue<AutoCompleteExtraData>({
    defaultValue: defaultMonth ? [defaultMonth] : [],
  });
  const yearAutoCompleteStore = autoCompleteUtils.createAutoCompleteValue<AutoCompleteExtraData>({
    defaultValue: defaultYear ? [defaultYear] : [],
  });

  const setMonth = (options: AutoCompleteOption[]) => {
    monthAutoCompleteStore.setSelected(options);

    if (props.onSelectMonth) {
      props.onSelectMonth(options[0].value as number);
    }
  };

  const setYear = (options: AutoCompleteOption[]) => {
    yearAutoCompleteStore.setSelected(options);

    if (props.onSelectYear) {
      props.onSelectYear(options[0].value as number);
    }
  };

  return (
    <div class={styles.monthYearSelection} use:clickOutside={props.toggleDisplay}>
      <div class={styles.monthYearInputs}>
        <AutoComplete
          showClearIcon={false}
          forceSelection
          autoShowOptions
          options={months}
          setSelected={setMonth}
          selected={monthAutoCompleteStore.selected()}
          placeholder="Month"
          name="datePickerMonth"
          selectedComponent={AutoComplete.SelectedOption}
          selectableComponent={AutoComplete.SelectableOption}
        />
        <div class={styles.yearSelection}>
          <AutoComplete
            showClearIcon={false}
            forceSelection
            autoShowOptions
            options={years()}
            setSelected={setYear}
            selected={yearAutoCompleteStore.selected()}
            placeholder="Year"
            name="datePickerYear"
            selectedComponent={AutoComplete.SelectedOption}
            selectableComponent={AutoComplete.SelectableOption}
          />
        </div>
      </div>
      <Button sentiment={ButtonSentiment.BRAND} onClick={props.toggleDisplay}>
        Done
      </Button>
    </div>
  );
};

export default DatePickerMonthYearSelection;
