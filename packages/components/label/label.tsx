import classnames from 'classnames';
import { JSX, mergeProps, Show, splitProps } from 'solid-js';

import { IconSize } from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import styles from '$/components/label/label.module.css';
import Loading from '$/components/loading';

export interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  isLoading?: boolean;
  postItem?: JSX.Element;
  iconSize?: IconSize;
}

const Label = (passedProps: LabelProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isLoading: false }, passedProps), [
    'children',
    'class',
    'isLoading',
    'postItem',
  ]);

  return (
    <div data-id="label" class={classnames(styles.container, props.class)}>
      <label class={styles.label} {...restOfProps}>
        {props.children}
        <Show when={props.isLoading}>
          <Loading class={iconStyles.spacingLeft} iconSize={IconSize.SMALL2} />
        </Show>
      </label>
      <Show when={props.postItem}>
        <div class={styles.postItem}>{props.postItem}</div>
      </Show>
    </div>
  );
};

export default Label;
