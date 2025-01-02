import classnames from 'classnames';
import { For, type JSX, Show, splitProps } from 'solid-js';

import styles from '$/components/supporting-text/supporting-text.module.css';
import { SupportingTextColor } from '$/components/supporting-text/utils';

export type SupportingTextProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: SupportingTextColor;

  // this is added to make it easier to use form errors with this component
  supportingText?: string[];
};

const SupportingText = (passedProps: SupportingTextProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children', 'supportingText', 'color']);
  const shouldShow = () => (props.supportingText && props.supportingText.length > 0) || props.children;

  return (
    <Show when={shouldShow()}>
      <div
        data-id="supporting-text"
        {...restOfProps}
        class={classnames(props.class, styles.supportingText, {
          [styles.neutral]: props.color === SupportingTextColor.NEUTRAL,
          [styles.danger]: props.color === SupportingTextColor.DANGER,
        })}
      >
        <Show when={props.supportingText && props.supportingText.length > 0}>
          <For each={props.supportingText}>
            {(message) => {
              return <div>{message}</div>;
            }}
          </For>
        </Show>
        <Show when={!props.supportingText}>{props.children}</Show>
      </div>
    </Show>
  );
};

export default SupportingText;
