import dayjs from 'dayjs';
import { createSignal, Show } from 'solid-js';

import DatePicker, { WhichDate } from '$/components/date-picker';
import { dateTimeFormat } from '$/utils/date';

export default {
  title: 'Components/DatePicker',
};

export const Default = () => {
  const [lastSelectedDate, setLastSelectedDate] = createSignal<Date>();

  const onSelectDate = (selectedDate?: Date) => {
    setLastSelectedDate(selectedDate);
  };

  const formattedSelectedDate = () => {
    const currentSelectedDate = lastSelectedDate();

    if (!currentSelectedDate) {
      return '';
    }

    return dayjs(currentSelectedDate).format(dateTimeFormat.STANDARD_DATE_TIME);
  };

  return (
    <>
      <div>
        <div>Default</div>
        <DatePicker onSelectDate={onSelectDate} />
      </div>
      <div>
        <div>With default selected value</div>
        <DatePicker onSelectDate={onSelectDate} defaultSelectedDate={new Date('Nov 1 2022')} />
      </div>
      <div>
        <div>With default selected value and display date not the same</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultSelectedDate={new Date('Nov 1 2022')}
          defaultDisplayDate={new Date('Dec 1 2022')}
        />
      </div>
      <div>
        <div>With time</div>
        <DatePicker includeTime onSelectDate={onSelectDate} defaultSelectedDate={new Date('Nov 1 2022 3:34 pm')} />
      </div>
      <div>
        <div>Explicitly pass current date</div>
        <DatePicker defaultDisplayDate={new Date('Nov 1 2022')} onSelectDate={onSelectDate} />
      </div>
      <div>
        <div>disable before date</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultDisplayDate={new Date('Nov 1 2022')}
          disableBefore={new Date('Nov 10 2022')}
        />
      </div>
      <div>
        <div>disable after date</div>
        <DatePicker
          onSelectDate={onSelectDate}
          defaultDisplayDate={new Date('Nov 1 2022')}
          disableAfter={new Date('Nov 20 2022')}
        />
      </div>
      <div>
        <div>with footer</div>
        <DatePicker onSelectDate={onSelectDate} includeFooter />
      </div>
      <div>
        <div>with done callback</div>
        <DatePicker onSelectDate={onSelectDate} includeFooter onDone={() => console.log('done called')} />
      </div>
      <Show when={lastSelectedDate()}>
        <div>({formattedSelectedDate()})</div>
      </Show>
    </>
  );
};

export const Input = () => {
  const onSelectDate = (selectedDate: Date, which?: WhichDate) => {
    console.log(which, selectedDate);
  };

  return (
    <>
      <div>
        <div>default</div>
        <DatePicker.Input />
      </div>
      <div>
        <div>include time</div>
        <DatePicker.Input includeTime />
      </div>
      <div>
        <div>range</div>
        <DatePicker.Input includeTime isRange />
      </div>
      <div>
        <div>with default display date</div>
        <DatePicker.Input includeTime defaultStartDisplayDate={new Date('Nov 1 2022')} />
      </div>
      <div>
        <div>with default selected date</div>
        <DatePicker.Input includeTime defaultStartSelectedDate={new Date('Nov 1 2022 12:23 pm')} />
      </div>
      <div>
        <div>range with default display dates</div>
        <DatePicker.Input
          includeTime
          isRange
          defaultStartDisplayDate={new Date('Nov 1 2022')}
          defaultEndDisplayDate={new Date('Dec 1 2022')}
        />
      </div>
      <div>
        <div>range with default selected dates</div>
        <DatePicker.Input
          includeTime
          isRange
          defaultStartSelectedDate={new Date('Nov 1 2022 12:23 pm')}
          defaultEndSelectedDate={new Date('Dec 11 2022 4:34 pm')}
        />
      </div>
      <div>
        <div>disabled</div>
        <DatePicker.Input
          includeTime
          isRange
          disabled
          defaultStartSelectedDate={new Date('Nov 1 2022 12:23 pm')}
          defaultEndSelectedDate={new Date('Dec 11 2022 4:34 pm')}
        />
      </div>
    </>
  );
};
