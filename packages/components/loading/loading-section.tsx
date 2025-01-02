import { type ParentProps, splitProps } from 'solid-js';

import Callout, { type CalloutProps, CalloutColor, CalloutVariant } from '$/components/callout';
import { IconColor, IconSize } from '$/components/icon';
import Loading from '$/components/loading/loading';
import Overlay from '$/components/overlay';
import { OverlayVariant } from '$/components/overlay/utils';

export type LoadingSectionProps = CalloutProps;

const LoadingSection = (passedProps: LoadingSectionProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div>
      <Overlay.Local variant={OverlayVariant.WEAK} />
      <Overlay.ContentLocal>
        <Callout
          color={CalloutColor.INFO}
          variant={CalloutVariant.STRONG}
          preItem={<Loading iconSize={IconSize.BASE} iconColor={IconColor.INHERIT} />}
          {...restOfProps}
        >
          {props.children}
        </Callout>{' '}
      </Overlay.ContentLocal>
    </div>
  );
};

export default LoadingSection;
