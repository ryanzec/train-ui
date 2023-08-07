import classnames from 'classnames';
import { For, JSX, mergeProps, Show, splitProps } from 'solid-js';

import GlobalNotificationsListItem from '$/components/global-notifications-list/global-notifications-list-item';
import styles from '$/components/global-notifications-list/global-notifications-list.module.css';
import { GlobalNotificationPosition } from '$/components/global-notifications-list/utils';
import { GlobalNotification } from '$/stores/global-notifications';

export interface GlobalNotificationsListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  notifications?: GlobalNotification[];
  position?: GlobalNotificationPosition;
}

const GlobalNotificationsList = (passedProps: GlobalNotificationsListProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ notifications: [], position: GlobalNotificationPosition.TOP_RIGHT }, passedProps),
    ['notifications', 'class', 'position'],
  );

  return (
    <Show when={props.notifications.length > 0}>
      {/*<Portal mount={props.mount}>*/}
      <div
        class={classnames(props.class, styles.notifications, {
          [styles.topLeft]: props.position === GlobalNotificationPosition.TOP_LEFT,
          [styles.topRight]: props.position === GlobalNotificationPosition.TOP_RIGHT,
          [styles.bottomLeft]: props.position === GlobalNotificationPosition.BOTTOM_LEFT,
          [styles.bottomRight]: props.position === GlobalNotificationPosition.BOTTOM_RIGHT,
        })}
        {...restOfProps}
      >
        <For each={props.notifications}>
          {(notification) => {
            return <GlobalNotificationsListItem notification={notification} />;
          }}
        </For>
      </div>
      {/*</Portal>*/}
    </Show>
  );
};

export default GlobalNotificationsList;
