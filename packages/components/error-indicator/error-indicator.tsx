import { splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/components/button';
import Callout, { CalloutColor, type CalloutProps, CalloutVariant } from '$/components/callout';

export type ErrorIndicatorProps = CalloutProps & {
  label: string;
  actionLabel?: string;
  onTriggerAction?: () => void;
};

const ErrorIndicator = (passedProps: ErrorIndicatorProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'label', 'actionLabel', 'onTriggerAction']);

  return (
    <Callout data-id="error-indicator" {...restOfProps} variant={CalloutVariant.WEAK} color={CalloutColor.DANGER}>
      {props.label}&nbsp;
      <Button variant={ButtonVariant.TEXT} onClick={props.onTriggerAction}>
        {props.actionLabel}
      </Button>
    </Callout>
  );
};

export default ErrorIndicator;
