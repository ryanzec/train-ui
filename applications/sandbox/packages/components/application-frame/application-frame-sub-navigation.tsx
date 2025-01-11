import { For, Match, Switch } from 'solid-js';

import styles from '$sandbox/components/application-frame/application-frame.module.css';

import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import { stringUtils } from '$/utils/string';
import ApplicationFrameExpandableItem from '$sandbox/components/application-frame/application-frame-expandable-item';
import ApplicationFrameNavigationItem from '$sandbox/components/application-frame/application-frame-navigation-item';

type ApplicationFrameSubNavigationProps = {
  routes: DynamicRouteNavigation;
};

const ApplicationFrameSubNavigation = (props: ApplicationFrameSubNavigationProps) => {
  return (
    <div class={styles.navigationGroup}>
      <For each={Object.keys(props.routes)}>
        {(routeKey) => {
          const isEndRoute = () => {
            return typeof props.routes[routeKey] !== 'object';
          };

          return (
            <Switch>
              <Match when={isEndRoute()}>
                {/* since this is an end route, we are casting to string to avoid typescript error */}
                <ApplicationFrameNavigationItem path={props.routes[routeKey] as string}>
                  {stringUtils.pascalToWords(routeKey)}
                </ApplicationFrameNavigationItem>
              </Match>
              <Match when={isEndRoute() === false}>
                {/* we only get here if the route is an object so casting to prevent typescript error */}
                <ApplicationFrameExpandableItem
                  routes={props.routes[routeKey] as DynamicRouteNavigation}
                  routeKey={routeKey}
                />
              </Match>
            </Switch>
          );
        }}
      </For>
    </div>
  );
};

export default ApplicationFrameSubNavigation;
