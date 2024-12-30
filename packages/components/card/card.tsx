import classnames from 'classnames';
import { type JSX, type ParentProps, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/card/card.module.css';
import { CardFooterAlignment } from '$/components/card/utils';

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  headerText?: string;
  headerPreItem?: JSX.Element;
  headerPostItem?: JSX.Element;
  footerElement?: JSX.Element;
  footerAlignment?: CardFooterAlignment;
}
const Card = (passedProps: ParentProps<CardProps>) => {
  const [props, restOfProps] = splitProps(mergeProps({ footerAlignment: CardFooterAlignment.RIGHT }, passedProps), [
    'children',
    'class',
    'headerText',
    'headerPreItem',
    'headerPostItem',
    'footerElement',
    'footerAlignment',
  ]);
  const hasHeader = () => !!props.headerText || !!props.headerPreItem || !!props.headerPostItem;
  const hasContent = () => !!props.children;

  return (
    <div class={classnames(styles.card, props.class)} {...restOfProps}>
      <Show when={hasHeader()}>
        <div
          class={classnames(styles.header, {
            [styles.headerWithContent]: hasContent(),
          })}
        >
          <Show when={props.headerPreItem}>
            <div class={styles.headerPreItem}>{props.headerPreItem}</div>
          </Show>
          <Show when={props.headerText}>
            <div>{props.headerText}</div>
          </Show>
          <Show when={props.headerPostItem}>
            <div class={styles.headerPostItem}>{props.headerPostItem}</div>
          </Show>
        </div>
      </Show>
      <Show when={hasContent()}>
        <div class={styles.content}>{props.children}</div>
      </Show>
      <Show when={props.footerElement}>
        <div
          class={classnames(styles.footer, {
            [styles.footerRightAligned]: props.footerAlignment === CardFooterAlignment.RIGHT,
          })}
        >
          {props.footerElement}
        </div>
      </Show>
    </div>
  );
};

export default Card;
