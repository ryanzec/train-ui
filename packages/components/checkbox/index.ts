import Checkbox, { type CheckboxProps } from '$/components/checkbox/checkbox';
import Group, { type CheckboxGroupProps } from '$/components/checkbox/checkbox-group';
import Toggle, { type CheckboxToggleProps } from '$/components/checkbox/checkbox-toggle';

export type { CheckboxGroupProps, CheckboxProps, CheckboxToggleProps };

export default Object.assign(Checkbox, { Group, Toggle });
