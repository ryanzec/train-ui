import SideNavigation, {
  type SideNavigationProps,
  SideNavigationState,
} from '$/components/side-navgiation/side-navigation';
import Item, { type SideNavigationItemProps } from '$/components/side-navgiation/side-navigation-item';

export type { SideNavigationProps, SideNavigationItemProps };
export { SideNavigationState };

export default Object.assign(SideNavigation, { Item });
