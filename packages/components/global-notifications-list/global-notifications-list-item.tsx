import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import Button, { ButtonColor, ButtonShape, ButtonVariant } from '$/components/button';
import Callout, { CalloutColor } from '$/components/callout';
import Emoji, { EmojiSpacing } from '$/components/emoji';
import styles from '$/components/global-notifications-list/global-notifications-list.module.css';
import Icon, { IconSize } from '$/components/icon';
import {
  type GlobalNotification,
  REMOVE_ANIMATION_DURATION,
  globalNotificationsStore,
} from '$/stores/global-notifications';

export type GlobalNotificationsListItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  notification: GlobalNotification;
};

const calloutColorToButtonColor: Record<CalloutColor, ButtonColor> = {
  [CalloutColor.NEUTRAL]: ButtonColor.NEUTRAL,
  [CalloutColor.BRAND]: ButtonColor.BRAND,
  [CalloutColor.SUCCESS]: ButtonColor.SUCCESS,
  [CalloutColor.INFO]: ButtonColor.INFO,
  [CalloutColor.WARNING]: ButtonColor.WARNING,
  [CalloutColor.DANGER]: ButtonColor.DANGER,
};

const GlobalNotificationsListItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);
  const calloutColor = () => props.notification.color ?? CalloutColor.NEUTRAL;

  return (
    <Callout
      class={classnames(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      {...restOfProps}
      color={calloutColor()}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
    >
      <Show when={!!props.notification.emoji}>
        <Emoji emoji={props.notification.emoji ?? ''} spacing={EmojiSpacing.RIGHT} size={IconSize.SMALL} />
      </Show>
      {props.notification.message()}{' '}
      <Button
        variant={ButtonVariant.GHOST}
        color={calloutColorToButtonColor[calloutColor()]}
        class={styles.removeTrigger}
        shape={ButtonShape.CIRCLE}
        onClick={() => {
          globalNotificationsStore.removeNotification(props.notification.id);
        }}
      >
        <Icon icon="close" />
      </Button>
    </Callout>
  );
};

export default GlobalNotificationsListItem;
