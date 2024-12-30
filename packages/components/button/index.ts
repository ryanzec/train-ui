import Button, { type ButtonProps } from '$/components/button/button';
import DropDown, { type ButtonDropDownProps } from '$/components/button/button-drop-down';
import Group, { type ButtonGroupProps } from '$/components/button/button-group';
import ToggleButton from '$/components/button/button-toggle';

export { ButtonVariant, ButtonSentiment } from '$/components/button/utils';

export type { ButtonGroupProps, ButtonDropDownProps, ButtonProps };

export default Object.assign(Button, { DropDown, Group, ToggleButton });
