import Button from '$/components/button';
import { peekComponentUtils } from '$/components/peek';
import Skeleton from '$/components/skeleton';
import { usersApi } from '$web/apis/users';
import Page from '$web/components/page';
import UserFormPeek from '$web/components/user-form-peek/user-form-peek';
import UsersList, { type UsersListProps } from '$web/components/users-list';
import { Suspense, createSignal } from 'solid-js';

type UsersListUser = UsersListProps['users'][0];

const UsersView = () => {
  const userQuery = usersApi.getUsers();

  const peekStore = peekComponentUtils.createStore();

  const [activeUser, setActiveUser] = createSignal<UsersListUser>();

  const handleAddUser = () => {
    setActiveUser(undefined);
    peekStore.setIsOpened(true);
  };

  const handleSelectUser = (user: UsersListUser) => {
    setActiveUser(user);
    peekStore.setIsOpened(true);
  };

  return (
    <Page>
      <Page.Header>
        Users <Button onClick={handleAddUser}>New User</Button>
      </Page.Header>
      <Suspense fallback={<Skeleton />}>
        <UsersList users={userQuery.users()} onSelect={handleSelectUser} />
        <h1>User Form</h1>
        <UserFormPeek peekStore={peekStore} editingUser={activeUser()} />
      </Suspense>
    </Page>
  );
};

export default UsersView;
