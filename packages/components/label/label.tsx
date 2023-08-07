import classnames from 'classnames';
import { JSX, mergeProps, Show, splitProps } from 'solid-js';

import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import styles from '$/components/label/label.module.css';

export interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  isLoading?: boolean;
}

const Label = (passedProps: LabelProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isLoading: false }, passedProps), [
    'children',
    'class',
    'isLoading',
  ]);

  return (
    <label data-id="label" class={classnames(styles.label, props.class)} {...restOfProps}>
      {props.children}
      <Show when={props.isLoading}>
        <Icon icon="refresh" class={classnames(iconStyles.spinning, iconStyles.positionedRight)} />
      </Show>
    </label>
  );
};

export default Label;
