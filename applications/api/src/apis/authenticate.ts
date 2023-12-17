import { FastifyInstance } from 'fastify';

import { mockData } from '../../mock-data';

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type GetAuthenticate = Record<string, never>;

  api.post<GetAuthenticate>('/api/authenticate', async (_request_, response) => {
    response.code(200).send({
      authenticationToken: mockData.authenticate.tokens.default,
    });
  });

  type GetAuthenticateCheckToken = {
    Params: { checkToken: string };
  };

  api.get<GetAuthenticateCheckToken>('/api/authenticate/:checkToken', async (request, response) => {
    const checkToken = request.params.checkToken;

    if (checkToken === mockData.authenticate.tokens.bad) {
      return response.code(401).send();
    }

    return response.code(200).send();
  });
};
