import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import styles from '$/components/avatar/avatar.module.css';
import type { CommonDataAttributes } from '$/types/generic';

export type AvatarStackProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    src?: string;
  };

const AvatarStack = (passedProps: AvatarStackProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'src']);

  return (
    <div data-id="avatar-stack" class={classnames(styles.avatarStack, props.class)} {...restOfProps}>
      <Show when={props.src}>
        <img alt="avatar inage" src={props.src} />
      </Show>
      <Show when={!props.src}>{props.children}</Show>
    </div>
  );
};

export default AvatarStack;
