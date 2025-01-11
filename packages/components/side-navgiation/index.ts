import SideNavigation, { type SideNavigationProps } from '$/components/side-navgiation/side-navigation';
import Item, { type SideNavigationItemProps } from '$/components/side-navgiation/side-navigation-item';
import Link, { type SideNavigationLinkProps } from '$/components/side-navgiation/side-navigation-link';

export type { SideNavigationProps, SideNavigationItemProps, SideNavigationLinkProps };

export default Object.assign(SideNavigation, { Item, Link });
