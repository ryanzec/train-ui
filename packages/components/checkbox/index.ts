import Checkbox, { CheckboxProps } from '$/components/checkbox/checkbox';
import Group, { CheckboxGroupProps } from '$/components/checkbox/checkbox-group';
import Toggle, { CheckboxToggleProps } from '$/components/checkbox/checkbox-toggle';

export type { CheckboxGroupProps, CheckboxProps, CheckboxToggleProps };

export default Object.assign(Checkbox, { Group, Toggle });
