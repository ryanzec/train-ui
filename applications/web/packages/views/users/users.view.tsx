import Button from '$/components/button';
import { usersApi } from '$web/apis/users';
import UserForm from '$web/components/user-form';
import UsersList, { type UsersListProps } from '$web/components/users-list';
import { createEffect, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const { users, usersResource } = usersApi.getUsers();
  const [activeUser, setActiveUser] = createSignal<UsersListUser>();

  const handleAddUser = () => {
    setActiveUser(undefined);
  };

  const handleSelectUser = (user: UsersListUser) => {
    setActiveUser(user);
  };

  createEffect(() => {
    console.log(users());
  });

  return (
    <div>
      <h1>
        Users <Button onClick={handleAddUser}>Add User</Button>
      </h1>
      <UsersList users={users()} onSelect={handleSelectUser} />
      <h1>User Form</h1>
      <UserForm editingUser={activeUser()} />
    </div>
  );
};

export default UsersView;
