import { GetAuthenticateResponse } from '$/data-models/authentication-token';
import { FastifyInstance } from 'fastify';

import { db } from '../db';
import { mockServerUtils } from '../utils';

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type GetAuthenticate = { Reply: GetAuthenticateResponse };

  api.post<GetAuthenticate>('/api/authenticate', async (_request_, response) => {
    response.code(200).send(mockServerUtils.withResponseWrapper(db.data.authenticationTokens[0]));
  });

  type GetAuthenticateCheckToken = {
    Params: { token: string };
  };

  api.get<GetAuthenticateCheckToken>('/api/authenticate/:token', async (request, response) => {
    if ('bad' === request.params.token) {
      return response.code(401).send();
    }

    return response.code(200).send();
  });
};
