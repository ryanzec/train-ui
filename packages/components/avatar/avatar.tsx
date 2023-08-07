import classnames from 'classnames';
import { JSX, Show, splitProps } from 'solid-js';

import styles from '$/components/avatar/avatar.module.css';
import { CommonDataAttributes } from '$/types/generic';

export interface AvatarProps extends JSX.LabelHTMLAttributes<HTMLDivElement>, CommonDataAttributes {
  src?: string;
}

const Avatar = (passedProps: AvatarProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'src']);

  return (
    <div data-id="avatar" class={classnames(styles.avatar, props.class)} {...restOfProps}>
      <Show when={props.src}>
        <img alt="avatar inage" src={props.src} />
      </Show>
      <Show when={!props.src}>{props.children}</Show>
    </div>
  );
};

export default Avatar;
