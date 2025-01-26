import classnames from 'classnames';
import { type JSX, children, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';

import Icon, { IconColor, IconSize } from '$/components/icon';
import type { IconName } from '$/components/icon/utils';
import styles from '$/components/side-navgiation/side-navigation.module.css';
import { type ToggleStoreInstance, toggleStoreUtils } from '$/stores/toggle.store';
import { loggerUtils } from '$/utils/logger';
import { Dynamic } from 'solid-js/web';

export type SideNavigationItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  headerItem: JSX.Element;
  toggleStore?: ToggleStoreInstance;
  onClick?: () => void;
  iconName?: IconName;
  isActive?: boolean;
  href?: string;
};

// type is needed to avoid typescript errors when using the props
const defaultProps: { iconName: IconName } = {
  iconName: 'square-filled',
};

const SideNavigationItem = (passedProps: SideNavigationItemProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'children',
    'class',
    'headerItem',
    'toggleStore',
    'iconName',
    'isActive',
    'onClick',
    'href',
  ]);
  const solidChildren = children(() => props.children);

  const [component, setComponent] = createSignal<'button' | 'a'>(!props.href ? 'button' : 'a');
  const [componentProps, setComponentProps] = createSignal<
    JSX.HTMLAttributes<HTMLAnchorElement> | JSX.HTMLAttributes<HTMLButtonElement>
  >({});

  props.toggleStore = !props.toggleStore && !!solidChildren() ? toggleStoreUtils.createStore() : props.toggleStore;

  const handleClick = () => {
    if (!solidChildren()) {
      if (!props.onClick) {
        loggerUtils.error('when a side navigation item has no children, an onClick handler or href must be provided');

        return;
      }

      props.onClick();

      return;
    }

    props.toggleStore?.toggle();
  };

  createEffect(function updateComponentData() {
    if (props.href) {
      setComponent('a');
      setComponentProps({
        href: props.href,
        class: styles.header,
      } as JSX.HTMLAttributes<HTMLAnchorElement>);

      return;
    }

    setComponent('button');
    setComponentProps({
      type: 'button',
      class: styles.header,
      onClick: handleClick,
    } as JSX.HTMLAttributes<HTMLButtonElement>);
  });

  return (
    <div
      data-id="item"
      {...restOfProps}
      class={classnames(styles.item, props.class, {
        [styles.isCollapsed]: !props.toggleStore?.isToggled(),
      })}
    >
      <Dynamic data-id="item" component={component()} {...componentProps()}>
        <Icon
          class={styles.headerIndicatorIcon}
          icon={props.iconName}
          size={IconSize.LARGE}
          color={props.toggleStore?.isToggled() || props.isActive ? IconColor.BRAND : IconColor.NEUTRAL}
        />
        {props.headerItem}
      </Dynamic>
      <div class={styles.subItems}>{props.children}</div>
    </div>
  );
};

export default SideNavigationItem;
