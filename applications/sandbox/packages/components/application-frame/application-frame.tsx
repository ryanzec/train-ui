import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import styles from '$sandbox/components/application-frame/application-frame.module.css';
import type { CommonDataAttributes } from '../../../../../packages/types/generic';
// @todo(refactor) replace with sandbox specific store
import type { DynamicRouteNavigation } from '../../stores/dynamic-routes';

import ApplicationFrameNavigation from './application-frame-navigation';

type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    isLoading: boolean;
    navigation: DynamicRouteNavigation;
  };

const ApplicationFrame = (passedProps: ApplicationFrameProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['isLoading', 'navigation', 'class', 'children']);

  return (
    <div data-id="application-frame" class={classnames(styles.applicationFrame, props.class)} {...restOfProps}>
      <Show when={props.isLoading === false} fallback={<div>Loading</div>}>
        <ApplicationFrameNavigation routes={props.navigation} />
        <div class={classnames(styles.subContainer)}>
          <div data-id="sandbox-main-content" class={classnames(styles.mainContent)}>
            {props.children}
          </div>
        </div>
      </Show>
    </div>
  );
};

export default ApplicationFrame;
