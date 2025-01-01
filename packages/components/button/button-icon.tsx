import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';
import { ButtonIconPosition } from '$/components/button/utils';
import Icon from '$/components/icon';

export type ButtonIconProps = JSX.HTMLAttributes<HTMLDivElement> & {
  position?: ButtonIconPosition;
  isLoading?: boolean;
  item: JSX.Element;
  isIconOnly?: boolean;
};

const ButtonIcon = (passedProps: ButtonIconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ position: ButtonIconPosition.PRE, isLoading: false, isIconOnly: false }, passedProps),
    ['position', 'isLoading', 'item', 'class', 'isIconOnly'],
  );
  const dataId = () => {
    return `icon${props.isLoading ? ' loading' : ''}${props.position === ButtonIconPosition.PRE ? ' pre' : ' post'}`;
  };

  return (
    <div
      data-id={dataId()}
      class={classnames(styles.icon, props.class, {
        [styles.preItem]: !props.isIconOnly && props.position === ButtonIconPosition.PRE,
        [styles.postItem]: !props.isIconOnly && props.position === ButtonIconPosition.POST,
        [styles.iconIsLoading]: props.isLoading,
      })}
      {...restOfProps}
    >
      {props.isLoading ? <Icon icon="refresh" /> : props.item}
    </div>
  );
};

export default ButtonIcon;
