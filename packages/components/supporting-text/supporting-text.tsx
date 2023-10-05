import classnames from 'classnames';
import { For, JSX, ParentProps, Show, splitProps } from 'solid-js';

import styles from '$/components/supporting-text/supporting-text.module.css';
import { SupportingTextSentiment } from '$/components/supporting-text/utils';

export interface SupportingTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
  sentiment?: SupportingTextSentiment;

  // this is added to make it easier to use form errors with this component
  supportingText?: string[];
}

const SupportingText = (passedProps: ParentProps<SupportingTextProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children', 'supportingText', 'sentiment']);
  const shouldShow = () => (props.supportingText && props.supportingText.length > 0) || props.children;

  return (
    <Show when={shouldShow()}>
      <div
        class={classnames(props.class, styles.supportingText, {
          [styles.neutral]: props.sentiment === SupportingTextSentiment.NEUTRAL,
          [styles.danger]: props.sentiment === SupportingTextSentiment.DANGER,
        })}
        {...restOfProps}
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
