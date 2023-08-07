import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/callout/callout.module.css';
import { CalloutSentiment, CalloutStrength } from '$/components/callout/utils';

export interface CalloutProps extends JSX.HTMLAttributes<HTMLDivElement> {
  sentiment?: CalloutSentiment;
  strength?: CalloutStrength;
  isCentered?: boolean;
}

const Callout = (passedProps: CalloutProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ sentiment: CalloutSentiment.BRAND, strength: CalloutStrength.WEAK, isCentered: true }, passedProps),
    ['sentiment', 'strength', 'class', 'children', 'isCentered'],
  );
  const isStrong = props.strength === CalloutStrength.STRONG;

  return (
    <div
      class={classnames(props.class, styles.callout, {
        [styles.neutral]: props.sentiment === CalloutSentiment.NEUTRAL,
        [styles.neutralStrong]: props.sentiment === CalloutSentiment.NEUTRAL && isStrong,
        [styles.brand]: props.sentiment === CalloutSentiment.BRAND,
        [styles.brandStrong]: props.sentiment === CalloutSentiment.BRAND && isStrong,
        [styles.success]: props.sentiment === CalloutSentiment.SUCCESS,
        [styles.successStrong]: props.sentiment === CalloutSentiment.SUCCESS && isStrong,
        [styles.info]: props.sentiment === CalloutSentiment.INFO,
        [styles.infoStrong]: props.sentiment === CalloutSentiment.INFO && isStrong,
        [styles.warning]: props.sentiment === CalloutSentiment.WARNING,
        [styles.warningStrong]: props.sentiment === CalloutSentiment.WARNING && isStrong,
        [styles.danger]: props.sentiment === CalloutSentiment.DANGER,
        [styles.dangerStrong]: props.sentiment === CalloutSentiment.DANGER && isStrong,
      })}
      {...restOfProps}
    >
      <span
        class={classnames({
          [styles.centered]: props.isCentered,
        })}
      >
        {props.children}
      </span>
    </div>
  );
};

export default Callout;
