import { useLocation } from '@solidjs/router';
import { type JSX, splitProps } from 'solid-js';

import SideNavigation from '$/components/side-navgiation';

import type { CommonDataAttributes } from '$/types/generic';

type ApplicationFrameNavigationItemProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    path: string;
  };

const ApplicationFrameNavigationItem = (passedProps: ApplicationFrameNavigationItemProps) => {
  const [props] = splitProps(passedProps, ['path', 'class', 'children']);
  const location = useLocation();
  const isActiveRoute = () => props.path === location.pathname;

  return (
    <SideNavigation.SubItem isActive={isActiveRoute()} href={props.path}>
      {props.children}
    </SideNavigation.SubItem>
  );
};

export default ApplicationFrameNavigationItem;
