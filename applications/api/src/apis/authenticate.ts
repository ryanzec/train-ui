import { FastifyInstance, FastifyRequest } from 'fastify';

import { mockData } from '../../mock-data';

export const registerAuthenticateApi = (api: FastifyInstance) => {
  api.post('/api/authenticate', async (request, response) => {
    response.code(200).send({
      authenticationToken: mockData.authenticate.tokens.default,
    });
  });

  type GetAuthenticateCheckTokenRequest = FastifyRequest<{
    Params: { checkToken: string };
  }>;

  api.get('/api/authenticate/:checkToken', async (request: GetAuthenticateCheckTokenRequest, response) => {
    const checkToken = request.params.checkToken;

    if (checkToken === mockData.authenticate.tokens.bad) {
      return response.code(401).send();
    }

    return response.code(200).send();
  });
};
