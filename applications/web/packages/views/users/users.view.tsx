import Button from '$/components/button';
import Skeleton from '$/components/skeleton';
import { usersApi } from '$web/apis/users';
import Page from '$web/components/page';
import UserForm from '$web/components/user-form';
import UsersList, { type UsersListProps } from '$web/components/users-list';
import { Suspense, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const userQuery = usersApi.getUsers();
  const [activeUser, setActiveUser] = createSignal<UsersListUser>();

  const handleAddUser = () => {
    setActiveUser(undefined);
  };

  const handleSelectUser = (user: UsersListUser) => {
    setActiveUser(user);
  };

  return (
    <Page>
      <Page.Header>
        Users <Button onClick={handleAddUser}>Add User</Button>
      </Page.Header>
      <Suspense fallback={<Skeleton />}>
        <UsersList users={userQuery.users()} onSelect={handleSelectUser} />
        <h1>User Form</h1>
        <UserForm editingUser={activeUser()} />
      </Suspense>
    </Page>
  );
};

export default UsersView;
