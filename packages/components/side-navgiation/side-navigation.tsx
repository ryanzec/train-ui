import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';

export interface SideNavigationProps extends JSX.HTMLAttributes<HTMLDivElement> {
  headerItem: JSX.Element;
}

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'headerItem']);

  return (
    <div class={classnames(styles.sideNavigation, props.class)} {...restOfProps}>
      <div class={styles.header}>
        <div class={styles.headerIndicator} />
        {props.headerItem}
      </div>
      <div class={styles.items}>{props.children}</div>
    </div>
  );
};

export default SideNavigation;
