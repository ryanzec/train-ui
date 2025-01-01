import * as url from 'node:url';

import type { AuthenticationToken } from '$/data-models/authentication-token';
import type { GetUsersResponse } from '$/data-models/user';
import { faker } from '@faker-js/faker';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

import { FAKER_STANDARD_SEED } from './utils';

faker.seed(FAKER_STANDARD_SEED);

export type MockDatabase = {
  authenticationTokens: NonNullable<AuthenticationToken[]>;
  users: NonNullable<GetUsersResponse['data']>;
};

const defaultDatabase: MockDatabase = {
  authenticationTokens: [{ token: 'default-token' }, { token: 'bad-token' }],
  users: [
    {
      id: faker.string.nanoid(),
      firstName: 'Test1',
      lastName: 'User1',
      email: 'test.user1@example.com',
      password: 'password',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      id: faker.string.nanoid(),
      firstName: 'Test2',
      lastName: 'User2',
      email: 'test.user2@example.com',
      password: 'password',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      id: faker.string.nanoid(),
      firstName: 'Test3',
      lastName: 'User3',
      email: 'test.user3@example.com',
      password: 'password',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
  ],
};

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const dbAdapter = new JSONFileSync<MockDatabase>(`${dirname}/db.json`);
export const db = new LowSync<MockDatabase>(dbAdapter, defaultDatabase);

db.read();

db.data.authenticationTokens = db.data.authenticationTokens || defaultDatabase.authenticationTokens;
db.data.users = db.data.users || defaultDatabase.users;

db.write();

export const dbUtils = {
  // wrapping this to be able to centralize as performance optimization we might need in the future
  write: async () => {
    await db.write();
  },
};
