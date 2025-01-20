import type {
  DeleteUserResponse,
  GetUsersResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostUserRequest,
  PostUserResponse,
  User,
} from '$/data-models/user';
import type { FastifyInstance } from 'fastify';

import { apiUtils } from '$api/utils/api';
import { postgresUtils } from '$api/utils/postgres';

const API_PREFIX = '/api/users';

const users: User[] = [
  {
    id: 'ZV7ZeooFWQjwrexUsqWMI',
    firstName: 'Test1',
    lastName: 'User1',
    email: 'test.user1@example.com',
    password: 'password',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 'N5wRPPg3FAFpch8Mp2C-i',
    firstName: 'Test2',
    lastName: 'User2',
    email: 'test.user2@example.com',
    password: 'password',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 'rd4t5U7w5UUiAzCXgexWu',
    firstName: 'Test3',
    lastName: 'User3',
    email: 'test.user3@example.com',
    password: 'password',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
];

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = { Reply: GetUsersResponse };

  api.get<GetUsers>(API_PREFIX, async (_request_, response) => {
    const results = await postgresUtils.executeQuery<User>('SELECT * FROM users ORDER BY created_at DESC LIMIT 10');

    return response.code(200).send(apiUtils.respondWithData(results.rows));
  });

  type PostUser = {
    Body: PostUserRequest;
    Reply: PostUserResponse;
  };

  api.post<PostUser>(API_PREFIX, async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
      return response.code(400).send();
    }

    return response.code(200).send(apiUtils.respondWithData(users[0]));
  });

  type PatchUser = {
    Body: Omit<PatchUserRequest, 'id'>;
    Params: Pick<User, 'id'>;
    Reply: PatchUserResponse;
  };

  api.patch<PatchUser>(`${API_PREFIX}/:id`, async (request, response) => {
    const existingIndex = users.findIndex((user) => user.id === request.params.id);

    if (!existingIndex || existingIndex === -1) {
      response.code(404).send({
        error: {
          message: 'user not found',
        },
      });
    }

    response.code(200).send(apiUtils.respondWithData(users[existingIndex]));
  });

  type DeleteUser = {
    Params: Pick<User, 'id'>;
    Reply: DeleteUserResponse;
  };

  api.delete<DeleteUser>(`${API_PREFIX}/:id`, async (request, response) => {
    const existingIndex = users.findIndex((user) => user.id === request.params.id);

    if (!existingIndex || existingIndex === -1) {
      response.code(404).send({
        error: {
          message: 'user not found',
        },
      });
    }

    response.code(200).send(apiUtils.respondWithData(users[existingIndex]));
  });
};
