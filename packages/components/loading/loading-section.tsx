import classnames from 'classnames';
import { ParentProps, splitProps } from 'solid-js';

import Callout, { CalloutSentiment, CalloutStrength, CalloutProps } from '$/components/callout';
import Icon from '$/components/icon';
import iconStyles from '$/components/icon/icon.module.css';
import styles from '$/components/loading/loading.module.css';
import Overlay from '$/components/overlay';
import { OverlayStrength } from '$/components/overlay/utils';

const LoadingSection = (passedProps: ParentProps<CalloutProps>) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div>
      <Overlay.Local strength={OverlayStrength.WEAK} />
      <Overlay.ContentLocal>
        <Callout sentiment={CalloutSentiment.INFO} strength={CalloutStrength.STRONG} {...restOfProps}>
          <Icon
            icon="refresh"
            class={classnames(styles.icon, styles.smallIcon, iconStyles.spinning, iconStyles.positionedLeft)}
          />{' '}
          {props.children}
        </Callout>{' '}
      </Overlay.ContentLocal>
    </div>
  );
};

export default LoadingSection;
