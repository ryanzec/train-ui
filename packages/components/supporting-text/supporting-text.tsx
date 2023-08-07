import classnames from 'classnames';
import { For, JSX, ParentProps, Show, splitProps } from 'solid-js';

import styles from '$/components/supporting-text/supporting-text.module.css';
import { SupportingTextSentiment } from '$/components/supporting-text/utils';

export interface SupportingTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
  supportingText?: string[];
  sentiment?: SupportingTextSentiment;
}

const SupportingText = (passedProps: ParentProps<SupportingTextProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children', 'supportingText', 'sentiment']);

  return (
    <div
      class={classnames(props.class, styles.supportingText, {
        [styles.neutral]: props.sentiment === SupportingTextSentiment.NEUTRAL,
        [styles.danger]: props.sentiment === SupportingTextSentiment.DANGER,
      })}
      {...restOfProps}
    >
      <Show when={props.supportingText}>
        <For each={props.supportingText}>
          {(message) => {
            return <div>{message}</div>;
          }}
        </For>
      </Show>
      <Show when={!props.supportingText}>{props.children}</Show>
    </div>
  );
};

export default SupportingText;
