import type { CalloutColor } from '$/components/callout';
import { produce } from 'immer';
import pullAt from 'lodash/pullAt';
import { nanoid } from 'nanoid';
import { type JSX, createRoot, createSignal } from 'solid-js';

export type GlobalNotification = {
  id: string;
  message: () => JSX.Element;
  emoji?: string;
  autoClose?: number;
  isRemoving?: boolean;
  removeAnimationDuration?: number;
  color?: CalloutColor;
};

export const DEFAULT_AUTO_CLOSE = 3000;

export const REMOVE_ANIMATION_DURATION = 350;

const createGlobalNotificationsStore = () => {
  const [notifications, setNotifications] = createSignal<GlobalNotification[]>([]);

  const addNotification = (notification: Omit<GlobalNotification, 'id'>) => {
    const newNotification = {
      id: nanoid(),
      ...notification,
      autoClose: notification.autoClose ?? DEFAULT_AUTO_CLOSE,
      removeAnimationDuration: notification.removeAnimationDuration ?? REMOVE_ANIMATION_DURATION,
    };

    if (notification.autoClose !== 0) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, newNotification.autoClose);
    }

    setNotifications(
      produce(notifications(), (draft) => {
        draft.push(newNotification);
      }),
    );
  };

  const removeNotification = (id: GlobalNotification['id']) => {
    const matchingIndex = notifications().findIndex((notification) => notification.id === id);

    if (matchingIndex === -1) {
      return;
    }

    const removeAnimationDuration = notifications()[matchingIndex].removeAnimationDuration;

    setNotifications(
      produce(notifications(), (draft) => {
        draft[matchingIndex].isRemoving = true;
      }),
    );

    setTimeout(() => {
      setNotifications(
        produce(notifications(), (draft) => {
          // since it is possible for this or another notification to be removed between the start of the removal and
          // this being processed, we need to double-check the index to remove to makes sure the wrong notification
          // is not removed
          const removeIndex = notifications().findIndex((notification) => notification.id === id);

          if (removeIndex === -1) {
            return;
          }

          pullAt(draft, [removeIndex]);
        }),
      );
    }, removeAnimationDuration);
  };

  const clearNotifications = () => {
    setNotifications(() => []);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

const globalNotificationsStore = createRoot(createGlobalNotificationsStore);

export { globalNotificationsStore };
