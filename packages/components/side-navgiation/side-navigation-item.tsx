import classnames from 'classnames';
import { JSX, splitProps } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';

export interface SideNavigationItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const SideNavigationItem = (passedProps: SideNavigationItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'isActive']);

  return (
    <div
      class={classnames(styles.item, props.class, {
        [styles.itemActive]: props.isActive,
      })}
      {...restOfProps}
    >
      {props.children}
    </div>
  );
};

export default SideNavigationItem;
