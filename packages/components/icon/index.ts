import Icon, { type IconProps } from '$/components/icon/icon';
import Group, { type IconGroupProps } from '$/components/icon/icon-group';

export type { IconProps, IconGroupProps };

export { IconSize, IconColor } from '$/components/icon/utils';

export default Object.assign(Icon, { Group });
