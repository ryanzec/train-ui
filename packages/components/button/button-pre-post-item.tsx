import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/button/button.module.css';
import { ButtonItemPosition } from '$/components/button/utils';
import Icon from '$/components/icon';

export type ButtonIconProps = JSX.HTMLAttributes<HTMLDivElement> & {
  position?: ButtonItemPosition;
  item: JSX.Element;
};

const ButtonPrePostItem = (passedProps: ButtonIconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ position: ButtonItemPosition.PRE, isLoading: false, isIconOnly: false }, passedProps),
    ['position', 'item', 'class'],
  );

  return (
    <div
      data-id="button-icon"
      {...restOfProps}
      class={classnames(styles.prePostItem, props.class, {
        [styles.preItem]: props.position === ButtonItemPosition.PRE,
        [styles.postItem]: props.position === ButtonItemPosition.POST,
      })}
    >
      {props.item}
    </div>
  );
};

export default ButtonPrePostItem;
