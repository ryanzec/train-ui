import { type ParentProps, splitProps } from 'solid-js';

import Callout, { type CalloutProps, CalloutSentiment, CalloutStrength } from '$/components/callout';
import { IconSentiment, IconSize } from '$/components/icon';
import Loading from '$/components/loading/loading';
import Overlay from '$/components/overlay';
import { OverlayStrength } from '$/components/overlay/utils';

export type LoadingSectionProps = CalloutProps;

const LoadingSection = (passedProps: LoadingSectionProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div>
      <Overlay.Local strength={OverlayStrength.WEAK} />
      <Overlay.ContentLocal>
        <Callout
          sentiment={CalloutSentiment.INFO}
          strength={CalloutStrength.STRONG}
          preItem={<Loading iconSize={IconSize.BASE} iconSentiment={IconSentiment.INHERIT} />}
          {...restOfProps}
        >
          {props.children}
        </Callout>{' '}
      </Overlay.ContentLocal>
    </div>
  );
};

export default LoadingSection;
