import Button, { ButtonColor } from '$/components/button';
import Table, { TableShape } from '$/components/table';
import type { User } from '$api/types/user';
import { usersApi } from '$web/apis/users';
import styles from '$web/components/users-list/users-list.module.css';
import { For, Show } from 'solid-js';

type InternalUser = Pick<User, 'id' | 'email' | 'name' | 'roles'>;

export type UsersListProps = {
  users: InternalUser[];
  onSelect?: (user: InternalUser) => void;
};

const UsersList = (props: UsersListProps) => {
  const removeUserMutation = usersApi.remove();

  return (
    <Table
      shape={TableShape.SQUARE}
      tableHead={
        <Table.Row>
          <Table.Header class={styles.nameCell}>Name</Table.Header>
          <Table.Header class={styles.emailCell}>Email</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header />
        </Table.Row>
      }
    >
      <For each={props.users}>
        {(row) => {
          return (
            <Table.Row>
              <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
              <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
              <Table.Data>{row.roles.map((role) => role.id).join(', ')}</Table.Data>
              <Table.Data>
                <Show when={!!props.onSelect}>
                  <Button onClick={() => props.onSelect?.(row)}>S</Button>
                </Show>
                <Button onClick={() => removeUserMutation.mutate({ id: row.id })} color={ButtonColor.DANGER}>
                  D
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
