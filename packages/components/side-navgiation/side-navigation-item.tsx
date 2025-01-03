import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';

export type SideNavigationItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isActive?: boolean;
};

const SideNavigationItem = (passedProps: SideNavigationItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'isActive']);

  return (
    <div
      data-id="item"
      {...restOfProps}
      class={classnames(styles.item, props.class, {
        [styles.itemActive]: props.isActive,
      })}
    >
      {props.children}
    </div>
  );
};

export default SideNavigationItem;
