import { FastifyInstance } from 'fastify';

import { mockData } from '../../mock-data';

const API_PREFIX = '/api/users';

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = Record<string, never>;

  api.get<GetUsers>(API_PREFIX, async (_request_, response) => {
    return response.code(200).send({ users: mockData.users.defaultList });
  });

  type PostUser = {
    Body: { email: string; firstName: string; lastName: string; password: string };
  };

  api.post<PostUser>(API_PREFIX, async (request, response) => {
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

  type PatchUser = {
    Body: { email?: string; firstName?: string; lastName?: string; password?: string };
    Params: { userId: string };
  };

  api.patch<PatchUser>(`${API_PREFIX}/:userId`, async (request, response) => {
    if (!request.params.userId) {
      response.code(404).send();

      return;
    }

    response.code(200).send({ user: mockData.users.defaultUpdate });
  });

  type DeleteUser = {
    Params: { userId: string };
  };

  api.delete<DeleteUser>(`${API_PREFIX}/:userId`, async (request, response) => {
    if (!request.params.userId) {
      response.code(404).send();

      return;
    }

    response.code(200).send({ user: mockData.users.defaultRemove });
  });
};
