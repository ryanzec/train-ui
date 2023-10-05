export const mockData = {
  authenticate: {
    tokens: {
      default: 'default-token',
      bad: 'bad-token',
    },
  },
  users: {
    defaultList: [
      {
        id: '1',
        firstName: 'Test1',
        lastName: 'User1',
        email: 'test.user1@example.com',
        password: 'password',
      },
      {
        id: '2',
        firstName: 'Test2',
        lastName: 'User2',
        email: 'test.user2@example.com',
        password: 'password',
      },
    ],
    defaultCreate: {
      id: '100000',
      firstName: 'Created',
      lastName: 'User',
      email: 'created.user@example.com',
      password: 'password',
    },
    defaultUpdate: {
      id: '100001',
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated.user@example.com',
      password: 'password',
    },
    defaultRemove: {
      id: '100002',
      firstName: 'Removed',
      lastName: 'User',
      email: 'removed.user@example.com',
      password: 'password',
    },
  },
};
