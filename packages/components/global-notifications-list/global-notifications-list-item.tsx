import classnames from 'classnames';
import { type JSX, Show, splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/components/button';
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

const GlobalNotificationsListItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);

  return (
    <Callout
      class={classnames(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      {...restOfProps}
      color={CalloutColor.NEUTRAL}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
    >
      <Show when={!!props.notification.emoji}>
        <Emoji emoji={props.notification.emoji ?? ''} spacing={EmojiSpacing.RIGHT} size={IconSize.SMALL} />
      </Show>
      {props.notification.message()}{' '}
      <Button
        variant={ButtonVariant.TEXT}
        class={styles.removeTrigger}
        preItem={<Icon icon="close" />}
        onClick={() => {
          globalNotificationsStore.removeNotification(props.notification.id);
        }}
      />
    </Callout>
  );
};

export default GlobalNotificationsListItem;
