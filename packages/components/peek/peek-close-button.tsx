import { type JSX, splitProps } from 'solid-js';

import Button, { ButtonSentiment, ButtonVariant } from '$/components/button';
import type { CommonDataAttributes } from '$/types/generic';

export type PeekCloseButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & CommonDataAttributes;

const PeekCloseButton = (passedProps: PeekCloseButtonProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <Button
      sentiment={ButtonSentiment.NEUTRAL}
      variant={ButtonVariant.GHOST}
      data-id="close-button"
      data-peek-close="true"
      class={props.class}
      {...restOfProps}
    >
      Close
    </Button>
  );
};

export default PeekCloseButton;
