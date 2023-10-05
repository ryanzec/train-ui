import { faker } from '@faker-js/faker';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { mockData } from '../../mock-data';

const API_PREFIX = '/api/users';

export const registerUsersApi = (api: FastifyInstance) => {
  api.get(API_PREFIX, async (request, response) => {
    return response.code(200).send({ users: mockData.users.defaultList });
  });

  type PostUsersRequest = FastifyRequest<{
    Body: { email: string; firstName: string; lastName: string; password: string };
  }>;

  api.post(API_PREFIX, async (request: PostUsersRequest, response) => {
    const keys = Object.keys(request.body);

    if (
      !keys.includes('firstName') ||
      !keys.includes('lastName') ||
      !keys.includes('email') ||
      !keys.includes('password')
    ) {
      return response.code(400).send();
    }

    return response.code(200).send({ user: mockData.users.defaultCreate });
  });

  type PutUsersRequest = FastifyRequest<{
    Body: { email?: string; firstName?: string; lastName?: string; password?: string };
    Params: { userId: string };
  }>;

  api.put(`${API_PREFIX}/:userId`, async (request: PutUsersRequest, response) => {
    if (!request.params.userId) {
      response.code(404).send();

      return;
    }

    response.code(200).send({ user: mockData.users.defaultUpdate });
  });

  type DeleteUsersRequest = FastifyRequest<{
    Params: { userId: string };
  }>;

  api.delete(`${API_PREFIX}/:userId`, async (request: DeleteUsersRequest, response) => {
    if (!request.params.userId) {
      response.code(404).send();

      return;
    }

    response.code(200).send({ user: mockData.users.defaultRemove });
  });
};
