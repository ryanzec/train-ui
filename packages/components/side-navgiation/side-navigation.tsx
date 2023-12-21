import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';

export enum SideNavigationState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

export interface SideNavigationProps extends JSX.HTMLAttributes<HTMLDivElement> {
  headerItem: JSX.Element;
  state?: SideNavigationState;
}

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ state: SideNavigationState.EXPANDED }, passedProps), [
    'children',
    'class',
    'headerItem',
    'state',
  ]);

  return (
    <div
      class={classnames(styles.sideNavigation, props.class, {
        [styles.isCollapsed]: props.state === SideNavigationState.COLLAPSED,
      })}
      {...restOfProps}
    >
      <div class={styles.header}>
        <div class={styles.headerIndicator} />
        {props.headerItem}
      </div>
      <div class={styles.items}>{props.children}</div>
    </div>
  );
};

export default SideNavigation;
