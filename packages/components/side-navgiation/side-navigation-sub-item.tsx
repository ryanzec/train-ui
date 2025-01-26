import classnames from 'classnames';
import { type JSX, createEffect, createSignal } from 'solid-js';

import styles from '$/components/side-navgiation/side-navigation.module.css';
import type { CommonDataAttributes } from '$/types/generic';
import { Dynamic } from 'solid-js/web';

export type SideNavigationSubItemProps = CommonDataAttributes & {
  children: JSX.Element;
  class?: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
};

const SideNavigationSubItem = (props: SideNavigationSubItemProps) => {
  const [component, setComponent] = createSignal<'button' | 'a'>(!props.href ? 'button' : 'a');
  const [componentProps, setComponentProps] = createSignal<
    JSX.HTMLAttributes<HTMLAnchorElement> | JSX.HTMLAttributes<HTMLButtonElement>
  >({});

  createEffect(function setComponentData() {
    const cssClasses = classnames(styles.subItem, props.class, {
      [styles.subItemActive]: props.isActive,
    });

    if (props.href) {
      setComponent('a');
      setComponentProps({
        href: props.href,
        class: cssClasses,
      } as JSX.HTMLAttributes<HTMLAnchorElement>);

      return;
    }

    setComponent('button');
    setComponentProps({
      type: 'button',
      class: cssClasses,
      onClick: props.onClick,
    } as JSX.HTMLAttributes<HTMLButtonElement>);
  });

  return (
    <Dynamic data-id="sub-item" component={component()} {...componentProps()}>
      {props.children}
    </Dynamic>
  );
};

export default SideNavigationSubItem;
