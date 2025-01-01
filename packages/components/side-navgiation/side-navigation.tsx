import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import Box from '$/components/box';
import styles from '$/components/side-navgiation/side-navigation.module.css';
import { type ToggleStoreInstance, toggleStoreUtils } from '$/stores/toggle';

export interface SideNavigationProps extends JSX.HTMLAttributes<HTMLDivElement> {
  headerItem: JSX.Element;
  toggleStore?: ToggleStoreInstance;
}

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'headerItem', 'toggleStore']);

  props.toggleStore = props.toggleStore ?? toggleStoreUtils.createToggle();

  return (
    <div
      class={classnames(styles.sideNavigation, props.class, {
        [styles.isCollapsed]: !props.toggleStore.isToggled(),
      })}
      {...restOfProps}
    >
      <Box class={styles.header} onClick={props.toggleStore.toggle}>
        <div class={styles.headerIndicator} />
        {props.headerItem}
      </Box>
      <div class={styles.items}>{props.children}</div>
    </div>
  );
};

export default SideNavigation;
