import { useLocation, useNavigate } from '@solidjs/router';
import { type JSX, type ParentProps, splitProps } from 'solid-js';

import SideNavigation from '$/components/side-navgiation';

import type { CommonDataAttributes } from '../../../../../packages/types/generic';

interface ApplicationFrameNavigationItemProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  path: string;
}

const ApplicationFrameNavigationItem = (passedProps: ParentProps<ApplicationFrameNavigationItemProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['path', 'class', 'children']);
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveRoute = () => props.path === location.pathname;

  return (
    <SideNavigation.Item {...restOfProps} isActive={isActiveRoute()} onClick={() => navigate(props.path)}>
      {props.children}
    </SideNavigation.Item>
  );
};

export default ApplicationFrameNavigationItem;
