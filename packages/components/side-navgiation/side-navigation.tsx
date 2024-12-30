import classnames from 'classnames';
import { createSignal, JSX, mergeProps, splitProps } from 'solid-js';

import Box from '$/components/box';
import styles from '$/components/side-navgiation/side-navigation.module.css';

export enum SideNavigationState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

export interface SideNavigationProps extends JSX.HTMLAttributes<HTMLDivElement> {
  headerItem: JSX.Element;
  defaultState?: SideNavigationState;
}

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ defaultState: SideNavigationState.COLLAPSED }, passedProps), [
    'children',
    'class',
    'headerItem',
    'defaultState',
  ]);

  const [isExpanded, setIsExpanded] = createSignal(props.defaultState === SideNavigationState.EXPANDED);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <div
      class={classnames(styles.sideNavigation, props.class, {
        [styles.isCollapsed]: !isExpanded(),
      })}
      {...restOfProps}
    >
      <Box class={styles.header} onClick={toggleIsExpanded}>
        <div class={styles.headerIndicator} />
        {props.headerItem}
      </Box>
      <div class={styles.items}>{props.children}</div>
    </div>
  );
};

export default SideNavigation;
