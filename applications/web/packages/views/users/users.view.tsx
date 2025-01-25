import Button from '$/components/button';
import type { User } from '$api/types/user';
import { usersApi } from '$web/apis/users';
import UserForm from '$web/components/user-form';
import UsersList from '$web/components/users-list';
import { createEffect, createSignal } from 'solid-js';

const UsersView = () => {
  const { users, usersResource } = usersApi.getUsers();
  const [activeUser, setActiveUser] = createSignal<User>();

  const handleAddUser = () => {
    setActiveUser(undefined);
  };

  const handleSelectUser = (user: User) => {
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
