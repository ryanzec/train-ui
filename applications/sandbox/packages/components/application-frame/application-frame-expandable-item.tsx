import classnames from 'classnames';
import { type JSX, Show, createSignal, splitProps } from 'solid-js';

import styles from '$sandbox/components/application-frame/application-frame.module.css';

import Button, { ButtonVariant } from '../../../../../packages/components/button';
import SideNavigation from '../../../../../packages/components/side-navgiation';
import type { CommonDataAttributes } from '../../../../../packages/types/generic';
import type { DynamicRouteNavigation } from '../../stores/dynamic-routes';

import ApplicationFrameSubNavigation from './application-frame-sub-navigation';

interface ApplicationFrameExpandableItemProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  routes: DynamicRouteNavigation;
  routeKey: string;
}

const ApplicationFrameExpandableItem = (passedProps: ApplicationFrameExpandableItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class', 'routeKey']);
  const [isExpanded, setIsExpanded] = createSignal<boolean>(true);

  const hasSubNavigation = () => typeof Object.values(props.routes)[0] !== 'string';

  return (
    <div {...restOfProps}>
      <Show when={hasSubNavigation()}>
        <div class={styles.navigationGroupHeader}>
          <Button variant={ButtonVariant.UNSTYLED} onClick={() => setIsExpanded(!isExpanded())}>
            {props.routeKey}
          </Button>
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
        >
          <ApplicationFrameSubNavigation routes={props.routes} />
        </SideNavigation>
      </Show>
    </div>
  );
};

export default ApplicationFrameExpandableItem;
