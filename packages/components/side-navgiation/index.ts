import SideNavigation, { SideNavigationProps, SideNavigationState } from '$/components/side-navgiation/side-navigation';
import Item, { SideNavigationItemProps } from '$/components/side-navgiation/side-navigation-item';

export type { SideNavigationProps, SideNavigationItemProps };
export { SideNavigationState };

export default Object.assign(SideNavigation, { Item });
