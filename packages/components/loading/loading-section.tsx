import { ParentProps, splitProps } from 'solid-js';

import Callout, { CalloutProps, CalloutSentiment, CalloutStrength } from '$/components/callout';
import { IconSentiment, IconSize } from '$/components/icon';
import Loading from '$/components/loading/loading';
import Overlay from '$/components/overlay';
import { OverlayStrength } from '$/components/overlay/utils';

const LoadingSection = (passedProps: ParentProps<CalloutProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div>
      <Overlay.Local strength={OverlayStrength.WEAK} />
      <Overlay.ContentLocal>
        <Callout sentiment={CalloutSentiment.INFO} strength={CalloutStrength.STRONG} {...restOfProps}>
          <Loading iconSize={IconSize.BASE} iconSentiment={IconSentiment.INHERIT} /> {props.children}
        </Callout>{' '}
      </Overlay.ContentLocal>
    </div>
  );
};

export default LoadingSection;
