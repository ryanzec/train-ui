import {
  DeleteUserResponse,
  GetUsersResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostUserRequest,
  PostUserResponse,
  User,
} from '$/data-models/user';
import { faker } from '@faker-js/faker';
import { FastifyInstance } from 'fastify';

import { db } from '../db';
import { mockServerUtils } from '../utils';

const API_PREFIX = '/api/users';

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = { Reply: GetUsersResponse };

  api.get<GetUsers>(API_PREFIX, async (_request_, response) => {
    return response.code(200).send(mockServerUtils.withResponseWrapper(db.data.users));
  });

  type PostUser = {
    Body: PostUserRequest;
    Reply: PostUserResponse;
  };

  api.post<PostUser>(API_PREFIX, async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
      return response.code(400).send();
    }

    const createdItem = {
      id: faker.string.nanoid(),
      ...request.body,
    };

    db.data.users.push(createdItem);

    db.write();

    return response.code(200).send(mockServerUtils.withResponseWrapper(createdItem));
  });

  type PatchUser = {
    Body: Omit<PatchUserRequest, 'id'>;
    Params: Pick<User, 'id'>;
    Reply: PatchUserResponse;
  };

  api.patch<PatchUser>(`${API_PREFIX}/:id`, async (request, response) => {
    const existingIndex = db.data.users.findIndex((user) => user.id === request.params.id);

    if (!existingIndex || existingIndex === -1) {
      response.code(404).send({
        error: {
          message: 'user not found',
        },
      });
    }

    const updatedItem = {
      ...db.data.users[existingIndex],
      ...request.body,
    };

    db.data.users.splice(existingIndex, 1, updatedItem);

    db.write();

    response.code(200).send(mockServerUtils.withResponseWrapper(updatedItem));
  });

  type DeleteUser = {
    Params: Pick<User, 'id'>;
    Reply: DeleteUserResponse;
  };

  api.delete<DeleteUser>(`${API_PREFIX}/:id`, async (request, response) => {
    const existingIndex = db.data.users.findIndex((user) => user.id === request.params.id);

    if (!existingIndex || existingIndex === -1) {
      response.code(404).send({
        error: {
          message: 'user not found',
        },
      });
    }

    const removedItem = db.data.users.splice(existingIndex, 1)[0];

    db.write();

    response.code(200).send(mockServerUtils.withResponseWrapper(removedItem));
  });
};
