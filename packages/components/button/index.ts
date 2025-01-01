import Button, { type ButtonProps } from '$/components/button/button';
import DropDown, { type ButtonDropDownProps } from '$/components/button/button-drop-down';
import Group, { type ButtonGroupProps } from '$/components/button/button-group';
import Toggle, { type ButtonToggleProps } from '$/components/button/toggle-button';

export { ButtonVariant, ButtonSentiment } from '$/components/button/utils';

export type { ButtonGroupProps, ButtonDropDownProps, ButtonProps, ButtonToggleProps };

export default Object.assign(Button, { DropDown, Group, Toggle });
