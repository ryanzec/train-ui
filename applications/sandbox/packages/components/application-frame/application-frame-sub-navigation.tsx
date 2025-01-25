import { For, Match, Switch } from 'solid-js';

import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import NoWrapper from '$/components/no-wrapper';
import SideNavigation from '$/components/side-navgiation';
import { stringUtils } from '$/utils/string';
import ApplicationFrameExpandableItem from '$sandbox/components/application-frame/application-frame-expandable-item';
import ApplicationFrameNavigationItem from '$sandbox/components/application-frame/application-frame-navigation-item';
import { Dynamic } from 'solid-js/web';

type ApplicationFrameSubNavigationProps = {
  routes: DynamicRouteNavigation;
};

const ApplicationFrameSubNavigation = (props: ApplicationFrameSubNavigationProps) => {
  const getContainerComponent = () => {
    const values = Object.values(props.routes);
    const levelOneIsObject = typeof values[0] === 'object';
    const levelTwoIsString = typeof Object.values(values[0])[0] === 'string';

    // if the first level of values are objects and the second level of values are strings, that mean the
    // current level is a side navigation as the level above the current is grouping multiple side navigation
    // groups and the level below the current is sub items for the current side navigation
    return levelOneIsObject && levelTwoIsString ? SideNavigation : NoWrapper;
  };

  getContainerComponent();

  return (
    <>
      <Dynamic component={getContainerComponent()}>
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
      </Dynamic>
    </>
  );
};

export default ApplicationFrameSubNavigation;
