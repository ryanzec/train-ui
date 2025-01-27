import Button, { ButtonColor } from '$/components/button';
import { CalloutColor } from '$/components/callout';
import Table, { TableShape } from '$/components/table';
import { globalNotificationsStore } from '$/stores/global-notifications.store';
import type { User } from '$api/types/user';
import { usersApi } from '$web/apis/users';
import styles from '$web/components/users-list/users-list.module.css';
import { authenticationStore } from '$web/stores/authentication.store';
import { For, Show } from 'solid-js';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  users: InternalUser[];
  onSelect?: (user: InternalUser) => void;
};

const UsersList = (props: UsersListProps) => {
  const removeUserMutation = usersApi.remove({
    onSuccess: () => {
      globalNotificationsStore.addNotification({
        message: () => 'User deleted',
        color: CalloutColor.SUCCESS,
      });
    },
  });

  return (
    <Table
      shape={TableShape.SQUARE}
      tableHead={
        <Table.Row>
          <Table.Header class={styles.nameCell}>Name</Table.Header>
          <Table.Header class={styles.emailCell}>Email</Table.Header>
          <Table.Header>Roles</Table.Header>
          <Table.Header />
        </Table.Row>
      }
    >
      <For each={props.users}>
        {(row) => {
          const handleSelectUser = () => {
            props.onSelect?.(row);
          };

          const handleRemoveUser = () => {
            removeUserMutation.mutate({ id: row.id });
          };

          const handleSendResetPasswordEmail = () => {
            authenticationStore.sendResetPassword({ email: row.email }, { redirect: false });

            globalNotificationsStore.addNotification({
              message: () => 'Reset password email sent to user',
              color: CalloutColor.SUCCESS,
            });
          };

          return (
            <Table.Row>
              <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
              <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
              <Table.Data>{row.roles.map((role) => role.id).join(', ')}</Table.Data>
              <Table.Data>
                <Show when={!!props.onSelect}>
                  <Button onClick={handleSelectUser}>S</Button>
                </Show>
                <Button onClick={handleRemoveUser} color={ButtonColor.DANGER}>
                  D
                </Button>
                <Button onClick={handleSendResetPasswordEmail} color={ButtonColor.WARNING}>
                  R
                </Button>
              </Table.Data>
            </Table.Row>
          );
        }}
      </For>
    </Table>
  );
};

export default UsersList;
