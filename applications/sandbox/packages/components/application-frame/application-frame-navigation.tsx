import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import type { CommonDataAttributes } from '$/types/generic';
import styles from '$sandbox/components/application-frame/application-frame.module.css';
import type { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import Button from '$/components/button';
import { ThemeName } from '$/utils/styles';
import { applicationStore } from '$sandbox/stores/application-store';

import ScrollArea from '$/components/scroll-area';
import ApplicationFrameSubNavigation from './application-frame-sub-navigation';

type ApplicationFrameNavigationProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    routes: DynamicRouteNavigation;
  };

const ApplicationFrameNavigation = (passedProps: ApplicationFrameNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class']);

  const handleToggleTheme = () => {
    applicationStore.setTheme(applicationStore.theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return (
    <div data-id="navigation" class={classnames(styles.navigation, props.class)} {...restOfProps}>
      {/*<ScrollArea>*/}
      <Button onClick={handleToggleTheme} class={styles.toggleThemeTrigger}>
        Toggle Theme
      </Button>
      <ApplicationFrameSubNavigation routes={props.routes} />
      {/*</ScrollArea>*/}
    </div>
  );
};

export default ApplicationFrameNavigation;
