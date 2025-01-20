import type { User } from '$/data-models/user';
import { ApiRoute } from '$api/types/api';
import type {
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostUserRequest,
  PostUserResponse,
} from '$api/types/users';
import { apiUtils } from '$api/utils/api';
import { postgresUtils } from '$api/utils/postgres';
import type { FastifyInstance } from 'fastify';

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = { Reply: GetUsersResponse };

  api.get<GetUsers>(ApiRoute.USERS, async (_request_, response) => {
    const results = await postgresUtils.executeQuery<User>('SELECT * FROM users ORDER BY created_at DESC LIMIT 10');

    return response.code(200).send(apiUtils.respondWithData(results.rows));
  });

  type PostUser = {
    Body: PostUserRequest;
    Reply: PostUserResponse;
  };

  api.post<PostUser>(ApiRoute.USERS, async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
      return response.code(400).send();
    }

    const results = await postgresUtils.executeQuery<User>(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [request.body.firstName, request.body.lastName, request.body.email, request.body.password],
    );

    return response.code(200).send(apiUtils.respondWithData(results.rows[0]));
  });

  type GetUser = {
    Params: GetUserRequest;
    Reply: GetUserResponse;
  };

  api.get<GetUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    const results = await postgresUtils.executeQuery<User>('SELECT * FROM users WHERE id = $1 LIMIT 1', [
      request.params.id,
    ]);

    if (!results.rows.length) {
      response.code(404).send({
        error: {
          message: 'user not found',
        },
      });
    }

    return response.code(200).send(apiUtils.respondWithData(results.rows[0]));
  });

  type PatchUser = {
    Body: Omit<PatchUserRequest, 'id'>;
    Params: Pick<PatchUserRequest, 'id'>;
    Reply: PatchUserResponse;
  };

  const patchUpdatePropertyPostgresMap = {
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
    password: 'password',
  };

  api.patch<PatchUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    const { query, queryValues } = await postgresUtils.buildSetQuery(
      patchUpdatePropertyPostgresMap,
      request.body,
      'users',
      request.params.id,
    );

    const results = await postgresUtils.executeQuery<User>(query, queryValues);

    if (results.rowCount === 0) {
      response.code(404).send(apiUtils.respondWithError(new Error('user not found to update')));
    }

    response.code(200).send(apiUtils.respondWithData(results.rows[0]));
  });

  type DeleteUser = {
    Params: Pick<User, 'id'>;
    Reply: DeleteUserResponse;
  };

  api.delete<DeleteUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    const results = await postgresUtils.executeQuery<User>('DELETE FROM users WHERE id = $1 RETURNING *', [
      request.params.id,
    ]);

    if (results.rowCount === 0) {
      response.code(404).send(apiUtils.respondWithError(new Error('user not found to delete')));
    }

    response.code(200).send(apiUtils.respondWithData(results.rows[0]));
  });
};
