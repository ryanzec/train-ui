import Button, { ButtonProps } from '$/components/button/button';
import DropDown, { ButtonDropDownProps } from '$/components/button/button-drop-down';
import Group, { ButtonGroupProps } from '$/components/button/button-group';
import IconButton, { IconButtonProps } from '$/components/button/icon-button';

export { ButtonVariant, ButtonSentiment } from '$/components/button/utils';

export type { IconButtonProps, ButtonGroupProps, ButtonDropDownProps, ButtonProps };

export default Object.assign(Button, { IconButton, DropDown, Group });
