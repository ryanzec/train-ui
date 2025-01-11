import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import Button from '$/components/button';
import styles from '$/components/empty-indicator/empty-indicator.module.css';

export type EmptyIndicatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  label: string;
  actionLabel?: string;
  onTriggerAction?: () => void;
};

const EmptyIndicator = (passedProps: EmptyIndicatorProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'label', 'actionLabel', 'onTriggerAction']);

  return (
    <div data-id="empty-indicator" {...restOfProps} class={classnames(styles.emptyIndicator, props.class)}>
      {props.label}
      <Show when={props.actionLabel && props.onTriggerAction}>
        <Button onClick={props.onTriggerAction}>{props.actionLabel}</Button>
      </Show>
    </div>
  );
};

export default EmptyIndicator;
