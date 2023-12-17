import classnames from 'classnames';
import { JSX, Show, splitProps } from 'solid-js';

import Button, { ButtonVariant } from '$/components/button';
import Callout, { CalloutSentiment } from '$/components/callout';
import Emoji, { EmojiSpacing } from '$/components/emoji';
import styles from '$/components/global-notifications-list/global-notifications-list.module.css';
import Icon, { IconSize } from '$/components/icon';
import { GlobalNotification, globalNotificationsStore, REMOVE_ANIMATION_DURATION } from '$/stores/global-notifications';

export interface GlobalNotificationsListItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  notification: GlobalNotification;
}

const GlobalNotificationsListItem = (passedProps: GlobalNotificationsListItemProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['notification', 'class']);

  return (
    <Callout
      class={classnames(styles.notification, props.class, {
        [styles.isRemoving]: props.notification.isRemoving || false,
      })}
      {...restOfProps}
      sentiment={CalloutSentiment.NEUTRAL}
      style={{ 'animation-duration': `${REMOVE_ANIMATION_DURATION * 1.05}ms` }}
    >
      <Show when={!!props.notification.emoji}>
        <Emoji emoji={props.notification.emoji ?? ''} spacing={EmojiSpacing.RIGHT} size={IconSize.SMALL1} />
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
