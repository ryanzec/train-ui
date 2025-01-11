import classnames from 'classnames';
import { type JSX, children, mergeProps, splitProps } from 'solid-js';

import Icon, { IconColor, IconSize } from '$/components/icon';
import type { IconName } from '$/components/icon/utils';
import styles from '$/components/side-navgiation/side-navigation.module.css';
import { type ToggleStoreInstance, toggleStoreUtils } from '$/stores/toggle';
import { loggerUtils } from '$/utils/logger';

export type SideNavigationProps = JSX.HTMLAttributes<HTMLDivElement> & {
  headerItem: JSX.Element;
  toggleStore?: ToggleStoreInstance;
  onClick?: () => void;
  iconName?: IconName;
  isActive?: boolean;
};

// type is needed to avoid typescript errors when using the props
const defaultProps: { iconName: IconName } = {
  iconName: 'square-filled',
};

const SideNavigation = (passedProps: SideNavigationProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'children',
    'class',
    'headerItem',
    'toggleStore',
    'iconName',
    'isActive',
    'onClick',
  ]);
  const solidChildren = children(() => props.children);

  props.toggleStore = !props.toggleStore && !!solidChildren() ? toggleStoreUtils.createToggle() : props.toggleStore;

  const handleClick = () => {
    if (!solidChildren()) {
      if (!props.onClick) {
        loggerUtils.error('when a side navigation item has no children, an onClick handler must be provided');

        return;
      }

      props.onClick();

      return;
    }

    props.toggleStore?.toggle();
  };

  return (
    <div
      data-id="side-navigation"
      {...restOfProps}
      class={classnames(styles.sideNavigation, props.class, {
        [styles.isCollapsed]: !props.toggleStore?.isToggled(),
      })}
    >
      <button type="button" class={styles.header} onClick={handleClick}>
        <Icon
          class={styles.headerIndicatorIcon}
          icon={props.iconName}
          size={IconSize.SMALL}
          color={props.toggleStore?.isToggled() || props.isActive ? IconColor.BRAND : IconColor.NEUTRAL}
        />
        {props.headerItem}
      </button>
      <div class={styles.items}>{props.children}</div>
    </div>
  );
};

export default SideNavigation;
