import classnames from 'classnames';
import { type JSX, type ParentProps, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/bubble/bubble.module.css';
import { BubbleSentiment, BubbleSize, BubbleStrength } from '$/components/bubble/utils';
import Icon from '$/components/icon';

export interface BubbleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  sentiment?: BubbleSentiment;
  strength?: BubbleStrength;
  size?: BubbleSize;
  preIcon?: string;
  postIcon?: string;
}

const Bubble = (passedProps: ParentProps<BubbleProps>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        sentiment: BubbleSentiment.BRAND,
        strength: BubbleStrength.WEAK,
        size: BubbleSize.SMALL,
      },
      passedProps,
    ),
    ['sentiment', 'strength', 'size', 'class', 'children', 'preIcon', 'postIcon'],
  );
  const isStrong = props.strength === BubbleStrength.STRONG;

  return (
    <div
      class={classnames(props.class, styles.bubble, {
        [styles.bubbleSmall]: props.size === BubbleSize.SMALL,
        [styles.neutral]: props.sentiment === BubbleSentiment.NEUTRAL,
        [styles.neutralStrong]: props.sentiment === BubbleSentiment.NEUTRAL && isStrong,
        [styles.brand]: props.sentiment === BubbleSentiment.BRAND,
        [styles.brandStrong]: props.sentiment === BubbleSentiment.BRAND && isStrong,
        [styles.success]: props.sentiment === BubbleSentiment.SUCCESS,
        [styles.successStrong]: props.sentiment === BubbleSentiment.SUCCESS && isStrong,
        [styles.info]: props.sentiment === BubbleSentiment.INFO,
        [styles.infoStrong]: props.sentiment === BubbleSentiment.INFO && isStrong,
        [styles.warning]: props.sentiment === BubbleSentiment.WARNING,
        [styles.warningStrong]: props.sentiment === BubbleSentiment.WARNING && isStrong,
        [styles.danger]: props.sentiment === BubbleSentiment.DANGER,
        [styles.dangerStrong]: props.sentiment === BubbleSentiment.DANGER && isStrong,
      })}
      {...restOfProps}
    >
      {props.preIcon && (
        <Icon
          icon={props.preIcon}
          class={classnames(styles.icon, styles.preIcon, {
            [styles.iconSmall]: props.size === BubbleSize.SMALL,
          })}
        >
          {props.preIcon}
        </Icon>
      )}
      {props.children}
      {props.postIcon && (
        <Icon
          icon={props.postIcon}
          class={classnames(styles.icon, styles.postIcon, {
            [styles.iconSmall]: props.size === BubbleSize.SMALL,
          })}
        >
          {props.postIcon}
        </Icon>
      )}
    </div>
  );
};

export default Bubble;
