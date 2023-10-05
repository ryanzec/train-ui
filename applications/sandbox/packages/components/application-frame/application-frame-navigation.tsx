import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import { CommonDataAttributes } from '$/types/generic';
import styles from '$sandbox/components/application-frame/application-frame.module.css';
import { DynamicRouteNavigation } from '$sandbox/stores/dynamic-routes';

import Button from '../../../../../packages/components/button';
import { ThemeName } from '../../../../../packages/utils/styles';
import { applicationStore } from '../../stores/application-store';

import ApplicationFrameNavigationItem from './application-frame-navigation-item';
import ApplicationFrameSubNavigation from './application-frame-sub-navigation';

interface ApplicationFrameNavigationProps extends JSX.HTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  routes: DynamicRouteNavigation;
}

const ApplicationFrameNavigation = (passedProps: ApplicationFrameNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['routes', 'class']);

  const onToggleTheme = () => {
    applicationStore.setTheme(applicationStore.theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return (
    <>
      <div data-id="navigation" class={classnames(styles.navigation, props.class)} {...restOfProps}>
        <Button onClick={onToggleTheme} class={styles.toggleThemeTrigger}>
          Toggle Theme
        </Button>
        <ApplicationFrameSubNavigation routes={props.routes} />
      </div>
    </>
  );
};

export default ApplicationFrameNavigation;
