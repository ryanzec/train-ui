import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const dateTimeFormat = {
  STANDARD_DATE: 'M/D/YY',
  STANDARD_DATE_TIME: 'M/D/YY h:mm a',
  DATE_COMPARE: 'YYYYMMDD',
  DATE_PICKER_TIME: 'HH:mm:ss',
  TIME_INPUT_TIME: 'hh:mm a',
};
