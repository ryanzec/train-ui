import DatePicker, { DatePickerProps } from '$/components/date-picker/date-picker';
import Input, { DatePickerInputProps, WhichDate } from '$/components/date-picker/date-picker-input';

export type { DatePickerProps, DatePickerInputProps, WhichDate };

export { datePickerUtils } from '$/components/date-picker/utils';
export type {
  DatePickerInputValueStore,
  DatePickerInputDateStore,
  DateFormValue,
} from '$/components/date-picker/utils';

export default Object.assign(DatePicker, { Input });
