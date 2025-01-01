import SideNavigation, { type SideNavigationProps } from '$/components/side-navgiation/side-navigation';
import Item, { type SideNavigationItemProps } from '$/components/side-navgiation/side-navigation-item';

export type { SideNavigationProps, SideNavigationItemProps };

export default Object.assign(SideNavigation, { Item });
