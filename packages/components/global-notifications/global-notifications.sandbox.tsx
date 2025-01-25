import { type JSX, createSignal } from 'solid-js';

import Button from '$/components/button';
import { CalloutColor } from '$/components/callout';
import FormField from '$/components/form-field';
import Input from '$/components/input';
import { globalNotificationsStore } from '$/stores/global-notifications.store';

export default {
  title: 'Components/GlobalNotifications',
};

export const Default = () => {
  const [test, setTest] = createSignal('test');

  const onClick: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setTest(event.currentTarget?.value);
  };

  return (
    <>
      <FormField>
        <Input type="text" onChange={onClick} value={test()} />
      </FormField>
      <Button
        onClick={() => {
          // this needs to happen in order to make sure solidjs reactive system properly disposes of the computation
          const forNotification = test();

          globalNotificationsStore.addNotification({
            message: () => <div>This is a test message: {forNotification}</div>,
          });
        }}
      >
        Add Temp Notification
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            autoClose: 0,
          });
        }}
      >
        Add Perm Notification
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            color: CalloutColor.DANGER,
            autoClose: 0,
          });
        }}
      >
        Add Perm Notification (Danger)
      </Button>
      <Button
        onClick={() => {
          globalNotificationsStore.addNotification({
            message: () => 'This is a test message',
            autoClose: 0,
            emoji: 'white_check_mark',
          });
        }}
      >
        Add Perm Notification (with emoji)
      </Button>
    </>
  );
};
