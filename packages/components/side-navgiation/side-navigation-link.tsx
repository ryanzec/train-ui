import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';

export type SideNavigationLinkProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  href: string;
};

const SideNavigationLink = (passedProps: SideNavigationLinkProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'isActive']);

  return (
    <a
      data-id="link"
      {...restOfProps}
      class={classnames(styles.item, props.class, {
        [styles.itemActive]: props.isActive,
      })}
    >
      {props.children}
    </a>
  );
};

export default SideNavigationLink;
