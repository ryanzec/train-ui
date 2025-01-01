import classnames from 'classnames';
import { type JSX, Show, createEffect, createSignal, splitProps } from 'solid-js';

import styles from '$sandbox/components/application-frame/application-frame.module.css';

import SideNavigation from '$/components/side-navgiation';
import type { CommonDataAttributes } from '$/types/generic';
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import { toggleStoreUtils } from '$/stores/toggle';
import ApplicationFrameSubNavigation from '$sandbox/components/application-frame/application-frame-sub-navigation';
import { useLocation } from '@solidjs/router';

interface ApplicationFrameExpandableItemProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  routes: DynamicRouteNavigation;
  routeKey: string;
}

const ApplicationFrameExpandableItem = (passedProps: ApplicationFrameExpandableItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class', 'routeKey']);
  const [isExpanded, setIsExpanded] = createSignal<boolean>(true);
  const location = useLocation();

  const hasSubNavigation = () => typeof Object.values(props.routes)[0] !== 'string';

  const isCurrentSideNavigation = (currentPath: string) => {
    if (hasSubNavigation() || currentPath.length <= 1) {
      return false;
    }

    const sideNavigationGroupRoutePrefix = ((Object.values(props.routes)[0] as string) || '').substring(
      0,
      location.pathname.lastIndexOf('/'),
    );
    const currentRoutePrefix = currentPath.substring(0, location.pathname.lastIndexOf('/'));

    return currentRoutePrefix === sideNavigationGroupRoutePrefix;
  };

  const toggleStore = toggleStoreUtils.createToggle();

  createEffect(() => {
    if (isCurrentSideNavigation(location.pathname) === false) {
      return;
    }

    toggleStore.setIsToggled(true);
  });

  return (
    <div {...restOfProps}>
      <Show when={hasSubNavigation()}>
        <div class={styles.navigationGroupHeader}>
          <button type="button" onClick={() => setIsExpanded(!isExpanded())}>
            {props.routeKey}
          </button>
        </div>
        <Show when={isExpanded()}>
          <ApplicationFrameSubNavigation routes={props.routes} />
        </Show>
      </Show>
      <Show when={!hasSubNavigation()}>
        <SideNavigation
          class={classnames(styles.navigationSubSection, {
            [styles.navigationSection]: hasSubNavigation(),
          })}
          headerItem={props.routeKey}
          toggleStore={toggleStore}
        >
          <ApplicationFrameSubNavigation routes={props.routes} />
        </SideNavigation>
      </Show>
    </div>
  );
};

export default ApplicationFrameExpandableItem;
